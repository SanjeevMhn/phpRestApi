<main class="dashboard-container">
    <?php include_once "frontend/includes/dashboardNav.php" ?>
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
    </section>
</main>


<?php include_once "frontend/includes/footer.php" ?>