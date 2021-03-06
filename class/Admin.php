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
            $query = "SELECT users.id,name,email,user_goal,user_weight,weight_metric FROM users JOIN users_goal ON users.id = users_goal.id WHERE user_type=:type";
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

            $query = "INSERT INTO recommend_workouts (rec_workout_level,rec_workout_name,rec_workout_type,rec_workout_duration_hrs,rec_workout_duration_mins,rec_workout_duration_secs) VALUES (:level,:name,:type,:hrs,:mins,:secs)";

            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":level",$workoutData['level'],PDO::PARAM_STR);
            $stmt->bindValue(":name",$workoutData['name'],PDO::PARAM_STR);
            $stmt->bindValue(":type",$workoutData['type'],PDO::PARAM_STR);
            $stmt->bindValue(":hrs",$workoutData['duration']['hrs'],PDO::PARAM_INT);
            $stmt->bindValue(":mins",$workoutData['duration']['mins'],PDO::PARAM_INT);
            $stmt->bindValue(":secs",$workoutData['duration']['secs'],PDO::PARAM_INT);

            $res = $stmt->execute();
            if($res){
                $lastId = $this->conn->lastInsertId();
                $exeRes = $this->addExercises($workoutData,$lastId);

                if($exeRes){
                    echo json_encode(array(
                        "success" => 1,
                        "message" => "Workout successfully added"
                    ));
                }else{
                    echo json_encode(array(
                        "success" => 0,
                        "message" => "Error while adding exercises"
                    ));
                }
            }

        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function addExercises($workoutData,$lastId){

        try{
            $query = "INSERT INTO recommend_exercises (rec_workout_id,rec_exercise_name,rec_exercise_sets,rec_exercise_reps) VALUES (:id,:name,:sets,:reps)";

            $stmt = $this->conn->prepare($query);

            $count = 0;

            foreach($workoutData['description'] as $wd){

                $stmt->bindValue(":id",$lastId,PDO::PARAM_INT);
                $stmt->bindValue(":name",$wd['exercise_name'],PDO::PARAM_STR);
                $stmt->bindValue(":sets",$wd['exercise_sets'],PDO::PARAM_INT);
                $stmt->bindValue(":reps",$wd['exercise_reps'],PDO::PARAM_INT);
                $stmt->execute();
                $count = $count + 1;
            }

            if($count == count($workoutData['description'])){
                return true;
            }else{
                return false;
            }

        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }
}
