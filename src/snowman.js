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

    let lettersGuessed = [];


    if (isPlayerisReady === "n" || isPlayerisReady === "no") {
      console.log("Okay, please come back when you are ready. Exiting game loop......")
      break;
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
          lettersGuessed.push(userGuess)
          playersRemainingGuesses--;
          console.log("Remaining Guesses : " + playersRemainingGuesses)
          console.log("Letters you've guessed so far: " + lettersGuessed)
        }
        for (i = 0; i < word.length; i++) {
          if (word[i] === userGuess) {
            console.log("SUCCESS!!!You've guessed a letter! See if you can guess the rest.")
            generatedWordArr[i] = userGuess;
            playersRemainingGuesses--;
            remainingLetters--;
            lettersGuessed.push(userGuess)
            console.log("Remaining Guesses : " + playersRemainingGuesses)
            console.log("Letters you've guessed so far: " + lettersGuessed)
          }
        }
      }

      if (remainingLetters === 0) {
        let congraulationsMessage = readline.question("congratulations! You've guessed the secret word! Do you want to play again? \n (Y or N").toLowerCase();
        if (congraulationsMessage === "y" || congraulationsMessage === "yes") {
          console.log("Generating word");
          run()
        } else if (congraulationsMessage === "n" || congraulationsMessage === "no") {
          console.log("Oh, but you are do so well! Until next time! \n Ending game loop")
          break;
        }
      }


      if (playersRemainingGuesses === 0) {
        let losingMessage = readline.question("Sorry! You gave it a good go, but you've used up all your guesses. Would you like to play again? \n (Y or N ").toLowerCase();
        if (losingMessage === "y" || losingMessage === "yes") {
          console.log("Okay! You've warmed up. Let's see what you can do! \n Generating word......")
        } else if (losingMessage === "n" || losingMessage === "no") {
          console.log("Okay! Comeback when you are ready! \n Ending game loop......")
          break;
        }
      }

    }


  }

}




run();



