var gameArea;
var timer;
var randomWord;
var hiddenWord;
var hiddenWordStr;
var wordDisplay;
var resetButton;
var wins;
var losses;
var gameOn;
var timeLeft;

window.onload = function() {
    gameArea = document.getElementById("game-area");
    timer = document.getElementById("timer");
    wordDisplay = document.getElementById("word-display");
    winsDisplay = document.getElementById("wins-display");
    lossesDisplay = document.getElementById("losses-display");
    resetButton = document.getElementById("reset-button");
    restartButton = document.getElementById("restart-button");
    document.addEventListener("keydown", game.checkGuess);
    resetButton.addEventListener("click", game.resetResults);
    restartButton.addEventListener("click", game.restartGame);
    wins = 0;
    losses = 0;
    if (localStorage.wins) {
        wins = localStorage.wins;
    }
    winsDisplay.textContent = wins;
    if (localStorage.losses) {
        losses = localStorage.losses;
    }
    lossesDisplay.textContent = losses;
}

var game = {
    startGame: function() {
        fetch('https://random-word-api.herokuapp.com/word')
            .then(response => response.json())
            .then(data => {
                timeLeft = 10;
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
    winGame: function() {
        wins++;
        timeLeft = -1;
        winsDisplay.textContent = wins;
        localStorage.setItem("wins", wins);
    },
    loseGame: function() {
        wordDisplay.textContent = randomWord.join(' ');
        losses++;
        lossesDisplay.textContent = losses;
        localStorage.setItem("losses", losses);
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
        if (!hiddenWord.includes("_")) {
            game.winGame();
        }
    },
    resetResults: function() {
        localStorage.clear();
        winsDisplay.textContent = "0";
        lossesDisplay.textContent = "0";
    },
    restartGame: function(){
        game.startGame()
    }
}

function countdown() {
    var timeInterval = setInterval(function () {
      if (timeLeft >= 1) {
        timer.textContent = timeLeft;
        timeLeft--;
      } else if (timeLeft === -1) {
        timer.textContent = ":^)";
        clearInterval(timeInterval);
      } else {
        game.loseGame();
        timer.textContent = ":^(";
        clearInterval(timeInterval);
      }
    }, 1000);
}

game.startGame();
