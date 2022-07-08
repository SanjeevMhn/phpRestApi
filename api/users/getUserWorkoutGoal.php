<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");

    include_once "../../config/Database.php";
    include_once "../../class/User.php";

    $dbConn = new Database;
    $db = $dbConn->connect();
    $headers = getallheaders();

    $userWorkoutGoal = new User($db,$headers);
    $auth = $userWorkoutGoal->isValid();

    if($auth['success'] == 1){
        $id = $userWorkoutGoal->getUserByEmail($auth['user']['email']);
        echo json_encode($userWorkoutGoal->getUserGoal($id['id']));
    }else{
        echo json_encode(array(
            "success" => 0,
            "message" => "User doesnot exist"
        ));
    }

