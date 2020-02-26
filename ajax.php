<?php
    require_once 'config.php';
    require_once 'Users.php';

    $users = new Users(CONFIG['db_file']);

    if (isset($_POST['signin'])) {
        echo json_encode($users->signIn($_POST['login'], $_POST['password']));
    }

    if (isset($_POST['registration'])) {
        if ($users->checkLogin($_POST['login']))
            echo json_encode(['status' => 'Login is exist!']);
        elseif ($users->checkEmail($_POST['email']))
            echo json_encode(['status' => 'E-mail is exist!']);
        else {
            if ($users->addUser($_POST['login'], $_POST['password'], $_POST['email'], $_POST['name']))
                echo json_encode(['status' => 'Successful!']);
            else
                echo json_encode(['status' => 'Error of registration!']);
        }
    }

    if (isset($_POST['signout'])) {

    }