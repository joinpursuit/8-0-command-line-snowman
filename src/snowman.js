/*
  `readline-sync` is a library allowing you to access user input from the command line and
   is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");

const dictionary = require("./dictionary");

// HELPER FUNCTIONS

//Replaces underscores with letters
function replaceUnderscoreWithLtr(underScore, letter, gameWord) {
  let underScoreArr = underScore.split(" ");
  for (let i = 0; i < gameWord.length; i++) {
    if (letter === gameWord[i]) {
      underScoreArr.splice(i, 1, letter);
    }
  }
  return underScoreArr.join(" ");
}
//Checks if guessed letter is correct
function isGuessCorrect(guess, word) {
  return word.includes(guess);
}
//Gets random word from dictionary.js
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
//Checks if input is valid
function isInputValid(letter) {
  if (
    typeof letter === "string" &&
    letter.length === 1 &&
    letter <= "z" &&
    letter >= "a"
  ) {
    return true;
  }
  return false;
}
//Checks if player has won
function ifWon(underScore, gameWord) {
  underScore = underScore.split(" ").join("");
  return underScore === gameWord;
}

function run() {
  let playGame = true;

  //Gets random word from dictionary
  const word = getRandomWord();

  let maxNumWrongGuesses = 6;
  let guessedLetter = "";
  let underScores = "";

  //Iterating through word string by each element (letter)
  for (let i = 0; i < word.length; i++) {
    underScores += "_ ";
  }

  while (playGame) {
    console.log(`Remaining Incorrect Guesses: ${maxNumWrongGuesses}\n`);
    console.log(`Letters Guessed: ${guessedLetter}\n`);
    console.log(`Word: ${underScores}\n`);

    const givenLetter = readline.question("Guess a letter: ");
    console.log("THE USER INPUTTED:", givenLetter + "\n");

    if (isInputValid(givenLetter)) {
      guessedLetter += " " + givenLetter;
      if (isGuessCorrect(givenLetter, word)) {
        underScores = replaceUnderscoreWithLtr(underScores, givenLetter, word);
        console.log(underScores + "\n");
      } else {
        maxNumWrongGuesses--;
      }
    } else {
      console.log("Please enter a valid letter");
      continue;
    }

    if (ifWon(underScores, word) || maxNumWrongGuesses === 0) {
      playGame = false;
      if (ifWon(underScores, word)) {
        console.log("Congratulations, you win!");
      } else {
        console.log("So sorry, you lost! Better luck next time!");
        console.log("The secret word is: " + word);
      }
    }
  }
}

run();
