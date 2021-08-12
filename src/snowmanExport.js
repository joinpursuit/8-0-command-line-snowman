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
//inporting valid inputs
const validInput = require('./validinput');

// New helper function
function validInputCheck(letter) {
  //Check if letter is valid and return it
  return validInput.includes(letter.toLowerCase());
}
/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/

//Set win & loss variables out here so I can accumulate through recursion
let snowmanWins = 0;
let snowmanLosses = 0;

function run(name) {
  //Ask for their name
  let userName = name || readline.question('Enter your username: ') || 'User';
  //Declare variable for our secretword
  const secretWord = getRandomWord();
  //Declare variable for our incorrectGuess, set to length of secretWord
  let incorrectGuess = Number(process.argv[2]) || secretWord.length;
  //Declare variable for alreadyGuessed, set to empty array
  let alreadyGuessed = [];
  //Declare variable for displayedWord, set to empty array
  let displayedWord = [];
  //Use a loop to fill our displayedWord with "_"s, make it as long as our secretWord
  while (displayedWord.length < secretWord.length) {
    displayedWord.push('_');
  }
  //Declare variable for message
  let message = `\n\nHello ${userName}! Enjoy your game!`;

  //Create loop for our game
  while (incorrectGuess !== 0 && displayedWord.includes('_')) {
    //Print our game
    console.log(
      `\n-------------------------------------\nRemaining Incorrect Guesses: ${incorrectGuess}\nLetters Guessed: ${
        alreadyGuessed.join(', ') || 'None'
      }\nWord: ${displayedWord.join(' ')}${message}`
    );
    //Ask for an input
    const userInput = readline.question('Guess a letter: ');
    //check if input isnt valid with helper function
    if (!validInputCheck(userInput)) {
      //if it isn't, ask user to input valid input
      message = `\n\n${userName}, you submitted an invalid input of ${userInput}. Please enter a single letter.\n-------------------------------------\n`;
      //send them back to the guess phase
      continue;
    }
    //check if input was already guess
    if (alreadyGuessed.includes(userInput)) {
      //if it was, tell the user, and don't penalize them
      message = `\n\n${userName}, your input of ${userInput} has already been guessed.\n-------------------------------------\n`;
      continue;
    }
    //loop through our secretWord
    for (let i = 0; i < secretWord.length; i++) {
      //Declare variable for clarity
      let currentLetter = secretWord[i];
      //in loop, check if input === currentLetter
      if (userInput.toLowerCase() === currentLetter) {
        //if it is, change the value of displayedLetter, to currentLetter
        displayedWord[i] = currentLetter;
      }
    }
    //after loop, check if displayWord includes input
    if (displayedWord.includes(userInput.toLowerCase())) {
      //if it does, change message
      message = `\n\nWell done ${userName}! You guessed correctly!\n-------------------------------------\n`;
    } else {
      //if it isn't, incorrectGuess -= 1;
      incorrectGuess -= 1;
      message = `\n\nSorry ${userName}, you guessed wrong :c\n-------------------------------------\n`;
    }
    //Add input to letters guessed
    alreadyGuessed.push(userInput.toLowerCase());
    //Send them back to guess phase
    continue;
  }

  //Print the game state
  console.log(
    `\n-------------------------------------\nRemaining Incorrect Guesses: ${incorrectGuess}\nLetters Guessed: ${
      alreadyGuessed.join(', ') || 'None'
    }\nWord: ${displayedWord.join(' ')}${message}`
  );

  //check if they won
  if (!displayedWord.includes('_')) {
    //if they did, give winning message
    console.log(
      `\nGOOD JOB ${userName}!!! YOU'RE A WINNER!!\nYour word was: ${secretWord}\n-------------------------------------\n`
    );
    //add 1 to the wins
    snowmanWins += 1;
  } else {
    //if they didn't, give losing message
    console.log(
      `\nSorry ${userName}, better luck next time! Your word was: ${secretWord}\n\n-------------------------------------\n`
    );
    //add 1 to the losses
    snowmanLosses += 1;
  }

  //Print wins and losses
  console.log(`Wins: ${snowmanWins} Losses: ${snowmanLosses}`);

  //declare replayMsg as empty string
  let replayMsg = '';
  //declare variable for correct answers
  const answers = ['y', 'n'];
  //declare playAgain as an empty string "";
  let playAgain = '';
  //Create replay loop
  while (!answers.includes(playAgain)) {
    //print our message
    console.log(replayMsg);
    //ask if they would like to play again
    playAgain = readline.question(
      `${userName}, would you like to play again? (y,n) `
    );
    //check for their answer
    if (playAgain.toLowerCase() === 'y') {
      //if yes, run the function
      run(userName);
    } else if (playAgain.toLowerCase() !== 'n') {
      replayMsg = `Hey there ${userName}, input of ${playAgain} is invalid.`;
    }
  }
  //Print an exit message
  console.log(`Thanks for playing!! ^~^`);
}
//test
//run();
module.exports = {
  run,
};
