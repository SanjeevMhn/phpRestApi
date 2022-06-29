<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: POST");
    header("Content-Type: application/json; charset=UTF-8");

    include_once "../../config/Database.php";
    include_once "../../class/Items.php";

    $allHeaders = getallheaders();
    $db_conn = new Database;
    $db = $db_conn->connect();
    $item = new Items($db,$allHeaders);

    echo json_encode($item->isValid());