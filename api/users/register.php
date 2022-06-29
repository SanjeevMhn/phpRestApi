<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once "../../class/Items.php";
    include_once "../../config/Database.php";

    $db_conn = new Database;
    $db = $db_conn->connect();

    $items = new Items($db);

    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] != 'POST'){
        echo json_encode(array("message" => "Page not found"));
    }else if(!isset($data->name) 
            || !isset($data->email) 
            || !isset($data->password)
            || empty(trim($data->name))
            || empty(trim($data->email))
            || empty(trim($data->password))){
                echo json_encode(array("message" => "Please fill all the required fields"));
    }else{
        $name = trim($data->name);
        $email = trim($data->email);
        $password = trim($data->password);

        if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
            echo json_encode(array("message" => "Invalid Email"));
        }else if(strlen($password )< 6){
            echo json_encode(array("message" => "Password must be atleast 6 characters long"));
        }else if(strlen($name) < 3){
            echo json_encode(array("message" => "Name must be atleast 3 characters long"));
        }else{
            $res = $items->emailAlreadyInUse($email);
            if(count($res) > 0){
                echo json_encode(array("message" => "Email already in use"));
            }else{
                $userData = array(
                    "name" => $name,
                    "email" => $email,
                    "password" => $password
                );
                $result = $items->insert($userData);
                if($result){
                    echo json_encode(
                        array("message" => "User successfully registered")
                    );
                }
            }
        }
    }
