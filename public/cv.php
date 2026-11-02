<?php
// CV request endpoint (form on /parcours/). Plain POST, no JavaScript needed.
// Validates the e-mail, rate-limits, mails the visitor a 7-day download link, notifies Johnny.
declare(strict_types=1);
const CV_APP = true;
require __DIR__ . '/_cv/lib.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') cv_redirect('/parcours/#cv');
$c = cv_config();

// Cross-site posts are refused when the browser states an origin.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && $origin !== 'null' && parse_url($origin, PHP_URL_HOST) !== parse_url($c['site_url'], PHP_URL_HOST)) {
    cv_redirect('/cv/erreur/');
}
// Honeypot: a bot filled the hidden field. Pretend success, send nothing.
if (trim((string) ($_POST['website'] ?? '')) !== '') cv_redirect('/cv/merci/');

$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
// IPv6: count per /64 (one subscriber's prefix), else rotating addresses in it bypass the limit.
// IPv4-mapped addresses (::ffff:a.b.c.d) keep their IPv4, or every IPv4 visitor would share one counter.
if (str_contains($ip, ':') && ($bin = @inet_pton($ip)) !== false && strlen($bin) === 16) {
    $ip = str_starts_with($bin, str_repeat("\0", 10) . "\xff\xff") ? inet_ntop(substr($bin, 12)) : bin2hex(substr($bin, 0, 8)) . '::/64';
}
$rl = $c['rate_limit'] ?? [];
if (!cv_rate_ok($c, "ip|$ip", (int) ($rl['per_ip'] ?? 5), 86400)) cv_redirect('/cv/limite/');

$email = trim((string) ($_POST['email'] ?? ''));
// No quoted local parts, IP literals or dotless domains: plain user@domain.tld only.
$valid = strlen($email) <= 254 && !preg_match('/[\s<>"\[\]\\\\]/', $email) && preg_match('/@[^@]+\.[A-Za-z]{2,}$/', $email)
    && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
if (!$valid || ($_POST['consent'] ?? '') !== 'yes') cv_redirect('/cv/erreur/');

if (!cv_rate_ok($c, 'email|' . strtolower($email), (int) ($rl['per_email'] ?? 3), 86400)
    || !cv_rate_ok($c, 'all', (int) ($rl['total'] ?? 50), 86400)) {
    cv_redirect('/cv/limite/');
}

$days = (int) ($c['token_days'] ?? 7);
$link = rtrim($c['site_url'], '/') . '/cv-download.php?t=' . cv_make_token($c);
$body = "Bonjour,\n\n"
    . "Merci de votre intérêt. Voici le lien pour télécharger mon CV en PDF, valable $days jours :\n\n"
    . "$link\n\n"
    . "Vous recevez ce message parce que cette adresse a été saisie sur " . rtrim($c['site_url'], '/') . "/parcours/.\n"
    . "Si ce n’est pas vous, ignorez-le, ou répondez-moi pour que votre adresse soit effacée.\n\n"
    . "Johnny KNOBLAUCH\n" . ($c['signature_phone'] ?? '') . "\n";
if (!cv_send_mail($c, $email, 'Mon CV en PDF', rtrim($body) . "\n")) cv_redirect('/cv/erreur/');

$note = "Demande de CV depuis le site.\n\nAdresse : $email\nDate : " . date('Y-m-d H:i:s T') . "\n\n"
    . "À supprimer au plus tard 12 mois après cette date (mentions légales).\n";
if (!cv_send_mail($c, $c['notify_to'], "CV demandé : $email", $note, $email)) error_log('cv: owner notification failed');

cv_redirect('/cv/merci/');
