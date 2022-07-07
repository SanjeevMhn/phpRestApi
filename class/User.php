<?php

include_once '../../auth/JwtHandler.php';

class User extends JwtHandler
{

    private $conn;
    private $table = 'users';
    private $id;
    private $name;
    private $email;
    private $password;

    protected $headers;
    protected $token;

    public function __construct($db, $headers = null)
    {
        parent::__construct();
        $this->conn = $db;
        $this->headers = $headers;
    }

    public function isValid()
    {

        if (array_key_exists('Authorization', $this->headers) && preg_match('/Bearer\s(\S+)/', $this->headers['Authorization'], $matches)) {

            $data = $this->jwtDecodeData($matches[1]);

            if (isset($data['data']->user_id) && $user = $this->getUserById($data['data']->user_id)) {
                return array(
                    "success" => 1,
                    "user" => $user
                );
            } else {
                return array(
                    "success" => 0,
                    "message" => "User not found",
                );
            }
        } else {
            return array(
                "success" => 0,
                "message" => "Token not found"
            );
        }
    }

    public function getUserByEmail($email)
    {

        try {
            $query = "SELECT * FROM $this->table WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':email', $email);
            $stmt->execute();
            if ($stmt->rowCount()) {
                return $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                return false;
            }
        } catch (PDOException $ex) {
            echo json_encode(
                array(
                    "message" => $ex->getMessage(),
                )
            );
        }
    }

    public function getUserById($id)
    {

        try {
            $query = "SELECT name, email from $this->table WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            if ($stmt->rowCount()) {
                return $stmt->fetch(PDO::FETCH_ASSOC);
            } else {
                return false;
            }
        } catch (PDOException $ex) {
            echo json_encode(array(
                "message" => $ex->getMessage(),
            ));
        }
    }

    public function read()
    {
        try {
            $query = "SELECT id, name, email  FROM " . $this->table;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        } catch (PDOException $ex) {
            echo json_encode(array(
                "message" => $ex->getMessage(),
            ));
        }
    }

    public function insert($userData = array())
    {
        try {
            $query = "INSERT INTO $this->table (name,email,password) VALUES (:name,:email,:password)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':name', $userData['name'], PDO::PARAM_STR);
            $stmt->bindValue(':email', $userData['email'], PDO::PARAM_STR);
            $stmt->bindValue(':password', password_hash($userData['password'], PASSWORD_DEFAULT), PDO::PARAM_STR);
            return $stmt->execute();
        } catch (PDOException $ex) {
            echo json_encode(array(
                "message" => $ex->getMessage(),
            ));
        }
    }

    public function emailAlreadyInUse($userEmail)
    {
        try {
            $query = "SELECT * FROM $this->table WHERE email = :email";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':email', $userEmail, PDO::PARAM_STR);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $res;
        } catch (PDOException $ex) {
            echo json_encode(array(
                "message" => $ex->getMessage(),
            ));
        }
    }
}
