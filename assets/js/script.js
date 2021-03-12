var gameStartBtn = document.getElementById('start-btn');
var reStarteBtn = document.getElementById('restart-btn');
var gameTimer = document.getElementById('timer');
var gameTimerText = document.getElementById('timer-text');
var questionCardElement = document.getElementById('question-card');
var questionElement = document.getElementById('question');
var answerBtnElemnt = document.getElementById('answer-btn');
var timerInterval = 1000;
var timerCount = 0;
var counter;



var questions = [
    {
        question: 'Which of the following tags is used to inset a blank line?',
        choices: ['<br>', '<hr>', '<h1>', '<p>'],
        correct: '<br>',
    },
    {
        question: 'Commonly used data type Do Not Include:____?',
        choices: ["Strings", "Booleance", "Alerts", "Numbers"],
        correct: 'Alerts'
    },
    {
        question: "The condition in an if/else statement is enclosed within:_____",
        choices: ["Quotes", "Curly Brackets", "Parantheses", "Square Brackets"],
        correct: "Paratheses",
    },
    {
        question: "Arrays in JavaScript can be used to store:____?",
        choices: ["Numbers and Strings", "Other Arrays", "Booleances", " All of the above"],
        correct: "All of the above",
    }
]

let shuffleQuestions, currentQuestionIndex


function gameStart() {

    gameStartBtn.addEventListener('click', function () {
        console.log(gameStartBtn)
        counter = setInterval(function () {
            timerCount--;
            if (timerCount === 0) {
                clearInterval(counter);
                alert('Game Over')
            }
            updateTimer();
        }, timerInterval)
        gameStartBtn.classList.add('hide')
        gameTimer.classList.remove('hide')
        gameTimerText.classList.remove('hide')
        shuffleQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionCardElement.classList.remove('hide')
        timerCount = 10;
        updateTimer();
        nextQuestion()

    })
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.choices.forEach( element => {
        var button = document.createElement('button')
        console.log(button)
        button.classList.add('btn')
        button.innerText = element
        answerBtnElemnt.appendChild(button)
        button.addEventListener('click', nextQuestion) 
    })
}

function nextQuestion() {
    showQuestion(shuffleQuestions[currentQuestionIndex])
}







function updateTimer() {
    gameTimer.textContent = timerCount;
}

function init() {
    gameStart();
    updateTimer();
}

init();