/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `getNonRepeatingLetter` variable is a function that when invoked will return a letter that has not been repeated
*/
const getNonRepeatingLetter = require("./getNonRepeatingLetter.js");

function getWinOrLoss(word) {
  //declare a variable called currentWordState and assign it an array filled with underscores depending on length of the word
  const currentWordState = new Array(word.length).fill("_"); //[_,_,_,_,_]
  const lettersGuessed = []; // put inside game state
  let remainingGuesses = 7; // put inside game state

  console.log("Remaining Guesses: ", remainingGuesses + "\nWord: ", currentWordState.join(" ") + "\n");
  //while we still have remaining guesses
  while (remainingGuesses > 0) {
    if (word === currentWordState.join("")) return true;
    //declare a constant variable named userInput and assign it the evaluated result of invoking getValidLetterGuess passing in the argument lettersGuessed
    const userInput = getNonRepeatingLetter(lettersGuessed);
    //push non repeating letter to lettersGuessed Array
    lettersGuessed.push(userInput);

    //if the user letter input is included in word
    if (word.includes(userInput)) {
      //use split method on word string no-space delimited to convert word to an array and then iterate through it
      word.split("").forEach((letterInWord, index) => {
        //if the current letter matches with userInput
        if (letterInWord === userInput) {
          //assign currentWordState at index to userInput
          currentWordState[index] = userInput;
          console.log("\nThat's correct!");
          // readline.question("Hit Enter key to continue.", { hideEchoBack: true, mask: "" });
        }
      });
    } else {
      console.log("\nThat's incorrect, The letter" + " '" + userInput + "' " + "is not in the word.");
      readline.question("Hit Enter key to continue.", { hideEchoBack: true, mask: "" });
      remainingGuesses--;
    }
    //post iteration log to the console Remaining Guesses, LettersGuessed comma space seperated, and currentWordState using join method space seperated
    console.log("\nRemaining Guesses: ", remainingGuesses);
    console.log("Letters Guessed: ", lettersGuessed.join(", "));
    console.log("Word: ", currentWordState.join(" "));
  }
  return false;
}

module.exports = getWinOrLoss;
