<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");

    include_once '../../config/Database.php';
    include_once '../../auth/JwtHandler.php';
    include_once '../../class/Items.php';

    $db_conn = new Database;
    $db = $db_conn->connect();

    $items = new Items($db);

    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER["REQUEST_METHOD"] != "POST"){
        echo json_encode(array(
            "message" => "Page not found",
        ));
    }else if(!isset($data->email)
            || !isset($data->password)
            || empty(trim($data->email))
            || empty(trim($data->password))){
        echo json_encode(array(
            "message" => "Please fill all the required fields",
        ));
    }else{
        $email = trim($data->email);
        $password = trim($data->password);

        if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
            echo json_encode(array(
                "message" => "Please enter a valid email"
            ));
        }else if(strlen($password) < 6){
            echo json_encode(array(
                "message" => "Password must be atleast 6 characters long"
            ));
        }else{
            $getUserByEmail = $items->getUserByEmail($email);
            if($getUserByEmail){
                $checkPassword = password_verify($password,$getUserByEmail['password']);
                if($checkPassword){
                    $jwt = new JwtHandler;
                    $token = $jwt->jwtEncodeData('http://127.0.0.1:5500/',array("user_id" => $getUserByEmail['id']));

                    echo json_encode(array(
                        "success" => 1,
                        "message" => 'You have successfully logged in',
                        "token" => $token
                    ));
                }else{
                    echo json_encode(array(
                        "message" => "Invalid Password",
                    ));
                }
            }else{
                echo json_encode(array(
                    "message" => "Invalid Email",
                ));
            }
        }
    }
