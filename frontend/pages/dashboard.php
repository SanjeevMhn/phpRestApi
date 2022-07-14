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
        <div class="recommended-workouts ft-poppins">
            <h2 class="header-text underline">Recommended Workouts</h2>
            <div class="recommended-workouts-list list"></div>
        </div>

        <div class="rec-workout-detail-modal workout-detail-modal modal ft-poppins">
            <h2 class="modal-rec-workout-name modal-workout-name"></h2>
            <div class="modal-rec-workout-duration modal-workout-duration">
                Workout Duration <br/>
                <span class="hrs"></span>
                <span class="mins"></span>
                <span class="secs"></span>
            </div>
            <div class="exercise-list">

            </div>
            <div class="modal-actions">
                <button type="button" class="add-workout">Add Workout</button>
                <button type="reset" class="close-rec-workout">Cancel</button>
            </div>
        </div>
        <form method="post" class="user-goal-form ft-poppins">
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
                <button type="submit">Done</button>
            </div>
        </form>

        <form method="post" class="add-workout-modal modal ft-poppins">
            <div class="form-data">
                <label for="workout-name">Workout Name</label>
                <input type="text" name="workout-name" id="workout-name" class="form-inp" placeholder="Enter Workout Name">
                <span class="err-msg err-wr-name">Please enter workout name</span>
            </div>
            <div class="form-data">
                <label for="workout-type">Workout Type</label>
                <select name="workout-type" id="workout-type" class="form-select">
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardiovascular</option>
                    <option value="sports">Sports</option>
                    <option value="hybrid">Hybrid</option>
                </select>
                <span class="err-msg err-wr-type">Please select workout type</span>
            </div>
            <div class="form-data">
                <label for="workout-duration">Workout Duration</label>
                <div class="duration-set">
                    <div class="duration">
                        <input type="number" name="hrs" id="" class="form-inp" placeholder="Hours">
                    </div>
                    <div class="duration">
                        <input type="number" name="mins" id="" class="form-inp" placeholder="Minutes">
                    </div>
                    <div class="duration">
                        <input type="number" name="secs" id="" class="form-inp" placeholder="Seconds">
                    </div>
                </div>
                <span class="err-msg err-wr-duration">Please enter workout duration</span>
            </div>
            <div class="form-data workout-desc-container">
                <label for="workout-desc">Workout Description</label>
                <!-- <textarea name="workout-desc" id="workout-desc" cols="30" rows="10" class="form-textarea" placeholder="Your Workout Description"></textarea> -->
                <div class="exercise-container">
                    <div class="exercise-block">
                        <div class="block">
                            <input type="text" name="exercise-name" id="" class="form-inp" placeholder="Exercise Name"> 
                        </div>
                        <div class="block">
                            <input type="number" name="exercise-sets" id="" class="form-inp" placeholder="No of sets">
                        </div>
                        <div class="block">
                            <input type="number" name="exercise-reps" id="" class="form-inp" placeholder="No of reps">
                        </div>
                    </div>
                </div>
                <button class="add-exercise" type="button">Add Exercise</button>
                <span class="err-msg err-wr-desc">Please enter your workout description</span>
            </div>
            <div class="form-data">
                <button type="submit">Submit</button>
                <button type="reset">Cancel</button>
            </div>
        </form>
    </section>
</main>


<?php include_once "frontend/includes/footer.php" ?>