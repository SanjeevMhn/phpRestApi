<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {

    case '':
    case '/':
    case '/home':
        require_once __DIR__ . '/pages/homepage.php';
        break;
    case '/dashboard':
        require_once __DIR__ . '/pages/dashboard.php';
        break;
    case '/adminDashboard':
        require_once __DIR__ . '/pages/adminDashboard.php';
        break;
    case '/users':
        require_once __DIR__ .'/pages/users.php';
        break;
    case '/workouts':
        require_once __DIR__ . '/pages/workouts.php';
        break;
    case '/register':
        require_once __DIR__ . '/pages/register.php';
        break;
    case '/login':
        require_once __DIR__ . '/pages/login.php';
        break;
    case '/profile':
        require_once __DIR__ . '/pages/userProfile.php';
        break;
    case '/meals':
        require_once __DIR__ . '/pages/meals.php';
        break;
    default:
        http_response_code(404);
        echo "page does not exit";
}
