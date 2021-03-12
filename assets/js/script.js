var gameStartBtn = document.getElementById('start-btn');
var reStarteBtn = document.getElementById('restart-btn');
var introText = document.getElementById('intro')
var gameTimer = document.getElementById('timer');
var gameTimerText = document.getElementById('timer-text');
var questionCardElement = document.getElementById('question-card');
var questionElement = document.getElementById('question');
var answerBtnElemnt = document.getElementById('answer-btn');
var feedBackElement = document.getElementById('feedback')
var endCardScreen = document.getElementById('end-Card')
var timerInterval = 1000;
var timerCount = 5;
var timeCounter;



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
        gameStartBtn.classList.add('hide')
        introText.classList.add('hide')
        gameTimer.classList.remove('hide')
        gameTimerText.classList.remove('hide')
        shuffleQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionCardElement.classList.remove('hide')
        updateTimer();
        nextQuestion()
    })
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.choices.forEach(element => {
        var button = document.createElement('button')
        console.log(button)
        button.classList.add('btn')
        button.innerText = element
        answerBtnElemnt.appendChild(button)
        button.addEventListener('click', selectAnswers)
    })
}
function resetQuestionCard() {
    while (answerBtnElemnt.firstChild) {
        answerBtnElemnt.removeChild(answerBtnElemnt.firstChild)
    }
}

function nextQuestion() {
    resetQuestionCard()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function selectAnswers() {
    if (this.element !== questions[currentQuestionIndex].choices) {
        timerCount -= 15;
        if (timer < 0) {
            timer = 0;
        }
        gameTimer.textContent = timerCount ;
        feedBackElement.textContent = "Wrong";
    } else {
        feedBackElement.textContent = "Correct";
    }
    feedBackElement.classList.remove('hide');
    setTimeout(function () {
        feedBackElement.classList.add('hide');
    }, 1000);
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length){
        endQuiz();
    } 
    else{
        showQuestion();
    }
}




timeCounter = setInterval(function () {
    timerCount--;
    if (timerCount === 0) {
        clearInterval(timeCounter); 
    }
    updateTimer();
}, timerInterval)


    function updateTimer() {
        gameTimer.textContent = timerCount;
    }

    function endQuiz(){
        clearInterval(timerCounter)
        endCardScreen.classList.remove('hide')
        questionCardElement.classList.add('hide')
        var finalScoreElement = document.getElementById('final_score')
        finalScoreElement.textContent = timerCount


    }


    function init() {
        gameStart();
        updateTimer();
    }

    init();