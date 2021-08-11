function getWinOrLoss(word, currentDifficulty) {
  /*
    `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
  */
  const readline = require("readline-sync");
  /*
    The `getNonRepeatingLetter` variable is a function that when invoked will return a letter that has not been repeated
  */
  const getNonRepeatingLetter = require("./getNonRepeatingLetter.js");
  //declare a variable called currentWordState and assign it an array filled with underscores depending on length of the word
  const currentWordState = new Array(word.length).fill("_"); //[_,_,_,_,_]
  const lettersGuessed = [];
  //default guesses for easy difficulty
  let remainingGuesses = 15;
  //if the current difficulty is hard or legendary, then re-assign remaining guesses
  if (currentDifficulty === "hard") {
    remainingGuesses = 7;
  } else if (currentDifficulty === "legendary") {
    remainingGuesses = 3;
  }

  console.clear();
  console.log("Remaining Guesses: ", remainingGuesses + "\nWord: ", currentWordState.join(" ") + "\n");
  //while we still have remaining guesses
  while (remainingGuesses > 0) {
    //get currentWordState underscore count
    cwsUnderscoreCount = 0;
    currentWordState.forEach((char) => {
      if (char === "_") {
        cwsUnderscoreCount++;
      }
    });
    //if the currentWordState underscoreCount is greater than 1
    if (cwsUnderscoreCount > 1) {
      //ask the user if they would like to try and guess the word
      let userWantsToGuessWord = readline.keyInYNStrict("Would you like to guess the entire word?\nIf you choose yes, and get it wrong you lose 3 tries");
      while (userWantsToGuessWord) {
        const usersWordGuess = readline.question("Enter your guess: ").toLowerCase();
        if (word === usersWordGuess) {
          console.log("YOU GOT THE WORD!! NICE JOB!!");
          return true;
        } else {
          console.clear();
          console.log("OH OH!! YOU LOST 3 TRIES!!");
          remainingGuesses -= 3;
          console.log("Remaining Guesses: " + remainingGuesses + "\nWord: ", currentWordState.join(" ") + "\n");
          if (remainingGuesses <= 0) return false;
          userWantsToGuessWord = readline.keyInYNStrict("Would you like to guess the entire word again?\nIf you choose yes, and get it wrong you lose 3 more tries");
        }
      }
    }

    //Ask user if they wish to guess the whole word
    if (word === currentWordState.join("")) return true;
    //declare a constant variable named userInput and assign it the evaluated result of invoking getValidLetterGuess passing in the argument lettersGuessed
    const userInput = getNonRepeatingLetter(lettersGuessed, currentWordState, remainingGuesses);
    //push non repeating letter to lettersGuessed Array
    lettersGuessed.push(userInput);

    //if the user letter input is included in word
    if (word.includes(userInput)) {
      console.clear();
      console.log("\nThat's correct!");
      //use split method on word string no-space delimited to convert word to an array and then iterate through it
      word.split("").forEach((letterInWord, index) => {
        //if the current letter matches with userInput
        if (letterInWord === userInput) {
          //assign currentWordState at index to userInput
          currentWordState[index] = userInput;
        }
      });
    } else {
      console.clear();
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
