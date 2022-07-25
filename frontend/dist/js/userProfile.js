$(document).ready(function () {

    if (location.pathname === "/profile") {
        let token = JSON.parse(localStorage.getItem("jwt"));
        let userProfile = JSON.parse(localStorage.getItem("profile_detail"));
        console.log(userProfile);
        if (token) {
            if (userProfile) {
                
                $('.side-nav .user-info .user-name').text(userProfile.user_name);
                $('.main-content .profile-info .profile-desc .user-name .label-data').text(userProfile.user_name);
                $('.main-content .profile-info .profile-desc .user-email .label-data').text(userProfile.user_email);
                $('.main-content .goal-info .goal-desc .user-goal .label-data').text(userProfile.user_goal);

            } else {
                window.location.replace('/dashboard');
            }

        } else {
            localStorage.removeItem('jwt');
            localStorage.removeItem('profile_id');
            window.location.reload(true);
            window.location.replace('/login');
        }
    }
})