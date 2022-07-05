$(document).ready(function () {
    let userName;
    let userEmail;
    if (window.location.pathname == "/dashboard") {
        if (!localStorage.getItem("jwt")) {
            window.location.replace("/login");
        }
       
        let jwtToken = localStorage.getItem("jwt");

        let settings = {
            "url": "/api/users/getUser.php",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${jwtToken}}`
            },
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            if (response.success == 1) {
                $('.user-name').html(response.user.name);
                userName = response.user.name;
                userEmail = response.user.email;
            } else {
                window.location.replace('/login');
                localStorage.removeItem("jwt");
            }
        })
    }
})