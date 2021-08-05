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

/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/

/* -------------------------------------------------------------------   HELPER FUNCTIONS -------------------------------------------------------------------- */

/*
  FUNCTION: HAS USER LOST?

    This function will take the take the number the letter the user has guessed and compared it to the maximum numbers of letters allowed.
    
    If the maximum number of guesses have been reached, the game will be stopped and the user will be asked if they want to play again.

    If 'n' the game will end. If 'y', the game will restart. 

*/



    function hasUserLost() {

      if (lettersGuessed === maxLetterGuess) {
        gameRecord.gamePlay = false;
        console.log("You've reached the max numbers of guessed allowed. You LOSE!")
        let playAgain = readline.question("There's always another race! \n Do you want to try again? (Y or N) ").toLowerCase();
  
        if (playAgain === "n" || playAgain === "N") {
          console.log("Okay, thank you for playing! Logging out.......");
        }
        else {
          console.log("Okay great! Rev your engines and lets start again!");
          gamePlay();
        }
      }
  
    }






function run() {

  //Object to store game status 
  let gameRecord = {

    //is the game active?
    gameActive: true,

    //MaxLettersToGuess = 10
    maxLetterGuess = 10,

    //Letters guessed so fall
    lettersGuessed = 0,

    //Word guessed correctly
    wordsGuessed: 0,

    //Words guessed incorrectly 
    wordsNotGuessed: 0,

  }


  while (state.gameActive) {

    //Ask the user if they are ready to play
    let introGame = readline.question("Welcome to the car maker guessing game. In this game you will be guessing the name of varius car makers. \n Are you ready to play?(Y or N) ").toLowerCase();

    //
    if (introGame === "n" || introGame === "no") {
      console.log("Okay, please come back when you are ready!")
      gameRecord.gameActive = false;
    }
    else {
      console.log("Start your engines.......3, 2, 1. GO!!!")
      //Begin the game play
      gamePlay();
    }

  }


  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord()

  console.log("Random car name is generating.....");
  console.log("Okay we're ready! Guess a letter, hit return, and see if it appears below. Keep guessing until you get the can see what car is generated!");
  getRandomWord()


  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */

  const userInput = readline.question("Guess a letter: ");
  // This line of code will print out whatever is inputted in by the user.
  console.log("THE USER INPUTTED:", userInput);



}

run();
