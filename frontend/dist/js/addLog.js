
$(document).ready(function () {

    let token = JSON.parse(localStorage.getItem("jwt"));
    if (location.pathname === "/addLog") {
        let token = JSON.parse(localStorage.getItem("jwt"));

        if (token && token.user_type === "user") {
            let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
            sideMenu[3].classList.add('active');


            $('.add-log').click(function () {
                $('.daily-log-modal').addClass('dsp-flex');
                $('body').addClass('overlay');
            })

            $('.close-btn .icon-container').click(function () {
                $('.daily-log-modal').removeClass('dsp-flex');
                $('body').removeClass('overlay');
            })

            addTodayDate();
            getUserWorkouts();
            getUserMealPlans();
            getUserDailyLog();

            function addTodayDate() {
                $('input[name="date-today"]').val(new Date().toISOString().split('T')[0]);
            }
            function getUserWorkouts() {
                let getWorkouts = {
                    "url": "/api/users/getWorkouts.php",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                }

                $.ajax(getWorkouts).done(function (response) {
                    if (response.success == 1) {
                        $.map(response.user, function (workouts, index) {
                            let option = $('<option></option>');
                            option.val(workouts.workout_id);
                            option.text(workouts.workout_name);
                            $('select[name="user-workout-select"]').append(option);
                        })
                    }
                })
            }
            function getUserMealPlans() {
                let getMealPlans = {
                    "url": "/api/users/getUserMealPlans.php",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                }
                $.ajax(getMealPlans).done(function (response) {
                    console.log(response);
                    if (response.success == 1) {
                        $.map(response.meal_plans, function (mp, index) {
                            let option = $('<option></option>');
                            option.val(mp.meal_plan_id);
                            option.text(mp.meal_plan_name);
                            $('select[name="user-meal-plan-select"]').append(option);
                        })
                    }
                })
            }

            $('.daily-log-modal .add-log').click(function (e) {
                let setUserLogData = {
                    "url": "/api/users/setUserDailyLog.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "log_date": String($('input[name="date-today"]').val()),
                        "meal_plan_id": parseInt($('select[name="user-meal-plan-select"] option:selected').val()),
                        "workout_id": parseInt($('select[name="user-workout-select"] option:selected').val()),
                    })
                }

                $.ajax(setUserLogData).done(function (response) {
                    console.log(response);
                })

                getUserDailyLog();
            })

            function getUserDailyLog() {
                let getUserLog = {
                    "url": "/api/users/getUserDailyLogs.php",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                }
                $.ajax(getUserLog).done(function (response) {
                    console.log(response);
                    $.map(response.logs, function (rl, index) {
                        let item = $('<div class="list-item"></div>')
                        let date = $('<h2 class="header-text"></h2>');
                        let container = $('<div class="inner-container"></div>');
                        date.text(rl.log_date);
                        container.append(date);
                        item.append(container);
                        $('.logs-container').append(item);
                    })
                })
            }
        }
    }
})