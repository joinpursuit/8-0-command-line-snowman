/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require('readline-sync');
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require('./dictionary');

/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
// Importing valid inputs
const validInput = require('./validinput');

// New Helper function
function validInputCheck(letter) {
  // Check if letter is valid and return it
  return validInput.includes(letter.toLowerCase())
};
/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
// This line of code gets a random word. The `word` variable will be a string.
/*
The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

After a user hits the 'return' key, the rest of the code will run.
*/
// This line of code will print out whatever is inputted in by the user.
function run(name) {
  // PLAN: The game is a loop . Loop ends when incorrect guesses is 0, or displayWord doesn't include "_". Set guesses to length of word. Set alreadyGuessed is empty array, set displayWord  to array of "_"'s that = length of word, after user guesses, check input validity, check if input was already guessed, check if input is in our word, if it is, replace the "_" at the index found with out input. If input isn't in our word, decrease incorrectGuesses by 1. Either way, add input to alreadyGuessed array. This line of code will print out whatever is inputted in by the user. After game is finished, if the user won, display victory, if lose, display fail. 
  // Declare a variable that will ask for their name:
  let userName = name || readline.question('Enter your username: ') || 'User';
  // Declare variable for our secretWord.
  const secretWord = getRandomWord();
  // Declare variable for our incorrectGuess, set to length of secretWord
  let incorrectGuess = secretWord.length; 
  // Declare variable for alreadyGuessed, set to empty array
  let alreadyGuessed = [];
  // Declare variable for displayedWord, set to empty array
  let displayedWord = [];
  // Use a loop to fill our displayedWord with '_'s, make it as long as our secretWord. 
while (displayedWord.length < secretWord.length) {
  displayedWord.push('_');
}
// Declare variable for message
let message = `\n\nHello ${userName}! Enjoy your game!`;
  // Create loop for our game: this loop determines whether you ran out of lives or you lost the game because you still haven't completed the word. 
  while (incorrectGuess !== 0 && displayedWord.includes('_')) {
  // Print our game 
  console.log(`\n_____________________________________________________\nRemaining Incorrect Guessed: ${incorrectGuess}\nLetters Guessed: ${alreadyGuessed.join(', ') || 'None'}\nWord: ${displayedWord.join(' ')}${message}`
  ); 
  // Ask for an input 
  const userInput = readline.question('Guess a letter: ');
  // REMINDER: .includes method returns a boolean
  // Check if input.toLowerCase() isn't valid(!) with helper function 
  if (!validInputCheck(userInput)) {
    // If it isn't, print the incorrect letter & ask user to input valid input.
    message = `\n\n${userName}, you submitted an invalid input of ${userInput}. Please enter a single letter.\n_____________________________________________________\n`;
    // Send the user back to the guess phase.
    continue;
  }
  // Check if input has already been guessed
  if (alreadyGuessed.includes(userInput)) {
    // It it was, tell the user, and don't penalize them.
  message = `\n\n${userName}, your input of ${userInput}has already been guessed.\n_____________________________________________________\n`
  continue;
  }
  
  // Loop through our secretWord 
  for (let i = 0; i < secretWord.length; i++) {
    // Declare a variable for currentLetter
    let currentLetter = secretWord[i];
    // In loop, check if input === currentLetter 
    if (userInput.toLowerCase() === currentLetter) {
      // If it is, change the value of our displayedLetter, to currentLetter 
      displayedWord[i] = currentLetter;    
    }
  }  
  // Aftr loop, check if displayedWord includes input.
  if (displayedWord.includes(userInput.toLowerCase())) {
    // If it does, change message
    message = `\n\nWell done ${userName}! You guessed correctly!\n_____________________________________________________\n`;
  } else {
    // If it isn't, incorrectGuess -= 1
    incorrectGuess -= 1;
    message = `\n\nSorry ${userName}, you guessed wrong :c\n-------------------------------------\n`;
    }
    // Add input to letters guessed
    alreadyGuessed.push(userInput.toLowerCase());
    // Send them back to guess phase.
    continue;
    }
    // Check if they won
  if (!displayedWord.includes('_')) {
    // If they did, print winning message
    console.log(`\nGOOD JOB ${userName}!!! YOU'RE A WINNER!!\nYour word was: ${secretWord}\n\n-------------------------------------\n`
    );
  } else {
    // If they didn't, print losing message
    console.log(
      `\nSorry ${userName}, better luck next time! Your word was: ${secretWord}\n\n-------------------------------------\n`
    );
  }
  // Declare a variable to replayMsg as empty string
  let replayMsg = '';
  // Declare variable for correct answers
  const answers = ['y', 'n'];
  // Declare playAgain as an empty string '';
  let playAgain = '';
  // Create a REPLAY loop
  while (!answers.includes(playAgain)) {
    // Print our message
    console.log(replayMsg);
    // Ask if they would like to play again
    playAgain = readline.question(`${userName}, would like to play again? (y, n)`
    );
    // Check for their answer
    if (playAgain.toLowerCase() === 'y') {
      // If yes, run the function, again.
      run(userName);
    } else if (playAgain.toLowerCase() !== 'n') {
      replayMsg = `Hey there ${userName}, input of ${playAgain} is invalid.`;
    }
  }
}
run();
console.log("THE USER INPUTTED:", userInput);
