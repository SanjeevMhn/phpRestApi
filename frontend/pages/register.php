<?php
 include_once "frontend/includes/header.php" ?>

    <main class="register-container form-container">
        <h2 class="header-text ft-lucida">Register Form</h2>

        <form action="" class="res-form ft-poppins" method="POST">
            <div class="form-data">
                <label for="username">Username</label>
                <input type="text" name="usr-name" id="username" class="form-inp" placeholder="Your name">
            </div>
            <div class="form-data">
                <label for="email">Email</label>
                <input type="email" name="usr-email" id="email" class="form-inp" placeholder="Your email">
            </div>
            <div class="form-data">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" class="form-inp" placeholder="Your password">
            </div>
            <div class="form-data">
                <label for="goal">Select your workout goals</label>
                <select name="goal" id="goal" class="form-select">
                    <option value="">Choose your workout goal</option>
                    <option value="gain">Weight Gain</option>
                    <option value="loss">Weight Loss</option>
                    <option value="maintain">Weight Maintain</option>
                </select>
            </div>
            <div class="form-data">
                <button type="submit" class="submit-btn ft-poppins">Submit</button>
                <button type="reset" class="reset-btn ft-poppins">Cancel</button>
            </div>
        </form>
    </main>

<?php include_once "frontend/includes/footer.php" ?>