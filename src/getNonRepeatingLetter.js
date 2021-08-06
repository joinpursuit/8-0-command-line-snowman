const getValidLetterGuess = require("./getValidLetterGuess");

function getNonRepeatingLetter(lettersGuessed) {
  //while letterGuess from user input is included in lettersGuessedArray
  let userInput = getValidLetterGuess();
  while (lettersGuessed.includes(userInput)) {
    //if the guess is included in letter guesses have the user type in another guess
    if (lettersGuessed.includes(userInput)) {
      console.log(
        "\nYou already guessed this letter: ",
        userInput + "\n" + "These are all your guesses: ",
        lettersGuessed.join(" ") + "\nTry Again!\n"
      );
      userInput = getValidLetterGuess();
    }
  }
  return userInput;
}

module.exports = getNonRepeatingLetter;
