<?php include_once "frontend/includes/dashboardNav.php" ?>
<main class="workouts-container">
    <section class="workouts-sec content">
        <h2 class="header-text ft-poppins">Your Workouts</h2>
        <div class="workouts-list list">

        </div>

        <div class="workout-detail-modal modal ft-poppins">
            <h2 class="modal-workout-name"></h2>
            <div class="modal-workout-duration">
                Workout Duration<br/>
                <span class="hrs"></span>
                <span class="mins"></span>
                <span class="secs"></span>
            </div>
            <div class="exercise-list">

            </div>
            <div class="modal-actions">
                <button type="button" class="start-workout">Start Workout</button>
                <button type="button" class="edit-workout">Edit Workout</button>
                <button type="button" class="delete-workout">Delete Workout</button>
                <button type="reset">Cancel</button>
            </div>
        </div>
    </section>
</main>


<?php include_once "frontend/includes/footer.php" ?>