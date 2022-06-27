<?php

    include_once '../../class/Items.php';
    include_once '../../config/Database.php';

    $dbase = new Database;
    $db = $dbase->connect();
    $items = new Items($db);

    $res = array();
    $res['data'] = array();

    array_push($res['data'], $items->read());
   
    echo json_encode($res);

