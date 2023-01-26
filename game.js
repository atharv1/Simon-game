var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.random();
  randomNumber = randomNumber*4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];         //random color we got
  gamePattern.push(randomChosenColour);           // pushed it in array

  $("."+randomChosenColour).fadeOut(100).fadeIn(100);       //giving animation to the element

  playSound(randomChosenColour);                      // giving sound of random chosen element
}


  $(".btn").click(function(event){
    var userChosenColour = event.target.id;        // know which element we clicked
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);     // push clicked element in array
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });


  function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
      if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
          nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press any key to Restart");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}


function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');   // giving sound to clicked element
  audio.play();
}


function animatePress(currentColor){
  $("#"+currentColor).click(function(){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 1);

  });
}


function startOver(){
level = 0;
gamePattern = [];
started = false;
}
