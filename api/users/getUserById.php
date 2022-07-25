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

if ($validUser['success'] == 1) {

    if (
        isset($data['user_id'])
        && !empty($data['user_id'])
    ) {
        echo json_encode($user->getUserById($data['user_id']));
    }else{
        echo json_encode(array(
            "success" => 0,
            "message" => "Please enter user id"
        ));
    }
}else{
    echo json_encode(array(
        "success" => 0,
        "message" => "Invalid User"
    ));
}
