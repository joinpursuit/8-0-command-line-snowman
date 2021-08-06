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

//used IIFE to run snowMan on the fly
(function runSnowman() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();

  displayMainMenu();
  const userIsWinner = getWinOrLoss(word);
  // Declare a variable called userIsWinner and assign it the evaluated result of invoking gameState
  if (userIsWinner) {
    console.log("\n🏆 You Won! 🏆\nThe word was: " + word + "!\n🌟 You're a star! 🌟");
  } else {
    console.log("\nYou Lost! The word was: " + word + "!\nKeep failing forward, you'll get em next time!");
  }
})();
