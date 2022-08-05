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

$validUser = $user->isValid();

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo json_encode(array(
        "success" => 0,
        "message" => "Page not found"
    ));
} else if ($validUser['success'] !== 1) {
    echo json_encode(array(
        "success" => 0,
        "message" => "Invalid User"
    ));
} else {
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !isset($data['log_date'])
        || empty($data['log_date'])
        || !isset($data['meal_plan_id'])
        || empty($data['meal_plan_id'])
        || !isset($data['workout_id'])
        || empty($data['workout_id'])
    ) {
        echo json_encode(array(
            "success" => 0,
            "message" => "Please fill all the fields"
        ));
    } else {
        $logData = array(
            "log_date" => $data['log_date'],
            "meal_plan_id" => $data['meal_plan_id'],
            "workout_id" => $data['workout_id']
        );

        $userId = $user->getUserByEmail($validUser['user']['email']);
        echo json_encode($user->setUserDailyLog($userId['id'],$logData));
    }
}
