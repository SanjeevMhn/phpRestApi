/*
    TODO: make an api to upload user profile pic and store it in the userAvatar folder
    inside of the folder named after user id

    .check for the existance of this folder if so change img container images to the image in that folder
    .delete the folder if there is no photo
    .default user images if no folder

    created a folder called storage folder with public folder and userAvatar folder 
    this is will hold the user profile pictures inside the folder named after user's id
 */

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


                $('.side-nav .user-profile-img .img-container').css('background-image','url("./frontend/assets/images/default.png")');
                $('.main-content .profile-img .img-container').css('background-image','url("./frontend/assets/images/default.png")');

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