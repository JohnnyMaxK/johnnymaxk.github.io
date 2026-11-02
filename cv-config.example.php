<?php
// Example config of the CV endpoints (public/cv.php, public/cv-download.php).
// Copy it to the server as cv-private/config.php NEXT TO the site folder (outside the web root),
// fill the secret and the SMTP password there, and never commit the filled copy.
// See README, "CV on request".
return [
    // At least 32 random characters: php -r 'echo bin2hex(random_bytes(32)), "\n";'
    'secret' => 'REPLACE_WITH_64_HEX_CHARACTERS',
    // The CV PDF, outside the web root. Placeholder until the PDF is uploaded.
    'pdf_path' => __DIR__ . '/Johnny-KNOBLAUCH-CV.pdf',
    // Rate-limit counters (hashed keys only, kept 24 h). Created on first use.
    'data_dir' => __DIR__ . '/data',
    'site_url' => 'https://johnny.knoblauch.fr',
    'notify_to' => 'johnny@knoblauch.fr',
    // Infomaniak requires From to be the authenticated mailbox.
    'from' => 'johnny@knoblauch.fr',
    'from_name' => 'Johnny KNOBLAUCH',
    'signature_phone' => '06 63 96 30 36',
    'token_days' => 7,
    // Requests per 24 h: per IP, per e-mail address, and for the whole site.
    'rate_limit' => ['per_ip' => 5, 'per_email' => 3, 'total' => 50],
    // Infomaniak mail: mail.infomaniak.com, 465 + 'ssl' (implicit TLS) or 587 + 'tls' (STARTTLS).
    'smtp' => [
        'host' => 'mail.infomaniak.com',
        'port' => 465,
        'secure' => 'ssl',
        'user' => 'johnny@knoblauch.fr',
        'pass' => 'REPLACE_WITH_THE_MAILBOX_PASSWORD',
    ],
];
