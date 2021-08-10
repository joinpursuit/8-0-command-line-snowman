/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/

const readline = require("readline-sync");
const { includes } = require("./dictionary");

/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/

const dictionary = require("./dictionary");


function run() {

  let gameState = {
    gameActive: true,
  }

  for (let i = 0; i < dictionary.length; i++) {

    function getRandomWord() {
      const index = Math.floor(Math.random() * dictionary.length);
      return dictionary[index];
    }

    const word = getRandomWord()

    let welcome = readline.question("Welcome to the word guessing game. In this game you will be guessing varius words. \n Are you ready to play? \n (Y or N) ").toLowerCase();

    let remainingGuesses = 20


    if (welcome === "n" || welcome === "no") {
      console.log("Okay, please come back when you are ready. Exiting game loop......")
      gameState.gameActive = false;
    }
    else if (welcome === "y" || welcome === "yes") {
      console.log("Great! Let's begin!")
      getRandomWord()
      console.log(word)
      //Begin the game play
    } else {
      console.log("Please enter a valid selection")
    }

    let currentWordArr = [];
    for (let i = 0; i < word.length; i++) {
      currentWordArr[i] = "_";
    }

    let remainingLetters = word.length;

    while (remainingLetters > 0) {

      console.log(currentWordArr.join(" "));

      let userGuess = readline.question("A random word has been generated. Enter your guess. Only letters are allowed. ");

      if (userGuess.length !== 1) {
        console.log("Please type one letter")
      } else {
        if (!word.includes(userGuess)) {
          console.log("Sorry that letter is invalid. One guess has be reduced from your total.")
          remainingGuesses--;
        }
        for (i = 0; i < word.length; i++) {
          if (word[i] === userGuess) {
            console.log("SUCCESS!!!You've guessed a letter! See if you can guess the rest.")
            currentWordArr[i] = userGuess;
            remainingGuesses--;
            remainingLetters--;
          }
        }
      }

      if (remainingLetters === 0) {
        let congraulationsMessage = readline.question("congratulations! You've guessed the secret word! Do you want to play again? \n (Y or N ").toLocaleLowerCase();
        if (congraulationsMessage === 'y' || congraulationsMessage === "yes") {
          console.log("Generating word");
          run()
        } else if (remainingGuesses === 0) {
          console.log("Sorry you've lost!")
          break;
        }


      }


    }

  }

}


run();



