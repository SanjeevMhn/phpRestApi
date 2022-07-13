$(document).ready(function () {

    let token = JSON.parse(localStorage.getItem("jwt"));
    if (location.pathname == '/workouts') {

        let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
        sideMenu[1].classList.add('active');

        let workoutData = [];

        if (token) {
            let getUserWorkouts = {
                "url": "/api/users/getWorkouts.php",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token.token}`,
                    "Content-Type": "application/json"
                }
            }

            $.ajax(getUserWorkouts).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    $.map(response.user, (userWorkout, index) => {
                        workoutData.push({
                            "workout_id": userWorkout.workout_id,
                            "user_id": userWorkout.user_id
                        });
                        workouts = $('<div class="workout-item list-item ft-poppins"></div>');
                        workouts.data('workoutId',userWorkout.workout_id);
                        workouts.data('workoutDuration',{"hrs": userWorkout.workout_duration_hrs, "mins": userWorkout.workout_duration_mins, "secs": userWorkout.workout_duration_secs});
                        workouts.attr('workoutName',userWorkout.workout_name);
                        workouts.data('userId',userWorkout.workout_id);
                        let container = $('<div class="inner-container"></div>')
                        let workoutName = $('<h2 class="workout-name"></h2>');
                        let workoutType = $('<h3 class="workout-type"></h3>')
                        let workoutDuration = $('<div class="workout-duration"></div>')
                        let durationHrs = $('<p class="duration hrs"></p>');
                        let durationMins = $('<p class="duration mins"></p>');
                        let durationSecs = $('<p class="duration secs"></p>');
                        workoutName.text(userWorkout.workout_name);
                        workoutType.text(userWorkout.workout_type);
                        durationHrs.text(userWorkout.workout_duration_hrs);
                        durationMins.text(userWorkout.workout_duration_mins);
                        durationSecs.text(userWorkout.workout_duration_secs);
                        workoutDuration.append(durationHrs);
                        workoutDuration.append(durationMins);
                        workoutDuration.append(durationSecs);
                        container.append(workoutName);
                        workouts.append(container);
                        $('.workouts-list').append(workouts);
                    })

                }

            });


            $(document).on('click','.workout-item',function(){
                let workoutId = parseInt($(this).data('workoutId'));
                let workoutName = $(this).attr('workoutName');
                let workoutDuration = $(this).data('workoutDuration');
                console.log(workoutDuration);
                let getExercises = {
                    "url": "/api/users/getExercises.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "workout_id": workoutId
                    })
                }

                $.ajax(getExercises).done(function(response){
                    console.log(response);
                    if(response.success == 1){
                        $('body').addClass('overlay');
                        $('.workout-detail-modal').addClass('dsp-flex');
                        $('.modal-workout-name').text(workoutName);
                        $('.modal-workout-duration .hrs').text(workoutDuration.hrs + " hrs");
                        $('.modal-workout-duration .mins').text(workoutDuration.mins + " mins");
                        $('.modal-workout-duration .secs').text(workoutDuration.secs + " secs");
                        $.map(response.exercises, function(exercise, index) {
                            let exerciseItem = $('<div class="exercise-item"></div>');
                            let exerciseName = $('<span class="exercise-name"></span>');
                            let exerciseSets = $('<span class="exercise-sets"></span>');
                            let exerciseReps = $('<span class="exercise-reps"></span>');
                            exerciseName.text(exercise.exercise_name + " : ");
                            exerciseSets.text(exercise.exercise_sets + " sets");
                            exerciseReps.text(exercise.exercise_reps + " reps");
                            exerciseItem.append(exerciseName);
                            exerciseItem.append(exerciseSets);
                            exerciseItem.append(exerciseReps);
                            $('.exercise-list').append(exerciseItem);
                        }); 
                    }
                });
                
            })

            $('.workout-detail-modal .modal-actions button[type="reset"]').click(function(){
                $('.workout-detail-modal').removeClass('dsp-flex');
                $('.workout-detail-modal .exercise-list').html('');
                $('body').removeClass('overlay');
            })



           
        } else {
           window.location.replace('/login');
        }
    }



});