$(document).ready(function () {
  if (location.pathname == "/dashboard") {
    let token = localStorage.getItem("jwt");
    if (token !== null) {
      let getUserInfo = {
        url: "/api/users/getUser.php",
        method: "POST",
        timeout: 0,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //to get user name and email
      $.ajax(getUserInfo).done(function (response) {
        console.log(response);
        if (response.success == 1) {
          $(".user-detail .user-name").html(response.user.name);
        }
      });

      let userGoal = {
        url: "/api/users/getUserWorkoutGoal.php",
        method: "POST",
        timeout: 0,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //to get users workout goal
      $.ajax(userGoal).done(function (response) {
        console.log(response);
        if (response.success == 0) {
          $(".user-goal-form").css("display", "flex");
        }
      });

      //to get current time to display messages//
      let current_day = new Date();
      let current_hr = current_day.getHours();

      if (current_hr >= 0 && current_hr < 12) {
        $(".current-time").html("Good Morning!");
      } else if (current_hr >= 12 && current_hr <= 17) {
        $(".current-time").html("Good Afternoon!");
      } else if (current_hr >= 17 && current_hr <= 19) {
        $(".current-time").html("Good Evening!");
      } else {
        $(".current-time").html("Good Night!");
      }

      //submitting user goal form//
      $(".user-goal-form").submit(function (e) {
        e.preventDefault();
        let weightInput = $('input[name="user-weight"]').val();
        let weightMetric = $('select[name="weight-metric"] option:selected').val();
        let goalSelect = $('select[name="user-goal"] option:selected').val();
        let counter = 0;
        if (goalSelect !== "default") {
          $('select[name="user-goal"]').removeClass("err-field");
          $(".err-goal").css("display", "none");
        } else {
          counter++;
          $(".err-goal").css("display", "block");
          $('select[name="user-goal"]').addClass("err-field");
        }
        if (weightInput !== "") {
          $(".err-weight").css("display", "none");
          $('input[name="user-weight"]').removeClass("err-field");
        } else {
          counter++;
          $(".err-weight").css("display", "block");
          $('input[name="user-weight"]').addClass("err-field");
        }

        if (counter == 0) {
          setUserWorkoutGoal(weightInput, weightMetric, goalSelect);
        }
      });

      function setUserWorkoutGoal(weightInput, weightMetric, goalSelect) {
        console.log(weightInput,weightMetric,goalSelect);
        let parsedWeight = parseInt(weightInput);
        let setGoal = {
          "url": "/api/users/setUserWorkoutGoal.php",
          "method": "POST",
          "timeout": 0,
          "headers": {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          "data": JSON.stringify({
            "goal": goalSelect,
            "start_weight": parsedWeight,
            "weight_metric": weightMetric,
          }),
        }

        $.ajax(setGoal).done(function (response) {
          console.log(response);
          if (response.success == 1) {
            $(".user-goal-form").css("display", "none");
          }
        });
      }

      //sidenav toggle//
      let sideNavToggle = $(".sidenav-toggler");
      let sideNavExp = false;
      $(".brand-exp").css("display", "block");
      $(".brand-mini").css("display", "none");
      $(".side-nav").removeClass("mini-nav");
      sideNavToggle.click(function () {
        const root = document.documentElement;
        if (sideNavExp) {
          root.style.setProperty("--sidenav-width", "250px");
          sideNavExp = false;
          $(".brand-exp").css("display", "block");
          $(".brand-mini").css("display", "none");
          $(".side-nav").removeClass("mini-nav");
        } else {
          root.style.setProperty("--sidenav-width", "80px");
          sideNavExp = true;
          $(".brand-mini").css("display", "block");
          $(".brand-exp").css("display", "none");
          $(".side-nav").addClass("mini-nav");
        }
      });

      //logout
      $(".log-out").click(function () {
        localStorage.removeItem("jwt");
        window.location.reload();
      });

      //create btn//
      $(".create").click(function () {
        $(".drpdown-content").toggleClass("show-drp");
      });

      //show add workout modal//
      $(".drpdown-content .create-workout").click(function () {
        $(".add-workout-modal").addClass("dsp-block");
        $("body").addClass('overlay');
      });

      //add or delete exercise//
      $(".add-exercise").click(function(){
        let workoutDescContainer = $('.workout-desc-container');
        let exerciseContainer= $('.exercise-container');
        let exerciseBlock = $('<div class="exercise-block"></div>');
        let nameblock = $('<div class="block"></div>');
        let setsblock = $('<div class="block"></div>');
        let repsblock = $('<div class="block"></div>');
        let nameField = $('<input type="text" class="form-inp" placeholder="Exercise Name">');
        let setsField = $('<input type="number" class="form-inp" placeholder="No of sets">');
        let repsField = $('<input type="number" class="form-inp" placeholder="No of reps">');
        let delBlock = $('<button class="del-exer-block" type="button"></button>');

        nameblock.append(nameField);
        setsblock.append(setsField);
        repsblock.append(repsField);

        exerciseBlock.append(nameblock); 
        exerciseBlock.append(setsblock); 
        exerciseBlock.append(repsblock); 
        exerciseBlock.append(delBlock);

        exerciseContainer.append(exerciseBlock);

      })

      //delete exercise block in add workout modal//
      $(document).on('click','.del-exer-block',function(){
         $(this).parent().remove();
      })



      //on reset button pressed on add workout modal//
      $('.add-workout-modal .form-data button[type="reset"]').click(
        function () {
          $(".add-workout-modal").removeClass("dsp-block");
          $(".err-msg").removeClass("dsp-block");
          $('input[name="workout-name"]').removeClass("err-field");
          $('.err-wr-duration').removeClass("dsp-block");
          $('input[name="hrs"]').removeClass("err-field");
          $('input[name="mins"]').removeClass("err-field");
          $('input[name="secs"]').removeClass("err-field");
          $('.err-wr-desc').removeClass('dsp-block');
          $('textarea[name="workout-desc"]').removeClass('err-field');
          $("body").removeClass('overlay');
        }
      );

      $(".add-workout-modal").submit(function (e) {
        e.preventDefault();
        let workoutName = $('input[name="workout-name"]').val();
        let workoutType = $('select[name="workout-type"] option:selected').val();
        let workoutDuHrs = $('input[name="hrs"]').val();
        let workoutDuMin = $('input[name="mins"]').val();
        let workoutDuSec = $('input[name="secs"]').val();
        let workoutDesc = $('textarea[name="workout-desc"]').val();
        let errCount = 0;
        if (workoutName == "") {
          $(".err-wr-name").addClass("dsp-block");
          $('input[name="workout-name"]').addClass("err-field");
          errCount++;
        }else{
           $(".err-msg").removeClass("dsp-block");
           $('input[name="workout-name"]').removeClass("err-field");
        }

        if(workoutDuHrs == '' && workoutDuMin == '' && workoutDuSec == ''){
          $('.err-wr-duration').addClass("dsp-block");
          $('input[name="hrs"]').addClass("err-field");
          $('input[name="mins"]').addClass("err-field");
          $('input[name="secs"]').addClass("err-field");
          errCount++;
        }else{
          $('.err-wr-duration').removeClass("dsp-block");
          $('input[name="hrs"]').removeClass("err-field");
          $('input[name="mins"]').removeClass("err-field");
          $('input[name="secs"]').removeClass("err-field");
        }

        if(workoutDesc == ''){
          $('.err-wr-desc').addClass('dsp-block');
          $('textarea[name="workout-desc"]').addClass('err-field');
          errCount++;
        }else{
          $('.err-wr-desc').removeClass('dsp-block');
          $('textarea[name="workout-desc"]').removeClass('err-field');
        }

      });
    } else {
      window.location.pathname = "/login";
    }
  }
});

