// Arrays used to create questions and answers
var myQuestions = [
    {
        question: "1. What does HTML stand for?",
        options: [
            "a. Hyper Text Markup Language",
            "b. Hyper Text Multi Language",
            "c. Hyper Tool Makeup Language",
            "d. Hype Tool Many Languages",
        ],
        answer: "a. Hyper Text Markup Language"
    },
    {
        question: "2. Which of the following is a not a data type?",
        options: [
            "a. Integer",
            "b. Software",
            "c. String",
            "d. Boolean",
        ],
        answer: "b. Software"
    },
    {
        question: "3. What does css stand for?",
        options: [
            "a. Colourful Style Sheet",
            "b. Cascading Style Sheet",
            "c. Computer Style Sheet,",
            "d. Coloring Sheet Style"
        ],
        answer: "b. Cascading Style Sheet"
    },
    {
        question: "4. Which of the following options are not coding languages?",
        options: [
            "a. Python",
            "b. Bite",
            "c. Quidditch",
            "d. Apple",
        ],
        answer: "d. Apple"
    },
    {
        question: "5. What is computer coding?",
        options: [
            "a. A list of functions",
            "b. A TV show",
            "c. Giving a computer instructions",
            "d. A computer game",
        ],
        answer: "c. Giving a computer instructions"
    }
]

// variables
// Initial page
var loadingPage = document.querySelector(".loading-page");
var startButton = document.querySelector("#start-button");
// Questions section 
var quizSection = document.querySelector(".quiz-main");
var questionEl = document.querySelector(".quiz-box");
var questionTitle = document.querySelector(".question-title");
var optionA = document.querySelector("#btn0");
var optionB = document.querySelector("#btn1");
var optionC = document.querySelector("#btn2");
var optionD = document.querySelector("#btn3");
var answerCheck = document.querySelector(".answer-check");
//  Results section
var resultsEl = document.querySelector(".results-box");
var initialsInput = document.getElementById("initialText") 
var submitIntBtn = document.querySelector("#submit-button");
var replayBtn = document.querySelector("#replay-button");
var clearHighscores = document.querySelector("#clear-button");
// Time and score
var timer = document.querySelector(".timer");
var timeLeft = document.querySelector(".timer-left");
var completedText = document.querySelector(".completed-text");
var highScoreBox = document.querySelector(".highscore-box");
var finalScore = document.querySelector(".final-score");
var highScoresBtn = document.querySelector("#highscore-button");
var listOfHighScores = document.querySelector(".list-highscores");
var goBackBtn = document.querySelector("#goback-button");

var questionIndex = 0;
var totalTime =30;
var correctAns = 0;
var scoreResult;

// FUNCTIONS
//  The startQuiz function is called when the start button is clicked
function startQuiz() {
    loadingPage.style.display = "none";
    quizSection.style.display = "block";
    resultsEl.style.display = "none";
    questionCount = 0;
    questionIndex = 0;

    startTimer();
    startQuestions();
}

// Timer function. 60 sec for 5 questions. Incorrect answer means minus 10 seconds
function startTimer() {
    timer = setInterval(function() {
        totalTime--;
        timeLeft.textContent = totalTime;
        if(totalTime <= 0) {
            clearInterval(startTimer);
            if (questionIndex < myQuestions.length - 1) {
                gameOver();
            }
        }
    },1000);

    startQuestions();
};

// getting questions and options from array
function startQuestions() {
    nextQuestion();
}

function nextQuestion() {
    questionTitle.textContent = myQuestions[questionIndex].question;
    optionA.textContent = myQuestions[questionIndex].options[0];
    optionB.textContent = myQuestions[questionIndex].options[1];
    optionC.textContent = myQuestions[questionIndex].options[2];
    optionD.textContent = myQuestions[questionIndex].options[3];
}

// after question is answered, show if correct or wrong
function checkAnswer(answer) {
    answerCheck.style.display = "block";

    if (myQuestions[questionIndex].answer === myQuestions[questionIndex].options[answer]) {
        // correct answer, add 1 score to final score
        correctAns++;
        answerCheck.textContent = "Correct!";
    } else {
        // wrong answer, deduct 10 second from timer
        totalTime -= 10;
        if (totalTime < 0) {
            timeLeft.textContent = 0
        } else {
            timeLeft.textContent = totalTime;
        }
        answerCheck.textContent = "Wrong! The correct answer is: " + myQuestions[questionIndex].answer;
        console.log("checkAnswer");
    }

    questionIndex++;
    // repeat with the rest of questions 
    if (questionIndex < myQuestions.length) {
        nextQuestion();
    } else {
        // if no more question, run game over function
        gameOver();
    }
}

function chooseA() { checkAnswer(0); }

function chooseB() { checkAnswer(1); }

function chooseC() { checkAnswer(2); }

function chooseD() { checkAnswer(3); }

// when all questions are answered or timer reaches 0, game over
function gameOver() {
    resultsEl.style.display = "block";
    quizSection.style.display = "none";
    loadingPage.style.display = "none";
    timeLeft.style.display = "none";

    // show final score
    finalScore.textContent = correctAns;

    if (totalTime <= 0) {
        completedText.textContent = "Times up!";
        
    } else {
        completedText.textContent = "You've completed the quiz!";
    }
}

// store initials and highscore in local storage

var highscores = {
    initials : [],
    scores : [],
}

function getScores() {
    var storedHighscoresString = localStorage.getItem("highscores");

    if (storedHighscoresString !== null) {
        var storedHighscores = JSON.parse(storedHighscoresString);
        highscores.initials = storedHighscores.initials;
        highscores.scores = storedHighscores.scores;
    } else {
        highscores.initials = [];
        highscores.scores = [];
    }
}

// function showHighScores() {
//     highScoreBox.style.display = "block";
//     resultsEl.style.display = "none";

function renderScores() {
    listOfHighScores.innerHTML = "";


    getScores();

    for (var i = 0; i < highscores.initials.length; i++) {
        var listEl = document.createElement("li");
        var pEl = document.createElement("p");
        pEl.setAttribute("class", "highscores");
        pEl.textContent = (i + 1) + ". " + highscores.initials[i] + " - " + highscores.scores[i];

        listEl.appendChild(pEl);
        listOfHighScores.appendChild(listEl);
    }
}

function saveScore (newInitials, newScore) {
    getScores ();

    highscores.initials.push(newInitials);
    highscores.scores.push(newScore);

    var highscoresString = JSON.stringify(highscores);
    localStorage.setItem("highscores", highscoresString);
}

// Events
// when the start button is clicked the quiz questions begin
startButton.addEventListener("click", startQuiz);

// when multiple choice options are clicked
optionA.addEventListener("click", chooseA);
optionB.addEventListener("click", chooseB);
optionC.addEventListener("click", chooseC);
optionD.addEventListener("click", chooseD);

// Submitting initials at the end of the quiz
submitIntBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // stop function is initial is blank
    if (initialsInput.value === "") {
        window.alert("Please enter your initials!");
        return null;
    } 

    saveScore (initialsInput.value, correctAns);
});


highScoresBtn.addEventListener("click", function() { 
    renderScores();
    highScoreBox.style.display = "block";
    resultsEl.style.display = "none";
});

// When replay button is clicked, resets to loading page and reset timer to 30
replayBtn.addEventListener("click", function() {
    loadingPage.style.display = "block";
    quizSection.style.display = "none";
    resultsEl.style.display = "none";
    highScoreBox.style.display = "none";
    timeLeft.style.display = "block";
    totalTime = 30;
});

clearHighscores.addEventListener("click", function() {
    window.localStorage.removeItem("highscores");
    renderScores();
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Nunito sans', sans-serif; font-style: italic;");
});

if (listOfHighScores !== null) {
    renderScores();
}

goBackBtn.addEventListener("click", function() {
    resultsEl.style.display = "block";
    highScoreBox.style.display = "none";
});