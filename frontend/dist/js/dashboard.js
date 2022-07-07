
$(document).ready(function () {

    if (location.pathname == "/dashboard") {
        let token = localStorage.getItem("jwt");
        if (token !== null) {
            let settings = {
                "url": "/api/users/getUser.php",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token}`,
                },
            }
            $.ajax(settings).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    $('.user-detail').html(response.user.name);
                }
            });
        } else {
            window.location.pathname = '/login';
        }


        let sideNavToggle = $('.sidenav-toggler');
        sideNavToggle.click(function(){
            console.log("hello");
            $('.side-nav').toggleClass("side-nav-mini");
        })
    }
})