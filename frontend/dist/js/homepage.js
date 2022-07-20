$(document).ready(function(){
    $('.main-nav .container .side-nav-toggler').click(function(){
        $('.nav-sp').css('left','0');
    })

    $('.nav-sp .close-side-nav-btn').click(function(){
        $('.nav-sp').css('left','-400px');
    })
})