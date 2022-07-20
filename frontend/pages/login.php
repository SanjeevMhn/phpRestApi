<?php include_once "frontend/includes/primaryNav.php" ?>

<main class="login-container form-container">
    <h2 class="header-text ft-lucida">Login Form</h2>
    <div class="container">

        <form action="" class="form login-form ft-poppins mx-auto" method="POST">
            <div class="form-data">
                <label for="email">Email</label>
                <input type="email" name="usr-email" id="email" class="form-inp" placeholder="Your email">
                <span class="err-msg err-useremail ft-source">Please enter email</span>
            </div>
            <div class="form-data">
                <label for="password">Password</label>
                <input type="password" name="usr-password" id="password" class="form-inp" placeholder="Your password">
                <span class="err-msg err-password ft-source">Please enter password</span>
            </div>
            <div class="go-to-resgister form-data">
                <a href="/register" class="">Not registered? Register Now</a>
            </div>
            <div class="form-data">
                <button type="submit" class="submit-btn ft-poppins">Submit</button>
                <button type="reset" class="reset-btn ft-poppins">Cancel</button>
            </div>
        </form>

    </div>
</main>

<?php include_once "frontend/includes/footer.php" ?>