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

    public function setUserDailyCalorie($userId,$userDailyCalorie){

        try{

            $query = "UPDATE users_goal SET user_daily_calorie = :calorie WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":calorie",$userDailyCalorie,PDO::PARAM_INT);
            $stmt->bindValue(":id",$userId,PDO::PARAM_INT);

            if($stmt->execute()){
                return array(
                    "success" => 1,
                    "message" => "Successfully updated users daily calorie intake"
                );
            }else{
                return array(
                    "success" => 0,
                    "message" => "Error while updating table"
                );
            }

        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function getUserPhysicalInfo($userId){

        try{

            $query = "SELECT id,user_gender,user_age,user_goal,user_weight,weight_metric,user_level,user_height,user_daily_calorie FROM users_goal WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$userId,PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount()){
                return array(
                    "success" => 1,
                    "data" => $stmt->fetch(PDO::FETCH_ASSOC)
                );
            }else{
                return array(
                    "success" => 0,
                    "message" => "No data available"
                );
            }

        }catch(PDOException $ex){
           echo json_encode(array(
            "success" => 0,
            "message" => $ex->getMessage()
           ));
        }
    }

    public function getDailyCalorie($userId){

        try{
            $query = "SELECT user_daily_calorie from users_goal where id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$userId);
            $stmt->execute();
            if($stmt->rowCount()){
                return array( 
                    "success" => 1,
                    "data" => $stmt->fetch(PDO::FETCH_ASSOC));
            }else{
                return array(
                    "success" => 0,
                    "message" => "Error while retrieving data"
                );
            }
        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function deleteWorkout($workoutId){
        try{

            $query = "DELETE FROM user_workouts WHERE workout_id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$workoutId);
            if($stmt->execute()){
                return json_encode(array(
                    "success" => 1,
                    "message" => "Workout deleted successfully"
                ));
            }else{
                return json_encode(array(
                    "success" => 0,
                    "message" => "Error while deleting workout"
                ));
            }

        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex
            ));
        }
    }

    public function getUserFitnessLevel($userId){
        try{

            $query = "SELECT user_level from users_goal WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$userId,PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount()){
                return array(
                    "success" => 1,
                    "data" => $stmt->fetch(PDO::FETCH_ASSOC));
            }else{
                return array(
                    "success" => 0,
                    "message" => "Fitness level not set"
                );
            }

        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function getRecommendedExercises($recWorkoutId){
        try{

            $query = "SELECT rec_exercise_name, rec_exercise_sets,rec_exercise_reps FROM recommend_exercises WHERE rec_workout_id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$recWorkoutId);
            $stmt->execute();
            if($stmt->rowCount()){
                return array(
                    "success" => 1,
                    "exercises" => $stmt->fetchAll(PDO::FETCH_ASSOC)
                );
            }else{
                return array(
                    "success" => 0,
                    "message" => "No exercises available"
                );
            }

        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function getRecommendedWorkouts($userLevel){

        try{
            //$userLevel = $this->getUserFitnessLevel($userId);
            $query = "SELECT rec_workout_id,rec_workout_level,rec_workout_name,rec_workout_type,rec_workout_duration_hrs,rec_workout_duration_mins,rec_workout_duration_secs FROM recommend_workouts WHERE rec_workout_level = :level";

            $stmt = $this->conn->prepare($query);
            //$stmt->bindValue(":level",$userLevel['user_level']);
            $stmt->bindValue(":level",$userLevel);
            $stmt->execute();
            if($stmt->rowCount()){
                echo json_encode(array(
                    "success" => 1,
                    "workouts" => $stmt->fetchAll(PDO::FETCH_ASSOC)
                ));
            }else{
                return array(
                    "success" => 0,
                    "message" => "No workouts available for this level"
                );
            }
        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function getExercises($workoutId,$userId){
        try{
            $query = "SELECT * FROM exercises_tbl WHERE workout_id = :workoutId AND user_id = :userId";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":workoutId",$workoutId,PDO::PARAM_INT);
            $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount()){
                $exercises = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return array(
                    "success" => 1,
                    "exercises" => $exercises 
                );
            }else{
                return array(
                    "success" => 0,
                    "message" => "No exercises created"
                );
            }
        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function getWorkouts($userId){
        try{
            $query = "SELECT * FROM user_workouts WHERE user_id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$userId,PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount()){
                $workouts = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return array(
                    "success" => 1,
                    "user" => $workouts
                );
            }else{
                return array(
                    "success" => 0,
                    "message" => "No Workouts created"
                );
            }
        }catch(PDOException $ex){
            echo json_encode(array(
                "success" => 0,
                "message" => $ex->getMessage()
            ));
        }
    }

    public function createWorkout($workoutData,$userId){
        try{
            $query = "INSERT INTO user_workouts (user_id,workout_name,workout_type,workout_duration_hrs,workout_duration_mins,workout_duration_secs) VALUES (:id,:name,:type,:hrs,:mins,:secs)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$userId,PDO::PARAM_INT);
            $stmt->bindValue(":name",$workoutData['name'],PDO::PARAM_STR);
            $stmt->bindValue(":type",$workoutData['type'],PDO::PARAM_STR);
            $stmt->bindValue(":hrs",$workoutData['duration']['hrs'],PDO::PARAM_INT);
            $stmt->bindValue(":mins",$workoutData['duration']['mins'],PDO::PARAM_INT);
            $stmt->bindValue(":secs",$workoutData['duration']['secs'],PDO::PARAM_INT);

            $res = $stmt->execute();
            if($res){
                $lastId = $this->conn->lastInsertId();
                $exeRes = $this->addExercises($workoutData,$lastId,$userId);
                if($exeRes){
                    echo json_encode(array(
                        "success" => 1,
                        "message" => "Workout successfully added"
                    ));
                }else{
                    echo json_encode(array(
                        "success" => 0,
                        "message" => "Error while adding workout"
                    ));
                }
            }else{
                echo json_encode(array(
                    "success" => 0,
                    "message" => "Error while adding the workout"
                ));
            }

        }catch(PDOException $ex){
            echo json_encode(array(
                "message" => $ex->getMessage()
            ));
        }
    }

    public function addExercises($workoutData,$lastId,$userId){
        try{
            $query = "INSERT INTO exercises_tbl (workout_id,user_id,exercise_name,exercise_sets,exercise_reps) VALUES (:id,:userId,:name,:sets,:reps)";
            $stmt = $this->conn->prepare($query);
            $count = 0;
            foreach($workoutData['description'] as $wd){
                $stmt->bindValue(":id",$lastId,PDO::PARAM_INT);
                $stmt->bindValue(":userId",$userId,PDO::PARAM_INT);
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
                "message" => $ex->getMessage()
            ));
        }
    }

    public function userGoalExist($id){
        try{
            $query = "SELECT * FROM users_goal WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$id,PDO::PARAM_INT);
            $stmt->execute();
            $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $res;
        }catch(PDOException $ex){
            echo json_encode(array(
                "message" => $ex->getMessage()
            ));
        }
    }
    public function setUserGoal($id,$age,$gender,$goal,$weight,$weightMetric,$userLevel,$userHeight){
        try{
            $query = "INSERT INTO users_goal (id, user_gender,user_age,user_goal,user_weight,weight_metric,user_level,user_height) VALUES (:id,:gender,:age,:goal,:weight,:weightMetric,:level,:height)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$id,PDO::PARAM_INT);
            $stmt->bindValue(":gender",$gender,PDO::PARAM_STR);
            $stmt->bindValue(":age",$age,PDO::PARAM_INT);
            $stmt->bindValue(":goal",$goal,PDO::PARAM_STR);
            $stmt->bindValue(":weight",$weight,PDO::PARAM_INT);
            $stmt->bindValue(":weightMetric",$weightMetric,PDO::PARAM_STR);
            $stmt->bindValue(":level",$userLevel,PDO::PARAM_STR);
            $stmt->bindValue(":height",$userHeight,PDO::PARAM_INT);
            return $stmt->execute();
        }catch(PDOException $ex){
            echo json_encode(array(
                "message" => $ex->getMessage()
            ));
        }
    }

    public function getUserGoal($id){
        try{
            $query = "SELECT users_goal.id,user_goal FROM $this->table JOIN users_goal ON $this->table.id = :id AND users_goal.id = :id LIMIT 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(":id",$id,PDO::PARAM_INT);
            $stmt->execute();
            if($stmt->rowCount()){
                return array(
                    "success" => 1,
                    "user" => $stmt->fetch(PDO::FETCH_ASSOC
                ));
            }else{
                return array(
                    "success" => 0,
                    "message" => "No goals set"
                );
            }
        }catch(PDOException $ex){
            echo json_encode(array(
                "message" => $ex->getMessage(),
            ));
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
