/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

// importing valid inputs
// ./ means that this file is within the same directory.
const validInput = require("./validInput");
// New helper function

//the parameter allows us to have a list of elements that will be revised via  .includes() method
function validInputCheck (letter) {
  return validInput.includes(letter.toLowerCase());
};

//console.log("THE USER INPUTTED:", userInput);
const userName = readline.question(`\nWelcome!\n\nPlease type your name\n
`) || "User";

function run() {
 
  // This line of code gets a random word. The `word` variable will be a string.
  // declare a variable for our random work
  const secretWord = getRandomWord();
  // declare variable for our incorrectGuess, set to length of secretWord.
let incorrectGuess = secretWord.length;
  // declare a variable for already guessed -- set to empty array.
  let alreadyGuessed = [];
  // declare variable for displayWord -- set to empty array.
  let displayedWord = [];
  let message = "";
  // we are comparing indexis between a string and an array and using a loop to push "_" as many there are "indexis" on secretWord.length.
  while (displayedWord.length < secretWord.length){
    displayedWord.push("_");
  }
  // Declare variable message
   message = `Hello ${userName}. Enjoy your game!`;
  // console.log "remaining Incorrect Guesses: 7, Letters Guessed: None, Word: _ _ _"
  //create a loop for our game.
  while (incorrectGuess !== 0 && displayedWord.includes("_")){
       console.log(`\n-------------------------------\nRemaining Incorrect Guesses: ${incorrectGuess}\n\nLetters Guessed: ${alreadyGuessed.join(", ") || "None"}\n---------------------------------\n\nWord: ${displayedWord.join(" ")}\n\n----------------------------\n${message}\n`);
// Ask for an input
    

    const userInput = readline.question("Guess a letter: ");

    if (!validInputCheck(userInput)){
// if ins't, ask user to input valid input  
      message = `\n\nInvalid input of ${userInput}.  Please enter a single letter.\n--------------------------------------\n`
      continue;
    }
// check if input was already guess
    if (alreadyGuessed.includes(userInput)) {
      // if it was entered, tell the user and don't penalized.
      message = `Input of ${userInput} has already been guessed.`;
      continue;
    }
// loop through our secretWord

    for (let i = 0; i < secretWord.length; i++){
      let currentLetter = secretWord[i];
// in loop check if input === currentLetter
      if (userInput === currentLetter) {
// if it is, change the value of displayedLetter, to currentLetter
        displayedWord[i] = currentLetter;
      }
    }

      if (displayedWord.includes(userInput)){
// if it does, change message
        message = `Awesome ${userName}, You guessed correctly!`;
      } else {
// if input is incorrect subtract 1 from secretword.length and message the user
        incorrectGuess -= 1; 
        message = `${userName}, You guessed wrong`;
      }
// Add input to letters guessed
      alreadyGuessed.push(userInput);
// Send them back to guess phase
      continue;


  }
 // checkif they won
    if (!displayedWord.includes("_")){
      console.log (`${userName} You are a WINNER`); 
    } else {
      console.log(`${userName}, You ran out of Guesses. The word was ${secretWord}\n\n`)
    };
const answers = ["y", "n"]
let playAgain = "";
let replayMsg = "";
while (!answers.includes(playAgain)) {
// Ask if the user wants to play again
// console.log(replayMsg);
// if yes, run the function
// if no, "Thank you for playing";
playAgain = readline.question(`${userName} would you like to play again? (y,n)`);
// declare variablefor correct answers

if (playAgain.toLowerCase() === "y") {
  // if yes, run the function
  run();
} else if (playAgain.toLowerCase() !== "n"){
  replayMsg = `Hey there ${userName}, input of ${playAgain} is invalid.`
}
};  
  
  
 
    // after the loop, check if secretWord includes input
      // if it does, incorrect Guess -= 0;
      // if it isn't, incorrect guess -= 1;
    //
  
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  
  // This line of code will print out whatever is inputted in by the user.


  // The game is a loop.
  // Loop ends when incorrect guess is 0 or the random word doesn't include "_".
  // Set guesses to length of word.
  // Set random word to array of "_"
  // Set already Guessed to empty array.
  // after user input guesses, check input validity
  // check if character is in our word
  // replace underscore with character found with the array index.
  // decrease guess count if incorrect guess is made by one && add incorrect input to already guessed array.
  // check if input has already been given.
  // check for incorrect guess allowence = 0 triggers -- you lose







}

run();
