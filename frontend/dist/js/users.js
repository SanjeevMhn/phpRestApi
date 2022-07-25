$(document).ready(function () {
    let token = JSON.parse(localStorage.getItem('jwt'));
    if (location.pathname == '/users') {

        let token = JSON.parse(localStorage.getItem('jwt'));
        let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
        sideMenu[1].classList.add('active');

        if (token && token.user_type == "admin") {
            let getUsers = {
                'url': '/api/admin/getUsers.php',
                'method': 'POST',
                'timeout': 0,
                'headers': {
                    'Authorization': `Bearer ${token.token}`
                }
            };

            $.ajax(getUsers).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    let users = response.users;
                    let userTable = $('.user-table');
                    let number = 0;
                    $.map(users, (user, index) => {
                        number++;
                        let sNtd = $('<span class="data-col"></span>');
                        let userNameTd = $(`<a href="/profile" class="data-col"></a>`);
                        let userEmailTd = $('<span class="data-col"></span>');
                        let userGoalTd = $('<span class="data-col"></span>');
                        let userWeightTd = $('<span class="data-col"></span>');
                        let weightMetricTd = $('<span class="data-col"></span>');
                        let tr = $('<div class="user-tbl-row"></div>');
                        sNtd.text(number);
                        userNameTd.text(user.name);
                        userEmailTd.text(user.email);
                        userGoalTd.text(user.user_goal);
                        userWeightTd.text(user.user_weight);
                        weightMetricTd.text(user.weight_metric);

                        userNameTd.click(function(){
                            window.localStorage.setItem("profile_id",user.id);
                        })

                        tr.append(sNtd);
                        tr.append(userNameTd);
                        tr.append(userEmailTd);
                        tr.append(userGoalTd);
                        tr.append(userWeightTd);
                        tr.append(weightMetricTd);

                        userTable.append(tr);
                    })
                }
            })
        } else {
            window.location.reload(true);
            localStorage.removeItem('jwt');
            localStorage.removeItem('profile_id');
            window.location.replace('/login');
        }

    }
})