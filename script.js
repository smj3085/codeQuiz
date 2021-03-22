
// all required elements
var titlePage = document.querySelector(".titlePage");
var startButton = document.querySelector("#startBtn");
var quizQuestions = document.querySelector(".quizQuestions");
var answers = document.queryCommandEnabled(".answer");
var exitBtn = document.querySelector(".quitBtn");
var replayBtn = document.querySelector(".replayBtn");
var timerElement = document.querySelector(".timer-count");
var results = document.querySelector(".results");
var highScoresList = document.querySelector(".highScore");

// Global variable 
var isCorrect = true;
var totalSeconds = 120;
var timeRemaining = totalSeconds;
var secondsElapsed = 0;
var currentQuestion = 0;
var correctAnswers = 0;
var correctScore = 0;
var localHighScore = [];

// Arrays used to create questions and answers
var myQuestions = [
    {
        numb: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Markup Language",
            "Hyper Text Multi Language",
            "Hyper Tool Makeup Language",
            "Hype Tool Many Languages",
        ]
    },
    {
        numb: 2,
        question: "What do you call a person who codes?",
        answer: "Programmer",
        options: [
            "Pssssss",
            "Programmer",
            "Sxxxxxxxx",
            "Txxxxxxx",
        ]
    },
    {
        numb: 3,
        question: "What does css stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Colourful Style Sheet",
            "Cascading Style Sheet",
            "Computer Style Sheet,",
            "Coloring Sxxxx Sxxxxxx"
        ]
    },
    {
        number: 4,
        questions: "Which of the following options are not coding languages?",
        answer: "Apple",
        options: [
            "Python",
            "xxxxxxx",
            "xxxxxxxx",
            "Apple",
        ]
    }
]

// Events
// when start button is clicked the quiz questions begin




// Timer function. 2minutes for 5questions. Incorrect answer means minus 10seconds
function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        timerCounter--;
        timerElement.textContent = timerCount;
        if (timerCount >=0) {
            // Tests if correct condition is met
            if (isCorrect && timerCount >0) {
                // Clears interval and stops timer
                clearInterval(timer);
                winGame();
            }
        }
    })
}


// highScore