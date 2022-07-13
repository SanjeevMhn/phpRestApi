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
                        let sNtd = $('<span></span>');
                        let userNameTd = $('<span></span>');
                        let userEmailTd = $('<span></span>');
                        let userGoalTd = $('<span></span>');
                        let userWeightTd = $('<span></span>');
                        let weightMetricTd = $('<span></span>');
                        let tr = $('<div class="tbl-row"></div>');
                        sNtd.text(number);
                        userNameTd.text(user.name);
                        userEmailTd.text(user.email);
                        userGoalTd.text(user.user_goal);
                        userWeightTd.text(user.user_weight);
                        weightMetricTd.text(user.weight_metric);

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
            window.location.replace('/login');
        }

    }
})