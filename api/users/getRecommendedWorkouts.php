<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include_once "../../config/Database.php";
include_once "../../class/User.php";

$headers = getallheaders();
$dbConn = new Database;
$db = $dbConn->connect();
$user = new User($db, $headers);
$validateUser = $user->isValid();

//$data = json_decode(file_get_contents("php://input"),true);

if($_SERVER['REQUEST_METHOD'] !== "POST"){
	echo json_encode(array(
		"success" => 0,
		"message" => "Page does not exist"
	));
}else{
	if($validateUser['success'] == 1){

		// if(!isset($data['user_level'])
		// 	|| empty(trim($data['user_level']))
		// ){
		// 	echo json_encode(array(
		// 		"success" => 0,
		// 		"message" => "User fitness level not provided"
		// 	));
		// }else{
		// 	if(trim($data['user_level'])){
		// 		$userLevelTypes = ["beginner","intermediate","advance"];
		// 		$ulCount = 0;

		// 		foreach($userLevelTypes as $ul){
		// 			if(strcmp(trim($data['user_level']),$ul) == 0){
		// 				$ulCount = $ulCount + 1;	
		// 			}
		// 		}

		// 		if($ulCount == 1){

                    $userId = $user->getUserByEmail($validateUser['user']['email']);
                    $userFitLevel = $user->getUserFitnessLevel($userId['id']);
					$user->getRecommendedWorkouts($userFitLevel['user_level']);
				// }else{
				// 	echo json_encode(array(
				// 		"success" => 0,
				// 		"message" => "Invalid user level (beginner,intermediate,advance)"
				// 	));
				// }
		// 	}
		// }
	}
}
