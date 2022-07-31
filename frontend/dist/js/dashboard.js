
$(document).ready(function () {

    let token = JSON.parse(localStorage.getItem("jwt"));
    if (location.pathname === "/dashboard") {
        let token = JSON.parse(localStorage.getItem("jwt"));
        let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
        sideMenu[0].classList.add('active');

        if (token && token.user_type === "user") {
            let getUserInfo = {
                url: "/api/users/getUser.php",
                method: "POST",
                timeout: 0,
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            };
            //to get user name and email
            $.ajax(getUserInfo).done(function (response) {
                if (response.success == 1) {
                    $(".user-detail .user-name").html(response.user.name);
                }
                let userDetail = {
                    "user_name": response.user.name,
                    "user_email": response.user.email
                };
                localStorage.setItem('profile_detail', JSON.stringify(userDetail));
            });

            let userGoal = {
                url: "/api/users/getUserWorkoutGoal.php",
                method: "POST",
                timeout: 0,
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            };

            //to get users workout goal
            $.ajax(userGoal).done(function (response) {
                if (response.success == 0) {
                    $(".user-goal-form").addClass('dsp-flex');
                    $('body').addClass('overlay');
                    $(".recommended-workouts").css("display", "none");
                } else if (response.success == 1) {
                    $(".recommended-workouts").css("display", "block");
                    getUserIdealCalories();
                    recommendedWorkouts();
                    //recommendedMeals();
                }
            });

            //search recipe form//
            $('.recipe-search-form').submit(function (e) {
                e.preventDefault();
                let mealSearch = $('.recipe-search-form input[name="recipe-search"]').val();

                if (mealSearch == '' || mealSearch == null) {
                    $('.err-search-meal').addClass('dsp-block');
                } else {
                    $('.err-search-meal').removeClass('dsp-block');
                    $('body').addClass('overlay');
                    $('.search-meal-list-modal').addClass('dsp-flex');
                    let searchMeal = {
                        "url": `https://api.edamam.com/api/recipes/v2?type=public&q=${mealSearch}&app_id=9541f18d&app_key=3c9706df6a0f41bf50358fb4541fc7cb`,
                        "method": "GET",
                        "timeout": 0
                    }
                    $.ajax(searchMeal).done(function (response) {
                        let hits = response.hits;
                        hits.map((recp, index) => {
                            console.log(recp.recipe.images.THUMBNAIL.url);
                            let li = $('<li class="meal-item pb-20"></li>');
                            let mealLink = $('<a href="javascript:void(0)" class="search-meal-link meal-link dsp-flex align-items-end"></a>')
                            let imgThumbnail = $('<div class="img-container-100"></div>');
                            let mealName = $('<span class="meal-name pl-10"></span>');
                            imgThumbnail.css("background-image", `url("${recp.recipe.images.THUMBNAIL.url}")`);
                            mealLink.attr('name', recp.recipe.label);
                            mealLink.data('name', recp.recipe.label);
                            mealLink.data('ingredients', recp.recipe.ingredientLines);
                            mealLink.data('servings', recp.recipe.servings);
                            mealLink.data('instructions', recp.recipe.url);
                            mealLink.data('type', 'breakfast');
                            let intCalories = Math.floor(recp.recipe.calories)
                            mealLink.data('calories', intCalories);
                            mealLink.data('image', recp.recipe.images.REGULAR.url);
                            mealName.text(recp.recipe.label);
                            mealLink.append(imgThumbnail);
                            mealLink.append(mealName);
                            li.append(mealLink);
                            $('.search-meal-list-modal .search-meal-list').append(li);
                        })
                    })


                    $(document).on('click', '.search-meal-link', function () {
                        $('.search-meal-detail-modal').addClass('dsp-flex');

                        let mealName = $(this).data('name');
                        let mealIngredients = $(this).data('ingredients');
                        let mealInstructions = $(this).data('instructions');
                        let stringMealIngredients = mealIngredients.join('|');
                        // let mealType = $(this).data('type');
                        let mealCalories = $(this).data('calories');
                        $('.search-meal-detail-modal .meal-detail .meal-name').text(mealName);
                        $.map(mealIngredients, function (mealIns, index) {
                            let listItem = $('<li class="list-item"></li>');
                            listItem.text(mealIns);
                            $('.meal-ingredients').append(listItem);
                        });
                        // $('.rec-meal-detail-modal .meal-detail .meal-servings').text(mealServings);
                        $('.search-meal-detail-modal .meal-detail .meal-instructions').attr('href', mealInstructions);
                        $('.search-meal-detail-modal .meal-detail .meal-instructions').text(mealInstructions);
                        // $('.rec-meal-detail-modal .meal-detail .meal-type').text(mealType);
                        $('.search-meal-detail-modal .meal-detail .meal-calories').text(mealCalories);
                        $('.search-meal-detail-modal .meal-detail .meal-img').css("background-image", `url("${$(this).data('image')}")`);
                    })

                    $('.search-meal-detail-modal .close-btn').click(function () {
                        $('.search-meal-detail-modal').removeClass('dsp-flex');
                        $('.search-meal-detail-modal .meal-detail .meal-ingredients').html('');
                        $('.search-meal-detail-modal .meal-detail .meal-calories').text('');
                    })
                    $('.search-meal-detail-modal .modal-actions .cancel').click(function () {
                        $('.search-meal-detail-modal').removeClass('dsp-flex');
                        $('.search-meal-detail-modal .meal-detail .meal-ingredients').html('');
                        $('.search-meal-detail-modal .meal-detail .meal-calories').text('');
                    })

                    $('.search-meal-list-modal .close-btn').click(function () {
                        $('.search-meal-list-modal').removeClass('dsp-flex');
                        $('.search-meal-list-modal .search-meal-list').html('');
                        $('body').removeClass('overlay');
                    })

                    //adding search result items to user meals
                    $('.search-meal-detail-modal .meal-detail .modal-actions .add-meal').click(function () {
                        let arrMealIngredients = $('.search-meal-detail-modal .meal-ingredients .list-item');
                        let ingredientsName = [];
                        $.map(arrMealIngredients,function(aI,index){
                            ingredientsName.push($(aI).text());
                        })
                        let stringMealIngredients = ingredientsName.join('|');
                        let addSearchedMeal = {
                            "url": "/api/users/setUserMeal.php",
                            "method": "POST",
                            "timeout": 0,
                            "headers": {
                                "Authorization": `Bearer ${token.token}`,
                                "Content-Type": "application/json"
                            },
                            "data": JSON.stringify({
                                "meal_name": $('.search-meal-detail-modal .meal-detail .meal-name').text(),
                                "meal_calories": $('.search-meal-detail-modal .meal-detail .meal-calories').text(),
                                "meal_type": $('.search-meal-detail-modal .meal-detail select[name="meal-type"] option:selected').val(),
                                "meal_ingredients": stringMealIngredients,
                                "meal_instructions": $('.search-meal-detail-modal .meal-detail .meal-instructions').text(),
                                "meal_img": $('.search-meal-detail-modal .meal-detail .meal-img').css('background-image'),
                            })
                        }

                        $.ajax(addSearchedMeal).done(function (response) {
                            console.log(response);
                            if (response.success == 1) {
                                $('.search-meal-detail-modal').removeClass('dsp-flex');
                                $('.search-meal-detail-modal .meal-detail .meal-ingredients').html('');
                                $('.search-meal-detail-modal .meal-detail .meal-calories').text('');
                            }
                        })
                    })
                }
            })



            $('.rec-breakfast-list-modal .close-btn').click(function () {
                $('.rec-breakfast-list-modal').removeClass('dsp-flex');
                $('body').removeClass('overlay');
                $('.rec-breakfast-list-modal .meal-list').html('');
            })
            $('.rec-meal-detail-modal .modal-actions .cancel').click(function () {
                $('.rec-meal-detail-modal').removeClass('dsp-flex');
                $('.rec-meal-detail-modal .meal-detail .meal-ingredients').html('');
                $('.rec-meal-detail-modal .meal-detail .meal-calories').text('');
            })

            $('.rec-meal-detail-modal .close-btn').click(function () {
                $('.rec-meal-detail-modal').removeClass('dsp-flex');
                $('.rec-meal-detail-modal .meal-detail .meal-ingredients').html('');
                $('.rec-meal-detail-modal .meal-detail .meal-calories').text('');
            })

            $('.rec-meal-card.breakfast').click(function () {
                $('.rec-breakfast-list-modal').addClass('dsp-flex');
                $('.rec-breakfast-list-modal h2').text("List of Breakfast options")
                $('body').addClass('overlay');
                let breakfastMealList = $('.meal-list');
                let recommendedMealBreakfast = {
                    // "url": "https://api.api-ninjas.com/v1/recipe?query=breakfast",
                    "url": "https://api.edamam.com/api/recipes/v2?type=public&q=breakfast&app_id=9541f18d&app_key=3c9706df6a0f41bf50358fb4541fc7cb",
                    "method": "GET",
                    "timeout": 0,
                    // "headers": {
                    //     "x-api-key": 'SrSAaegWn7kpQszNO6D3sQ==nhwKmMMZzXZ7eaKJ'
                    // }
                }
                $.ajax(recommendedMealBreakfast).done(function (response) {
                    // response.map((resp, index) => {
                    let li = $('<li class="meal-item"></li>');
                    let mealLink = $('<a href="javascript:void(0)" class="meal-link"></a>')

                    let hits = response.hits;
                    hits.map((recp, index) => {
                        console.log(recp.recipe.images.THUMBNAIL.url);
                        let li = $('<li class="meal-item pb-20"></li>');
                        let mealLink = $('<a href="javascript:void(0)" class="rec-meal-link meal-link dsp-flex align-items-end"></a>')
                        let imgThumbnail = $('<div class="img-container"></div>');
                        let mealName = $('<span class="meal-name pl-10"></span>');
                        imgThumbnail.css("background-image", `url("${recp.recipe.images.THUMBNAIL.url}")`);
                        mealLink.attr('name', recp.recipe.label);
                        mealLink.data('name', recp.recipe.label);
                        mealLink.data('ingredients', recp.recipe.ingredientLines);
                        mealLink.data('servings', recp.recipe.servings);
                        mealLink.data('instructions', recp.recipe.url);
                        mealLink.data('type', 'breakfast');
                        let intCalories = Math.floor(recp.recipe.calories)
                        mealLink.data('calories', intCalories);
                        mealLink.data('image', recp.recipe.images.REGULAR.url);
                        mealName.text(recp.recipe.label);
                        mealLink.append(imgThumbnail);
                        mealLink.append(mealName);
                        li.append(mealLink);
                        breakfastMealList.append(li);
                    })
                    // li.append(mealLink);
                    // breakfastMealList.append(li);
                    // })
                });
            })

            $('.rec-meal-card.lunch').click(function () {
                $('.rec-breakfast-list-modal').addClass('dsp-flex');
                $('.rec-breakfast-list-modal h2').text("List of Lunch options")
                $('body').addClass('overlay');
                let breakfastMealList = $('.meal-list');
                let mealList = $('.meal-list');
                let recommendedMealLunch = {
                    // "url": "https://api.api-ninjas.com/v1/recipe?query=lunch",
                    "url": "https://api.edamam.com/api/recipes/v2?type=public&q=lunch&app_id=9541f18d&app_key=3c9706df6a0f41bf50358fb4541fc7cb",
                    "method": "GET",
                    "timeout": 0,
                    // "headers": {
                    //     "x-api-key": 'SrSAaegWn7kpQszNO6D3sQ==nhwKmMMZzXZ7eaKJ'
                    // }
                }
                $.ajax(recommendedMealLunch).done(function (response) {
                    let hits = response.hits;
                    hits.map((recp, index) => {
                        console.log(recp.recipe.images.THUMBNAIL.url);
                        let li = $('<li class="meal-item pb-20"></li>');
                        let mealLink = $('<a href="javascript:void(0)" class="rec-meal-link meal-link dsp-flex align-items-end"></a>')
                        let imgThumbnail = $('<div class="img-container"></div>');
                        let mealName = $('<span class="meal-name pl-10"></span>');
                        imgThumbnail.css("background-image", `url("${recp.recipe.images.THUMBNAIL.url}")`);
                        mealLink.attr('name', recp.recipe.label);
                        mealLink.data('name', recp.recipe.label);
                        mealLink.data('ingredients', recp.recipe.ingredientLines);
                        mealLink.data('servings', recp.recipe.servings);
                        mealLink.data('instructions', recp.recipe.url);
                        mealLink.data('type', 'lunch');
                        let intCalories = Math.floor(recp.recipe.calories)
                        mealLink.data('calories', intCalories);
                        mealLink.data('image', recp.recipe.images.REGULAR.url);
                        mealName.text(recp.recipe.label);
                        mealLink.append(imgThumbnail);
                        mealLink.append(mealName);
                        li.append(mealLink);
                        breakfastMealList.append(li);
                    })
                });
            })

            $('.rec-meal-card.snack').click(function () {
                $('.rec-breakfast-list-modal').addClass('dsp-flex');
                $('.rec-breakfast-list-modal h2').text("List of Snack options")
                $('body').addClass('overlay');
                let breakfastMealList = $('.meal-list');
                let mealList = $('.meal-list');
                let recommendedMealSnack = {
                    // "url": "https://api.api-ninjas.com/v1/recipe?query=snack",
                    "url": "https://api.edamam.com/api/recipes/v2?type=public&q=snack&app_id=9541f18d&app_key=3c9706df6a0f41bf50358fb4541fc7cb",
                    "method": "GET",
                    "timeout": 0,
                    // "headers": {
                    //     "x-api-key": 'SrSAaegWn7kpQszNO6D3sQ==nhwKmMMZzXZ7eaKJ'
                    // }
                }
                $.ajax(recommendedMealSnack).done(function (response) {
                    let hits = response.hits;
                    hits.map((recp, index) => {
                        console.log(recp.recipe.images.THUMBNAIL.url);
                        let li = $('<li class="meal-item pb-20"></li>');
                        let mealLink = $('<a href="javascript:void(0)" class="rec-meal-link meal-link dsp-flex align-items-end"></a>')
                        let imgThumbnail = $('<div class="img-container"></div>');
                        let mealName = $('<span class="meal-name pl-10"></span>');
                        imgThumbnail.css("background-image", `url("${recp.recipe.images.THUMBNAIL.url}")`);
                        mealLink.attr('name', recp.recipe.label);
                        mealLink.data('name', recp.recipe.label);
                        mealLink.data('ingredients', recp.recipe.ingredientLines);
                        mealLink.data('servings', recp.recipe.servings);
                        mealLink.data('instructions', recp.recipe.url);
                        mealLink.data('type', 'snack');
                        let intCalories = Math.floor(recp.recipe.calories)
                        mealLink.data('calories', intCalories);
                        mealLink.data('image', recp.recipe.images.REGULAR.url);
                        mealName.text(recp.recipe.label);
                        mealLink.append(imgThumbnail);
                        mealLink.append(mealName);
                        li.append(mealLink);
                        breakfastMealList.append(li);
                    })
                })
            });

            $('.rec-meal-card.dinner').click(function () {
                $('.rec-breakfast-list-modal').addClass('dsp-flex');
                $('.rec-breakfast-list-modal h2').text("List of Dinner options")
                $('body').addClass('overlay');
                let breakfastMealList = $('.meal-list');
                let mealList = $('.meal-list');
                let recommendedMealDinner = {
                    // "url": "https://api.api-ninjas.com/v1/recipe?query=dinner",
                    "url": "https://api.edamam.com/api/recipes/v2?type=public&q=dinner&app_id=9541f18d&app_key=3c9706df6a0f41bf50358fb4541fc7cb",
                    "method": "GET",
                    "timeout": 0,
                    // "headers": {
                    //     "x-api-key": 'SrSAaegWn7kpQszNO6D3sQ==nhwKmMMZzXZ7eaKJ'
                    // }
                }
                $.ajax(recommendedMealDinner).done(function (response) {
                    let hits = response.hits;
                    hits.map((recp, index) => {
                        console.log(recp.recipe.images.THUMBNAIL.url);
                        let li = $('<li class="meal-item pb-20"></li>');
                        let mealLink = $('<a href="javascript:void(0)" class="rec-meal-link meal-link dsp-flex align-items-end"></a>')
                        let imgThumbnail = $('<div class="img-container"></div>');
                        let mealName = $('<span class="meal-name pl-10"></span>');
                        imgThumbnail.css("background-image", `url("${recp.recipe.images.THUMBNAIL.url}")`);
                        mealLink.attr('name', recp.recipe.label);
                        mealLink.data('name', recp.recipe.label);
                        mealLink.data('ingredients', recp.recipe.ingredientLines);
                        mealLink.data('servings', recp.recipe.servings);
                        mealLink.data('instructions', recp.recipe.url);
                        mealLink.data('type', 'dinner');
                        let intCalories = Math.floor(recp.recipe.calories)
                        mealLink.data('calories', intCalories);
                        mealLink.data('image', recp.recipe.images.REGULAR.url);
                        mealName.text(recp.recipe.label);
                        mealLink.append(imgThumbnail);
                        mealLink.append(mealName);
                        li.append(mealLink);
                        breakfastMealList.append(li);
                    })


                });
            })

            $(document).on('click', '.rec-meal-link', function () {
                $('.rec-meal-detail-modal').addClass('dsp-flex');

                let mealName = $(this).data('name');
                let mealIngredients = $(this).data('ingredients');
                let mealInstructions = $(this).data('instructions');
                let mealType = $(this).data('type');
                let mealCalories = $(this).data('calories');
                $('.rec-meal-detail-modal .meal-detail .meal-name').text(mealName);
                $.map(mealIngredients, function (mealIns, index) {
                    let listItem = $('<li class="list-item"></li>');
                    listItem.text(mealIns);
                    $('.meal-ingredients').append(listItem);
                });
                // $('.rec-meal-detail-modal .meal-detail .meal-servings').text(mealServings);
                $('.rec-meal-detail-modal .meal-detail .meal-instructions').attr('href', mealInstructions);
                $('.rec-meal-detail-modal .meal-detail .meal-instructions').text(mealInstructions);
                $('.rec-meal-detail-modal .meal-detail .meal-type').text(mealType);
                $('.rec-meal-detail-modal .meal-detail .meal-calories').text(mealCalories);
                $('.rec-meal-detail-modal .meal-detail .meal-img').css("background-image", `url("${$(this).data('image')}")`);
            })

            //add recommended meal to user meals

            $('.rec-meal-detail-modal .modal-actions .add-meal').click(function () {
                let arrIngredients = $('.rec-meal-detail-modal .meal-ingredients .list-item');
                let ingredientsName = [];
                console.log()
                $.map(arrIngredients, function (aI, index) {
                    ingredientsName.push($(aI).text());
                })
                let ingredientsListToString = ingredientsName.join('|');
                let mealData = {
                    "meal_name": $('.rec-meal-detail-modal .meal-name').text(),
                    "meal_calories": $('.rec-meal-detail-modal .meal-calories').text(),
                    "meal_type": $('.rec-meal-detail-modal .meal-type').text(),
                    "meal_ingredients": ingredientsListToString,
                    "meal_instructions": $('.rec-meal-detail-modal .meal-detail .meal-instructions').text(),
                    "meal_img": $('.rec-meal-detail-modal .meal-detail .meal-img').css('background-image'),
                };

                let setMeal = {
                    "url": "/api/users/setUserMeal.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify(mealData),
                }

                $.ajax(setMeal).done(function (response) {
                    if (response.success == 1) {
                        $('.rec-meal-detail-modal').removeClass('dsp-flex');
                        $('.rec-meal-detail-modal .meal-detail .meal-ingredients').html('');
                        $('.rec-meal-detail-modal .meal-detail .meal-calories').text('');
                    }
                })
            })

            getUserIdealCalories();
            function getUserIdealCalories() {
                let userLevel;
                let userActivityLevel;
                let userAge;
                let userGender;
                let userHeight;
                let userWeight;
                let weightMetric;
                let convertedWeight;
                let getUserIdealDailyCalorie = {
                    "url": "/api/users/getUserDailyCalorie.php",
                    "method": "GET",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`
                    },
                }
                $.ajax(getUserIdealDailyCalorie).done(function (response) {
                    if (parseInt(response.data.user_daily_calorie) == 0) {
                        let getUserPhysicalInfo = {
                            "url": '/api/users/getUserPhysicalInfo.php',
                            "method": "GET",
                            "timeout": 0,
                            "headers": {
                                "Authorization": `Bearer ${token.token}`
                            }
                        }
                        $.ajax(getUserPhysicalInfo).done(function (response) {

                            if (response.success == 1) {
                                userLevel = response.data.user_level;
                                userAge = response.data.user_age;
                                userGender = response.data.user_gender;
                                userHeight = response.data.user_height;
                                userWeight = response.data.user_weight;
                                weightMetric = response.data.weight_metric;
                                userGoal = response.data.user_goal;

                                console.log(userGoal, userLevel);

                                switch (userLevel) {
                                    case "beginner":
                                        userActivityLevel = "level_1";
                                        break;

                                    case "intermediate":
                                        userActivityLevel = "level_3";
                                        break;

                                    case "advanced":
                                        userActivityLevel = "level_4";
                                        break;
                                }

                                if (weightMetric == 'lbs') {
                                    convertedWeight = Math.floor(userWeight * 0.453592);
                                } else {
                                    convertedWeight = userWeight;
                                }

                                let fitnessApi = {
                                    "crossDomain": true,
                                    "url": `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${userAge}&gender=${userGender}&height=${userHeight}&weight=${convertedWeight}&activitylevel=${userActivityLevel}`,
                                    "method": "GET",
                                    "headers": {
                                        'X-RapidAPI-Key': '8ffde56148mshe6633e69b0ac1c5p19c4fcjsn33346e2c8b26',
                                        'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
                                    },
                                    "Content-Type": "application/json"
                                }

                                $.ajax(fitnessApi).done(function (response) {

                                    switch (userGoal) {
                                        case "lose":
                                            calorie = Math.floor(response.data.goals['Mild weight loss']['calory']);
                                            $('.user-ideal-calorie-intake .calorie-number').html(calorie);
                                            setDailyUserCalorie(calorie);
                                            setPersonalDetailStorage()
                                            break;

                                        case "gain":
                                            calorie = Math.floor(response.data.goals['Weight gain']['calory']);
                                            $('.user-ideal-calorie-intake .calorie-number').html(calorie);
                                            setDailyUserCalorie(calorie);
                                            setPersonalDetailStorage()
                                            break;

                                        case "maintain":
                                            calorie = Math.floor(response.data.goals['maintain weight']);
                                            $('.user-ideal-calorie-intake .calorie-number').html(calorie);
                                            setDailyUserCalorie(calorie);
                                            setPersonalDetailStorage()
                                            break;
                                    }


                                })

                            }
                        })


                    } else {

                        $('.user-ideal-calorie-intake .calorie-number').text(parseInt(response.data.user_daily_calorie));
                        setPersonalDetailStorage()

                    }

                })
            }


            function setDailyUserCalorie(calorie) {
                let set_User_Daily_Calorie = {
                    "url": "/api/users/setUserDailyCalorie.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`
                    },
                    "data": JSON.stringify({
                        "user_daily_calorie": parseInt(calorie)
                    })
                }

                $.ajax(set_User_Daily_Calorie).done(function (response) {
                    console.log(response);
                })
            }


            function setPersonalDetailStorage() {
                let getAllUserInfo = {
                    "url": "/api/users/getUserPhysicalInfo.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`
                    }
                }

                $.ajax(getAllUserInfo).done(function (response) {
                    let userP = JSON.parse(localStorage.getItem('profile_detail'));
                    Object.assign(userP, {
                        "user_id": response.data.id,
                        "user_age": response.data.user_age,
                        "user_gender": response.data.user_gender,
                        "user_goal": response.data.user_goal,
                        "user_height": response.data.user_height,
                        "user_level": response.data.user_level,
                        "user_weight": response.data.user_weight,
                        "weight_metric": response.data.weight_metric,
                        "user_daily_calorie": response.data.user_daily_calorie
                    });
                    localStorage.setItem("profile_detail", JSON.stringify(userP));
                })


            }

            //submitting user goal form//
            $(".user-goal-form").submit(function (e) {
                e.preventDefault();
                let userAge = $('input[name="user-age"]').val();
                let userGender = $('input[name="user-gender"]:checked').val();
                let weightInput = $('input[name="user-weight"]').val();
                let weightMetric = $('select[name="weight-metric"] option:selected').val();
                let goalSelect = $('select[name="user-goal"] option:selected').val();
                let levelSelect = $('select[name="workout-level"] option:selected').val();
                let userHeightFeet = $('input[name="height-ft"]').val();
                let userHeightInches = $('input[name="height-inches"]').val();
                let counter = 0;

                if (userAge !== '') {
                    $('input[name="user-age"]').removeClass("err-field");
                    $(".err-age").css('display', "none");
                } else {
                    counter++;
                    $('.err-age').css("display", "block");
                    $('input[name="user-age"]').addClass("err-field");
                }

                if (userGender !== '') {
                    $(".err-gender").css('display', 'none');
                    $('input[name="user-gender"]').removeClass("err-field");
                } else {
                    counter++;
                    $(".err-gender").css("display", "block");
                    $('input[name="user-gender"]').addClass("err-field");
                }

                if (goalSelect !== "default") {
                    $('select[name="user-goal"]').removeClass("err-field");
                    $(".err-goal").css("display", "none");
                } else {
                    counter++;
                    $(".err-goal").css("display", "block");
                    $('select[name="user-goal"]').addClass("err-field");
                }
                if (weightInput !== "") {
                    $(".err-weight").css("display", "none");
                    $('input[name="user-weight"]').removeClass("err-field");
                } else {
                    counter++;
                    $(".err-weight").css("display", "block");
                    $('input[name="user-weight"]').addClass("err-field");
                }

                if (userHeightFeet !== '') {
                    $('.err-height').css("display", "none");
                    $('input[name="height-ft"]').removeClass("err-field");
                    $('input[name="height-inches"]').removeClass("err-field");
                } else {
                    counter++;
                    $('.err-height').css('display', 'block');
                    $('input[name="height-ft"]').addClass("err-field");
                    $('input[name="height-inches"]').addClass("err-field");
                }

                if (counter == 0) {
                    $('.user-goal-form').removeClass('dsp-flex');
                    setUserWorkoutGoal(userAge, weightInput, userGender, weightMetric, goalSelect, levelSelect, userHeightFeet, userHeightInches);
                    $('body').removeClass('overlay');
                    window.location.reload(true);
                }
            });

            function setUserWorkoutGoal(userAge, weightInput, userGender, weightMetric, goalSelect, levelSelect, userHeightFeet, userHeightInches) {
                if (userHeightInches == '' || userHeightInches == null) {
                    userHeightInches = 0;
                }
                let parsedHeightFeet = parseInt(userHeightFeet);
                let parsedHeightInches = parseInt(userHeightInches);

                let ftToCm = parseInt(((parsedHeightFeet * 12) + parsedHeightInches) * 2.54);
                let parsedWeight = parseInt(weightInput);
                let setGoal = {
                    "url": "/api/users/setUserWorkoutGoal.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "user_age": parseInt(userAge),
                        "user_gender": userGender,
                        "goal": goalSelect,
                        "start_weight": parsedWeight,
                        "weight_metric": weightMetric,
                        "user_level": levelSelect,
                        "user_height": ftToCm
                    }),
                }

                $.ajax(setGoal).done(function (response) {
                    console.log(response);
                    if (response.success == 1) {
                        $(".user-goal-form").css("display", "none");
                        $(".recommended-workouts").css("display", "block");
                        recommendedWorkouts();
                    }
                });
            }

            //fetch recommeded workouts based on user's selected fitness level//
            function recommendedWorkouts() {

                let getUserPhysicalInfo = {
                    "url": "/api/users/getUserPhysicalInfo.php",
                    "method": "GET",
                    "timeout": 0,
                    "headers":{
                        "Authorization": `Bearer ${token.token}`,
                    }
                }

                $.ajax(getUserPhysicalInfo).done(function(response){
                    console.log(response);
                    let userLevel;
                    switch(response.data.user_level){
                        case "beginner":
                            userLevel = "beginner";
                        break;

                        case "intermediate":
                            userLevel = "intermediate";
                        break;

                        case "advanced":
                            userLevel = "expert";
                        break;
                    }
                    let getExercises = {
                        "url": `https://api.api-ninjas.com/v1/exercises?difficulty=${userLevel}`,
                        "method": "GET",
                        "timeout": 0,
                        "headers":{
                            "x-api-key": "SrSAaegWn7kpQszNO6D3sQ==nhwKmMMZzXZ7eaKJ"
                        }
                    }

                    $.ajax(getExercises).done(function(response){
                        console.log(response.length);
                        let arr_size = 3;
                        
                        let splitWorkouts = (arr,size) => {
                            let arr2 = arr.slice(0);
                            let array = [];

                            while(arr2.length-1 > 0){
                                array.push(arr2.splice(0, size));
                            }

                            return array;
                        }

                        let dividedExercises = splitWorkouts(response,arr_size);
                        // console.log(dividedExercises);

                        dividedExercises.map((dE,index) => {
                            let listItem = $('<div class="workout-list-item rec-workout-card list-item"></div>');
                            let container = $('<div class="inner-container"></div>');
                            let workoutName = $('<h2 class="header-text"></div>');
                            let name = `workout_${index + 1}`;
                            let exercisesArr = [];
                            workoutName.text(name);
                            dE.map((exercise,index) => {
                                let exerciseObj = {
                                    "exercise_name": exercise.name,
                                    "exercise_type": exercise.type,
                                    "exercise_difficulty": exercise.difficulty,
                                    "exercise_muscle": exercise.muscle,
                                    "exercise_equipment": exercise.equipment,
                                    "exercise_instructions": exercise.instructions
                                };

                                // console.log(exerciseObj);
                                // listItem.attr("exercises",JSON.stringify(exerciseObj));
                                exercisesArr.push(exerciseObj);
                            })
                            listItem.data('exercises',JSON.stringify(exercisesArr));
                            listItem.data('name',name);
                            container.append(workoutName);
                            listItem.append(container);
                            $('.recommended-workouts-list').append(listItem);
                        }) 

                    })
                })
                
                
            }

            $(document).on('click', '.rec-workout-card', function () {
                // console.log($(this).data('recWorkoutId'));
                $('.rec-workout-detail-modal').addClass('dsp-flex');
                $('body').addClass('overlay');
                // $('.rec-workout-detail-modal .modal-rec-workout-name').text($(this).data('recWorkoutName'));
                // $('.rec-workout-detail-modal .modal-rec-workout-duration .hrs').text($(this).data('recWorkoutDurationHrs'));
                // $('.rec-workout-detail-modal .modal-rec-workout-duration .mins').text($(this).data('recWorkoutDurationMins'));
                // $('.rec-workout-detail-modal .modal-rec-workout-duration .secs').text($(this).data('recWorkoutDurationSecs'));
                // $('.rec-workout-detail-modal .modal-rec-workout-type .type').text($(this).data('recWorkoutType'));

                let workoutName = $(this).data('name');
                console.log(workoutName);
                $('.modal-rec-workout-name').text(workoutName);
                let exerciseList = JSON.parse($(this).data('exercises'));

                exerciseList.map((exercise,index)=>{
                    console.log(exercise);
                    let li = $('<li class="exercise-item"></li>');
                    let exerciseName = $('<h3 class="exercise-name pointer underline-nm"></h3>');
                    exerciseName.text(exercise.exercise_name);
                    li.append(exerciseName);
                    $('.exercises-list').append(li);
                    let exerciseDatail = {
                        "name": exercise.exercise_name,
                        "type": exercise.exercise_type,
                        "difficulty": exercise.exercise_difficulty,
                        "muscle": exercise.exercise_muscle,
                        "equipment": exercise.exercise_equipment,
                        "instructions": exercise.exercise_instructions 
                    }
                    li.data('detail',JSON.stringify(exerciseDatail));
                })
                // let exerciseItemHeading = $('<div class="exercise-item-row heading"></div>');
                // let headingName = $('<div class="exercise-name-data data-col text-bold">Exercise Name</div>');
                // let headingSets = $('<div class="exercise-name-data data-col text-bold">Exercise Sets</div>');
                // let headingReps = $('<div class="exercise-name-data data-col text-bold">Exercise Reps</div>');
                // $('.exercise-list-table').append(exerciseItemHeading);
                // let getExercises = {
                //     "url": "api/users/getRecommendedExercises.php",
                //     "method": "POST",
                //     "timeout": 0,
                //     "headers": {
                //         "Authorization": `Bearer ${token.token}`
                //     },
                //     "data": JSON.stringify({
                //         "rec_workout_id": $(this).data('recWorkoutId')
                //     })
                // };

                // $.ajax(getExercises).done(function (response) {
                //     let exerciseList = $('.rec-workout-detail-modal .exercise-list');
                //     if (response.success == 1) {
                //         $.map(response.exercises, (exercise, index) => {
                //             let exerciseItem = $('<div class="exercise-item-row"></div>');

                //             let exerciseName = $('<div class="exercise-name-data data-col"></div>');
                //             let exerciseSets = $('<div class="exercise-sets-data data-col"></div>');
                //             let exerciseReps = $('<div class="exercise-reps-data data-col"></div>');

                //             exerciseItemHeading.append(headingName);
                //             exerciseItemHeading.append(headingSets);
                //             exerciseItemHeading.append(headingReps);
                //             exerciseName.text(exercise.rec_exercise_name);
                //             exerciseSets.text(exercise.rec_exercise_sets);
                //             exerciseReps.text(exercise.rec_exercise_reps);
                //             exerciseItem.append(exerciseName);
                //             exerciseItem.append(exerciseSets);
                //             exerciseItem.append(exerciseReps);
                //             exerciseList.append(exerciseItem);
                //             $('.exercise-list-table').append(exerciseItem);
                //         })
                //     }
                // })
            });

            $(document).on('click','.exercise-item',function(){
                $('.rec-workout-detail-modal .exercise-details').removeClass('dsp-none');
                let detail = JSON.parse($(this).data('detail'));
                $('.rec-workout-detail-modal .exercise-details .exercise-name').text(`Name: ${detail.name}`);
                $('.rec-workout-detail-modal .exercise-details .exercise-type').text(`Type: ${detail.type}`);
                $('.rec-workout-detail-modal .exercise-details .exercise-equipment').text(`Equipment: ${detail.equipment}`);
                $('.rec-workout-detail-modal .exercise-details .exercise-muscle').text(`Muscle: ${detail.muscle}`);
                $('.rec-workout-detail-modal .exercise-details .exercise-instructions').text(`Instructions: ${detail.instructions}`);
            });

            $('.close-rec-workout').click(function () {
                $('.rec-workout-detail-modal').removeClass('dsp-flex');
                $('.rec-workout-detail-modal .exercise-list-table').html('');
                $('.rec-workout-detail-modal .exercises-list').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-name').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-type').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-equipment').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-muscle').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-instructions').html('');
                $('body').removeClass('overlay');
            })
            $('.rec-workout-detail-modal .close').click(function () {
                $('.rec-workout-detail-modal').removeClass('dsp-flex');
                $('.rec-workout-detail-modal .exercise-list-table').html('');
                $('.rec-workout-detail-modal .exercises-list').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-name').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-type').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-equipment').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-muscle').html('');
                $('.rec-workout-detail-modal .exercise-details .exercise-instructions').html('');
                $('body').removeClass('overlay');
            })

            $('.rec-workout-detail-modal .modal-actions .add-workout').click(function () {
                // let data = JSON.stringify({
                //     "workout_name": 
                // })
                let workoutName = $('.modal-rec-workout-name').text();
                let workoutType = $.trim($('.modal-rec-workout-type .type').text());
                let workoutDurationHrs = parseInt($('.modal-rec-workout-duration .hrs').text());
                let workoutDurationMins = parseInt($('.modal-rec-workout-duration .mins').text());
                let workoutDurationSecs = parseInt($('.modal-rec-workout-duration .secs').text());
                let workoutDescList = $('.rec-workout-detail-modal .exercise-list-table .exercise-item-row').not('.heading');

                let exerciseList = [];

                $.map(workoutDescList, (wl, index) => {
                    let exerciseName = $(wl).children('.exercise-name-data').text();
                    let exerciseSets = parseInt($(wl).children('.exercise-sets-data').text());
                    let exerciseReps = parseInt($(wl).children('.exercise-reps-data').text());
                    //exerciseName = $('.execise-name');
                    // exerciseSets = $(`${wl},.execise-sets`);
                    // exerciseReps = $(`${wl},.execise-reps`);
                    // exerciseSets = $(block[0]).children().val();
                    // exerciseReps = $(block[0]).children().val();

                    exerciseList.push({
                        "exercise_name": exerciseName,
                        "exercise_sets": exerciseSets,
                        "exercise_reps": exerciseReps
                    });

                });


                let workoutDuration = {
                    "hrs": workoutDurationHrs,
                    "mins": workoutDurationMins,
                    "secs": workoutDurationSecs
                };

                let data = JSON.stringify({
                    "workout_name": workoutName,
                    "workout_type": workoutType.toLowerCase(),
                    "workout_duration": workoutDuration,
                    "workout_desc": exerciseList
                });

                addWorkout(data);
                $(".workout-detail-modal").removeClass("dsp-flex");
                $("body").removeClass('overlay');
            });


            function addWorkout(data) {
                let createWorkoutRequest = {
                    "url": "/api/users/createWorkout.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                    "data": data,
                };

                $.ajax(createWorkoutRequest).done(function (response) {
                    console.log(response);
                    if (response.success == 1) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }





        } else {
            window.history.back();
            localStorage.removeItem('jwt');
            window.location.reload(true);
            window.location.replace("/login");
        }
    } else if (location.pathname == "/adminDashboard") {
        let token = JSON.parse(localStorage.getItem("jwt"));
        if (token) {
            let sideMenu = $('.side-nav .nav-list .nav-list-item .nav-list-link');
            sideMenu[0].classList.add('active');


            let getUsers = {
                'url': '/api/admin/getUsers.php',
                'method': 'POST',
                'timeout': 0,
                'headers': {
                    'Authorization': `Bearer ${token.token}`
                }
            };

            $.ajax(getUsers).done(function (response) {
                if (response.success == 1) {
                    $('.number-of-users').text(response.user_count);
                }
            })

            //add or delete exercise//
            $(".add-exercise").click(function () {
                let workoutDescContainer = $('.workout-desc-container');
                let exerciseContainer = $('.exercise-container');
                let exerciseBlock = $('<div class="exercise-block"></div>');
                let nameblock = $('<div class="block"></div>');
                let setsblock = $('<div class="block"></div>');
                let repsblock = $('<div class="block"></div>');
                let nameField = $('<input type="text" class="form-inp" placeholder="Exercise Name">');
                let setsField = $('<input type="number" class="form-inp" placeholder="No of sets">');
                let repsField = $('<input type="number" class="form-inp" placeholder="No of reps">');
                let delBlock = $('<button class="del-exer-block" type="button"></button>');

                nameblock.append(nameField);
                setsblock.append(setsField);
                repsblock.append(repsField);

                exerciseBlock.append(nameblock);
                exerciseBlock.append(setsblock);
                exerciseBlock.append(repsblock);
                exerciseBlock.append(delBlock);

                exerciseContainer.append(exerciseBlock);

            })

            //delete exercise block in add workout modal//
            $(document).on('click', '.del-exer-block', function () {
                $(this).parent().remove();
            })



            //on reset button pressed on add workout modal//
            $('.add-workout-modal .form-data button[type="reset"]').click(
                function () {
                    $(".add-workout-modal").removeClass("dsp-flex");
                    $(".err-msg").removeClass("dsp-block");
                    $('input[name="workout-name"]').removeClass("err-field");
                    $('.err-wr-duration').removeClass("dsp-block");
                    $('input[name="hrs"]').removeClass("err-field");
                    $('input[name="mins"]').removeClass("err-field");
                    $('input[name="secs"]').removeClass("err-field");
                    $('.err-wr-desc').removeClass('dsp-block');
                    $('input[name="exercise-name"]').removeClass('err-field');
                    $('input[name="exercise-sets"]').removeClass('err-field');
                    $('input[name="exercise-reps"]').removeClass('err-field');
                    $("body").removeClass('overlay');
                }
            );

            //submit add workout form//

            $(".add-workout-modal").submit(function (e) {
                e.preventDefault();
                let workoutName = $('input[name="workout-name"]').val();
                let workoutType = $('select[name="workout-type"] option:selected').val();
                let workoutLevel = $('select[name="workout-level"] option:selected').val();
                let workoutDuHrs = $('input[name="hrs"]').val();
                let workoutDuMin = $('input[name="mins"]').val();
                let workoutDuSec = $('input[name="secs"]').val();
                let workoutDesc = $('.exercise-block');
                let exerciseCollection = [];
                let workoutDurationCollection = [];
                let exerciseName;
                let exerciseSets;
                let exerciseReps;
                let arrWorkoutDesc = workoutDesc.toArray();
                let errCount = 0;
                if (workoutName == "") {
                    $(".err-wr-name").addClass("dsp-block");
                    $('input[name="workout-name"]').addClass("err-field");
                    errCount++;
                } else {
                    $(".err-msg").removeClass("dsp-block");
                    $('input[name="workout-name"]').removeClass("err-field");
                }

                if (workoutDuHrs == '' && workoutDuMin == '' && workoutDuSec == '') {
                    $('.err-wr-duration').addClass("dsp-block");
                    $('input[name="hrs"]').addClass("err-field");
                    $('input[name="mins"]').addClass("err-field");
                    $('input[name="secs"]').addClass("err-field");
                    errCount++;
                } else {
                    $('.err-wr-duration').removeClass("dsp-block");
                    $('input[name="hrs"]').removeClass("err-field");
                    $('input[name="mins"]').removeClass("err-field");
                    $('input[name="secs"]').removeClass("err-field");

                    // workoutDurationCollection.hrs = workoutDuHrs;
                    // workoutDurationCollection.mins = workoutDuMin;
                    // workoutDurationCollection.secs = workoutDuSec;

                    workoutDurationCollection = {
                        "hrs": parseInt(workoutDuHrs),
                        "mins": parseInt(workoutDuMin),
                        "secs": parseInt(workoutDuSec),
                    };
                }

                // arrWorkoutDesc.map((wd,index)=>{
                //   let arrWd = Array.from(wd);
                // })

                //mapping workout blocks//
                $.map(arrWorkoutDesc, (aw, index) => {
                    let block = $(aw).children();
                    /*getting values of the input fields in each blocks;
                      each block[0] will contain exercise name,
                      block[1] will contain exercise set number,
                      block[2] will contain exercise rep number
                    */
                    exerciseName = $(block[0]).children().val();
                    exerciseSets = $(block[1]).children().val();
                    exerciseReps = $(block[2]).children().val();

                    if (exerciseName == '' && exerciseSets == '' && exerciseReps == '') {
                        errCount++;
                        $('.err-wr-desc').addClass('dsp-block');
                        $('input[name="exercise-name"]').addClass('err-field');
                        $('input[name="exercise-sets"]').addClass('err-field');
                        $('input[name="exercise-reps"]').addClass('err-field');
                    } else {
                        $('.err-wr-desc').removeClass('dsp-block');
                        $('input[name="exercise-name"]').removeClass('err-field');
                        $('input[name="exercise-sets"]').removeClass('err-field');
                        $('input[name="exercise-reps"]').removeClass('err-field');

                        exerciseCollection.push({
                            "exercise_name": exerciseName,
                            "exercise_sets": parseInt(exerciseSets),
                            "exercise_reps": parseInt(exerciseReps)
                        });
                    }
                })

                if (errCount === 0) {
                    let data = JSON.stringify({
                        "workout_level": workoutLevel,
                        "workout_name": workoutName,
                        "workout_type": workoutType,
                        "workout_duration": workoutDurationCollection,
                        "workout_desc": exerciseCollection
                    });
                    let res = addWorkout(data);
                    $(".add-workout-modal").removeClass("dsp-flex");
                    $("body").removeClass('overlay');
                }

            });

            function addWorkout(data) {
                let addWorkoutRequest = {
                    "url": "/api/admin/addWorkouts.php",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Authorization": `Bearer ${token.token}`,
                        "Content-Type": "application/json"
                    },
                    "data": data,
                };

                $.ajax(addWorkoutRequest).done(function (response) {
                    console.log(response);
                    if (response.success == 1) {
                        return true;
                    } else {
                        return false;
                    }
                });
            }


        } else {
            window.history.back();
            localStorage.removeItem('jwt');
            localStorage.removeItem("profile_id");
            window.location.reload(true);
            window.location.replace('/login');
        }
    }

    //to get current time to display messages//
    let current_day = new Date();
    let current_hr = current_day.getHours();

    if (current_hr >= 0 && current_hr < 12) {
        $(".current-time").html("Good Morning!");
    } else if (current_hr >= 12 && current_hr <= 17) {
        $(".current-time").html("Good Afternoon!");
    } else if (current_hr >= 17 && current_hr <= 19) {
        $(".current-time").html("Good Evening!");
    } else {
        $(".current-time").html("Good Night!");
    }



});

