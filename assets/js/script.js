var gameStartBtn = document.getElementById('start-btn');
var reStarteBtn = document.getElementById('restart-btn');
var introText = document.getElementById('intro')
var endText = document.getElementById('fin')
var gameTimer = document.getElementById('timer');
var gameTimerText = document.getElementById('timer-text');
var questionCardElement = document.getElementById('question-card');
var questionElement = document.getElementById('question');
var answerBtnElemnt = document.getElementById('answer-btn');
var feedBackElement = document.getElementById('feedback')
var endCardScreen = document.getElementById('end_Card')
var quizCardElement = document.getElementById('Quiz_card');
var submitBtnElement = document.getElementById('submit')
var wrongImage = document.getElementById('wrong_img');
var correctImage = document.getElementById('correct_img')
var timerInterval = 1000;
var timerCount = 100;
var timeCounter;

// questions are placed here and can be added here 
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
        correct: "Parantheses",
    },
    {
        question: "Arrays in JavaScript can be used to store:____?",
        choices: ["Numbers and Strings", "Other Arrays", "Booleances", "All of the above"],
        correct: "All of the above",
    }
]

let shuffleQuestions, currentQuestionIndex
// This function starts the game and timer 
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
// this function grabs the information of the questions array to create a new question card with the question and answer/choices
function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex]
    questionElement.innerText = currentQuestion.question
    currentQuestion.choices.forEach(element => {
        var button = document.createElement('button')
        console.log(button)
        button.classList.add('btn')
        button.innerText = element
        answerBtnElemnt.appendChild(button)
        button.addEventListener('click', selectAnswers)
    })
}
// this function clears out the information in the question card.
function resetQuestionCard() {
    while (answerBtnElemnt.firstChild) {
        answerBtnElemnt.removeChild(answerBtnElemnt.firstChild)
    }
}

function nextQuestion() {
    resetQuestionCard()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

//This function is used to display feedback to the user once an choice/answer is selected. If the user choice is selceted wrong the user will lose 35sec
//if the correct answer is selected 10 sec is added, once a choice is selected the next question is displayed 
function selectAnswers() {
    if (this.textContent !== questions[currentQuestionIndex].correct) {
        timerCount -= 35;
        if (timerCount < 0) {
            timerCount = 0;
        }
        gameTimer.textContent = timerCount;
        //feedBackElement.textContent = "Wrong";
        wrongImage.classList.remove('hide')
    } else {
        timerCount += 10
        // feedBackElement.textContent = "Correct";
        correctImage.classList.remove('hide')
    }
    feedBackElement.classList.remove('hide');
    setTimeout(function () {
        feedBackElement.classList.add('hide')
        wrongImage.classList.add('hide')
        correctImage.classList.add('hide');
    }, 1000);
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
        endQuiz();
    }
    else {
        nextQuestion();
    }
}

timeCounter = setInterval(function () {
    timerCount--;
    if (timerCount <= 0) {
        clearInterval(timeCounter);
        endQuiz()
    }
    updateTimer();
}, timerInterval)


function updateTimer() {
    gameTimer.textContent = timerCount;
}
var finalScoreElement = document.getElementById('final_score')

function endQuiz() {
    clearInterval(timeCounter)
    endCardScreen.classList.remove('hide')
    endText.classList.remove('hide')
    quizCardElement.classList.add('hide')
    questionCardElement.classList.add('hide')
    gameTimer.classList.add('hide')
    gameTimerText.classList.add('hide')
    reStarteBtn.classList.remove('hide')
    finalScoreElement.textContent = timerCount



}
submitBtnElement.addEventListener('click', submitQuiz)
var nameSubmit = document.getElementById('name')
var restartQuizCard = document.getElementById('restart_card')

//var storedScores = JSON.parse(localStorage.getItem(nameSubmit))

function submitQuiz() {
    var scores = JSON.parse(localStorage.getItem("scores")) || []
    var nameSubmit = document.getElementById('user').value
    var highScores = { name: nameSubmit, score: finalScoreElement.textContent }
    console.log(highScores)
    console.log(finalScoreElement)
    scores.push(highScores)
    localStorage.setItem("scores", JSON.stringify(scores))
    endCardScreen.classList.add('hide');
    restartQuizCard.classList.remove('hide')
}

//document.getElementById('high_scores').innerHTML=localStorage.getItem('scores')


reStarteBtn.addEventListener('click', restartQuiz)

function restartQuiz() {
    location.reload();
}

function init() {
    gameStart();
    updateTimer();
}

init();