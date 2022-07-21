<?php include_once "frontend/includes/dashboardNav.php" ?>
<main class="dashboard-container">
    <section class="dashboard-sec content">
        <div class="user-detail">
            <div class="current-time ft-poppins"></div>
            <span class="user-name ft-source"></span>
        </div>
        <div class="links-list list ft-poppins">
            <a href="/workouts" class="link-item list-item">
                <div class="inner-container">
                    <h2>
                        Your Workouts
                    </h2>
                </div>
            </a>
        </div>
        <div class="user-ideal-calorie-intake pb-20">
            <h2 class="ft-poppins">For your goal you need to be consuming atmost <span class="calorie-number"></span> calories everyday!</h2>
        </div>
        <div class="recommended-workouts ft-poppins">
            <h2 class="header-text underline">Recommended Workouts</h2>
            <div class="recommended-workouts-list list"></div>
        </div>

        <div class="rec-workout-detail-modal workout-detail-modal modal ft-poppins">
            <h2 class="modal-rec-workout-name modal-workout-name"></h2>
            <div class="modal-rec-workout-duration modal-workout-duration">
                Workout Duration <br />
                <span class="hrs"></span>
                <span>&nbsp;hrs&nbsp;:&nbsp;</span>
                <span class="mins"></span>
                <span>&nbsp;mins&nbsp;:&nbsp;</span>
                <span class="secs"></span>
                <span>&nbsp;secs</span>
            </div>
            <div class="modal-rec-workout-type modal-workout-duration">
                Workout Type: <span class="type"></span>
            </div>
            <div class="exercise-list-table">
                <div class="exercise-item-row heading">
                    <!-- <div class="exercise-name-data data-col text-bold">Exercise Name</div>
                    <div class="exercise-sets-data data-col text-bold">Sets</div>
                    <div class="exercise-reps-data data-col text-bold">Reps</div> -->
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="add-workout">Add Workout</button>
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