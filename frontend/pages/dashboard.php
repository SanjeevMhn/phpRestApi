<?php include_once "frontend/includes/dashboardNav.php" ?>
<main class="dashboard-container">
    <section class="dashboard-sec content">
        <div class="user-detail">
            <div class="current-time ft-poppins"></div>
            <span class="user-name ft-source"></span>
        </div>
        <div class="links-list list ft-poppins">
            <a href="/workouts" class="link-item list-item">
                <div class="inner-container dsp-flex align-items-center">
                    <div class="icon-container-lg">
                        <img src="/frontend/assets/images/dumbell_icon.svg" alt="">
                    </div>
                    <h2 class="header-text pl-10">
                        Your Workouts
                    </h2>
                </div>
            </a>
            <a href="/meals" class="link-item list-item">
                <div class="inner-container dsp-flex align-items-center">
                    <div class="icon-container-lg">
                        <img src="/frontend/assets/images/food_icon.svg" alt="">
                    </div>
                    <h2 class="header-text pl-10">
                        Your Meals
                    </h2>
                </div>
            </a>
        </div>
        <div class="user-ideal-calorie-intake pb-20">
            <h2 class="header-text ft-poppins">For your goal you need to be consuming atmost <span class="calorie-number"></span> calories everyday!</h2>
        </div>
        <h3 class="pb-10 ft-poppins">You can add the recommended workouts in your personal workouts or you can create your own!</h3>
        <div class="recommended-workouts ft-poppins pb-20">
            <h2 class="header-text underline">Recommended Workouts</h2>
            <div class="recommended-workouts-list list"></div>
        </div>
        <div class="recommended-meals pb-120 ft-poppins">
            <h2 class="header-text underline">Recommended Meal Options</h2>
            <div class="recommended-meals-list list">
                <div class="rec-meal-card list-item breakfast">
                    <div class="inner-container">
                        <h2 class="rec-meal-name header-text">Breakfast</h2>
                    </div>
                </div>
                <div class="rec-meal-card list-item lunch">
                    <div class="inner-container">
                        <h2 class="rec-meal-name header-text">Lunch</h2>
                    </div>
                </div>
                <div class="rec-meal-card list-item snack">
                    <div class="inner-container">
                        <h2 class="rec-meal-name header-text">Snack</h2>
                    </div>
                </div>
                <div class="rec-meal-card list-item dinner">
                    <div class="inner-container">
                        <h2 class="rec-meal-name header-text">Dinner</h2>
                    </div>
                </div>

            </div>
            <h3 class="pb-10">You can also add meals yourself or search for recipes!</h3>
            <form method="post" class="recipe-search-form">
                <div class="form-data">
                    <label for="search-meal">
                        Search Meal
                    </label>
                    <input type="text" name="recipe-search" id="search-meal" class="form-inp" placeholder="Enter any food name">
                    <div class="err-msg err-search-meal">Please enter food name</div>
                </div>
                <div class="form-data">
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>

        <div class="search-meal-list-modal modal ft-poppins">
            <div class="close-btn">
                <div class="icon-container close">
                    <img src="/frontend/assets/images/close_icon.svg" alt="">
                </div>
            </div>
            <h2>Search Results</h2>
            <ul class="search-meal-list meal-list">
            </ul>
        </div>

        <div class="search-meal-detail-modal modal ft-poppins">
            <div class="close-btn">
                <div class="icon-container close">
                    <img src="/frontend/assets/images/close_icon.svg" alt="">
                </div>
            </div>
            <div class="meal-detail overflow-y-auto pb-120">
                <div class="meal-img img-container-300">

                </div>
                <h2 class="meal-name pb-10 pt-10"></h2>
                <div class="pb-10 dsp-flex">
                    <h3>Total Calories: </h3>
                    <p class="meal-calories"></p>
                </div>
                <!-- <div class="pb-10 dsp-flex">
                    <h3>Meal Type:</h3>
                    <p class="meal-type capitalize"></p>
                </div> -->
                <div class="pb-10">
                    <h3>Ingredients</h3>
                    <ul class="meal-ingredients"></ul>
                </div>
                <!-- <div class="pb-10">
                    <h3>Servings</h3>
                    <p class="meal-servings"></p>
                </div> -->
                <div class="pb-10">
                    <h3>Choose Meal Type</h3>
                    <select name="meal-type" id="" class="form-select">
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>
                </div>
                <div class="pb-20">
                    <h3>Instructions</h3>
                    <a class="meal-instructions underline-nm"></a>
                </div>
                <div class="modal-actions">
                    <button class="add-meal" type="button">Add Meal</button>
                    <button class="cancel" type="reset">Cancel</button>
                </div>
            </div>
        </div>

        <div class="rec-breakfast-list-modal modal ft-poppins">
            <div class="close-btn">
                <div class="icon-container close">
                    <img src="/frontend/assets/images/close_icon.svg" alt="">
                </div>
            </div>
            <h2>List of Breakfast options</h2>
            <ul class="breakfast-meal-list meal-list">
            </ul>
        </div>

        <div class="rec-meal-detail-modal modal ft-poppins">
            <div class="close-btn">
                <div class="icon-container close">
                    <img src="/frontend/assets/images/close_icon.svg" alt="">
                </div>
            </div>
            <div class="meal-detail overflow-y-auto pb-120">
                <div class="meal-img img-container-300">

                </div>
                <h2 class="meal-name pb-10 pt-10"></h2>
                <div class="pb-10 dsp-flex">
                    <h3>Total Calories: </h3>
                    <p class="meal-calories"></p>
                </div>
                <div class="pb-10 dsp-flex">
                    <h3>Meal Type:</h3>
                    <p class="meal-type capitalize"></p>
                </div>
                <div class="pb-10">
                    <h3>Ingredients</h3>
                    <ul class="meal-ingredients"></ul>
                </div>
                <!-- <div class="pb-10">
                    <h3>Servings</h3>
                    <p class="meal-servings"></p>
                </div> -->
                <div class="pb-20">
                    <h3>Instructions</h3>
                    <a class="meal-instructions underline-nm"></a>
                </div>
                <div class="modal-actions">
                    <button class="add-meal" type="button">Add Meal</button>
                    <button class="cancel" type="reset">Cancel</button>
                </div>
            </div>
        </div>
        <div class="rec-workout-detail-modal workout-detail-modal modal ft-poppins">
            <div class="close-btn">
                <div class="icon-container close pointer">
                    <img src="/frontend/assets/images/close_icon.svg" alt="">
                </div>
            </div>
            <h2 class="modal-rec-workout-name modal-workout-name pb-10"></h2>
            <!-- <div class="modal-rec-workout-duration modal-workout-duration">
                Workout Duration <br />
                <span class="hrs"></span>
                <span>&nbsp;hrs&nbsp;:&nbsp;</span>
                <span class="mins"></span>
                <span>&nbsp;mins&nbsp;:&nbsp;</span>
                <span class="secs"></span>
                <span>&nbsp;secs</span>
            </div> -->
            <!-- <div class="modal-rec-workout-type modal-workout-duration">
                Workout Type: <span class="type"></span>
            </div>
 -->            <!-- <div class="exercise-list-table"> -->
                <h2 class="pb-10">Exercises List</h2>
                <ul class="exercises-list">
                    
                </ul>

                <div class="exercise-details dsp-none overflow-y-auto pb-120">
                    <h3 class="exercise-name pb-10"></h3>
                    <h3 class="exercise-type pb-10"></h3>
                    <h3 class="exercise-equipment pb-10"></h3>
                    <h3 class="exercise-muscle pb-10"></h3>
                    <h3 class="exercise-instructions pb-10"></h3>
                </div>
                <!-- <div class="exercise-item-row heading">
                    <div class="exercise-name-data data-col text-bold">Exercise Name</div>
                    <div class="exercise-sets-data data-col text-bold">Sets</div>
                    <div class="exercise-reps-data data-col text-bold">Reps</div>
                </div> -->
            <!-- </div> -->
            <div class="modal-actions">
                <button type="button" class="add-rec-workout">Add Workout</button>
                <button type="reset" class="close-rec-workout">Cancel</button>
            </div>
        </div>
        <form method="post" class="user-goal-form ft-poppins modal">
            <div class="form-data">
                <label for="user-age">Your age:</label>
                <input type="number" name="user-age" id="user-age" class="form-inp" placeholder="Your Age">
                <span class="err-msg err-age">Please enter your age</span>
            </div>
            <div class="form-data">
                <div class="input-gender-group">
                    <div class="grp">
                        <input type="radio" name="user-gender" id="male" value="male">
                        <label for="male">Male</label>
                    </div>
                    <div class="grp">
                        <input type="radio" name="user-gender" id="female" value="female">
                        <label for="female">Female</label>
                    </div>
                </div>
                <span class="err-msg err-gender">Please select your gender</span>
            </div>
            <div class="form-data">
                <label for="user-weight">
                    Current Weight
                </label>
                <div class="input-group">
                    <div class="input-container">
                        <input type="number" name="user-weight" id="user-weight" class="form-inp" placeholder="Your current weight">
                    </div>
                    <select name="weight-metric" id="user-weight" class="form-select">
                        <option value="kg">Kgs</option>
                        <option value="lbs">Lbs</option>
                    </select>
                </div>
                <span class="err-msg err-weight">Please enter your current weight</span>
            </div>
            <div class="form-data">
                <label for="workout_goal">Your goal:</label>
                <select name="user-goal" id="workout_goal" class="form-select">
                    <option value="default">Please select your workout goal</option>
                    <option value="gain">Gain Weight</option>
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                </select>
                <span class="err-msg err-goal">Please select from the given options</span>
            </div>
            <div class="form-data">
                <label for="workout-level">Your Fitness Level</label>
                <select name="workout-level" id="workout-level" class="form-select">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advance">Advance</option>
                </select>
            </div>
            <div class="form-data">
                <label for="user-height">Your height</label>
                <div class="input-group-2">
                    <input type="number" name="height-ft" id="user-height" class="form-inp" placeholder="Feet">
                    <input type="number" name="height-inches" id="user-height" class="form-inp" placeholder="Inches">
                </div>
                <span class="err-msg err-height">Please Enter your height</span>
            </div>
            <div class="form-data">
                <button type="submit">Done</button>
            </div>
        </form>

        <?php include_once "frontend/includes/addWorkoutModal.php" ?>
    </section>
</main>


<?php include_once "frontend/includes/footer.php" ?>