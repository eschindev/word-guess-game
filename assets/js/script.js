var gameArea;
var timer;
var randomWord;
var hiddenWord;
var wins = 0;
var losses = 0;

window.onload = function() {
    gameArea = document.getElementById("game-area");
    timer = document.getElementById("timer");
}

var game = {
    startGame: function() {
        fetch('https://random-word-api.herokuapp.com/word')
            .then(response => response.json())
            .then(data => {
                randomWord = data[0].split('');
                console.log(randomWord);
                hiddenWord = [];
                for (i = 0; i < randomWord.length; i++) {
                    hiddenWord.push("_");
                }


                countdown();
            });
    },
    endGame: function() {

    }
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

game.startGame()
