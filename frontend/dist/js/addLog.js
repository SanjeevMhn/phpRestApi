
$(document).ready(function () {

    let token = JSON.parse(localStorage.getItem("jwt"));
    if (location.pathname === "/addLog") {
        let token = JSON.parse(localStorage.getItem("jwt"));

        if (token && token.user_type === "user") {
            let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
            sideMenu[3].classList.add('active');


            $('.add-log').click(function(){
                $('.daily-log-modal').addClass('dsp-flex');
                $('body').addClass('overlay');
            })

            $('.close-btn .icon-container').click(function(){
                $('.daily-log-modal').removeClass('dsp-flex');
                $('body').removeClass('overlay');
            })
        }
    }
})