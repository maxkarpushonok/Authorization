<?php
    $mainHtml = new DOMDocument();
    $mainHtml->loadHTMLFile('main.html');
    $mainHtml->getElementsByTagName('title')->item(0)->nodeValue = 'My site';

    if (isset($_COOKIE['id'])) {
        require_once 'Users.php';
        $users = new Users(CONFIG['db_file']);
        $result = $users->signInSession($_COOKIE['id']);
        if($result != null) {
            $mainHtml->getElementById('signin')->setAttribute('style', 'display:none');
            $mainHtml->getElementById('signout')->setAttribute('style', 'display:block');
            $mainHtml->getElementById('signoutResult')->nodeValue = 'Hello ' . $result->name . '!';
        }
    }

    echo $mainHtml->saveHTML();