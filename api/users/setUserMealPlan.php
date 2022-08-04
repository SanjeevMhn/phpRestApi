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
    $mainErrCount = 0;
    if (
        !isset($data['meal_plan_name'])
        || empty(trim($data['meal_plan_name']))
        || !isset($data['meal_plan_calories'])
        || empty($data['meal_plan_calories'])
        || !isset($data['meal_plan_meals'])
        || !count($data['meal_plan_meals'])
    ) {
        echo json_encode(array(
            "success" => 0,
            "message" => "Please enter all the required fields"
        ));
        $mainErrCount = $mainErrCount + 1;
    } else {
        $mealPlanName = trim($data['meal_plan_name']);
        $mealPlanCalories = $data['meal_plan_calories'];
        $mealPlanMeals = array();
        foreach ($data['meal_plan_meals'] as $meals) {
            if (
                !isset($meals['meal_name'])
                || empty($meals['meal_name'])
                || !isset($meals['meal_calories'])
                || empty($meals['meal_calories'])
                || !isset($meals['meal_type'])
                || empty($meals['meal_type'])
            ) {
                $mainErrCount = $mainErrCount + 1;
                echo json_encode(array(
                    "success" => 0,
                    "message" => "Please enter meal name,calories and type"
                ));
            } else {
                array_push($mealPlanMeals, $meals);
            }
        }
    }
    if ($mainErrCount == 0) {
        $mealPlanData = array(
            "meal_plan_name" => $mealPlanName,
            "meal_plan_calories" => $mealPlanCalories,
            "meal_plan_meals" => $mealPlanMeals,
        );

        $userId = $user->getUserByEmail($validUser['user']['email']);
        $user->setUserMealPlan($userId['id'], $mealPlanData);
    }
}
