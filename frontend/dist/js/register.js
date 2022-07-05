$(document).ready(function () {

    if (window.location.pathname == "/register") {
        if (localStorage.getItem('jwt')) {
            window.location.replace('/dashboard');
        }
    }
    let resForm = $('.res-form');
    let userName;
    let userEmail;
    let userPassword;
    let userWorkoutGoal;

    resForm.submit(function (e) {

        e.preventDefault();
        userName = $('input[name="usr-name"]').val();
        userEmail = $('input[name="usr-email"]').val();
        userPassword = $('input[name="usr-password"]').val();
        userConfirmPass = $('input[name="confirm-password"]').val();
        userWorkoutGoal = $('select[name="usr-goal"]').val();
        let errCount = 0;

        if (userName == '') {
            $('.err-username').addClass('dsp-block');
            $('input[name="usr-name"]').addClass('err-field');
            errCount++;
        } else {
            $('.err-username').removeClass('dsp-block');
            $('input[name="usr-name"]').removeClass('err-field');
        }

        if (userEmail == '') {
            $('.err-useremail').addClass('dsp-block');
            $('input[name="usr-email"]').addClass('err-field');
            errCount++;
        } else {
            $('.err-useremail').removeClass('dsp-block');
            $('input[name="usr-email"]').removeClass('err-field');
        }

        if (userPassword == '') {
            $('.err-password').addClass('dsp-block');
            $('input[name="usr-password"]').addClass('err-field');
            errCount++;
        } else if ($('input[name="usr-password"]').val() !== $('input[name="confirm-password"]').val()) {
            $('.err-password').removeClass('dsp-block');
            $('.err-match-password').addClass('dsp-block');
            $('input[name="usr-password"]').addClass('err-field');
            errCount++;
        } else {
            $('.err-password').removeClass('dsp-block');
            $('.err-match-password').removeClass('dsp-block');
            $('input[name="usr-password"]').removeClass('err-field');
        }

        if (userWorkoutGoal == 'default') {
            $('.err-goal').addClass('dsp-block');
            $('select[name="usr-goal"]').addClass('err-field');
            errCount++;
        } else {
            $('.err-goal').removeClass('dsp-block');
            $('select[name="usr-goal"]').removeClass('err-field');
        }


        if (errCount == 0) {
            let settings = {
                "url": "/api/users/register.php",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "name": userName,
                    "email": userEmail,
                    "password": userPassword,
                    "goal": userWorkoutGoal
                }),
            }
            $.ajax(settings).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    window.location.href = "/login";
                } else {
                    let message = response.message;
                    alert(message);
                }
            });
        }
    })




})