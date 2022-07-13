<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "../../config/Database.php";
include_once "../../class/Admin.php";


$headers = getallheaders();
$db_conn = new Database;
$db = $db_conn->connect();
$admin = new Admin($db, $headers);

$data = json_decode(file_get_contents("php://input"), true);
$validAdmin = $admin->isValid();

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo json_encode(array(
        "success" => 0,
        "message" => "Page does not exist"
    ));
}

if ($validAdmin['success'] == 1) {
    echo json_encode($admin->getUsers());
} else {
    echo json_encode(array(
        "success" => 0,
        "message" => "Not admin"
    ));
}
