$(document).ready(function () {

    if (window.location.pathname == "/login") {

        let token = localStorage.getItem("jwt");
        if (token !== null) {
            window.location.replace('/dashboard');
        } else {
            let loginForm = $('.login-form');

            loginForm.submit(function (e) {

                e.preventDefault();

                let userEmail = $('input[name="usr-email"]').val();
                let userPassword = $('input[name="usr-password"]').val();

                let errCount = 0;
                if (userEmail == '') {
                    $('input[name="usr-email"]').addClass('err-field');
                    $('.err-useremail').addClass('dsp-block');
                    errCount++;
                } else {
                    $('input[name="usr-email"]').removeClass('err-field');
                    $('.err-useremail').removeClass('dsp-block');
                }

                if (userPassword == '') {
                    $('input[name="usr-password"]').addClass('err-field');
                    $('.err-password').addClass('dsp-block');
                    errCount++;
                } else {
                    $('input[name="usr-password"]').removeClass('err-field');
                    $('.err-password').removeClass('dsp-block');
                }

                if (errCount == 0) {
                    let settings = {
                        "url": "/api/users/login.php",
                        "method": "POST",
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "data": JSON.stringify({
                            "email": userEmail,
                            "password": userPassword
                        }),
                    };

                    $.ajax(settings).done(function (response) {
                        if (response.success == 1) {
                            localStorage.setItem("jwt", response.token);
                            window.location.replace('/dashboard');
                            // if (localStorage.getItem("jwt")) {
                            //     window.location.pathname = '/dashboard';
                            // }

                        } else {
                            alert(response.message);
                        }
                    });
                }
            })
        }
    }
})