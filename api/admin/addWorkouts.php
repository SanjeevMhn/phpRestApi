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
                       

$mainErrCounter = 0;
$workoutName = '';
$workoutType = '';
$workoutLevel = '';
$workoutDuration = array();
$workoutDesc = array();

if ($_SERVER['REQUEST_METHOD'] !== "POST") {
    echo json_encode(array(
        "success" => 0,
        "message" => "Page does not exist"
    ));
} else {
    if ($validAdmin['success'] == 1) {

        //workout name and type//
        if (
            !isset($data['workout_name'])
            || !isset($data['workout_type'])
            || empty(trim($data['workout_name']))
            || empty(trim($data['workout_type']))
        ) {

            echo json_encode(array(
                "success" => 0,
                "message" => "Please name your workout and describe its type (strength, cardio,sports,hybrid)"
            ));
            $mainErrCounter = $mainErrCounter + 1;
        } else if ($data['workout_type']) {
            $workoutTypes = ["strength", "cardio", "sports", "hybrid"];
            $wtcounter = 0;
            foreach ($workoutTypes as $wt) {
                if (strcmp(trim($data['workout_type']), $wt) == 0) {
                    $wtcounter  = $wtcounter + 1;
                }
            }
            if ($wtcounter == 1) {
                $workoutName = trim($data['workout_name']);
                $workoutType = trim($data['workout_type']);
            } else {
                echo json_encode(array(
                    "success" => 0,
                    "message" => "Invalid workout type (strength,cardio,sports and hybrid)"
                ));
                $mainErrCounter = $mainErrCounter + 1;
            }
        } else {
            echo json_encode(array(
                "success" => 0,
                "message" => "Please name your workout and describe its type (strength, cardio,sports,hybrid)"
            ));
            $mainErrCounter = $mainErrCounter + 1;
        }

        //workout level//
        if(!isset($data['workout_level'])
            || empty(trim($data['workout_level']))
        ){
            echo json_encode(array(
                "success" => 0,
                "message" => "Please select workout level (beginner,intermediate,advance)"
            ));
            $mainErrCounter = $mainErrCounter + 1;
        }else{
       
            $workoutLevelTypes = ["beginner","intermediate","advance"];
            $wlCount = 0;
            foreach($workoutLevelTypes as $wl){
                if(strcmp(trim($data['workout_level']),$wl) == 0){
                    $wlCount = $wlCount + 1;
                }
            }
            if($wlCount == 1){
                $workoutLevel = trim($data['workout_level']);
            }else{
                echo json_encode(array(
                    "success" => 0,
                    "message" => "Invalid level! Please select workout level (beginner,intermediate,advance)"
                ));
            }
        }

        //workout duration//
        if (
            !isset($data['workout_duration']['hrs'])
            && !isset($data['workout_duration']['mins'])
            && !isset($data['workout_duration']['secs'])
            && empty($data['workout_duration']['hrs'])
            && empty($data['workout_duration']['mins'])
            && empty($data['workout_duration']['secs'])
        ) {
            echo json_encode(array(
                "success" => 0,
                "message" => "Please set duration of your workout"
            ));
            $mainErrCounter = $mainErrCounter + 1;
        } else if (isset($data['workout_duration']['hrs']) && !empty($data['workout_duration']['hrs'])) { // if hrs is given//
            if (
                !isset($data['workout_duration']['mins'])
                && !isset($data['workout_duration']['secs'])
                && empty($data['workout_duration']['mins'])
                && empty($data['workout_duration']['secs'])
            ) {
                $workoutDuration = array(
                    "hrs" => $data['workout_duration']['hrs'],
                    "mins" => 0,
                    "secs" => 0
                );
            } else if (
                isset($data['workout_duration']['mins'])
                && !isset($data['workout_duration']['secs'])
                && !empty($data['workout_duration']['mins'])
                && empty($data['workout_duration']['secs'])
            ) {

                $workoutDuration = array(
                    "hrs" => $data['workout_duration']['hrs'],
                    "mins" => $data['workout_duration']['mins'],
                    "secs" => 0
                );
            } else if (
                isset($data['workout_duration']['secs'])
                && !isset($data['workout_duration']['mins'])
                && !empty($data['workout_duration']['secs'])
                && empty($data['workout_duration']['mins'])
            ) {

                $workoutDuration = array(
                    "hrs" => $data['workout_duration']['hrs'],
                    "mins" => 0,
                    "secs" => $data['workout_duration']['secs']
                );
            } else {
                $workoutDuration = array(
                    "hrs" => $data['workout_duration']['hrs'],
                    "mins" => $data['workout_duration']['mins'],
                    "secs" => $data['workout_duration']['secs']
                );
            }
        } else if (isset($data['workout_duration']['mins']) && !empty($data['workout_duration']['mins'])) { // if mins is given//
            if (
                !isset($data['workout_duration']['hrs'])
                && !isset($data['workout_duration']['secs'])
                && empty($data['workout_duration']['hrs'])
                && empty($data['workout_duration']['secs'])
            ) {
                $workoutDuration = array(
                    "hrs" => 0,
                    "mins" => $data['workout_duration']['mins'],
                    "secs" => 0
                );
            } else if (
                isset($data['workout_duration']['hrs'])
                && !isset($data['workout_duration']['secs'])
                && !empty($data['workout_duration']['hrs'])
                && empty($data['workout_duration']['secs'])
            ) {

                $workoutDuration = array(
                    "hrs" => $data['workout_duration']['hrs'],
                    "mins" => $data['workout_duration']['mins'],
                    "secs" => 0
                );
            } else if (
                isset($data['workout_duration']['secs'])
                && !isset($data['workout_duration']['hrs'])
                && !empty($data['workout_duration']['secs'])
                && empty($data['workout_duration']['hrs'])
            ) {

                $workoutDuration = array(
                    "hrs" => 0,
                    "mins" => $data['workout_duration']['mins'],
                    "secs" => $data['workout_duration']['secs']
                );
            } else {
                $workoutDuration = array(
                    "hrs" => $data['workout_duration']['hrs'],
                    "mins" => $data['workout_duration']['mins'],
                    "secs" => $data['workout_duration']['secs']
                );
            }
        } else if (isset($data['workout_duration']['secs']) && !empty($data['workout_duration']['secs'])) { // if secs is given//
            if (
                !isset($data['workout_duration']['hrs'])
                && !isset($data['workout_duration']['mins'])
                && empty($data['workout_duration']['hrs'])
                && empty($data['workout_duration']['mins'])
            ) {
                $workoutDuration = array(
                    "hrs" => 0,
                    "mins" => 0,
                    "secs" => $data['workout_duration']['secs']
                );
            } else if (
                isset($data['workout_duration']['hrs'])
                && !isset($data['workout_duration']['mins'])
                && !empty($data['workout_duration']['hrs'])
                && empty($data['workout_duration']['mins'])
            ) {

                $workoutDuration = array(
                    "hrs" => $data['workout_duration']['hrs'],
                    "mins" => 0,
                    "secs" => $data['workout_duration']['secs']
                );
            } else if (
                isset($data['workout_duration']['mins'])
                && !isset($data['workout_duration']['hrs'])
                && !empty($data['workout_duration']['mins'])
                && empty($data['workout_duration']['hrs'])
            ) {

                $workoutDuration = array(
                    "hrs" => 0,
                    "mins" => $data['workout_duration']['mins'],
                    "secs" => $data['workout_duration']['secs']
                );
            } else {
                $workoutDuration = array(
                    "hrs" => $data['workout_duration']['hrs'],
                    "mins" => $data['workout_duration']['mins'],
                    "secs" => $data['workout_duration']['secs']
                );
            }
        }

        //exercise descriprtion//
        if (
            !isset($data['workout_desc'])
            || count($data['workout_desc']) == 0
        ) {

            echo json_encode(array(
                "success" => 0,
                "message" => "Please enter your exercises for this workout"
            ));
            $mainErrCounter = $mainErrCounter + 1;
        } else {
            //if (isset($data['workout_desc']) || count($data['workout_desc']) > 0) {
            foreach ($data['workout_desc'] as $wd) {
                if (
                    !isset($wd['exercise_name'])
                    || !isset($wd['exercise_sets'])
                    || !isset($wd['exercise_reps'])
                    || empty(trim($wd['exercise_name']))
                    || empty($wd['exercise_sets'])
                    || empty($wd['exercise_reps'])
                ) {
                    $mainErrCounter = $mainErrCounter + 1;
                    if (
                        isset($wd['exercise_name'])
                        && !isset($wd['exercise_sets'])
                        && !isset($wd['exercise_reps'])
                        && !empty(trim($wd['exercise_name']))
                        && empty($wd['exercise_sets'])
                        && empty($wd['exercise_reps'])
                    ) {
                        echo json_encode(array(
                            "success" => 0,
                            "message" => "Please enter exercise sets and reps number"
                        ));
                        $mainErrCounter = $mainErrCounter + 1;
                    } else if (
                        isset($wd['exercise_sets'])
                        && !isset($wd['exercise_name'])
                        && !isset($wd['exercise_reps'])
                        && !empty($wd['exercise_sets'])
                        && empty(trim($wd['exercise_name']))
                        && empty($wd['exercise_reps'])
                    ) {
                        echo json_encode(array(
                            "success" => 0,
                            "message" => "Please enter exercise name and reps number"
                        ));
                        $mainErrCounter = $mainErrCounter + 1;
                    } else if (
                        isset($wd['exercise_reps'])
                        && !isset($wd['exercise_name'])
                        && !isset($wd['exercise_sets'])
                        && !empty($wd['exercise_reps'])
                        && empty(trim($wd['exercise_name']))
                        && empty($wd['exercise_sets'])
                    ) {
                        echo json_encode(array(
                            "success" => 0,
                            "message" => "Please enter exercise name and sets number"
                        ));
                        $mainErrCounter = $mainErrCounter + 1;
                    } else {
                        echo json_encode(array(
                            "success" => 0,
                            "message" => "Please fill the required fields exercise_name,exercise_sets,exercise_reps"
                        ));
                        $mainErrCounter = $mainErrCounter + 1;
                    }
                } else {
                    array_push($workoutDesc, $wd);
                }
            }

            if ($mainErrCounter == 0) {
                $workoutData = array(
                    "name" => $workoutName,
                    "type" => $workoutType,
                    "level" => $workoutLevel,
                    "duration" => $workoutDuration,
                    "description" => $workoutDesc
                );

                $admin->addWorkouts($workoutData);
                //echo json_encode($workoutData);
            }
        }
    } else {
        echo json_encode(array(
            "success" => 0,
            "message" => "User not valid"
        ));
    }
}
