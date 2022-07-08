<?php include_once "frontend/includes/header.php" ?>
<nav class="dashboard-nav ft-poppins">
    <section class="side-nav">
        <header>
            <a href="/dashboard" class="brand-link brand-exp ft-poppins">FTracker</a>
            <a href="/dashboard" class="brand-link brand-mini ft-poppins">FT</a>
        </header>
        <ul class="nav-list">
            <li class="nav-list-item">
                <a href="#" class="nav-list-link active">
                    <div class="icon-container">
                        <img src="frontend/assets/images/home_icon.svg" alt="">
                    </div>
                    <span class="label-text">
                        Home
                    </span>
                </a>
            </li>
            <li class="nav-list-item">
                <a href="#" class="nav-list-link">
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
                        Add Workout/Diet Log
                    </div>
                </a>
            </li>
           
        </ul>
        <footer>
            <button class="log-out">
                <div class="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
                        <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
                    </svg>
                </div>
                <div class="label-text">
                    Log Out
                </div>
            </button>
        </footer>
    </section>
    <section class="top-nav">
        <div class="container">
            <button class="sidenav-toggler">
                toggle
            </button>
            <form method="post" class="dash-search-form">
                <input type="text" name="search-text" id="" class="form-inp" placeholder="Search...">
            </form>
            <ul class="user-actions">
                <li class="action">
                    <a href="" class="action-link">Create</a>
                </li>
                <li class="action">
                    <a href="" class="action-link">Messages</a>
                </li>
                <li class="action">
                    <a href="" class="action-link">Notification</a>
                </li>
                <li class="action">
                    <a href="" class="action-link">user-profile</a>
                </li>
            </ul>

        </div>
    </section>
</nav>