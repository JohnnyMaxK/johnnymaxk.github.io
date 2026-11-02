<?php
// Serves the CV PDF only with a valid, unexpired signed token (sent by cv.php).
declare(strict_types=1);
const CV_APP = true;
require __DIR__ . '/_cv/lib.php';

$c = cv_config();
$token = (string) ($_GET['t'] ?? '');
if (!cv_check_token($c, $token)) cv_redirect('/cv/lien-expire/');

$pdf = (string) ($c['pdf_path'] ?? '');
if ($pdf === '' || !is_readable($pdf)) { error_log("cv: PDF not found at $pdf"); cv_redirect('/cv/erreur/'); }

header('Content-Type: application/pdf');
header('Content-Disposition: attachment; filename="Johnny-KNOBLAUCH-CV.pdf"');
header('Content-Length: ' . filesize($pdf));
header('Cache-Control: private, no-store');
header('X-Robots-Tag: noindex, nofollow');
readfile($pdf);
