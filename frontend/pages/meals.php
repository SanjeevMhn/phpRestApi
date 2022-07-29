<?php include_once "frontend/includes/dashboardNav.php" ?>

<main class="meals-container">
    <section class="meals-sec content ft-poppins pb-120">
        <div class="user-meals pb-120">
            <div class="breakfast-container pb-10">
                <h2 class="header-text">Breakfast</h2>
                <div class="breakfast-list list">

                </div>
            </div>
            <div class="lunch-container pb-10">
                <h2 class="header-text">Lunch</h2>
                <div class="lunch-list list">

                </div>
            </div>
            <div class="dinner-container pb-10">
                <h2 class="header-text">Dinner</h2>
                <div class="dinner-list list">

                </div>
            </div>
            <div class="snack-container pb-10">
                <h2 class="header-text">Snack</h2>
                <div class="snack-list list">

                </div>
            </div>
        </div>
        <div class="rec-meal-detail-modal modal ft-poppins">
            <div class="close-btn">
                <div class="icon-container close">
                    <img src="/frontend/assets/images/close_icon.svg" alt="">
                </div>
            </div>
            <div class="meal-detail">
                <div class="meal-img img-container-300">

                </div>
                <h2 class="meal-name pb-10"></h2>
                <div class="dsp-none meal-id"></div>
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
                    <button class="add-meal add-meal-log" type="button">Add to log</button>
                    <button class="edit-meal" type="button">Edit Meal</button>
                    <button class="delete-meal" type="button">Delete Meal</button>
                    <button class="cancel" type="reset">Cancel</button>
                </div>
            </div>
        </div>
        <?php include_once "frontend/includes/addWorkoutModal.php" ?>
    </section>
</main>

<?php include_once "frontend/includes/footer.php" ?>