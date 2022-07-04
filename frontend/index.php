<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {

    case '':
    case '/':
    case '/home':
        require_once __DIR__.'/pages/homepage.php';
    break;
    case '/register':
        require_once __DIR__.'/pages/register.php';
    break;
    case '/login':
        require_once __DIR__.'/pages/login.php';
    break;
    default:
        http_response_code(404);
        echo "page does not exit";
}


