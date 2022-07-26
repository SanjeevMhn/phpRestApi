$(document).ready(function () {
    //sidenav toggle//
    let token = JSON.parse(localStorage.getItem("jwt"));
    let userProfile = JSON.parse(localStorage.getItem("profile_detail"));
    let sideNavToggle = $(".sidenav-toggler");
    let sideNavToggleSp = $(".sidenav-toggler-sp");
    let closeSideNavBtn = $(".close-side-nav-btn");
    let sideNavExp = false;
    $(".brand-exp").css("display", "block");
    $(".brand-mini").css("display", "none");
    $(".side-nav").removeClass("mini-nav");
    sideNavToggle.click(function () {
        const root = document.documentElement;
        if (sideNavExp) {
            root.style.setProperty("--sidenav-width", "250px");
            sideNavExp = false;
            $(".brand-exp").css("display", "block");
            $(".brand-mini").css("display", "none");
            $(".side-nav").removeClass("mini-nav");
        } else {
            root.style.setProperty("--sidenav-width", "80px");
            sideNavExp = true;
            $(".brand-mini").css("display", "block");
            $(".brand-exp").css("display", "none");
            $(".side-nav").addClass("mini-nav");
        }
    });

    sideNavToggleSp.click(function () {
        $(".side-nav-sp").css("left", "0");
    })

    closeSideNavBtn.click(function () {
        $(".side-nav-sp").css("left", "-300px");
    })

    //logout
    $(".log-out").click(function () {
        localStorage.removeItem("jwt");
        localStorage.removeItem("profile_detail");
        window.location.reload(true);
        window.location.replace('/login')
    });

    //create btn//
    $(".create").click(function () {
        $(".create .drpdown-content").toggleClass("show-drp");
    });

    $(".user-profile").click(function () {
        $(".user-profile .drpdown-content").toggleClass("show-drp");
    });

    //show add workout modal//
    $(".drpdown-content .create-workout").click(function () {
        $(".add-workout-modal").addClass("dsp-flex");
        $("body").addClass('overlay');
    });


    $(".create-btm").click(function () {
        console.log("hello");
        $(".drpdown-content-btm").toggleClass('show-drp-btm');
    })

    $(".create-btm .drpdown-content-btm .create-workout").click(function () {
        $(".add-workout-modal").addClass("dsp-flex");
        $("body").addClass("overlay");
    })

    updateUserProfilePic();

    function updateUserProfilePic() {
        let getUserById = {
            "url": "/api/users/getUserById.php",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${token.token}`
            },
            "data": JSON.stringify({
                "user_id": parseInt(userProfile.user_id)
            })
        }

        $.ajax(getUserById).done(function (response) {
            if (response.data.user_profile_pic == null
                || response.data.user_profile_pic == '') {

                $('.top-nav .user-actions .action .user-profile').css('background-image', 'url("./frontend/assets/images/default.png")');

            } else {
                $('.top-nav .user-actions .action .user-profile').css('background-image', `url("./storage/public/userAvatars/${response.data.user_profile_pic}")`);
            }

        })
    }
});
