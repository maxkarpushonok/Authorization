<?php
    $mainHtml = new DOMDocument();
    $mainHtml->loadHTMLFile('main_view.html');
    $mainHtml->getElementsByTagName('title')->item(0)->nodeValue = 'My site';

    echo $mainHtml->saveHTML();