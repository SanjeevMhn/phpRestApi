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
    $fileName = $_FILES['sentimage']['name'];
    $tempPath = $_FILES['sentimage']['tmp_name'];
    $fileSize = $_FILES['sentimage']['size'];

    if (empty($fileName)) {
        $errMsg = json_encode(array(
            "success" => 0,
            "message" => "Please select image"
        ));
        echo $errMsg;
    } else {

        $newFileName = $userId['id'] . "_" . $fileName;
        // $upload_path = 'E:/sanjeev/php/simpleRest/storage/public/userAvatars/';
        $upload_path = '/home/sanjeev/Desktop/sanjeev/php/phpRestApi/storage/public/userAvatars/';
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $valid_extensions = array('jpeg', 'jpg', 'png', 'gif');

        if (in_array($fileExt, $valid_extensions)) {
            if (!file_exists($upload_path . $newFileName)) {

                if ($fileSize < 5000000) {
                    move_uploaded_file($tempPath, $upload_path . $newFileName);
                } else {
                    $errMsg = json_encode(array(
                        "success" => 0,
                        "message" => "Sorry, your file is too large"
                    ));
                    echo $errMsg;
                }
            } else {
                $errMsg = json_encode(array(
                    "success" => 0,
                    "message" => "Sorry, file already exists"
                ));
                echo $errMsg;
            }
        } else {
            $errMsg = json_encode(array(
                "success" => 0,
                "message" => "Sorry, only JPG, JPEG, PNG and GIf files are allowed"
            ));
        }
    }


    if (!isset($errMsg)) {
        return json_encode($user->setUserProfilePic($userId['id'], $newFileName),);
    }
}
