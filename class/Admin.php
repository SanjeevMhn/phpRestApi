<?php

include_once '../../auth/JwtHandler.php';

class Admin extends JwtHandler
{

    private $conn;
    private $table = 'users';

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

    public function getUsers()
    {
        try {
            $query = "SELECT name,email,user_goal,user_weight,weight_metric FROM users JOIN users_goal ON users.id = users_goal.id WHERE user_type=:type";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':type', 'user', PDO::PARAM_STR);
            $stmt->execute();
            if ($stmt->rowCount()) {
                $usersCount = $stmt->rowCount();
                return array(
                    "success" => 1,
                    "user_count" => $usersCount,
                    "users" => $stmt->fetchAll(PDO::FETCH_ASSOC)
                );
            } else {
                return array(
                    "success" => 0,
                    "user_count" => 0,
                    "message" => "No user data available"
                );
            }
        } catch (PDOException $ex) {
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function addWorkouts($workoutData){
        try{


        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }
}
