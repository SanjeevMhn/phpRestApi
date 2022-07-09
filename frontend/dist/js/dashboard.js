
$(document).ready(function () {

    if (location.pathname == "/dashboard") {
        let token = localStorage.getItem("jwt");
        if (token !== null) {
            let getUserInfo = {
                "url": "/api/users/getUser.php",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token}`,
                },
            }
            //to get user name and email
            $.ajax(getUserInfo).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    $('.user-detail .user-name').html(response.user.name);
                }
            });

            let userGoal = {
                "url": "/api/users/getUserWorkoutGoal.php",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token}`
                }
            }

            //to get users workout goal
            $.ajax(userGoal).done(function (response) {
                console.log(response);
                if (response.success == 0) {
                    $('.user-goal-form').css('display', 'flex');
                }
            });


            //to get current time to display messages//
            let current_day = new Date();
            let current_hr = current_day.getHours();

            if (current_hr >= 0 && current_hr < 12) {
                $('.current-time').html("Good Morning!");
            } else if (current_hr >= 12 && current_hr <= 17) {
                $('.current-time').html("Good Afternoon!");
            } else if(current_hr >=17 && current_hr <= 19) {
                $('.current-time').html("Good Evening!");
            }else{
                $('.current-time').html("Good Night!");
            }

            //submitting user goal form//
            $('.user-goal-form').submit(function (e) {
                e.preventDefault();
                let weightInput = $('input[name="user-weight"]').val();
                let weightMetric = $('select[name="weight-metirc"] option:selected').val();
                let goalSelect = $('select[name="user-goal"] option:selected').val();
                let counter = 0;
                if (goalSelect !== "default"){
                    $('select[name="user-goal"]').removeClass("err-field");
                    $('.err-goal').css('display', 'none');
                }else{
                    counter++;
                    $('.err-goal').css('display', 'block');
                    $('select[name="user-goal"]').addClass("err-field");
                }
                if (weightInput !== '') {
                    $('.err-weight').css('display', 'none');
                    $('input[name="user-weight"]').removeClass("err-field");
                } else {
                    counter++;
                    $('.err-weight').css('display', 'block');
                    $('select[name="user-goal"]').addClass("err-field");
                }

                if(counter == 0){
                    setUserWorkoutGoal(weightInput,weightMetric,goalSelect);
                }
            })

            function setUserWorkoutGoal(weightInput,weightMetric,goalSelect) {
                let setGoal = {
                    "url": "/api/users/setUserWorkoutGoal.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token}`,
                    },
                    "data": JSON.stringify({
                        "goal": goalSelect,
                        "start_weight": weightInput,
                        "weight_metric": weightMetric
                    }),
                }

                $.ajax(setGoal).done(function (response) {
                    if (response.success == 1) {
                        $('.user-goal-form').css('display', 'none');
                    }
                });
            }

            //sidenav toggle//
            let sideNavToggle = $('.sidenav-toggler');
            let sideNavExp = false;
            $('.brand-exp').css("display", "block");
            $('.brand-mini').css("display", "none");
            $('.side-nav').removeClass('mini-nav');
            sideNavToggle.click(function () {
                const root = document.documentElement;
                if (sideNavExp) {
                    root.style.setProperty('--sidenav-width', '250px');
                    sideNavExp = false;
                    $('.brand-exp').css("display", "block");
                    $('.brand-mini').css("display", "none");
                    $('.side-nav').removeClass('mini-nav');
                } else {
                    root.style.setProperty('--sidenav-width', '80px');
                    sideNavExp = true;
                    $('.brand-mini').css("display", "block");
                    $('.brand-exp').css("display", "none");
                    $('.side-nav').addClass('mini-nav');
                }
            })

            //logout 
            $('.log-out').click(function () {
                localStorage.removeItem("jwt");
                window.location.reload();
            })

            //create btn//
            $('.create').click(function(){
                $('.drpdown-content').toggleClass('show-drp');
            })
            
            //show add workout modal//
            $('.drpdown-content .create-workout').click(function(){
                $('.add-workout-modal').addClass('dsp-block');
            })

            $('.add-workout-modal .form-data button[type="reset"]').click(function(){
                $('.add-workout-modal').removeClass('dsp-block');
            })

            $('.add-workout-modal').submit(function(e){
                e.preventDefault();
                let workoutName = $('input[name="workout-name"]').val();
                if(workoutName == ''){
                    $('.err-msg').addClass('dsp-block');
                    $('input[name="workout-name"]').addClass('err-field');
                }
            })

        } else {
            window.location.pathname = '/login';
        }



    }
})