<?php include_once "frontend/includes/header.php" ?>

<div class="profile-container ft-poppins">
    <div class="side-nav">
        <header class="user-profile-img">
            <div class="img-container">
            </div>
            <div class="user-info">
                <div class="user-name"></div>
            </div>
        </header>
        <ul class="side-nav-list">
            <li class="list-item">
                <a href="" class="list-link active">
                    <div class="icon-container">
                        <img src="/frontend/assets/images/home_icon.svg" alt="">
                    </div>
                    <span class="label-text">Account Overview</span>
                </a>
            </li>
            <li class="list-item">
                <a href="" class="list-link">
                    <div class="icon-container">
                        <img src="/frontend/assets/images/edit_icon.svg" alt="">
                    </div>
                    <span class="label-text">
                        Edit Profile
                    </span>
                </a>
            </li>
            <li class="list-item">
                <a href="" class="list-link">
                    <div class="icon-container">
                        <img src="/frontend/assets/images/lock_icon.svg" alt="">
                    </div>
                    <span class="label-text">
                        Change Password
                    </span>
                </a>
            </li>
            <li class="list-item">
                <a href="" class="list-link">
                    <div class="icon-container">
                        <img src="/frontend/assets/images/settings_icon.svg" alt="">
                    </div>
                    <span class="label-text">
                        Settings
                    </span>
                </a>
            </li>
        </ul>
    </div>
    <main class="main-content">
        <a href="/dashboard" class="back-home">
            <div class="icon-container">
                <img src="/frontend/assets/images/chevronLeft_icon.svg" alt="">
            </div>
        </a>
        <h2 class="header-text">Account Overview</h2>
        <div class="profile-img">
            <div class="img-container">
            </div>
            <div class="actions">
                <button class="upload-new">Upload New Photo</button>
                <button class="remove-photo">Remove Photo</button>
            </div>
        </div>
        <div class="profile-info">
            <h2>Profile</h2>
            <div class="profile-desc">
                <div class="item user-name">
                    <span class="label-text">Username</span>
                    <span class="label-data"></span>
                </div>
                <div class="item user-email">
                    <span class="label-text">Email</span>
                    <span class="label-data"></span>
                </div>
            </div>
        </div>
        <div class="goal-info">
            <h2>Your Goal</h2>
            <div class="goal-desc">
                <div class="item user-goal">
                    <span class="label-text">User Goal</span>
                    <span class="label-data"></span>
                </div>
            </div>
        </div>
    </main>
</div>

<?php include_once "frontend/includes/footer.php" ?>