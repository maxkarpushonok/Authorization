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
            $newChild->addChild('session', '');

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
                $xpath = "//users/user[login='$login' and password='$passwordHash']";
                $result = $xml->xpath($xpath);
                if (count($result)) {
                    $parent = new DOMDocument;
                    $parent_node = $parent->createElement('user');
                    $parent_node->appendChild($parent->createElement('login', $result[0]->login));
                    $parent_node->appendChild($parent->createElement('password', $result[0]->password));
                    $parent_node->appendChild($parent->createElement('email', $result[0]->email));
                    $parent_node->appendChild($parent->createElement('name', $result[0]->name));
                    $parent_node->appendChild($parent->createElement('session', $_COOKIE['PHPSESSID']));
                    $parent->appendChild($parent_node);

                    $dom = new DomDocument;
                    $dom->load($this->file);

                    $xp = new DOMXPath($dom);
                    $nodelist = $xp->query($xpath);
                    $oldnode = $nodelist->item(0);
                    $newnode = $dom->importNode($parent->documentElement, true);
                    $oldnode->parentNode->replaceChild($newnode, $oldnode);
                    $dom->save($this->file);

                    return array('login' => (string) $result[0]->login,
                        'password' => (string) $result[0]->password,
                        'email' => (string) $result[0]->email,
                        'name' => (string) $result[0]->name,
                        'session' => (string) $_COOKIE['PHPSESSID']);
                }
            }
            return null;
        }

        public function signInSession(string $session) {
            if (file_exists($this->file)) {
                $xml = simplexml_load_file($this->file);
                $xpath = "//users/user[session='$session']";
                $result = $xml->xpath($xpath);
                if (count($result))
                    return $result[0] ;
            }
            return null;
        }

    }