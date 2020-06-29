<?php
  $Deugging = true;
  define("SERVER", $_SERVER['DOCUMENT_ROOT']);

  if ($Deugging) {
    error_reporting(E_ALL);
    ini_set("display_errors","On");
  }

  include_once("lib/template.php");
  $template = new Template();

  if (empty($_GET['page'])) {
    $template->setStyles(array("/css/home.css"));
    $template->setTitle("Home page");
    $template->setContent(file_get_contents(
      SERVER."/view/home.html"));
    $template->show(true);
  }
  else if ($_GET['page'] == "images") {
    $template->setTitle("service page");
    $template->setStyles(array("/css/images.css", "/css/timeline.css",
                        "/css/modal.css"));
    $template->setSripts(
      array("/js/main.js", "/js/calendar-controller.js",
       "/js/calendar-view.js", "/js/calendar-model.js",
       "/js/timeline-controller.js",
       "/js/timeline-view.js", "/js/timeline-model.js",
       "/js/query.js",
       "https://cdn.jsdelivr.net/npm/chart.js@2.8.0")
    );
    $template->setContent(file_get_contents(
      SERVER."/view/images.html"));
    $template->show();
  }
  else if ($_GET['page'] == "service") {
    $template->setTitle("service page");
    $template->setStyles(array("css/service.css"));
    $template->setContent(file_get_contents(
      SERVER."/view/service.html"));
    $template->show();
  }
  else if ($_GET['page'] == "about"){
    $template->setTitle("about page");
    $template->setStyles(array("css/about.css"));
    $template->setContent(file_get_contents(
      SERVER."/view/about.html"));
    $template->show();
  }
  else {
    echo "<b> Erorr! </b> Page not found!";
  }
?>
