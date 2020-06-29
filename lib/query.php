<?php
  function getFileNames($path) {
    $result = array();

    if (is_dir($path)) {
      $result =  array_values(array_diff(scandir($path), array(".", "..")));
    }

    return $result;
  }

  function getYearMonth($y, $m) {
    $zp = intval($m) < 10 ? "0" : "";
    return $y."-".$zp.$m;
  }

  error_reporting(E_ALL);
  ini_set("display_errors","On");
  define("IMG_ROOT", join('/', array($_SERVER['DOCUMENT_ROOT'], "image")));
  $queryString = $_GET["q"];
  $encodedJSON = "";

  if ($queryString == "cams") {
    $dirs = getFileNames(IMG_ROOT);
    $encodedJSON = json_encode($dirs);
  }
  else if ($queryString == "tags") {
    $cam = $_GET["cam"];
    $ym = getYearMonth($_GET["y"], $_GET["m"]);

    $ymPath = join('/', array(IMG_ROOT, $cam, $ym));

    $dirs = file_exists($ymPath) ? getFileNames($ymPath) : array();
    $encodedJSON = json_encode($dirs);
  }
  else if ($queryString == "images") {
    $cam = $_GET["cam"];
    $ym = getYearMonth($_GET["y"], $_GET["m"]);
    $d = $_GET["d"];

    $datePath = join('/', array(IMG_ROOT, $cam, $ym, $d));
    $relativePath = substr($datePath, strpos($datePath, "/image"));


    $infoObj = array(
      "prefix" => $relativePath,
      "data" => array()
    );

    $hourList = getFileNames($datePath);
    foreach ($hourList as $hour) {
      $hourPath = join('/', array($datePath, $hour));
      $imgFiles = getFileNames($hourPath);
      $infoObj["data"][$hour] = $imgFiles;
    }

    $encodedJSON =  json_encode($infoObj);
  }
  else {
    echo "<strong>Bruh!</strong> what the hell are you doing?";
  }

  echo $encodedJSON;
?>
