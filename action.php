<?php
    $mainHtml = new DOMDocument();
    $mainHtml->loadHTMLFile('main.html');
    $mainHtml->getElementsByTagName('title')->item(0)->nodeValue = 'My site';

    //TODO checked SESSION and COOKIES

    echo $mainHtml->saveHTML();