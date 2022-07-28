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
                            let mealName = $('<h2 class="meal-name"></h2>').text(meal.meal_name);
                            let container = $('<div class="inner-container"></div>').append(mealName);
                            let mealListItem = $('<div class="meal-item list-item"></div>').append(container);
                            mealListItem.data('mealId', meal.meal_id);
                            mealListItem.data('mealName', meal.meal_name);
                            mealListItem.data('mealCalories', meal.meal_calories);
                            mealListItem.data('mealType', meal.meal_type);
                            mealListItem.data('mealIngredients', meal.meal_ingredients);
                            mealListItem.data('mealInstructions', meal.meal_instructions);
                            $('.meals-sec .breakfast-list').append(mealListItem);
                        } else if (meal.meal_type === "lunch") {
                            let mealName = $('<h2 class="meal-name"></h2>').text(meal.meal_name);
                            let container = $('<div class="inner-container"></div>').append(mealName);
                            let mealListItem = $('<div class="meal-item list-item"></div>').append(container);
                            mealListItem.data('mealId', meal.meal_id);
                            mealListItem.data('mealName', meal.meal_name);
                            mealListItem.data('mealCalories', meal.meal_calories);
                            mealListItem.data('mealType', meal.meal_type);
                            mealListItem.data('mealIngredients', meal.meal_ingredients);
                            mealListItem.data('mealInstructions', meal.meal_instructions);
                            $('.meals-sec .lunch-list').append(mealListItem);
                        } else if (meal.meal_type === "dinner") {
                            let mealName = $('<h2 class="meal-name"></h2>').text(meal.meal_name);
                            let container = $('<div class="inner-container"></div>').append(mealName);
                            let mealListItem = $('<div class="meal-item list-item"></div>').append(container);
                            mealListItem.data('mealId', meal.meal_id);
                            mealListItem.data('mealName', meal.meal_name);
                            mealListItem.data('mealCalories', meal.meal_calories);
                            mealListItem.data('mealType', meal.meal_type);
                            mealListItem.data('mealIngredients', meal.meal_ingredients);
                            mealListItem.data('mealInstructions', meal.meal_instructions);
                            $('.meals-sec .dinner-list').append(mealListItem);
                        } else if (meal.meal_type === "snack") {
                            let mealName = $('<h2 class="meal-name"></h2>').text(meal.meal_name);
                            let container = $('<div class="inner-container"></div>').append(mealName);
                            let mealListItem = $('<div class="meal-item list-item"></div>').append(container);
                            mealListItem.data('mealId', meal.meal_id);
                            mealListItem.data('mealName', meal.meal_name);
                            mealListItem.data('mealCalories', meal.meal_calories);
                            mealListItem.data('mealType', meal.meal_type);
                            mealListItem.data('mealIngredients', meal.meal_ingredients);
                            mealListItem.data('mealInstructions', meal.meal_instructions);
                            $('.meals-sec .snack-list').append(mealListItem);
                        }
                    })
                }
            })
        }

        $(document).on('click', '.meals-sec .user-meals .meal-item', function () {
            $('.meals-sec .rec-meal-detail-modal').addClass('dsp-flex');
            $('body').addClass('overlay');
            $('.meals-sec .rec-meal-detail-modal .meal-id').text($(this).data('mealId'));
            $('.meals-sec .rec-meal-detail-modal .meal-name').text($(this).data('mealName'));
            $('.meals-sec .rec-meal-detail-modal .meal-calories').text($(this).data('mealCalories'));
            $('.meals-sec .rec-meal-detail-modal .meal-type').text($(this).data('mealType'));
            $('.meals-sec .rec-meal-detail-modal .meal-instructions').text($(this).data('mealInstructions'));
            let mealInstructions = $(this).data('mealIngredients');
            let arrMealIns = mealInstructions.split('|');
            $.map(arrMealIns, function (mealIns, index) {
                let listItem = $('<li class="list-item"></li>');
                listItem.text(mealIns);
                $('.meals-sec .rec-meal-detail-modal .meal-ingredients').append(listItem);
            })
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

    }
});