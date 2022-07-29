<?php include_once "frontend/includes/dashboardNav.php" ?>
<main class="workouts-container">
    <section class="workouts-sec content">
        <h2 class="header-text ft-poppins">Your Workouts</h2>
        <div class="workouts-list list">

        </div>

        <div class="workout-detail-modal modal ft-poppins">
            <div class="close-btn">
                <div class="icon-container">
                    <img src="frontend/assets/images/close_icon.svg" alt="" srcset="">
                </div>
            </div>
            <h2 class="modal-workout-name pb-10"></h2>
            <h3 class="modal-workout-type capitalize pb-10"></h3>
            <div class="modal-workout-duration pb-10">
                Workout Duration<br />
                <span class="hrs"></span>
                <span class="mins"></span>
                <span class="secs"></span>
            </div>
            <div class="table-resp">
                <div class="exercise-list-table ft-poppins">
                    <div class="exercise-item-row heading">
                        <div class="exercise-name-data data-col text-bold">Exercise Name</div>
                        <div class="exercise-sets-data data-col text-bold">Sets</div>
                        <div class="exercise-reps-data data-col text-bold">Reps</div>
                    </div>
                </div>
            </div>

            <div class="modal-actions">
                <button type="button" class="start-workout">Start Workout</button>
                <button type="button" class="edit-workout">Edit Workout</button>
                <button type="button" class="delete-workout">Delete Workout</button>
                <button type="reset">Cancel</button>
            </div>
        </div>

        <form method="post" class="edit-workout-modal modal form ft-poppins">
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
                    <!-- <div class="exercise-block">
                        <div class="block">
                            <input type="text" name="exercise-name" id="" class="form-inp" placeholder="Exercise Name">
                        </div>
                        <div class="block">
                            <input type="number" name="exercise-sets" id="" class="form-inp" placeholder="No of sets">
                        </div>
                        <div class="block">
                            <input type="number" name="exercise-reps" id="" class="form-inp" placeholder="No of reps">
                        </div>
                    </div> -->
                </div>
                <button class="add-exercise" type="button">Add Exercise</button>
                <span class="err-msg err-wr-desc">Please enter your workout description</span>
            </div>
            <div class="form-data">
                <button type="submit">Submit</button>
                <button type="reset">Cancel</button>
            </div>
        </form>

        <?php include_once "frontend/includes/addWorkoutModal.php" ?>
    </section>
</main>


<?php include_once "frontend/includes/footer.php" ?>