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
    $user = new User($db,$headers);

    $data = json_decode(file_get_contents("php://input"),true);
    $validUser = $user->isValid();

    if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    	echo json_encode(array(
    		"success" => 0,
    		"message" => "Page doesnot exist"
    	));
    }else if($validUser['success'] !== 1){
    	echo json_encode(array(
	    	"success" => 0,
	    	"message" => "Not a valid user"
	    ));
    }else if(!isset($data['workout_name'])
    		|| !isset($data['workout_type'])
    		|| empty(trim($data['workout_name']))
    		|| empty(trim($data['workout_type']))
    	){

		echo json_encode(array(
			"success" => 0,
			"message" => "Please name your workout and describe its type (strength, cardio,sports,hybrid)"
		));	

		
    }else if(!isset($data['workout_duration']['hrs'])
			&& !isset($data['workout_duration']['mins'])
    		&& !isset($data['workout_duration']['secs'])
    		&& empty(trim($data['workout_duration']['hrs']))
    		&& empty(trim($data['workout_duration']['mins']))
    		&& empty(trim($data['workout_duration']['secs']))
    	){

		echo json_encode(array(
			"success" => 0,
			"message" => "Please give duration of your workout"
		));	
	}
  //   }else if(!isset($data['workout_desc']['exercise_name'])
		// 	&& !isset($data['workout_desc']['exercise_sets'])
		// 	&& !isset($data['workout_desc']['exercise_reps'])
		// 	&& empty(trim($data['workout_desc']['exercise_name']))
		// 	&& empty(trim($data['workout_desc']['exercise_sets']))
		// 	&& empty(trim($data['workout_desc']['exercise_reps']))
		// ){
  //   	echo json_encode(array(
  //   		"success" => 0,
  //   		"message" => "Please give your exercise name, sets and reps information"
  //   	));
	else if(!isset($data['workout_desc'])
			|| count($data['workout_desc']) == 0
	){

		echo json_encode(array(
			"success" => 0,
			"message" => "Please enter your exercises for this workout"
		));
    }
  //   else if(count($data['workout_desc']) > 0){
		// foreach($data['workout_desc'] as $wd){
  //   		if(!isset($wd['exercise_name'])
  //   			|| !isset($wd['exercise_sets'])
  //   			|| !isset($wd['exercise_reps'])
  //   			|| empty(trim($wd['exercise_name']))
  //   			|| empty(trim($wd['exercise_sets']))
  //   			|| empty(trim($wd['exercise_reps']))
	 //    	){
	 //    		echo json_encode(array(
	 //    			"success" => 0,
	 //    			"message" => "Please fill the required fields exercise_name.exercise_sets,exercise_reps"
	 //    		));
	 //    	}else{
	 //    		array_push($workoutDesc,$wd);
	 //    	}
	 //    }
  //   }
    else{
		$workoutDesc = [];
    	if(isset($data['workout_desc']) || count($data['workout_desc'])>0){
	    	foreach($data['workout_desc'] as $wd){
	    		if(!isset($wd['exercise_name'])
	    			&& !isset($wd['exercise_sets'])
	    			&& !isset($wd['exercise_reps'])
	    			&& empty(trim($wd['exercise_name']))
	    			&& empty(trim($wd['exercise_sets']))
	    			&& empty(trim($wd['exercise_reps']))
		    	){
		    		echo json_encode(array(
		    			"success" => 0,
		    			"message" => "Please fill the required fields exercise_name,exercise_sets,exercise_reps"
		    		));
		    	}else{
		    		array_push($workoutDesc,$wd);
		    	}
		    }
	    	$workoutName = trim($data['workout_name']);
	    	$workoutType = trim($data['workout_type']);
	    	$workoutDuration = array(
	    		"hrs" => $data['workout_duration']['hrs'],
	    		"mins" => $data['workout_duration']['mins'],
	    		"secs" => $data['workout_duration']['secs']
	    	);
	    	foreach($data['workout_desc'] as $wd){
		    }
	    	echo json_encode(array(
	    		"name" => $workoutName,
	    		"type" => $workoutType,
	    		"duration" => array(
	    			"hrs" => $workoutDuration['hrs'],
	    			"mins" => $workoutDuration['mins'],
	    			"secs" => $workoutDuration['secs']
	    		),
	    		"description" => $workoutDesc
	    	));
	    }
    }


