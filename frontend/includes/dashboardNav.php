<?php include_once "frontend/includes/header.php" ?>
<nav class="dashboard-nav ft-poppins">
    <section class="side-nav">
        <header>
            <a href="/dashboard" class="brand-link brand-exp ft-poppins">FTracker</a>
            <a href="/dashboard" class="brand-link brand-mini ft-poppins">FT</a>
        </header>
        <ul class="nav-list">
            <li class="nav-list-item">
                <a href="/dashboard" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/home_icon.svg" alt="">
                    </div>
                    <span class="label-text">
                        Home
                    </span>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="/workouts" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/dumbell_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        Workouts
                    </div>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="#" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/food_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        Diets
                    </div>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/notebook_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        Workout Log/Diet Log
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
    <section class="side-nav-sp">
        <header>
            <a href="/dashboard" class="brand-link ft-poppins">FTracker</a>

            <div class="icon-container-md close-side-nav-btn">
                <img src="frontend/assets/images/close_icon.svg" alt="">
            </div>
        </header>
        <ul class="nav-list">
            <li class="nav-list-item">
                <a href="/dashboard" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/home_icon.svg" alt="">
                    </div>
                    <span class="label-text">
                        Home
                    </span>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="/workouts" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/dumbell_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        Workouts
                    </div>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="#" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/food_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        Diets
                    </div>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="" class="nav-list-link">
                    <div class="icon-container">
                        <img src="frontend/assets/images/notebook_icon.svg" alt="">
                    </div>
                    <div class="label-text">
                        Workout Log/Diet Log
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
        <header>
            <a href="/dashboard" class="brand-link brand-exp ft-poppins">FTracker</a>
        </header>
        <button class="sidenav-toggler">
            <img src="frontend/assets/images/bars_icon.svg" alt="">
        </button>
        <button class="sidenav-toggler-sp">
            <img src="frontend/assets/images/bars_icon.svg" alt="">
        </button>
        <form method="post" class="dash-search-form">
            <input type="text" name="search-text" id="" class="form-inp" placeholder="Search...">
        </form>
        <div class="dash-search-form-sp">
            <div class="icon-container-lg">
                <img src="frontend/assets/images/search_icon.svg" alt="">
            </div>
        </div>
        <ul class="user-actions">
            <li class="action">
                <div class="action-link create">
                    <span class="label-text">Create</span>
                    <div class="icon-container">
                        <img src="frontend/assets/images/chevronDown_icon.svg" alt="">
                    </div>
                    <div class="drpdown-content ft-source">
                        <div class="dp-item">
                            <a href="javascript:void(0)" class="link-item create-workout">Create Workout</a>
                        </div>
                        <div class="dp-item">
                            <a href="javascript:void(0)" class="link-item create-diet">Create Diet</a>
                        </div>
                        <div class="dp-item">
                            <a href="javascript:void(0)" class="link-item create-workout">Create Workout Log</a>
                        </div>
                        <div class="dp-item">
                            <a href="javascript:void(0)" class="link-item create-diet">Create Diet Log</a>
                        </div>
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
                <div class="action-link user-profile">
                    <!-- <div class="img-container"> -->
                    <!-- <img src="frontend/assets/images/profile_icon.svg" alt=""> -->
                    <!-- </div> -->
                    <div class="drpdown-content">
                        <div class="dp-item">
                            <a href="/profile" class="link-item">Profile</a>
                        </div>
                        <div class="dp-item">
                            <a href="/settings" class="link-item">Settings</a>
                        </div>
                        <div class="dp-item">
                            <a href="javascript:void(0)" class="log-out link-item">Log out</a>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

    </section>
</nav>

<nav class="dashboard-nav dashboard-nav-bottom ft-poppins">
    <ul class="user-actions">
        <li class="action home">
            <a href="/dashboard" class="action-link home">
                <div class="icon-container-md">
                    <img src="frontend/assets/images/home_icon.svg" alt="">
                </div>
            </a>
        </li>
        <li class="action home">
            <a href="/workouts" class="action-link home">
                <div class="icon-container-md">
                    <img src="frontend/assets/images/dumbell_icon.svg" alt="">
                </div>
            </a>
        </li>
        <li class="action">
            <div class="action-link create-btm create">
                <!-- <span class="label-text">Create</span> -->
                <div class="icon-container-lg">
                    <img src="frontend/assets/images/plus_icon.svg" alt="">
                </div>
                <div class="drpdown-content-btm ft-source">
                    <div class="header">
                        <h2 class="title-text">Create</h2>
                        <div class="icon-container">
                            <img src="/frontend/assets/images/close_icon.svg" alt="">
                        </div>
                    </div>
                    <a href="javascript:void(0)" class="dp-item create-workout">Create Workout</a>
                    <a href="javascript:void(0)" class="dp-item create-diet">Create Diet</a>
                    <a href="javascript:void(0)" class="dp-item create-workout">Create Workout Log</a>
                    <a href="javascript:void(0)" class="dp-item create-diet">Create Diet Log</a>
                </div>
            </div>
        </li>
        <li class="action">
            <div class="action-link diet">
                <div class="icon-container-md">
                    <img src="frontend/assets/images/food_icon.svg" alt="">
                </div>
            </div>
        </li>
        <li class="action">
            <div class="action-link log">
                <div class="icon-container-md">
                    <img src="frontend/assets/images/notebook_icon.svg" alt="">
                </div>
            </div>
        </li>
    </ul>

</nav>