<?php
error_reporting(E_ALL);
ini_set("display_errors","On");

$cam = $_POST["cam"];
$ym = $_POST["ym"];
$day = $_POST["day"];
$hour = $_POST["hour"];
$ms = $_POST["ms"];

$path = join('/', array($_SERVER['DOCUMENT_ROOT'], "image", $cam, $ym, $day, $hour));
if (!file_exists( $path )) {
  $old_umask = umask(0);
  mkdir($path, 0777, true);
  umask($old_umask);
}

move_uploaded_file($_FILES["img"]["tmp_name"], $path.'/'.$ms.".png");

?>
