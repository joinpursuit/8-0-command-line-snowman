const getRandomWord = require("./getRandomWord")

const gameState = require("./gameState")

function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  
  const userIsWinner = gameState(word)


  if (userIsWinner) {
    console.log(`\nYou Won! The word was: ${word}!\n🌟 You're a star! 🌟`);
    console.log(isExecuted);
  } else {
    console.log(`\nYou Lost! The word was: ${word}!`);
    console.log(isExecuted);
  }
}

run();
