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

    let isPlayerisReady = readline.question("Welcome to the word guessing game. In this game you will be guessing various words. \n Are you ready to play? \n (Y or N) ").toLowerCase();

    let playersRemainingGuesses = 20


    if (isPlayerisReady === "n" || isPlayerisReady === "no") {
      console.log("Okay, please come back when you are ready. Exiting game loop......")
      gameState.gameActive = false;
    }
    else if (isPlayerisReady === "y" || isPlayerisReady === "yes") {
      console.log("Great! Let's begin!")
      getRandomWord()
      console.log(word)
      //Begin the game play
    } else {
      console.log("Please enter a valid selection")
    }

    let generatedWordArr = [];
    for (let i = 0; i < word.length; i++) {
      generatedWordArr[i] = "_";
    }

    let remainingLetters = word.length;

    while (remainingLetters > 0) {

      console.log(generatedWordArr.join(" "));

      let userGuess = readline.question("A random word has been generated. Enter your guess. Only letters are allowed. ");

      if (userGuess.length !== 1) {
        console.log("Please type one letter")
      } else {
        if (!word.includes(userGuess)) {
          console.log("Sorry that guess is invalid. One guess has be reduced from your total.")
          remainingGuesses--;
          console.log("Remaining Guesses : " + remainingGuesses)
        }
        for (i = 0; i < word.length; i++) {
          if (word[i] === userGuess) {
            console.log("SUCCESS!!!You've guessed a letter! See if you can guess the rest.")
            currentWordArr[i] = userGuess;
            remainingGuesses--;
            remainingLetters--;
            console.log("Remaining Guesses : " + remainingGuesses)
          }
        }
      }

      if (remainingLetters === 0) {
        let congraulationsMessage = readline.question("congratulations! You've guessed the secret word! Do you want to play again? \n (Y or N ").toLowerCase();
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



