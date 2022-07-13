$(document).ready(function () {
    //sidenav toggle//
    let sideNavToggle = $(".sidenav-toggler");
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

    //logout
    $(".log-out").click(function () {
        localStorage.removeItem("jwt");
        location.reload();
    });

    //create btn//
    $(".create").click(function () {
        $(".drpdown-content").toggleClass("show-drp");
    });

    //show add workout modal//
    $(".drpdown-content .create-workout").click(function () {
        $(".add-workout-modal").addClass("dsp-flex");
        $("body").addClass('overlay');
    });
});
