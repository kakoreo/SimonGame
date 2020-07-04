
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var isGameStarted = false;
var level = 0;

// detect button click
$(".btn").on("click", handler);
// starting the game by detecting keyboard
$(document).on("keydown", function() {
  if (isGameStarted === false) {
    isGameStarted = true;
    setTimeout(nextSequence, 1000);

    $("h1").html("Level 1");
  }
});



function nextSequence() {
  // create random number 0 to 3
  var randomNumber = Math.floor(Math.random()*4);
  // create random color and add to the pattern list
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // add animation to the random chosen color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);

  level++;
  $("h1").html("Level "+ level);

  userClickedPattern = [];
}

function handler() {
  // getting the ID of the clicked button
  var userChosenColor = $(this).attr("id"); //event.target.id, this.id has the same result
  // add user chosen color to the pattern list
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  var indexOfUserPattern = (userClickedPattern.length)-1
  if (gamePattern.length === userClickedPattern.length) {
    checkAnswer(level);
  } else if (userClickedPattern[indexOfUserPattern] !== gamePattern[indexOfUserPattern]) {
    console.log(userClickedPattern);
    console.log(gamePattern);
    wrongAnswer();
  }


}

function playSound(name) {
  var audio = new Audio(`sounds\\${name}.mp3`)
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {

  if (userClickedPattern.toString() === gamePattern.toString()) {
    console.log("success")
    setTimeout(nextSequence, 1000);
  } else {
    console.log("fail")
    wrongAnswer();
  }
  console.log(userClickedPattern);
  console.log(gamePattern);
}

function wrongAnswer() {
  // play wrong audio
  var wrong = new Audio("sounds\\wrong.mp3")
  wrong.play();
  // play wrong animation
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  // resetting
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  $("h1").html("Game Over, Press Any Key to Restart");
  isGameStarted = false;
}
