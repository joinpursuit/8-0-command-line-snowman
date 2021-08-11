/*
  This function returns a letter that wasn't guessed already
*/
function getNonRepeatingLetter(lettersGuessed, currentWordState, remainingGuesses) {
  const getValidLetterGuess = require("./getValidLetterGuess.js");
  //while letterGuess from user input is included in lettersGuessedArray
  let userInput = getValidLetterGuess();
  while (lettersGuessed.includes(userInput)) {
    //if the guess is included in letter guesses have the user type in another guess
    if (lettersGuessed.includes(userInput)) {
      console.clear();
      console.log("Remaining Guesses: ", remainingGuesses, "\nWord: ", currentWordState.join(" ") + "\n");
      console.log("You already guessed this letter: ", userInput + "\n" + "These are all your guesses: ", lettersGuessed.join(" ") + "\nTry Again!\n");
      userInput = getValidLetterGuess();
    }
  }
  return userInput;
}

module.exports = getNonRepeatingLetter;
