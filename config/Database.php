<?php
    
    class Database{
        
        private $host = 'localhost';
        private $db_name = 'usersapi';
        private $port = 3306;
        private $username = 'root';
        private $password = '';
        private $conn = null;

        public function connect(){

            try{

                $this->conn = new PDO('mysql:host='.$this->host.';dbname='.$this->db_name.';port='.$this->port,$this->username,$this->password);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                return $this->conn;
                
            }catch(PDOException $ex){
                echo 'Connection error '. $ex->getMessage();
            }
        }

    }
?>