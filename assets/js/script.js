var gameStartBtn = document.getElementById('start-btn');
var reStarteBtn = document.getElementById('restart-btn');
var gameTimer = document.getElementById('timer');
var questionCardElement = document.getElementById('question-card');
var questionElement = document.getElementById('question');
var answerBtnElemnt = document.getElementById('answer-btn');
var timerInterval = 1000;
var timerCount = 10;
var counter;


function gameStart() {

    gameStartBtn.addEventListener('click', function () {
        console.log(gameStartBtn)
        gameStartBtn.classList.add('hide')
        timerCount = 10;
        updateTimer();
        counter = setInterval(function () {
            timerCount--;
            if (timerCount === 0) {
                clearInterval(counter);
                alert('Game Over')
            }
            updateTimer();
        }, timerInterval)
    })
}


function updateTimer() {
    gameTimer.textContent = timerCount;
}

function init() {
    gameStart();
    updateTimer();
}

init();