var gameArea;
var timer;
var randomWord;
var hiddenWord;
var hiddenWordStr;
var wordDisplay;
var wins = 0;
var losses = 0;
var gameOn;
var timeLeft = 10;

window.onload = function() {
    gameArea = document.getElementById("game-area");
    timer = document.getElementById("timer");
    wordDisplay = document.getElementById("word-display");
    if (localStorage.wins !== null) {
        wins = localStorage.wins;
    }
    if (localStorage.losses !== null) {
        losses = localStorage.losses;
    }
}

var game = {
    startGame: function() {
        fetch('https://random-word-api.herokuapp.com/word')
            .then(response => response.json())
            .then(data => {
                countdown();
                randomWord = data[0].split('');
                console.log(randomWord);
                hiddenWord = [];
                gameOn = true;
                for (i = 0; i < randomWord.length; i++) {
                    hiddenWord.push("_");
                }
                game.refreshWord();
                
                

            });
    },
    endGame: function() {
        gameOn = false;
    },
    checkGuess: function(event) {
        for (i = 0; i < randomWord.length; i++) {
            if (randomWord[i] === event.key) {
                hiddenWord[i] = randomWord[i];
                game.refreshWord();
            }
        }
    },
    refreshWord: function() {
        hiddenWordStr = hiddenWord.join(" ");
        wordDisplay.textContent = hiddenWordStr;
    }
}



function countdown() {
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timer.textContent = timeLeft;
        timeLeft--;
      } else {
        timer.textContent = '';
        game.endGame();
        clearInterval(timeInterval);
      }
    }, 1000);
}

document.addEventListener("keydown", game.checkGuess);
game.startGame()
