<?php include_once "frontend/includes/adminDashboardNav.php" ?>
<main class="workouts-container">
    <section class="workouts-sec content">
        <h2 class="header-text ft-poppins">Registered Users</h2>
        <div class="users-list list ft-poppins">
            <div class="user-table table">
                <div class="tbl-row">
                    <span>Sn</span>
                    <span>User Name</span>
                    <span>User Email</span>
                    <span>User Goal</span>
                    <span>User Weight</span>
                    <span>Weight Metric</span>
                </div>
            </div>
        </div>
        </div>

        <div class="workout-detail-modal modal ft-poppins">
            <h2 class="modal-workout-name"></h2>
            <div class="modal-workout-duration">
                Workout Duration:
                <span class="hrs"></span>
                <span class="mins"></span>
                <span class="secs"></span>
            </div>
            <div class="exercise-list">

            </div>
            <div class="modal-actions">
                <button type="button" class="start-workout">Start Workout</button>
                <button type="reset">Cancel</button>
            </div>
        </div>
    </section>
</main>


<?php include_once "frontend/includes/footer.php" ?>