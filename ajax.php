<?php
    require_once 'config.php';
    require_once 'Users.php';

    $users = new Users(CONFIG['db_file']);

    if (isset($_POST['signin'])) {
        echo json_encode($users->signIn(htmlspecialchars($_POST['login']), htmlspecialchars($_POST['password'])));
    }

    if (isset($_POST['registration'])) {
        if ($users->checkLogin($_POST['login']))
            echo json_encode(['status' => 'Login is exist!']);
        elseif ($users->checkEmail($_POST['email']))
            echo json_encode(['status' => 'E-mail is exist!']);
        else {
            if ($users->addUser(htmlspecialchars($_POST['login']), htmlspecialchars($_POST['password']), htmlspecialchars($_POST['email']), htmlspecialchars($_POST['name'])))
                echo json_encode(['status' => 'Successful!']);
            else
                echo json_encode(['status' => 'Error of registration!']);
        }
    }

    if (isset($_POST['signout'])) {

    }