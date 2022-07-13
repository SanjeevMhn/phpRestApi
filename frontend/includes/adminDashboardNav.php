<?php include_once "frontend/includes/header.php" ?>
<nav class="dashboard-nav ft-poppins">
    <section class="side-nav">
        <header>
            <a href="/adminDashboard" class="brand-link brand-exp ft-poppins">FTracker</a>
            <a href="/adminDashboard" class="brand-link brand-mini ft-poppins">FT</a>
        </header>
        <ul class="nav-list">
            <li class="nav-list-item">
                <a href="/adminDashboard" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/home_icon.svg" alt="">
                    </div>
                    <span class="label-text">
                        Home
                    </span>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="/users" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/profile_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        Users
                    </div>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="#" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/dumbell_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        Trainers
                    </div>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/shop_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        E-Shop
                    </div>
                </a>
            </li>

        </ul>
        <footer>
            <button class="log-out">
                <div class="icon-container">
                    <img src="frontend/assets/images/logout_icon.svg" alt="">
                </div>
                <div class="label-text">
                    Log Out
                </div>
            </button>
        </footer>
    </section>
    <section class="top-nav">
        <button class="sidenav-toggler">
            <img src="frontend/assets/images/bars_icon.svg" alt="">
        </button>
        <form method="post" class="dash-search-form">
            <input type="text" name="search-text" id="" class="form-inp" placeholder="Search...">
        </form>
        <ul class="user-actions">
            <li class="action">
                <div class="action-link create">
                    <span class="label-text">Create</span>
                    <div class="icon-container">
                        <img src="frontend/assets/images/chevronDown_icon.svg" alt="">
                    </div>
                    <div class="drpdown-content ft-source">
                        <a href="javascript:void(0)" class="dp-item create-workout">Create Workout</a>
                        <a href="javascript:void(0)" class="dp-item create-diet">Create Diet</a>
                        <a href="javascript:void(0)" class="dp-item create-workout">Create Workout Log</a>
                        <a href="javascript:void(0)" class="dp-item create-diet">Create Diet Log</a>
                    </div>
                </div>
            </li>
            <li class="action">
                <div class="action-link message">
                    <div class="icon-container-md">
                        <img src="frontend/assets/images/message_icon.svg" alt="">
                    </div>
                </div>
            </li>
            <li class="action">
                <div class="action-link message">
                    <div class="icon-container-md">
                        <img src="frontend/assets/images/notification_icon.svg" alt="">
                    </div>
                </div>
            </li>
            <li class="action">
                <div class="action-link message">
                    <div class="icon-container-md">
                        <img src="frontend/assets/images/profile_icon.svg" alt="">
                    </div>
                </div>
            </li>
        </ul>

    </section>
</nav>