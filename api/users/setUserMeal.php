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
    $userId = $user->getUserByEmail($validUser['user']['email']);
    if (
        !isset($data['meal_name'])
        || empty(trim($data['meal_name']))
        || !isset($data['meal_calories'])
        || empty($data['meal_calories'])
        || !isset($data['meal_type'])
        || empty(trim($data['meal_type']))
    ) {
        echo json_encode(array(
            "success" => 0,
            "message" => "Please enter all the required fields"
        ));
    } else {
        $mealName = trim($data['meal_name']);
        $mealCalories = $data['meal_calories'];
        $mealType = $data['meal_type'];
        $mealIngredients = isset($data['meal_ingredients']) ? trim($data['meal_ingredients']) : null;
        $mealInstructions = isset($data['meal_instructions']) ? trim($data['meal_instructions']) : null;
        $mealImg = isset($data['meal_img']) ? trim($data['meal_img']) : null;

        $mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];
        if (in_array($mealType, $mealTypes, true)) {
            $dataArray = array(
                "meal_name" => $mealName,
                "meal_calories" => $mealCalories,
                "meal_type" => $mealType,
                "meal_ingredients" => $mealIngredients,
                "meal_instructions" => $mealInstructions,
                "meal_img" => $mealImg
            );

            $res = $user->checkDuplicateMeal($userId['id'], $dataArray);
            if (count($res) == 0) {
                echo json_encode($user->setUserMeal($userId['id'], $dataArray));
            }
        } else {
            echo json_encode(array(
                "success" => 0,
                "message" => "Meal types can only be breakfast,lunch,dinner and snack"
            ));
        }
    }
}
