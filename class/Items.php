<?php

    class Items{

        private $conn;
        private $table = 'users';
        private $id;
        private $name;
        private $email;
        private $password;

        public function __construct($db){
            $this->conn = $db;
        }

        public function read(){

            $query = "SELECT * FROM ".$this->table;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }

        public function insert($userData = array()){
            $query = "INSERT INTO $this->table (name,email,password) VALUES (:name,:email,:password)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':name',$userData['name'],PDO::PARAM_STR);
            $stmt->bindValue(':email',$userData['email'],PDO::PARAM_STR);
            $stmt->bindValue(':password',$userData['password'],PDO::PARAM_STR);

            return $stmt->execute();
        }

        public function emailAlreadyInUse($userEmail){
            $query = "SELECT * FROM $this->table WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':email',$userEmail,PDO::PARAM_STR);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $res;
        }
    }