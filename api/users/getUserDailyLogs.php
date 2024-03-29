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


if ($_SERVER['REQUEST_METHOD'] !== "GET") {
    echo json_encode(array(
        "success" => 0,
        "message" => "Page not found"
    ));
} else if ($validateUser['success'] !== 1) {
    echo json_encode(array(
        "success" => 0,
        "message" => "Invalid User"
    ));
} else {
    $userId = $user->getUserByEmail($validateUser['user']['email']);
    echo json_encode($user->getUserDailyLog($userId['id']));
}
