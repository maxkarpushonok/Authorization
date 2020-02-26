<?php
    class Users {
        private $file;
        private $sol = 'qwerty';

        function __construct(string $file) {
            $this->file = $file;
        }

        public function addUser(string $login, string $password, string $email, string $name) {
            $xml = null;
            if (file_exists($this->file))
                $xml = simplexml_load_file($this->file);
            else
                $xml = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" ?><users></users>');

            $newChild = $xml->addChild('user');
            $newChild->addChild('login', $login);
            $newChild->addChild('password', md5($this->sol . $password));
            $newChild->addChild('email', $email);
            $newChild->addChild('name', $name);

            return $xml->asXML($this->file);
        }

        public function checkLogin(string $login) {
            if (file_exists($this->file)) {
                $xml = simplexml_load_file($this->file);
                $xpath = "//users/user[login='$login']";
                $result = $xml->xpath($xpath);
                if (count($result))
                    return true;
            }
            return false;
        }

        public function checkEmail(string $email) {
            if (file_exists($this->file)) {
                $xml = simplexml_load_file($this->file);
                $xpath = "//users/user[email='$email']";
                $result = $xml->xpath($xpath);
                if (count($result))
                    return true;
            }
            return false;
        }

        public function signIn(string $login, string $password) {
            if (file_exists($this->file)) {
                $xml = simplexml_load_file($this->file);
                $passwordHash = md5($this->sol . $password);
                $xpath = "//users/user[login='$login']";
                $result = $xml->xpath($xpath);
                if (count($result))
                    return $result[0];
            }
            return null;
        }
    }