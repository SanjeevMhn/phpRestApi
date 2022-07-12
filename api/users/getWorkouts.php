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
$user = new User($db,$headers);

$validateUser = $user->isValid();

if($validateUser['success'] == 1){
    $userId = $user->getUserByEmail($validateUser['user']['email']);
    echo json_encode($user->getWorkouts($userId['id']));
}else{
    echo json_encode(array(
        "success" => 0,
        "message" => "User does not exist"
    ));
}

