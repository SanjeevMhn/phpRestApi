<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../../class/User.php";
include_once "../../config/Database.php";
include_once "../../auth/JwtHandler.php";

$db_conn = new Database;
$db = $db_conn->connect();

$users = new User($db);

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    echo json_encode(array(
        "success" => 0,
        "message" => "Page not found"
    ));
} else if (
    !isset($data->name)
    || !isset($data->email)
    || !isset($data->password)
    || !isset($data->goal)
    || empty(trim($data->name))
    || empty(trim($data->email))
    || empty(trim($data->password))
    || empty(trim($data->goal))
) {
    echo json_encode(
        array(
            "success" => 0,
            "message" => "Please fill all the required fields"
        )
    );
} else {
    $name = trim($data->name);
    $email = trim($data->email);
    $password = trim($data->password);
    $goal = trim($data->goal);

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array(
            "success" => 0,
            "message" => "Invalid Email"
        ));
    } else if (strlen($password) < 6) {
        echo json_encode(array(
            "success" => 0,
            "message" => "Password must be atleast 6 characters long"
        ));
    } else if (strlen($name) < 3) {
        echo json_encode(array(
            "success" => 0,
            "message" => "Name must be atleast 3 characters long"
        ));
    } else {
        $res = $users->emailAlreadyInUse($email);
        if (count($res) > 0) {
            echo json_encode(array(
                "success" => 0,
                "message" => "Email already in use"
            ));
        } else {

            $goals = ["loss", "gain", "maintain"];
            $count = 0;
            foreach ($goals as $go) {
                if (strcmp($goal, $go) == 0) {
                    $count = $count+1;
                }
            }
            if ($count == 0) {
                echo json_encode(array(
                    "success" => 0,
                    "message" => "Invalid Goal"
                ));
            } else {

                $userData = array(
                    "name" => $name,
                    "email" => $email,
                    "password" => $password,
                    "goal" => $goal
                );
                $result = $users->insert($userData);
                if ($result) {
                    
                    echo json_encode(
                        array(
                            "success" => 1,
                            "message" => "User successfully registered",
                        
                        )
                    );
                }
            }
        }
    }
}
