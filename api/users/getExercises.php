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
$user = new User($db, $headers);
$validateUser = $user->isValid();

$data = json_decode(file_get_contents("php://input"), true);

if($_SERVER['REQUEST_METHOD'] !== "POST"){
    echo json_encode(array(
        "success" => 0,
        "message" => "Page does not exist"
    ));
}else if ($validateUser['success'] == 1) {
    if (!isset($data['workout_id']) || empty($data['workout_id'])) {
        echo json_encode(array(
            "success" => 0,
            "message" => "Please provide workout id"
        ));
    } else {
        $workoutId = $data['workout_id'];
        $userId = $user->getUserByEmail($validateUser['user']['email']);

        echo json_encode($user->getExercises($workoutId,$userId['id']));
    }
}else{
    echo json_encode(array(
        "success" => 0,
        "message" => "User does not exist"
    ));
}
