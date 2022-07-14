<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "../../config/Database.php";
include_once "../../class/User.php";

$dbConn = new Database;
$db = $dbConn->connect();
$headers = getallheaders();

$user = new User($db, $headers);
$validUser = $user->isValid();

$data = json_decode(file_get_contents("php://input"),true);

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo json_encode(array(
        "success" => 0,
        "message" => "Page not found"
    ));
}

if ($validUser['success'] == 1) {
    if (!isset($data['rec_workout_id'])
        || empty($data['rec_workout_id'])
        ) {
            echo json_encode(array(
                "success" => 0,
                "message" => "Please provide workout id"
            ));
    }else{
        $recWorkoutId = $data['rec_workout_id'];
        echo json_encode($user->getRecommendedExercises($recWorkoutId));
    }
} else {
    echo json_encode(array(
        "success" => 0,
        "message" => "User doesnot exist"
    ));
}
