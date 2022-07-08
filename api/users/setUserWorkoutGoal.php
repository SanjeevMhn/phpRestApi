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
} else if (!isset($data->goal) || empty(trim($data->goal))) {
    echo json_encode(array(
        "success" => 0,
        "message" => "Please fill all the required fields"
    ));
} else {
    $goal = trim($data->goal);
    if ($goal) {
        $goalTypes = ["gain", "lose", "maintain"];
        $count = 0;
        foreach ($goalTypes as $gt) {
            if (strcmp($goal, $gt) == 0) {
                $count = $count + 1;
            }
        }
        if ($count == 1) {
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
                    $res = $setUserWorkoutGoal->setUserGoal($id['id'], $goal);
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
        } else {
            echo json_encode(array(
                "success" => 0,
                "message" => "Invalid goal"
            ));
        }
    }
}
