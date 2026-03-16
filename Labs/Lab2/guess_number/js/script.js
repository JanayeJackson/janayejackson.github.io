//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;

   //Adding wins and losses stats
   document.querySelector("#wins").textContent = wins;
   document.querySelector("#losses").textContent = losses;

   //Reset attemps
   document.querySelector("#attempt").textContent = 7;

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";
  
   //showing the Guess button
   document.querySelector("#guessBtn").style.display = "inline";

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus(); //adding focus to textbox
   playerGuess.value = ""; //clearing the textbox

   let feedback = document.querySelector("#feedback");
   feedback.textContent = ""; //clearing the textbox

   document.querySelector("#guesses").textContent = "";
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);
    if(guess < 1 || guess > 99){
        let feedback = document.querySelector("#feedback");
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    document.querySelector("#attempt").textContent = (7-attempts);

    console.log("Attemps:" + attempts);
    feedback.style.color = "blue";
    if(guess == randomNumber){
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkblue";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if(attempts == 7){
            feedback.textContent = "Sorry, you don't have any more guesses! The number was " + randomNumber;
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was to high";
        } else {
            feedback.textContent = "Guess was to low";
        }

    }
}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
}