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

  let gameIsActive = true;

  while (gameIsActive) {

    function getRandomWord() {
      const index = Math.floor(Math.random() * dictionary.length);
      return dictionary[index];
    }

    const word = getRandomWord()

    let playersRemainingGuesses = 20

    let lettersGuessed = [];

    let generatedWordArr = [];
    for (let i = 0; i < word.length; i++) {
      generatedWordArr[i] = "_";
    }

    let remainingLetters = word.length;

    let isPlayerReady = readline.question("Welcome to the word guessing game. In this game you will be guessing various words. \n Are you ready to play? \n (Y or N) ").toLowerCase();

    if (isPlayerReady === "n" || isPlayerReady === "no") {

      console.log("Okay, please come back when you are ready. Exiting game loop......")
      gameIsActive = false;
    }
    else {
      console.log("Great! Let's begin!")
      getRandomWord()
      console.log(word)
    }




    while (gameIsActive === "true" && remainingLetters > 0) {

      let userGuess = readline.question("A random word has been generated. Enter your guess. Only letters are allowed. ");

      console.log(generatedWordArr.join(" "));

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
          endGame()
        }
      }


      if (playersRemainingGuesses === 0) {
        let losingMessage = readline.question("Sorry! You gave it a good go, but you've used up all your guesses. The word was....... " + word + " . Would you like to play again? \n (Y or N ").toLowerCase();
        if (losingMessage === "y" || losingMessage === "yes") {
          console.log("Okay! You've warmed up. Let's see what you can do! \n Generating word......")
        } else if (losingMessage === "n" || losingMessage === "no") {
          console.log("Okay! Comeback when you are ready! \n Ending game loop......")
          gameIsActive = false;
        }
      }

    }

  }

}

run();



