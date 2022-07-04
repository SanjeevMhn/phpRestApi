<?php

    include_once '../../class/User.php';
    include_once '../../config/Database.php';

    $dbase = new Database;
    $db = $dbase->connect();
    $users = new User($db);

    $res = array();
    $res['data'] = array();

    array_push($res['data'], $users->read());
   
    echo json_encode($res);

