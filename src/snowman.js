const getRandomWord = require("./getRandomWord")

const gameState = require("./gameState")

const readline = require("readline-sync");

function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  
  const userIsWinner = gameState(word)

  
  if (userIsWinner) {
    console.log(`\nYou Won! The word was: ${word}!\n🌟 You're a star! 🌟\n`);
    
  } else {
    console.log(`\nYou Lost! The word was: ${word}!\n`);
  }


  console.log(`Do you want to keep playing?\n\nYes: press y                     No: press n`)


  let ifUserWantsToContinue = readline.keyInYN(["\n"[""]])
  
  if (ifUserWantsToContinue) {
    console.log("User want's to continue!\n")
    run()
  } else if (!ifUserWantsToContinue) {
    console.log(`I AM SCAREDDDD AND IM GOING TO GO CRY TO MY MAMA`)
  }

}

run();
