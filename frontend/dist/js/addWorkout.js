$(document).ready(function () {

    let token = JSON.parse(localStorage.getItem("jwt"));
    //on reset button pressed on add workout modal//
    $('.add-workout-modal .form-data button[type="reset"]').click(
        function () {
            $(".add-workout-modal").removeClass("dsp-flex");
            $(".err-msg").removeClass("dsp-block");
            $('input[name="workout-name"]').removeClass("err-field");
            $('.err-wr-duration').removeClass("dsp-block");
            $('input[name="hrs"]').removeClass("err-field");
            $('input[name="mins"]').removeClass("err-field");
            $('input[name="secs"]').removeClass("err-field");
            $('.err-wr-desc').removeClass('dsp-block');
            $('input[name="exercise-name"]').removeClass('err-field');
            $('input[name="exercise-sets"]').removeClass('err-field');
            $('input[name="exercise-reps"]').removeClass('err-field');
            $("body").removeClass('overlay');
        }
    );

    //submit add workout form//

    $(".add-workout-modal").submit(function (e) {
        e.preventDefault();
        let workoutName = $('input[name="workout-name"]').val();
        let workoutType = $('select[name="workout-type"] option:selected').val();
        let workoutDuHrs = $('input[name="hrs"]').val();
        let workoutDuMin = $('input[name="mins"]').val();
        let workoutDuSec = $('input[name="secs"]').val();
        let workoutDesc = $('.exercise-block');
        let exerciseCollection = [];
        let workoutDurationCollection = [];
        let exerciseName;
        let exerciseSets;
        let exerciseReps;
        let arrWorkoutDesc = workoutDesc.toArray();
        let errCount = 0;
        if (workoutName == "") {
            $(".err-wr-name").addClass("dsp-block");
            $('input[name="workout-name"]').addClass("err-field");
            errCount++;
        } else {
            $(".err-msg").removeClass("dsp-block");
            $('input[name="workout-name"]').removeClass("err-field");
        }

        if (workoutDuHrs == '' && workoutDuMin == '' && workoutDuSec == '') {
            $('.err-wr-duration').addClass("dsp-block");
            $('input[name="hrs"]').addClass("err-field");
            $('input[name="mins"]').addClass("err-field");
            $('input[name="secs"]').addClass("err-field");
            errCount++;
        } else {
            $('.err-wr-duration').removeClass("dsp-block");
            $('input[name="hrs"]').removeClass("err-field");
            $('input[name="mins"]').removeClass("err-field");
            $('input[name="secs"]').removeClass("err-field");

            // workoutDurationCollection.hrs = workoutDuHrs;
            // workoutDurationCollection.mins = workoutDuMin;
            // workoutDurationCollection.secs = workoutDuSec;

            workoutDurationCollection = {
                "hrs": parseInt(workoutDuHrs),
                "mins": parseInt(workoutDuMin),
                "secs": parseInt(workoutDuSec),
            };
        }

        // arrWorkoutDesc.map((wd,index)=>{
        //   let arrWd = Array.from(wd);
        // })

        //mapping workout blocks//
        $.map(arrWorkoutDesc, (aw, index) => {
            let block = $(aw).children();
            /*getting values of the input fields in each blocks;
              each block[0] will contain exercise name,
              block[1] will contain exercise set number,
              block[2] will contain exercise rep number
            */
            exerciseName = $(block[0]).children().val();
            exerciseSets = $(block[1]).children().val();
            exerciseReps = $(block[2]).children().val();

            if (exerciseName == '' && exerciseSets == '' && exerciseReps == '') {
                errCount++;
                $('.err-wr-desc').addClass('dsp-block');
                $('input[name="exercise-name"]').addClass('err-field');
                $('input[name="exercise-sets"]').addClass('err-field');
                $('input[name="exercise-reps"]').addClass('err-field');
            } else {
                $('.err-wr-desc').removeClass('dsp-block');
                $('input[name="exercise-name"]').removeClass('err-field');
                $('input[name="exercise-sets"]').removeClass('err-field');
                $('input[name="exercise-reps"]').removeClass('err-field');

                exerciseCollection.push({
                    "exercise_name": exerciseName,
                    "exercise_sets": parseInt(exerciseSets),
                    "exercise_reps": parseInt(exerciseReps)
                });
            }
        })

        if (errCount === 0) {
            let data = JSON.stringify({
                "workout_name": workoutName,
                "workout_type": workoutType,
                "workout_duration": workoutDurationCollection,
                "workout_desc": exerciseCollection
            });
            let res = addWorkout(data);
            $(".add-workout-modal").removeClass("dsp-flex");
            $("body").removeClass('overlay');
        }

    });

    function addWorkout(data) {
        let createWorkoutRequest = {
            "url": "/api/users/createWorkout.php",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${token.token}`,
                "Content-Type": "application/json"
            },
            "data": data,
        };

        $.ajax(createWorkoutRequest).done(function (response) {
            console.log(response);
            if (response.success == 1) {
                return true;
            } else {
                return false;
            }
        });
    }

    //add or delete exercise//
    $(".add-exercise").click(function () {
        let workoutDescContainer = $('.workout-desc-container');
        let exerciseContainer = $('.exercise-container');
        let exerciseBlock = $('<div class="exercise-block"></div>');
        let nameblock = $('<div class="block"></div>');
        let setsblock = $('<div class="block"></div>');
        let repsblock = $('<div class="block"></div>');
        let nameField = $('<input type="text" class="form-inp" placeholder="Exercise Name">');
        let setsField = $('<input type="number" class="form-inp" placeholder="No of sets">');
        let repsField = $('<input type="number" class="form-inp" placeholder="No of reps">');
        let delBlock = $('<button class="del-exer-block" type="button"></button>');

        nameblock.append(nameField);
        setsblock.append(setsField);
        repsblock.append(repsField);

        exerciseBlock.append(nameblock);
        exerciseBlock.append(setsblock);
        exerciseBlock.append(repsblock);
        exerciseBlock.append(delBlock);

        exerciseContainer.append(exerciseBlock);

    })

    //delete exercise block in add workout modal//
    $(document).on('click', '.del-exer-block', function () {
        $(this).parent().remove();
    })

    //get exercises//

    $('.get-exercise').click(function(){
        $('.get-exercises-list').addClass('dsp-flex');
        let exerciseType = $('select[name="workout-type"] option:selected').val();
        let userDetail = JSON.parse(localStorage.getItem("profile_detail"));
        let userLevel = userDetail.user_level;
        let getExercises = {
            "url": `https://api.api-ninjas.com/v1/exercises?difficulty=${userLevel}&type=${exerciseType}`,
            "method": "GET",
            "timeout": 0,
            "headers":{
                "x-api-key": "SrSAaegWn7kpQszNO6D3sQ==nhwKmMMZzXZ7eaKJ"
            }
        } 

        $.ajax(getExercises).done(function(response){
            console.log(response);
            $.map(response,function(resp,index){

                let listItem = $('<div class="exercise-item list-item"></div>');
                let container = $('<div class="inner-container"></div>');
                let exerciseName = $('<h2 class="header-text"></h2>');

                listItem.data('exercise-name',resp.name);
                listItem.data('exercise-type',resp.type);
                listItem.data('exercise-muscle',resp.muscle);
                listItem.data('exercise-equipment',resp.equipment);
                listItem.data('exercise-difficulty',resp.difficulty);
                listItem.data('exercise-instructions',resp.instructions);

                exerciseName.text(resp.name);
                container.append(exerciseName);
                listItem.append(container);
                $('.get-exercises-list').append(listItem);
            })
        })
    })

})