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
}else if($validUser['success'] !== 1){
    echo json_encode(array(
        "success" => 0,
        "message" => "Not a valid user"
    ));
}else if(!isset($data['meal_id']) || empty($data['meal_id'])){
    echo json_encode(array(
        "success" => 0,
        "message" => "Please provide meal id"
    ));
}else{
    $userId = $user->getUserByEmail($validUser['user']['email']);
    echo json_encode($user->deleteUserMeal($userId['id'],$data['meal_id']));
}