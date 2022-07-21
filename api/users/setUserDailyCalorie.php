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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array(
        "success" => 0,
        "message" => "Page not found"
    ));
} else if ($validateUser['success'] == 1) {
    if (
        !isset($data['user_daily_calorie'])
        || empty($data['user_daily_calorie'])
    ) {
        echo json_encode(array(
            "success" => 0,
            "message" => "Please enter users daily calories"
        ));
    } else {
        $userDailyCalorie = $data['user_daily_calorie'];
        $userId = $user->getUserByEmail($validateUser['user']['email']);
        echo json_encode($user->setUserDailyCalorie($userId['id'],$userDailyCalorie));
    }
} else {
    echo json_encode(array(
        "success" => 0,
        "message" => "Invalid User"
    ));
}
