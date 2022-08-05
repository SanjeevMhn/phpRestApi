<?php include_once "frontend/includes/dashboardNav.php" ?>

<div class="workout-diet-log-container content ft-poppins">
    <h2 class="pb-10">Add your daily workout and diet logs</h2>
    <div class="search-logs pb-10">
        <input type="text" name="search-log" id="" class="form-inp border-2" placeholder="Search logs">
    </div>
    <div class="user-actions pb-10">
        <button class="add-log" data-reset="reset">Add Log</button>
    </div>
    <div class="logs-container">
        
    </div>
    <div class="modal daily-log-modal">
        <div class="close-btn">
            <div class="icon-container">
                <img src="/frontend/assets/images/close_icon.svg" alt="">
            </div>
        </div>
    </div>
</div>


<?php include_once "frontend/includes/footer.php" ?>