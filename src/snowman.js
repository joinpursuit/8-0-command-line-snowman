/*
  The `getRandomWord` variable is a function that will return a word that is randomly picked from the dictionary array
*/
const getRandomWord = require("./getRandomWord.js");
/*
  The getWinOrLoss variable is a function that will return whether or not the user won in SnowMan
*/
const getWinOrLoss = require("./getWinOrLoss.js");

//used IIFE to run snowMan on the fly
(function runSnowman() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  // Declare a variable called userIsWinner and assign it the evaluated result of invoking gameState
  const userIsWinner = getWinOrLoss(word);
  if (userIsWinner) {
    console.log("\nYou Won! The word was: " + word + "!\n🌟 You're a star! 🌟");
  } else {
    console.log("\nYou Lost! The word was: " + word + "!");
  }
})();
