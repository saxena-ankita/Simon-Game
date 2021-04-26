var buttonColours=["red","blue","green","yellow"];
var randomNumber;
var randomChosenColour;
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var l;

function nextSequence(){
    userClickedPattern=[];
    randomNumber=Math.floor((Math.random())*4);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level "+(++level));
}

$(".btn").on("click",function(){
    userClickedPattern.push(this.id);
    playSound(this.id);
    animatePress(this.id);
    l=userClickedPattern.length;
    checkAnswer(l-1);
});

function playSound(name){
    var audioSound=new Audio("sounds/"+name+".mp3");
    audioSound.play();
}

function animatePress(currentcolour){
    $("#"+currentcolour).addClass("pressed");
        setTimeout(function(){
            $("#"+currentcolour).removeClass("pressed");
        },100);
}

$(document).on("keydown",function(){
    $("h1").text("Level "+(level));
    nextSequence();
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log(gamePattern);
        console.log(userClickedPattern);
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
            nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
}