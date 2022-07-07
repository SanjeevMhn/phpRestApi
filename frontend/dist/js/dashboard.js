
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
        let sideNavExp = true;
        $('.brand-exp').css("display", "block");
        $('.brand-mini').css("display", "none");
        sideNavToggle.click(function () {
            const root = document.documentElement;
            if (sideNavExp) {
                root.style.setProperty('--sidenav-width', '250px');
                sideNavExp = false;
                $('.brand-exp').css("display", "block");
                $('.brand-mini').css("display", "none");
            } else {
                root.style.setProperty('--sidenav-width', '80px');
                sideNavExp = true;
                $('.brand-mini').css("display", "block");
                $('.brand-exp').css("display", "none");
            }
        })


    }
})