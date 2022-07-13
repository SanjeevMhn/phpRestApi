<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "../../config/Database.php";
include_once "../../class/User.php";

$headers = getallheaders();
$dbConn = new Database;
$db = $dbConn->connect();


$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode(array(
        "success" => 0,
        "message" => "Page not found"
    ));
} else if (!isset($data->goal) 
            ||!isset($data->start_weight) 
            ||!isset($data->weight_metric) 
            ||!isset($data->user_level) 
            || empty(trim($data->goal))
            || empty(trim($data->start_weight))
            || empty(trim($data->weight_metric))
            || empty(trim($data->user_level))) {
    echo json_encode(array(
        "success" => 0,
        "message" => "Please fill all the required fields"
    ));
} else {
    $goal = trim($data->goal);
    $userWeight = $data->start_weight;
    $weightMetric = trim($data->weight_metric);
    $userLevel = trim($data->user_level);
    if ($goal) {
        $goalTypes = ["gain", "lose", "maintain"];
        $count = 0;
        foreach ($goalTypes as $gt) {
            if (strcmp($goal, $gt) == 0) {
                $count = $count + 1;
            }
        }
        $validateWeight = gettype($userWeight);
        if ($count == 1){
            $weightDataTypes = ["double","integer"];
            $wcount = 0;
            foreach($weightDataTypes as $wd){
                if(strcmp($validateWeight, $wd) == 0){
                    $wcount = $wcount + 1;
                }
            }
            if($wcount == 1){
                $metricTypes = ["kg","lbs"];
                $mcount = 0;
                foreach($metricTypes as $mt){
                    if(strcmp($weightMetric,$mt) == 0){
                        $mcount = $mcount + 1;
                    }
                }
                if($mcount == 1){
                    $levelTypes = ["beginner","intermediate","advance"];
                    $levelCount = 0;
                    foreach($levelTypes as $lt){
                        if(strcmp($userLevel,$lt) == 0){
                            $levelCount = $levelCount + 1;
                        }
                    }
                    if($levelCount == 1){

                        $setUserWorkoutGoal = new User($db, $headers);
                        $auth = $setUserWorkoutGoal->isValid();
                        if ($auth['success'] == 1) {
                            $id = $setUserWorkoutGoal->getUserByEmail($auth['user']['email']);
                            $exists = $setUserWorkoutGoal->userGoalExist($id['id']);
                            if (count($exists) > 0) {
                                echo json_encode(array(
                                    "success" => 0,
                                    "message" => "goal already set for user"
                                ));
                            } else {
                                $res = $setUserWorkoutGoal->setUserGoal($id['id'], $goal,$userWeight,$weightMetric,$userLevel);
                                if ($res) {
                                    echo json_encode(array(
                                        "success" => 1,
                                        "message" => "Workout goal set"
                                    ));
                                }
                            }
                        } else {
                            echo json_encode(array(
                                "success" => 0,
                                "message" => "User doesnot exist"
                            ));
                        }
                    }else{
                        echo json_encode(array(
                            "success" => 0,
                            "message" => "Invalid level (beginner,intermediate,advance)"
                        ));
                    }
                }else{
                    echo json_encode(array(
                        "success" => 0,
                        "message" => "Invalid Weight Metric"
                    ));
                }
            }else{
                echo json_encode(array(
                    "success" => 0,
                    "message" => "Invalid Weight"
                ));
            }
        } else {
            echo json_encode(array(
                "success" => 0,
                "message" => "Invalid goal"
            ));
        }
    }
}
