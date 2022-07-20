/*
    TODO: use the fitness api to generate the amount of calories needed 
    for an individual to consume to either lose, maintain or gain weight,
    use either "fitness api" from rapid api or figure out a way to web scrape
    the calorie calculator website.
*/
$(document).ready(function () {

    let token = JSON.parse(localStorage.getItem("jwt"));
    if (location.pathname === "/dashboard") {
        let token = JSON.parse(localStorage.getItem("jwt"));
        let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
        sideMenu[0].classList.add('active');

        if (token && token.user_type === "user") {
            let getUserInfo = {
                url: "/api/users/getUser.php",
                method: "POST",
                timeout: 0,
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            };
            //to get user name and email
            $.ajax(getUserInfo).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    $(".user-detail .user-name").html(response.user.name);
                }
            });

            let userGoal = {
                url: "/api/users/getUserWorkoutGoal.php",
                method: "POST",
                timeout: 0,
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            };

            //to get users workout goal
            $.ajax(userGoal).done(function (response) {
                console.log(response);
                if (response.success == 0) {
                    $(".user-goal-form").addClass('dsp-flex');
                    $('body').addClass('overlay');
                    $(".recommended-workouts").css("display", "none");
                } else if (response.success == 1) {
                    $(".recommended-workouts").css("display", "block");
                    recommendedWorkouts();
                }
            });



            //submitting user goal form//
            $(".user-goal-form").submit(function (e) {
                e.preventDefault();
                let userAge = $('input[name="user-age"]').val();
                let userGender = $('input[name="user-gender"]:checked').val();
                let weightInput = $('input[name="user-weight"]').val();
                let weightMetric = $('select[name="weight-metric"] option:selected').val();
                let goalSelect = $('select[name="user-goal"] option:selected').val();
                let levelSelect = $('select[name="workout-level"] option:selected').val();
                let userHeightFeet = $('input[name="height-ft"]').val();
                let userHeightInches = $('input[name="height-inches"]').val();
                let counter = 0;

                if(userAge !== ''){
                    $('input[name="user-age"]').removeClass("err-field");
                    $(".err-age").css('display',"none");
                }else{
                    counter++;
                    $('.err-age').css("display","block");
                    $('input[name="user-age"]').addClass("err-field");
                }

                if(userGender !== ''){
                    $(".err-gender").css('display','none');
                    $('input[name="user-gender"]').removeClass("err-field");
                }else{
                    counter++;
                    $(".err-gender").css("display","block");
                    $('input[name="user-gender"]').addClass("err-field");
                }

                if (goalSelect !== "default") {
                    $('select[name="user-goal"]').removeClass("err-field");
                    $(".err-goal").css("display", "none");
                } else {
                    counter++;
                    $(".err-goal").css("display", "block");
                    $('select[name="user-goal"]').addClass("err-field");
                }
                if (weightInput !== "") {
                    $(".err-weight").css("display", "none");
                    $('input[name="user-weight"]').removeClass("err-field");
                } else {
                    counter++;
                    $(".err-weight").css("display", "block");
                    $('input[name="user-weight"]').addClass("err-field");
                }

                if(userHeightFeet !== ''){
                    $('.err-height').css("display","none");
                    $('input[name="height-ft"]').removeClass("err-field");
                    $('input[name="height-inches"]').removeClass("err-field");
                }else{
                    counter++;
                    $('.err-height').css('display','block');
                    $('input[name="height-ft"]').addClass("err-field");
                    $('input[name="height-inches"]').addClass("err-field");
                }

                if (counter == 0) {
                    $('.user-goal-form').removeClass('dsp-flex');
                    setUserWorkoutGoal(userAge,weightInput,userGender,weightMetric, goalSelect, levelSelect,userHeightFeet,userHeightInches);
                    $('body').removeClass('overlay');
                }
            });

            function setUserWorkoutGoal(userAge,weightInput,userGender, weightMetric, goalSelect, levelSelect,userHeightFeet,userHeightInches) {
                if(userHeightInches == '' || userHeightInches == null){
                    userHeightInches = 0;
                }
                let parsedHeightFeet = parseInt(userHeightFeet);
                let parsedHeightInches = parseInt(userHeightInches);

                let ftToCm = parseInt(((parsedHeightFeet*12)+parsedHeightInches)*2.54);
                let parsedWeight = parseInt(weightInput);
                let setGoal = {
                    "url": "/api/users/setUserWorkoutGoal.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "user_age": parseInt(userAge),
                        "user_gender": userGender,
                        "goal": goalSelect,
                        "start_weight": parsedWeight,
                        "weight_metric": weightMetric,
                        "user_level": levelSelect,
                        "user_height": ftToCm
                    }),
                }

                $.ajax(setGoal).done(function (response) {
                    console.log(response);
                    if (response.success == 1) {
                        $(".user-goal-form").css("display", "none");
                        $(".recommended-workouts").css("display", "block");
                        recommendedWorkouts();
                    }
                });
            }

            //fetch recommeded workouts based on user's selected fitness level//
            function recommendedWorkouts() {
                let getRecommendWorkouts = {
                    "url": "/api/users/getRecommendedWorkouts.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`
                    }
                }

                $.ajax(getRecommendWorkouts).done(function (response) {
                    console.log(response);
                    if (response.success == 1) {
                        let recommendedWorkouts = $('.recommended-workouts-list');
                        $.map(response.workouts, (workout, index) => {
                            let recWorkoutCardContainer = $('<div class="rec-workout-card list-item"></div>');
                            recWorkoutCardContainer.data('recWorkoutId', workout.rec_workout_id);
                            recWorkoutCardContainer.data('recWorkoutType', workout.rec_workout_type);
                            recWorkoutCardContainer.data('recWorkoutDurationHrs', workout.rec_workout_duration_hrs);
                            recWorkoutCardContainer.data('recWorkoutDurationMins', workout.rec_workout_duration_mins);
                            recWorkoutCardContainer.data('recWorkoutDurationSecs', workout.rec_workout_duration_secs);
                            recWorkoutCardContainer.data('recWorkoutName', workout.rec_workout_name);
                            let recWorkoutCard = $('<div class="inner-container"></div>');
                            let recWorkoutName = $('<h2 class="rec-workout-name"></h2>');
                            let recWorkoutDuration = $('<div class="rec-workout-duration"></div>');
                            let recWorkoutDuHrs = $('<span class="hrs"></span>');
                            let recWorkoutDuMins = $('<span class="mins"></span>');
                            let recWorkoutDuSecs = $('<span class="secs"></span>');

                            recWorkoutName.text(workout.rec_workout_name);
                            recWorkoutDuHrs.text(workout.rec_workout_duration_hrs + " hrs  : ");
                            recWorkoutDuMins.text(workout.rec_workout_duration_mins + " mins : ");
                            recWorkoutDuSecs.text(workout.rec_workout_duration_secs + " secs");

                            recWorkoutDuration.append(recWorkoutDuHrs);
                            recWorkoutDuration.append(recWorkoutDuMins);
                            recWorkoutDuration.append(recWorkoutDuSecs);

                            recWorkoutCard.append(recWorkoutName);
                            recWorkoutCard.append(recWorkoutDuration);
                            recWorkoutCardContainer.append(recWorkoutCard);
                            recommendedWorkouts.append(recWorkoutCardContainer);
                        })
                    }
                })
            }

            $(document).on('click', '.rec-workout-card', function () {
                console.log($(this).data('recWorkoutId'));
                $('.rec-workout-detail-modal').addClass('dsp-flex');
                $('body').addClass('overlay');
                $('.rec-workout-detail-modal .modal-rec-workout-name').text($(this).data('recWorkoutName'));
                $('.rec-workout-detail-modal .modal-rec-workout-duration .hrs').text($(this).data('recWorkoutDurationHrs'));
                $('.rec-workout-detail-modal .modal-rec-workout-duration .mins').text($(this).data('recWorkoutDurationMins'));
                $('.rec-workout-detail-modal .modal-rec-workout-duration .secs').text($(this).data('recWorkoutDurationSecs'));
                $('.rec-workout-detail-modal .modal-rec-workout-type .type').text($(this).data('recWorkoutType'));
                let exerciseItemHeading = $('<div class="exercise-item-row heading"></div>');
                let headingName = $('<div class="exercise-name-data data-col text-bold">Exercise Name</div>');
                let headingSets = $('<div class="exercise-name-data data-col text-bold">Exercise Sets</div>');
                let headingReps = $('<div class="exercise-name-data data-col text-bold">Exercise Name</div>');
                $('.exercise-list-table').append(exerciseItemHeading);
                let getExercises = {
                    "url": "api/users/getRecommendedExercises.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`
                    },
                    "data": JSON.stringify({
                        "rec_workout_id": $(this).data('recWorkoutId')
                    })
                };

                $.ajax(getExercises).done(function (response) {
                    let exerciseList = $('.rec-workout-detail-modal .exercise-list');
                    if (response.success == 1) {
                        $.map(response.exercises, (exercise, index) => {
                            let exerciseItem = $('<div class="exercise-item-row"></div>');

                            let exerciseName = $('<div class="exercise-name-data data-col"></div>');
                            let exerciseSets = $('<div class="exercise-sets-data data-col"></div>');
                            let exerciseReps = $('<div class="exercise-reps-data data-col"></div>');

                            exerciseItemHeading.append(headingName);
                            exerciseItemHeading.append(headingSets);
                            exerciseItemHeading.append(headingReps);
                            exerciseName.text(exercise.rec_exercise_name);
                            exerciseSets.text(exercise.rec_exercise_sets);
                            exerciseReps.text(exercise.rec_exercise_reps);
                            exerciseItem.append(exerciseName);
                            exerciseItem.append(exerciseSets);
                            exerciseItem.append(exerciseReps);
                            exerciseList.append(exerciseItem);
                            $('.exercise-list-table').append(exerciseItem);
                        })
                    }
                })
            });

            $('.close-rec-workout').click(function () {
                $('.rec-workout-detail-modal').removeClass('dsp-flex');
                $('.rec-workout-detail-modal .exercise-list-table').html('');
                $('body').removeClass('overlay');
            })

            $('.rec-workout-detail-modal .modal-actions .add-workout').click(function () {
                // let data = JSON.stringify({
                //     "workout_name": 
                // })
                let workoutName = $('.modal-rec-workout-name').text();
                let workoutType = $.trim($('.modal-rec-workout-type .type').text());
                let workoutDurationHrs = parseInt($('.modal-rec-workout-duration .hrs').text());
                let workoutDurationMins = parseInt($('.modal-rec-workout-duration .mins').text());
                let workoutDurationSecs = parseInt($('.modal-rec-workout-duration .secs').text());
                let workoutDescList = $('.rec-workout-detail-modal .exercise-list-table .exercise-item-row').not('.heading');

                let exerciseList = [];

                $.map(workoutDescList, (wl, index) => {
                    let exerciseName = $(wl).children('.exercise-name-data').text();
                    let exerciseSets = parseInt($(wl).children('.exercise-sets-data').text());
                    let exerciseReps = parseInt($(wl).children('.exercise-reps-data').text());
                    //exerciseName = $('.execise-name');
                    // exerciseSets = $(`${wl},.execise-sets`);
                    // exerciseReps = $(`${wl},.execise-reps`);
                    // exerciseSets = $(block[0]).children().val();
                    // exerciseReps = $(block[0]).children().val();

                    exerciseList.push({
                        "exercise_name": exerciseName,
                        "exercise_sets": exerciseSets,
                        "exercise_reps": exerciseReps
                    });

                });


                let workoutDuration = {
                    "hrs": workoutDurationHrs,
                    "mins": workoutDurationMins,
                    "secs": workoutDurationSecs
                };

                let data = JSON.stringify({
                    "workout_name": workoutName,
                    "workout_type": workoutType.toLowerCase(),
                    "workout_duration": workoutDuration,
                    "workout_desc": exerciseList
                });

                addWorkout(data);
                $(".workout-detail-modal").removeClass("dsp-flex");
                $("body").removeClass('overlay');
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


            

        } else {
            window.history.back();
            localStorage.removeItem('jwt');
            window.location.reload(true);
            window.location.replace("/login");
        }
    } else if (location.pathname == "/adminDashboard") {
        let token = JSON.parse(localStorage.getItem("jwt"));
        if (token) {
            let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
            sideMenu[0].classList.add('active');


            let getUsers = {
                'url': '/api/admin/getUsers.php',
                'method': 'POST',
                'timeout': 0,
                'headers': {
                    'Authorization': `Bearer ${token.token}`
                }
            };

            $.ajax(getUsers).done(function (response) {
                if (response.success == 1) {
                    $('.number-of-users').text(response.user_count);
                }
            })

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
                let workoutLevel = $('select[name="workout-level"] option:selected').val();
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
                        "workout_level": workoutLevel,
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
                let addWorkoutRequest = {
                    "url": "/api/admin/addWorkouts.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                    "data": data,
                };

                $.ajax(addWorkoutRequest).done(function (response) {
                    console.log(response);
                    if (response.success == 1) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }


        } else {
            window.history.back();
            localStorage.removeItem('jwt');
            window.location.reload(true);
            window.location.replace('/login');
        }
    }

    //to get current time to display messages//
    let current_day = new Date();
    let current_hr = current_day.getHours();

    if (current_hr >= 0 && current_hr < 12) {
        $(".current-time").html("Good Morning!");
    } else if (current_hr >= 12 && current_hr <= 17) {
        $(".current-time").html("Good Afternoon!");
    } else if (current_hr >= 17 && current_hr <= 19) {
        $(".current-time").html("Good Evening!");
    } else {
        $(".current-time").html("Good Night!");
    }



});

