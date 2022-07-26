/*
    TODO: make an api to upload user profile pic and store it in the userAvatar folder
    inside of the folder named after user id

    .check for the existance of this folder if so change img container images to the image in that folder
    .delete the folder if there is no photo
    .default user images if no folder

    created a folder called storage folder with public folder and userAvatar folder 
    this is will hold the user profile pictures inside the folder named after user's id

 /*
    TODO: fix the file upload button
 */

$(document).ready(function () {

    if (location.pathname === "/profile") {
        let token = JSON.parse(localStorage.getItem("jwt"));
        let userProfile = JSON.parse(localStorage.getItem("profile_detail"));
        if (token) {
            if (userProfile) {

                $('.side-nav .user-info .user-name').text(userProfile.user_name);
                $('.main-content .profile-info .profile-desc .user-name .label-data').text(userProfile.user_name);
                $('.main-content .profile-info .profile-desc .user-email .label-data').text(userProfile.user_email);
                $('.main-content .goal-info .goal-desc .user-goal .label-data').text(userProfile.user_goal);
                $('.main-content .weight-info .weight-desc .user-weight .weight-number').text(userProfile.user_weight);
                $('.main-content .weight-info .weight-desc .user-weight-metric .weight-metric').text(userProfile.weight_metric);
                $('.main-content .fitness-info .fitness-desc .user-fitness .label-data').text(userProfile.user_level);
                $('.main-content .daily-calorie-info .calorie-desc .user-calorie .label-data').text(userProfile.user_daily_calorie);
                $('.main-content .height-info .height-desc .user-height .label-data').text(userProfile.user_height + " cm");

                $('.main-content-container .profile-img .modal-actions .remove-photo').click(function(){
                    removeProfilePic();
                    window.location.reload(true);
                });
                // $('.side-nav .user-profile-img .img-container').css('background-image', 'url("./frontend/assets/images/default.png")');
                // $('.main-content .profile-img .img-container').css('background-image', 'url("./frontend/assets/images/default.png")');

                $('.main-content .profile-img .modal-actions input[id="upload-new-profile"]').change(function () {
                    //$('.main-content .profile-img .modal-actions .submit-photo').addClass('dsp-block');
                    // console.log($('.modal-actions input[id="upload-new-profile"]').val());
                    let form = new FormData();
                    let imageFile = $('.modal-actions input[id="upload-new-profile"]')[0].files;
                    if (imageFile.length > 0) {
                        form.append('sentimage', imageFile[0]);
                    }
                    let uploadProfile = {
                        "url": "/api/users/userProfileImageUpload.php",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Authorization": `Bearer ${token.token}`
                        },
                        "processData": false,
                        "mimeType": "multipart/form-data",
                        "contentType": false,
                        "data": form
                    }

                    $.ajax(uploadProfile).done(function (response) {
                        updateUserProfilePic();
                    });
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

                            $('.side-nav .user-profile-img .img-container').css('background-image', 'url("./frontend/assets/images/default.png")');
                            $('.main-content .profile-img .img-container').css('background-image', 'url("./frontend/assets/images/default.png")');
                            $('.main-content .profile-img .modal-actions label[for="upload-new-profile"] .title-text').text("Upload Photo");

                        } else {
                            $('.side-nav .user-profile-img .img-container').css('background-image', `url("./storage/public/userAvatars/${response.data.user_profile_pic}")`);
                            $('.main-content .profile-img .img-container').css('background-image', `url("./storage/public/userAvatars/${response.data.user_profile_pic}")`);
                            $('.main-content .profile-img .modal-actions label[for="upload-new-profile"] .title-text').text("Change Photo");
                        }

                    })
                }

                function removeProfilePic(){
                    let removeProfile = {
                        "url": "api/users/userProfileImageRemove.php",
                        "method": "POST",
                        "timeout": 0,
                        "headers":{
                            "Authorization": `Bearer ${token.token}`
                        },
                    }

                    $.ajax(removeProfile).done(function(response){
                        console.log(response);
                    });
                }


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