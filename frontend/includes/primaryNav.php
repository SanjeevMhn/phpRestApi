<?php include_once "frontend/includes/header.php" ?>
<nav class="main-nav">
    <div class="container mx-auto">
        <a href="/home" class="brand-name ft-lucida">
            Fitness Tracker
        </a>
        <div class="side-nav-toggler icon-container-lg">
            <img src="frontend/assets/images/bars_icon.svg" alt="">
        </div>
        <ul class="nav-list ft-source">
            <li class="nav-item">
                <a href="/home" class="nav-link">Home</a>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)" class="nav-link">About</a>
            </li>
            <li class="nav-item">
                <a href="javascript:void(0)" class="nav-link">Contact Us</a>
            </li>
            <li class="nav-item">
                <a href="/register" class="nav-link">Register</a>
            </li>
            <li class="nav-item">
                <a href="/login" class="nav-link">Login</a>
            </li>
        </ul>
    </div>
</nav>
<section class="nav-sp ft-poppins">
    <header>
        <a href="/dashboard" class="brand-link ft-poppins">FTracker</a>

        <div class="icon-container-md close-side-nav-btn">
            <img src="frontend/assets/images/close_icon.svg" alt="">
        </div>
    </header>
    <ul class="nav-list">
        <li class="nav-list-item">
            <a href="/home" class="nav-list-link">
                <div class="icon-container">
                    <img src="frontend/assets/images/home_icon.svg" alt="">
                </div>
                <span class="label-text">
                    Home
                </span>
            </a>
        </li>
        <li class="nav-list-item">
            <a href="/about" class="nav-list-link">
                <div class="icon-container">
                    <img src="frontend/assets/images/notebook_icon.svg" alt="">
                </div>
                <div class="label-text">
                    About
                </div>
            </a>
        </li>
        <li class="nav-list-item">
            <a href="/contact" class="nav-list-link">
                <div class="icon-container">
                    <img src="frontend/assets/images/contact_icon.svg" alt="">
                </div>
                <div class="label-text">
                    Contact Us
                </div>
            </a>
        </li>
        <li class="nav-list-item">
            <a href="/register" class="nav-list-link">
                <div class="icon-container">
                    <img src="frontend/assets/images/register_icon.svg" alt="">
                </div>
                <div class="label-text">
                    Register
                </div>
            </a>
        </li>
        <li class="nav-list-item">
            <a href="/login" class="nav-list-link">
                <div class="icon-container">
                    <img src="frontend/assets/images/login_icon.svg" alt="">
                </div>
                <div class="label-text">
                    Login
                </div>
            </a>
        </li>

    </ul>
    <!-- <footer>
        <button class="log-out">
            <div class="icon-container">
                <img src="frontend/assets/images/logout_icon.svg" alt="">
            </div>
            <div class="label-text">
                Log Out
            </div>
        </button>
    </footer> -->
</section>