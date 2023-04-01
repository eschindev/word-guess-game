var gameArea;
var timer;
var randomWord;
var wins;
var losses;

window.onload = function() {
    gameArea = document.getElementById("game-area");
    timer = document.getElementById("timer");
    randomWord = "";
    wins = 0;
    losses = 0;
}



function genRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(data => {randomWord = data[0]});
}

function countdown() {
    var timeLeft = 20;
  
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timer.textContent = timeLeft;
        timeLeft--;
      } else {
        timer.textContent = '';
        clearInterval(timeInterval);
      }
    }, 1000);
}

genRandomWord();
console.log(randomWord);
countdown();