$(document).ready(function(){

    let menuItems = $('.nav-list .nav-link');
    let pathName = window.location.pathname;   

    switch(pathName){
        case '/home':
        case '/':
        case '':
            menuItems[0].classList.add('active');
        break;
        case '/register':
            menuItems[3].classList.add('active');
        break;
        case '/login':
            menuItems[4].classList.add('active');
        break;
    }

})