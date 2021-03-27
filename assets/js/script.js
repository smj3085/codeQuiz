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
        question: "2. What do you call a person who codes?",
        options: [
            "a. Pssssss",
            "b. Programmer",
            "c. Sxxxxxxxx",
            "d. Txxxxxxx",
        ],
        answer: "b. Programmer"
    },
    {
        question: "3. What does css stand for?",
        options: [
            "a. Colourful Style Sheet",
            "b. Cascading Style Sheet",
            "c. Computer Style Sheet,",
            "d. Coloring Sxxxx Sxxxxxx"
        ],
        answer: "b. Cascading Style Sheet"
    },
    {
        question: "4. Which of the following options are not coding languages?",
        options: [
            "a. Python",
            "b. xxxxxxx",
            "c. xxxxxxxx",
            "d. Apple",
        ],
        answer: "d. Apple"
    }
]

// variables
// Initial page
var loadingPage = document.querySelector(".loading-page");
var startButton = document.querySelector(".start-button");
// Questions section 
var quizSection = document.querySelector(".quiz-main");
var questionEl = document.querySelector(".quiz-box");
var questionTitle = document.querySelector(".question-title");
var optionA = document.querySelector("#btn0");
var optionB = document.querySelector("#btn1");
var optionC = document.querySelector("#btn2");
var optionD = document.querySelector("#btn3");
var answerCheck = document.querySelector(".answer-check");
var totalQueCounter = document.querySelector(".que-counter");
//  Results section
var resultsEl = document.querySelector(".results-box");
var initialsInput = document.querySelector(".initials");
var submitIntBtn = document.querySelector(".submit-button");
var replayBtn = document.querySelector(".replay-button");
var clearHighscores = document.querySelector(".clear-button");
// Time and score
var timer = document.querySelector(".timer");
var timeLeft = document.querySelector(".timer-left");
var completedText = document.querySelector(".completed-text");
var highScoreBox = document.querySelector(".highscore-box");
var finalScore = document.querySelector(".final-score");
var highScoresBtn = document.querySelector(".highscore-button");
var listOfHighScores = document.querySelector(".list-highscores");

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
function storeHighScores(correctAns, initial) {

    // stop function is initial is blank
    if (initial === "") {
        window.alert("Please enter your initials!");
        return;
    } 

    listOfHighScores.style.display = "block";

    // store scores into local storage
    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }

    var user = {
        initials: initial,
        score: correctAns,
    }; 

    scoresArray.push(user);
 
// strinify array in order to syore in local storage
    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
}

// // function to show high scores
var i = 0;
function showHighScores() {
    loadingPage.style.display = "none";
    timeLeft.style.display = "none";
    quizSection.style.display = "none";
    resultsEl.style.display = "none";
    listOfHighScores.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    // check if there is any in local storage
    if (savedHighScores === null) {
        return;
    }
    console.log(showHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        listOfHighScores.appendChild(eachNewHighScore);
    }
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
    storeHighScores(finalScore.textContent, document.getElementById("initialText").value); 
});


highScoresBtn.addEventListener("click", function() { 
    showHighScores();
});

// When replay button is clicked, resets to loading page and reset timer to 30
replayBtn.addEventListener("click", function() {
    loadingPage.style.display = "block";
    quizSection.style.display = "none";
    resultsEl.style.display = "none";
    listOfHighScores.style.display = "none";
    timeLeft.style.display = "block";
    totalTime = 30;
});

clearHighscores.addEventListener("click", function() {
    window.localStorage.removeItem("high scores");
    listOfHighScores.innerHTML = "High Scores Cleared!";
    listOfHighScores.setAttribute("style", "font-family: 'Nunito sans', sans-serif; font-style: italic;");
});