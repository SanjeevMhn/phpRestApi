<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "../../config/Database.php";
include_once "../../class/User.php";


$headers = getallheaders();
$db_conn = new Database;
$db = $db_conn->connect();
$user = new User($db, $headers);

$data = json_decode(file_get_contents("php://input"), true);
$validUser = $user->isValid();

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    echo json_encode(array(
        "success" => 0,
        "message" => "Page not found"
    ));
}

if($validUser['success'] !== 1){
    echo json_encode(array(
        "success" => 0,
        "message" => "Not a valid user"
    ));
}

if(!isset($data['workout_id']) || empty($data['workout_id'])){
    echo json_encode(array(
        "success" => 0,
        "message" => "Please provide workout id"
    ));
}else{
    echo $user->deleteWorkout($data['workout_id']);
}

