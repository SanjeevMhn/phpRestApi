$(document).ready(function () {

    let token = JSON.parse(localStorage.getItem("jwt"));
    if (location.pathname == '/meals') {

        let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
        sideMenu[2].classList.add('active');

        getAllMeals();
        function getAllMeals() {
            let meals = {
                "url": "/api/users/getUserMeals.php",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token.token}`
                }
            }

            $.ajax(meals).done(function (response) {
                if (response.success == 1) {
                    $.map(response.meals, function (meal, index) {
                        if (meal.meal_type === "breakfast") {
                            let mealName = $('<h2 class="meal-name pl-10"></h2>').text(meal.meal_name);
                            let mealImg = $('<div class="meal-img img-container-100"></div>')
                            mealImg.css('background-image', meal.meal_img);
                            let container = $('<div class="inner-container dsp-flex align-items-center"></div>');
                            container.append(mealImg);
                            container.append(mealName);
                            let mealListItem = $('<div class="meal-item list-item"></div>').append(container);
                            mealListItem.data('mealId', meal.meal_id);
                            mealListItem.data('mealName', meal.meal_name);
                            mealListItem.data('mealCalories', meal.meal_calories);
                            mealListItem.data('mealType', meal.meal_type);
                            mealListItem.data('mealIngredients', meal.meal_ingredients);
                            mealListItem.data('mealInstructions', meal.meal_instructions);
                            mealListItem.data('mealImg', meal.meal_img);
                            $('.meals-sec .breakfast-list').append(mealListItem);
                        } else if (meal.meal_type === "lunch") {
                            let mealName = $('<h2 class="meal-name pl-10"></h2>').text(meal.meal_name);
                            let mealImg = $('<div class="meal-img img-container-100"></div>')
                            mealImg.css('background-image', meal.meal_img);
                            let container = $('<div class="inner-container dsp-flex align-items-center"></div>');
                            container.append(mealImg);
                            container.append(mealName);
                            let mealListItem = $('<div class="meal-item list-item"></div>').append(container);
                            mealListItem.data('mealId', meal.meal_id);
                            mealListItem.data('mealName', meal.meal_name);
                            mealListItem.data('mealCalories', meal.meal_calories);
                            mealListItem.data('mealType', meal.meal_type);
                            mealListItem.data('mealIngredients', meal.meal_ingredients);
                            mealListItem.data('mealInstructions', meal.meal_instructions);
                            mealListItem.data('mealImg', meal.meal_img);
                            $('.meals-sec .lunch-list').append(mealListItem);
                        } else if (meal.meal_type === "dinner") {
                            let mealName = $('<h2 class="meal-name pl-10"></h2>').text(meal.meal_name);
                            let mealImg = $('<div class="meal-img img-container-100"></div>')
                            mealImg.css('background-image', meal.meal_img);
                            let container = $('<div class="inner-container dsp-flex align-items-center"></div>');
                            container.append(mealImg);
                            container.append(mealName);
                            let mealListItem = $('<div class="meal-item list-item"></div>').append(container);
                            mealListItem.data('mealId', meal.meal_id);
                            mealListItem.data('mealName', meal.meal_name);
                            mealListItem.data('mealCalories', meal.meal_calories);
                            mealListItem.data('mealType', meal.meal_type);
                            mealListItem.data('mealIngredients', meal.meal_ingredients);
                            mealListItem.data('mealInstructions', meal.meal_instructions);
                            mealListItem.data('mealImg', meal.meal_img);
                            $('.meals-sec .dinner-list').append(mealListItem);
                        } else if (meal.meal_type === "snack") {
                            let mealName = $('<h2 class="meal-name pl-10"></h2>').text(meal.meal_name);
                            let mealImg = $('<div class="meal-img img-container-100"></div>')
                            mealImg.css('background-image', meal.meal_img);
                            let container = $('<div class="inner-container dsp-flex align-items-center"></div>');
                            container.append(mealImg);
                            container.append(mealName);
                            let mealListItem = $('<div class="meal-item list-item"></div>').append(container);
                            mealListItem.data('mealId', meal.meal_id);
                            mealListItem.data('mealName', meal.meal_name);
                            mealListItem.data('mealCalories', meal.meal_calories);
                            mealListItem.data('mealType', meal.meal_type);
                            mealListItem.data('mealIngredients', meal.meal_ingredients);
                            mealListItem.data('mealInstructions', meal.meal_instructions);
                            mealListItem.data('mealImg', meal.meal_img);
                            $('.meals-sec .snack-list').append(mealListItem);
                        }
                    })
                }
            })
        }

        createMealPlan();
        function createMealPlan() {

            let userDetail = JSON.parse(localStorage.getItem("profile_detail"));
            console.log(userDetail);

            let getUserMeal = {
                "url": "/api/users/getUserMeals.php",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token.token}`
                }
            }

            $.ajax(getUserMeal).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    let li = $('<div class="meal-plan-item list-item pointer"></div>');
                    let container = $('<div class="inner-container"></div>');
                    let mealName = $('<h3 class="meal-name"></h3>');
                    mealName.text("Meal Plan");
                    let mealsArray = [];
                    let mealCalories = 0;
                    let userCalorie = parseInt(userDetail.user_daily_calorie);
                    let calorie = 0;
                    let randomMeals = [];
                    response.meals.map((respMeal, index) => {
                        randomMeals.push(Math.floor(Math.random() * response.meals.length));
                        // if(parseInt(respMeal.meal_calories) + mealCalories < userCalorie){
                        //     mealsArray.push(respMeal);
                        //     mealCalories = mealCalories + parseInt(respMeal.meal_calories);
                        // }
                    })
                    // console.log(randomMeals);

                    let uniqueMeals = [...new Set(randomMeals)]; //removes duplicates from the array//
                    uniqueMeals.map((uM, index) => {
                        if (parseInt(response.meals[uM].meal_calories) + mealCalories < userCalorie) {
                            mealsArray.push(response.meals[uM]);
                            mealCalories = mealCalories + parseInt(response.meals[uM].meal_calories);
                        }
                    })
                    container.append(mealName);
                    li.append(container);
                    li.data('meals', JSON.stringify(mealsArray));
                    console.log(li);
                    li.data('totalCalories', mealCalories);
                    li.data('mealPlanName', mealName.text());
                    $('.meals-sec .meal-plan-list').append(li);
                }
            })
        }

        getUserCreatedMealPlan();
        function getUserCreatedMealPlan() {
            let getUserCreatedMeal = {
                "url": "/api/users/getUserMealPlans.php",
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token.token}`,
                    "Content-Type": "application/json"
                },
            }

            $.ajax(getUserCreatedMeal).done(function (response) {
                console.log(response);
                response.meal_plans.map((mP, index) => {
                    let li = $('<div class="meal-plan-item list-item pointer"></div>');
                    let container = $('<div class="inner-container"></div>');
                    let mealPlanName = $('<h3 class="meal-name"></h3>');
                    let mealsArray = [];
                    mealPlanName.text(mP.meal_plan_name);
                    container.append(mealPlanName);
                    li.append(container);
                    li.data('mealPlanName',mP.meal_plan_name);
                    li.data('totalCalories',mP.meal_plan_calories);
                    $('.user-added-meal-plan .meal-plan-list').append(li);
                })
            })
        }

        $(document).on('click', '.meal-plan-list .meal-plan-item', function () {
            $('body').addClass('overlay');
            $('.user-meal-plan-modal').addClass('dsp-flex');
            let mealArry = JSON.parse($(this).data("meals"));
            $('.user-meal-plan-modal .total-calories').text($(this).data('totalCalories'));
            $('.user-meal-plan-modal .meal-plan-name').text($(this).data('mealPlanName'));
            console.log(mealArry);
            $.map(mealArry, function (mA, index) {
                let li = $('<li class="meal-item pb-20"></li>');
                let mealLink = $('<a href="javascript:void(0)" class="get-meal meal-link dsp-flex align-items-end"></a>')
                let imgThumbnail = $('<div class="img-container-100"></div>');
                imgThumbnail.css("background-image", mA.meal_img);
                let mealName = $('<span class="meal-name pl-10"></span>');

                mealLink.data('name', mA.meal_name);
                mealLink.data('ingredients', mA.meal_ingredients);
                mealLink.data('instructions', mA.meal_instructions);
                mealLink.data('type', mA.meal_type);
                // let intCalories = Math.floor(recp.recipe.calories)
                mealLink.data('calories', mA.meal_calories);
                mealLink.data('image', mA.meal_img);
                mealName.text(mA.meal_name);
                mealLink.append(imgThumbnail);
                mealLink.append(mealName);
                li.append(mealLink);
                $('.user-meal-plan-modal .meal-plan-list').append(li);
            })
        })

        $(document).on('click', '.meals-sec .user-meals .meal-item', function () {
            $('.meals-sec .rec-meal-detail-modal').addClass('dsp-flex');
            $('body').addClass('overlay');
            $('.meals-sec .rec-meal-detail-modal .meal-id').text($(this).data('mealId'));
            $('.meals-sec .rec-meal-detail-modal .meal-img').css('background-image', $(this).data('mealImg'));
            $('.meals-sec .rec-meal-detail-modal .meal-name').text($(this).data('mealName'));
            $('.meals-sec .rec-meal-detail-modal .meal-calories').text($(this).data('mealCalories'));
            $('.meals-sec .rec-meal-detail-modal .meal-type').text($(this).data('mealType'));
            $('.meals-sec .rec-meal-detail-modal .meal-instructions').text($(this).data('mealInstructions'));
            $('.meals-sec .rec-meal-detail-modal .meal-instructions').attr('href', $(this).data('mealInstructions'));
            let mealInstructions = $(this).data('mealIngredients');
            let arrMealIns = mealInstructions.split('|');
            $.map(arrMealIns, function (mealIns, index) {
                let listItem = $('<li class="list-item"></li>');
                listItem.text(mealIns);
                $('.meals-sec .rec-meal-detail-modal .meal-ingredients').append(listItem);
            })
        })

        $(document).on('click', '.user-meal-plan-modal .meal-plan-list .meal-item', function () {
            // $('.meals-sec .rec-meal-detail-modal').addClass('dsp-flex');
            // $('body').addClass('overlay');
            // $('.meals-sec .rec-meal-detail-modal .meal-id').text($(this).data('mealId'));
            // $('.meals-sec .rec-meal-detail-modal .meal-img').css('background-image', $(this).data('mealImg'));
            // $('.meals-sec .rec-meal-detail-modal .meal-name').text($(this).data('mealName'));
            // $('.meals-sec .rec-meal-detail-modal .meal-calories').text($(this).data('mealCalories'));
            // $('.meals-sec .rec-meal-detail-modal .meal-type').text($(this).data('mealType'));
            // $('.meals-sec .rec-meal-detail-modal .meal-instructions').text($(this).data('mealInstructions'));
            // $('.meals-sec .rec-meal-detail-modal .meal-instructions').attr('href', $(this).data('mealInstructions'));
            // let mealInstructions = $(this).data('mealIngredients');
            // let arrMealIns = mealInstructions.split('|');
            // $.map(arrMealIns, function (mealIns, index) {
            //     let listItem = $('<li class="list-item"></li>');
            //     listItem.text(mealIns);
            //     $('.meals-sec .rec-meal-detail-modal .meal-ingredients').append(listItem);
            // })
        })

        $('.rec-meal-detail-modal .modal-actions .cancel').click(function () {
            $('.rec-meal-detail-modal').removeClass('dsp-flex');
            $('.rec-meal-detail-modal .meal-detail .meal-ingredients').html('');
            $('.rec-meal-detail-modal .meal-detail .meal-calories').text('');
            $('body').removeClass('overlay');
        })

        $('.rec-meal-detail-modal .close-btn').click(function () {
            $('.rec-meal-detail-modal').removeClass('dsp-flex');
            $('.rec-meal-detail-modal .meal-detail .meal-ingredients').html('');
            $('.rec-meal-detail-modal .meal-detail .meal-calories').text('');
            $('body').removeClass('overlay');
        })

        $('.user-meal-plan-modal .modal-actions .cancel').click(function () {
            $('.user-meal-plan-modal').removeClass('dsp-flex');
            $('.user-meal-plan-modal .meal-plan-list').html('');
            $('body').removeClass('overlay');
        })

        $('.user-meal-plan-modal .close-btn').click(function () {
            $('.user-meal-plan-modal').removeClass('dsp-flex');
            $('.user-meal-plan-modal .meal-plan-list').html('');
            $('body').removeClass('overlay');
        })

        $('.rec-meal-detail-modal .modal-actions .delete-meal').click(function () {
            let deleteMeal = {
                "url": "/api/users/deleteUserMeal.php",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token.token}`,
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({
                    "meal_id": $('.rec-meal-detail-modal .meal-detail .meal-id').text()
                })
            }

            $.ajax(deleteMeal).done(function (response) {
                console.log(response);
                if (response.success == 1) {
                    $('.rec-meal-detail-modal').removeClass('dsp-flex');
                    $('.rec-meal-detail-modal .meal-detail .meal-ingredients').html('');
                    $('.rec-meal-detail-modal .meal-detail .meal-calories').text('');
                    window.location.reload(true);
                    $('body').removeClass('overlay');
                }
            })
        })


        $('.user-meal-plan-modal .modal-actions .save-meal-plan').click(function () {
            let mealListItem = $('.user-meal-plan-modal .meal-plan-list .meal-item .meal-link');
            let mealPlanMealDetails = [];
            console.log(mealListItem);

            $.map(mealListItem, function (meal, index) {
                let mealInfo = {
                    "meal_name": $(meal).data("name"),
                    "meal_calories": $(meal).data("calories"),
                    "meal_type": $(meal).data("type"),
                    "meal_ingredients": $(meal).data("ingredients"),
                    "meal_instructions": $(meal).data("instructions"),
                    "meal_img": $(meal).data("image")
                }
                mealPlanMealDetails.push(mealInfo);
            })

            console.log({
                "meal_plan_name": $.trim($('.user-meal-plan-modal .meal-plan-name').text()),
                "meal_plan_calories": parseInt($('.user-meal-plan-modal .total-calories').text()),
                "meal_plan_meals": mealPlanMealDetails,
            });

            let addMealPlan = {
                "url": "/api/users/setUserMealPlan.php",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Authorization": `Bearer ${token.token}`,
                    "Content-Type": 'application/json'
                },
                "data": JSON.stringify({
                    "meal_plan_name": $.trim($('.user-meal-plan-modal .meal-plan-name').text()),
                    "meal_plan_calories": parseInt($('.user-meal-plan-modal .total-calories').text()),
                    "meal_plan_meals": mealPlanMealDetails,
                })
            }

            $.ajax(addMealPlan).done(function (response) {
                console.log(response);
            })
        })

        $('.generate-new').click(function () {
            window.location.reload();
        })

    }
});