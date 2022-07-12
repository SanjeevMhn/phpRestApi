$(document).ready(function () {

    if (location.pathname == '/workouts') {
        let token = localStorage.getItem("jwt");

        let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
        sideMenu[1].classList.add('active');

        if (token) {
            let getUserWorkouts = {
                "url": "/api/users/getWorkouts.php",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }

            $.ajax(getUserWorkouts).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    $.map(response.user,(userWorkout, index) => {
                        let workouts = $('<div class="workout-item ft-poppins"></div>');
                        let container = $('<div class="work-container"></div>')
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
        } else {
            location.replace('/login');
        }
    }



});