<?php include_once "frontend/includes/dashboardNav.php" ?>
<main class="dashboard-container">
    <section class="dashboard-sec content">
        <div class="user-detail">
            <div class="current-time ft-poppins"></div> 
            <span class="user-name ft-source"></span>
        </div>
        <form method="post" class="user-goal-form ft-poppins">
            <div class="form-data">
                <label for="workout_goal">Your goal:</label>
                <select name="user-goal" id="workout_goal" class="form-select">
                    <option value="default">Please select your workout goal</option>
                    <option value="gain">Gain Weight</option>
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                </select>
                <span class="err-msg">Please select from the given options</span>
            </div>
            <div class="form-data">
                <button type="submit">Done</button>
            </div>
        </form>

        <form method="post" class="add-workout-modal modal ft-poppins">
            <div class="form-data">
                <label for="workout-name">Workout Name</label>
                <input type="text" name="workout-name" id="workout-name" class="form-inp" placeholder="Enter Workout Name">
            </div>
            <div class="form-data">
                <label for="workout-type">Workout Type</label>
                <select name="workout-type" id="workout-type" class="form-select">
                    <option value="strength">Strength</option>
                    <option value="cardio">Cardiovascular</option>
                    <option value="sports">Sports</option>
                    <option value="hybrid">Hybrid</option>
                </select>
            </div>
            <div class="form-data">
                <label for="workout-duration">Workout Duration</label>
                <div class="duration-set">
                    <div class="duration">
                        <input type="text" name="hrs" id="" class="form-inp" placeholder="Hours">
                    </div>
                    <div class="duration">
                        <input type="text" name="min" id="" class="form-inp" placeholder="Minutes">
                    </div>
                    <div class="duration">
                        <input type="text" name="sec" id="" class="form-inp" placeholder="Seconds">
                    </div>
                </div>
            </div>
            <div class="form-data">
                <button type="submit">Submit</button>
                <button type="reset">Cancel</button>
            </div>
        </form>
    </section>
</main>


<?php include_once "frontend/includes/footer.php" ?>