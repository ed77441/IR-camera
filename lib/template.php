<?php

class Template {
  private $html;

  public function __construct() {
    $this->html = file_get_contents($_SERVER['DOCUMENT_ROOT']
      ."/view/base.html");
  }

  public function setTitle($title) {
    $this->html = str_replace("{TITLE}", $title, $this->html);
  }

  public function setContent($content) {
    $this->html = str_replace("{CONTENT}", $content, $this->html);
  }

  public function setSripts($scripts) {
    $scriptTags = '';
    foreach ($scripts as $key => $value) {
      $scriptTags .=
        '<script src="'.$value.'"></script>';
    }
    $this->html = str_replace("{SCRIPTS}", $scriptTags, $this->html);
  }

  public function setStyles($styles) {
    $styleSheetTags = '';
    foreach ($styles as $key => $value) {
      $styleSheetTags .=
        '<link rel="stylesheet" type="text/css" href="'.$value.'"/>';
    }
    $this->html = str_replace("{STYLES}", $styleSheetTags, $this->html);
  }

  public function show($debug = false) {
    $this->html = str_replace("{STYLES}", "", $this->html);
    $this->html = str_replace("{SCRIPTS}", "", $this->html);

    if ($debug) {
      $this->html .= "<!--".date("d.m.Y H:i:s")."-->";
    }

    echo $this->html;
  }
}

?>
