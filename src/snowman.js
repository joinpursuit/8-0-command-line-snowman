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
    shouldKeepPlaying: true,
    playersRemainingGuesses: 20,
  }

  for (let i = 0; i < dictionary.length; i++) {

    function getRandomWord() {
      const index = Math.floor(Math.random() * dictionary.length);
      return dictionary[index];
    }

    const word = getRandomWord()

    let isPlayerReady = readline.question("Welcome to the word guessing game. In this game you will be guessing various words. \n Are you ready to play? \n (Y or N) ").toLowerCase();

    let remainingLetters = word.length;

    let exitMessage = "Until next time!!! Ending game loop.............."

    let lettersGuessed = []

    //Ask if the player is ready. If no, return the exitMessage to end the game. If yes we commence with playing the game.
    if (isPlayerReady === "n" || isPlayerReady === "no") {
      console.log(exitMessage)
      return exitMessage
    } else if (isPlayerReady === "y" || isPlayerReady === "yes") {
      console.log("Wonderful!! Generating word.......")
      getRandomWord()
    } else {
      console.log("Please enter valid input")
    }


    let generatedWordArr = [];
    for (let i = 0; i < word.length; i++) {
      generatedWordArr[i] = "_";
    }

    while (remainingLetters > 0) {

      console.log(generatedWordArr.join(" "));

      let userGuess = readline.question("A random word has been generated. Enter your guess. Only letters are allowed. ");

//If the user types more than one letter, the guess is invalid. 
      if (userGuess.length !== 1) {
        console.log("Please type one letter")
      } else {
//If word does not include the users guess. We let the player know. Add the users guess into the array holding the letters guessed, while decrementing the remaining guesses.
       if (!word.includes(userGuess)) {
          console.log("Sorry that guess is invalid. One guess has be reduced from your total.")
          lettersGuessed.push(userGuess)
          gameState.playersRemainingGuesses--;
          console.log("Remaining Guesses : " + gameState.playersRemainingGuesses)
          console.log("Letters you've guessed so far: " + lettersGuessed)
        }
//IF word entry does match. Let the player know they are on the right track. Decrement reaminging numbers. Add the guss into array holding letter guessed. 
        for (i = 0; i < word.length; i++) {
          if (word[i] === userGuess) {
            console.log("SUCCESS!!!You've guessed a letter! See if you can guess the rest.")
            generatedWordArr[i] = userGuess;
            remainingLetters--;
            lettersGuessed.push(userGuess)
            console.log("Remaining Guesses : " + gameState.playersRemainingGuesses)
            console.log("Letters you've guessed so far: " + lettersGuessed)
          }

        }
      }



      //If there are no more remaining letters. The player has won. We congratulate them. And invite them to play again, should they want to, we let them know a word is generating and start the game over.
      //If no, we return the exitmessage to close the game.
      if (remainingLetters === 0) {
        let congraulationsMessage = readline.question("congratulations! You've guessed the secret word! Do you want to play again? \n (Y or N").toLowerCase();
        if (congraulationsMessage === "y" || congraulationsMessage === "yes") {
          console.log("Generating word........................");
          run()
        } else if (congraulationsMessage === "n" || congraulationsMessage === "no") {
          console.log("Oh, but you are do so well! \n")
          console.log(exitMessage)
          return exitMessage
        }
      }

//If there are no remaining guesses, the user has lost. We let them know they lost, while letting them know what the word was. We invite them toi try again. If yes, the game loop continues. If not we return exitmessage to end the game.
      if (gameState.playersRemainingGuesses === 0) {
        let losingMessage = readline.question("Sorry! You gave it a good go, but you've used up all your guesses. The word was....... " + word + " . Would you like to play again? \n (Y or N ").toLowerCase();
        if (losingMessage === "y" || losingMessage === "yes") {
          console.log("Okay! You've warmed up. Let's see what you can do! \n Generating word......")
        } else if (losingMessage === "n" || losingMessage === "no") {
          console.log(exitMessage)
          return exitMessage
        } else {
          console.log("Invalid input.")
        }
      }

    }
  }
}




  run();



