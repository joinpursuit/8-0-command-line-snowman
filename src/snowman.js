/*
  The `getRandomWord` variable is a function that will return a word that is randomly picked from the dictionary array
*/
const getRandomWord = require("./getRandomWord.js");
/*
  The getWinOrLoss variable is a function that will return whether or not the user won in SnowMan
*/
const getWinOrLoss = require("./getWinOrLoss.js");
/*
  The displayMainMenu variable is a function that will display a menu of options to the user before choosing to play the game or exiting out
*/
const displayMainMenu = require("./displayMainMenu.js");
/*
  The incrementOrReset variable is a closure that will keep track of the score in the currentSession and increment if the user wins and reset if the user loses and wishes to run the game again
*/
const getIncrementedOrPreResetScore = require("./getIncrementedOrPreResetScore.js");
/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `updateAllTimeHighScores` variable is a function that will determine if a new highScore has been reached and update the highScores.
*/
const updateAllTimeHighScores = require("./updateAllTimeHighScores.js");
/*
  The `setDifficulty` variable is a function that will determine the difficulty of the snowman game
*/
const setDifficulty = require("./setDifficulty.js");

//used IIFE to run snowMan on the fly
(function runSnowman() {
  // Declare a variable called userName and assign it evaluated result of invoking readline question
  const userName = readline.question("Please enter your desired username:");
  // declare a flag variable called userWantsToContinue and assign it to true to start off to enter our while loop
  let userWantsToContinue = true;

  displayMainMenu(userName);
  // Declare a variable called currentDifficulty to allow the user the ability to change difficulty
  let currentDifficulty = setDifficulty();

  //keep repeating till user doesn't want to continue anymore
  while (userWantsToContinue) {
    // This line of code gets a random word. The `word` variable will be a string.
    const word = getRandomWord();
    // Declare a variable called userIsWinner and assign it the evaluated result of invoking getWinOrLoss passing in the word as the argument
    const userIsWinner = getWinOrLoss(word, currentDifficulty);
    //declare a variable named tempHighScore to hold the current score to use to check and see if highScores need to update
    let currentSessionScore = null;

    if (userIsWinner) {
      console.log("\n🏆 You Won! 🏆\nThe word was: " + word + "!\n🌟 You're a star! 🌟");
      console.log("Current Streak:", getIncrementedOrPreResetScore());
      userWantsToContinue = readline.keyInYNStrict("Do you want to continue?");
      //if user wins but doesn't want to continue, break out of while loop but before that log highest score this session
      //logs highest score this session if user wins and chooses to not continue before exiting function
      if (!userWantsToContinue) {
        updateAllTimeHighScores();
        currentSessionScore = getIncrementedOrPreResetScore(true);
        console.log("Highest Score this session was:", currentSessionScore);
        updateAllTimeHighScores(userName, currentSessionScore, currentDifficulty);
        break;
      }
    } else {
      console.log("\nYou Lost! The word was: " + word + "!\nKeep failing forward, you'll get em next time!");
      currentSessionScore = getIncrementedOrPreResetScore(true);
      console.log("Highest Score this session was:", currentSessionScore);
      updateAllTimeHighScores(userName, currentSessionScore, currentDifficulty);
      userWantsToContinue = readline.keyInYNStrict("Do you want to continue?");
    }
  }
})();
