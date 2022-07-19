<?php include_once "frontend/includes/adminDashboardNav.php" ?>
<main class="users-container content">
    <h2 class="header-text ft-poppins">Registered Users</h2>
    <div class="user-table ft-poppins ">
        <div class="user-tbl-row ft-poppins">
            <span class="data-col">Sn</span>
            <span class="data-col">User Name</span>
            <span class="data-col">User Email</span>
            <span class="data-col">User Goal</span>
            <span class="data-col">User Weight</span>
            <span class="data-col">Weight Metric</span>
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
</main>


<?php include_once "frontend/includes/footer.php" ?>