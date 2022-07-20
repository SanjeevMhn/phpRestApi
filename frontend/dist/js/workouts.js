$(document).ready(function () {

    let token = JSON.parse(localStorage.getItem("jwt"));
    if (location.pathname == '/workouts') {

        let token = JSON.parse(localStorage.getItem("jwt"));
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
                        closeBtn = $('<div class="close-btn img-container-md"></div>')
                        closeIcon = $('<img src="frontend/assets/images/close_icon.svg">');

                        closeBtn.append(closeIcon);
                        workouts = $('<div class="workout-item list-item ft-poppins"></div>');
                        workouts.data('workoutId', userWorkout.workout_id);
                        workouts.data('workoutDuration', { "hrs": userWorkout.workout_duration_hrs, "mins": userWorkout.workout_duration_mins, "secs": userWorkout.workout_duration_secs });
                        workouts.data('workoutType', userWorkout.workout_type);
                        workouts.attr('workoutName', userWorkout.workout_name);
                        workouts.data('userId', userWorkout.workout_id);
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
                        container.append(workoutName);
                        workouts.append(container);
                        //workouts.append(closeBtn);
                        $('.workouts-list').append(workouts);
                    })

                }

            });

            $('.workout-detail-modal .close-btn').click(function(){
                $(this).parent().removeClass('dsp-flex');
                $('.workout-detail-modal .exercise-list-table .exercise-item-row').not('.heading').remove();
                $('body').removeClass('overlay');
            })

            $(document).on('click', '.workout-item', function () {
                let workoutId = parseInt($(this).data('workoutId'));
                let workoutName = $(this).attr('workoutName');
                let workoutType = $(this).data('workoutType');
                let workoutDuration = $(this).data('workoutDuration');
                console.log(workoutType);
                getUserExercises(workoutId, workoutName, workoutType, workoutDuration);
            })

            function getUserExercises(workoutId, workoutName, workoutType, workoutDuration) {
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
                $.ajax(getExercises).done(function (response) {
                    if (response.success == 1) {
                        $('body').addClass('overlay');
                        $('.workout-detail-modal').addClass('dsp-flex');
                        $('.workout-detail-modal').data('workoutId', workoutId);
                        $('.modal-workout-name').text(workoutName);
                        $('.modal-workout-type').text(workoutType);
                        $('.modal-workout-duration .hrs').text(workoutDuration.hrs + " hrs");
                        $('.modal-workout-duration .mins').text(workoutDuration.mins + " mins");
                        $('.modal-workout-duration .secs').text(workoutDuration.secs + " secs");
                        $.map(response.exercises, function (exercise, index) {
                            //let exerciseItem = $('<div class="exercise-item tbl-row"></div>');
                            let exerciseItem = $('<div class="exercise-item-row"></div>');
                            let exerciseName = $('<div class="exercise-name-data data-col"></div>');
                            let exerciseSets = $('<div class="exercise-sets-data data-col"></div>');
                            let exerciseReps = $('<div class="exercise-reps-data data-col"></div>');
                            exerciseName.text(exercise.exercise_name);
                            exerciseSets.text(exercise.exercise_sets);
                            exerciseReps.text(exercise.exercise_reps);
                            exerciseItem.append(exerciseName);
                            exerciseItem.append(exerciseSets);
                            exerciseItem.append(exerciseReps);
                            $('.exercise-list-table').append(exerciseItem);
                        });
                    }
                });
            }

            $('.workout-detail-modal .modal-actions button[type="reset"]').click(function () {
                $('.workout-detail-modal').removeClass('dsp-flex');
                $('.workout-detail-modal .exercise-list-table .exercise-item-row').not('.heading').remove();
                $('body').removeClass('overlay');
            })

            $('.workout-detail-modal .modal-actions .delete-workout').click(function () {
                window.location.reload(true);
                let delWorkoutId = $(this).parent().parent().data('workoutId');
                let delWorkout = {
                    "url": "/api/users/deleteWorkout.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Beare ${token.token}`
                    },
                    "data": JSON.stringify({
                        "workout_id": delWorkoutId
                    })
                }

                $.ajax(delWorkout).done(function (response) {
                    console.log(response);

                });
            });


            $('.workout-detail-modal .modal-actions .edit-workout').click(function () {
                $('body').addClass('overlay');
                $('.edit-workout-modal').addClass('dsp-flex');
                $('.edit-workout-modal input[name="workout-name"]').val($('.workout-detail-modal .modal-workout-name').text());
                let option = $('.edit-workout-modal select[name="workout-type"] option').toArray();
                $.map(option, (opt, index) => {
                    if ($(opt).val() === $('.workout-detail-modal .modal-workout-type').text()) {
                        $(opt).attr("selected", "selected");
                    }
                })
                $('.edit-workout-modal .duration-set input[name="hrs"]').val(parseInt($('.workout-detail-modal .modal-workout-duration .hrs').text()));
                $('.edit-workout-modal .duration-set input[name="mins"]').val(parseInt($('.workout-detail-modal .modal-workout-duration .mins').text()));
                $('.edit-workout-modal .duration-set input[name="secs"]').val(parseInt($('.workout-detail-modal .modal-workout-duration .secs').text()));

                let exerciseCount = $('.exercise-list-table .exercise-item-row').not('.heading').toArray();
                let exeDetails = [];
                $.map(exerciseCount, (ec, index) => {
                    exeDetails.push({
                        "exercise_name": $(ec).children('.exercise-name-data').not('.heading').text(),
                        "exercise_sets": parseInt($(ec).children('.exercise-sets-data').not('.heading').text()),
                        "exercise_reps": parseInt($(ec).children('.exercise-reps-data').not('.heading').text())
                    });
                })
                let container = $('.edit-workout-modal .exercise-container');


                $.map(exeDetails, (ed, index) => {
                    let exerciseBlock = $('<div class="exercise-block pb-20"></div>');
                    let nameBlock = $('<div class="block"></div>');
                    let setsBlock = $('<div class="block"></div>');
                    let repsBlock = $('<div class="block"></div>');
                    let inputExName = $('<input type="text" name="exercise-name" id="" class="form-inp" placeholder="Exercise Name">');
                    let inputExSets = $('<input type="number" name="exercise-sets" id="" class="form-inp" placeholder="Exercise Sets">');
                    let inputExReps = $('<input type="number" name="exercise-sets" id="" class="form-inp" placeholder="Exercise Reps">');
                    nameBlock.append(inputExName.val(ed.exercise_name));
                    exerciseBlock.append(nameBlock);
                    container.append(exerciseBlock);
                    setsBlock.append(inputExSets.val(ed.exercise_sets));
                    exerciseBlock.append(setsBlock);
                    container.append(exerciseBlock);
                    repsBlock.append(inputExReps.val(ed.exercise_reps));
                    exerciseBlock.append(repsBlock);
                    container.append(exerciseBlock);
                    console.log(ed);
                })

            });


            $('.edit-workout-modal button[type="reset"]').click(function () {
                $(this).parent().parent().removeClass('dsp-flex');
                $('.edit-workout-modal .exercise-container').html('');
            })

        } else {
            localStorage.removeItem('jwt');
            window.location.reload(true);
            window.location.replace('/login');
        }
    }



});