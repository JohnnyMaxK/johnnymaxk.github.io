<?php
// Shared code of cv.php and cv-download.php. Never served (see .htaccess in this folder).
// Config: a PHP file returning an array, kept OUTSIDE the web root (see README, "CV on request").
declare(strict_types=1);
if (!defined('CV_APP')) { http_response_code(404); exit; }
date_default_timezone_set('Europe/Paris');
// A PHP warning printed to the page would leak server paths and break the redirects: log only.
ini_set('display_errors', '0');
ini_set('log_errors', '1');

/** Loads the config: ../cv-private/config.php (next to the site folder), else _private/config.php. */
function cv_config(): array {
    $candidates = [dirname(__DIR__, 2) . '/cv-private/config.php', dirname(__DIR__) . '/_private/config.php'];
    foreach ($candidates as $path) {
        if (is_readable($path)) {
            $c = require $path;
            if (is_array($c) && isset($c['secret']) && strlen((string) $c['secret']) >= 32) return $c;
        }
    }
    error_log('cv: config missing or secret shorter than 32 characters');
    cv_redirect('/cv/erreur/');
}

function cv_redirect(string $path): never {
    header('Location: ' . $path, true, 303);
    header('Cache-Control: no-store');
    exit;
}

function cv_b64url(string $raw): string { return rtrim(strtr(base64_encode($raw), '+/', '-_'), '='); }

/** Token "<expiry>.<nonce>.<hmac>", valid $days days. */
function cv_make_token(array $c): string {
    $exp = time() + 86400 * (int) ($c['token_days'] ?? 7);
    $nonce = bin2hex(random_bytes(8));
    $sig = cv_b64url(hash_hmac('sha256', "cv-download|$exp|$nonce", $c['secret'], true));
    return "$exp.$nonce.$sig";
}

function cv_check_token(array $c, string $token): bool {
    if (!preg_match('/^(\d{10})\.([0-9a-f]{16})\.([A-Za-z0-9_-]{43})$/', $token, $m)) return false;
    $exp = (int) $m[1];
    $max = time() + 86400 * ((int) ($c['token_days'] ?? 7) + 1);
    if ($exp < time() || $exp > $max) return false;
    $expected = cv_b64url(hash_hmac('sha256', "cv-download|{$m[1]}|{$m[2]}", $c['secret'], true));
    return hash_equals($expected, $m[3]);
}

/**
 * File-based counter: true while $key stayed under $max hits in the last $window seconds.
 * Keys are HMAC hashes, so no IP or e-mail address is written to disk.
 */
function cv_rate_ok(array $c, string $key, int $max, int $window): bool {
    $dir = rtrim((string) ($c['data_dir'] ?? ''), '/') . '/rate';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) { error_log("cv: cannot create $dir"); return false; }
    $file = $dir . '/' . hash_hmac('sha256', $key, $c['secret']) . '.txt';
    $fh = @fopen($file, 'c+');
    if ($fh === false) { error_log("cv: cannot open $file"); return false; }
    flock($fh, LOCK_EX);
    $now = time();
    $hits = array_filter(array_map('intval', explode("\n", (string) stream_get_contents($fh))), fn ($t) => $t > $now - $window);
    $ok = count($hits) < $max;
    if ($ok) $hits[] = $now;
    ftruncate($fh, 0); rewind($fh); fwrite($fh, implode("\n", $hits));
    flock($fh, LOCK_UN); fclose($fh);
    { // purge of stale counters on every request (a handful of small files)
        foreach (glob($dir . '/*.txt') ?: [] as $f) if (filemtime($f) < $now - $window) @unlink($f);
    }
    return $ok;
}

/** Minimal SMTP client (implicit TLS on 465 or STARTTLS on 587, AUTH LOGIN). Plain-text UTF-8 mail. */
function cv_send_mail(array $c, string $to, string $subject, string $body, ?string $replyTo = null): bool {
    $s = $c['smtp'];
    $secure = $s['secure'] ?? 'ssl';
    $remote = ($secure === 'ssl' ? 'ssl://' : 'tcp://') . $s['host'] . ':' . (int) $s['port'];
    $fp = @stream_socket_client($remote, $errno, $errstr, 15);
    if ($fp === false) { error_log("cv: smtp connect failed: $errstr"); return false; }
    stream_set_timeout($fp, 15);
    $read = function () use ($fp): string {
        $out = '';
        while (($line = fgets($fp, 515)) !== false) { $out .= $line; if (strlen($line) < 4 || $line[3] === ' ') break; }
        return $out;
    };
    $cmd = function (?string $line, string $expect) use ($fp, $read): bool {
        if ($line !== null) fwrite($fp, $line . "\r\n");
        $resp = $read();
        if (strncmp($resp, $expect, 3) !== 0) { error_log('cv: smtp unexpected reply: ' . trim($resp)); return false; }
        return true;
    };
    $host = parse_url((string) $c['site_url'], PHP_URL_HOST) ?: 'localhost';
    $from = $c['from'];
    $enc = fn (string $t) => '=?UTF-8?B?' . base64_encode($t) . '?=';
    $headers = [
        'Date: ' . date(DATE_RFC2822),
        'From: ' . $enc($c['from_name']) . " <$from>",
        "To: <$to>",
        'Subject: ' . $enc($subject),
        'Message-ID: <' . bin2hex(random_bytes(12)) . "@$host>",
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        'Auto-Submitted: auto-generated',
    ];
    if ($replyTo !== null) $headers[] = "Reply-To: <$replyTo>";
    $data = implode("\r\n", $headers) . "\r\n\r\n" . rtrim(chunk_split(base64_encode($body), 76, "\r\n"));
    $ok = $cmd(null, '220') && $cmd("EHLO $host", '250');
    if ($ok && $secure === 'tls') {
        $ok = $cmd('STARTTLS', '220')
            && stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT)
            && $cmd("EHLO $host", '250');
    }
    $ok = $ok && $cmd('AUTH LOGIN', '334') && $cmd(base64_encode($s['user']), '334') && $cmd(base64_encode($s['pass']), '235')
        && $cmd("MAIL FROM:<$from>", '250') && $cmd("RCPT TO:<$to>", '250') && $cmd('DATA', '354')
        && $cmd($data . "\r\n.", '250');
    @fwrite($fp, "QUIT\r\n");
    fclose($fp);
    return $ok;
}
