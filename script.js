// Q1. What does HTML stand for?
// Q2. What does css stand for? 
// Q3. What is a person who codes called?
// Q4. 
// Q5. 

var isCorrect;
var timer;
var timerCount;

// the startGame function is called when the start button is clicked 
function startGame() {

} 

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