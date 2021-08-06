const getNonRepeatingLetter = require("./getNonRepeatingLetter");

function gameState(word) {
  const currentWordState = new Array(word.length).fill("_"); //[_,_,_,_,_]

  const lettersGuessed = [];
  let remainingGuesses = 5;



  console.log(
    "☃️  Welcome To Snowman! ☃️\n\nRemaining Guesses: ",
    remainingGuesses + "\nWord: ",
    currentWordState.join(" ")
  );

  //while we still have remaining tries
  while (remainingGuesses > 0) {
    if (word === currentWordState.join("")) {
      userIsWinner = true;
      break;
    }
    //declare a constant variable named userInput and assign it the evaluated result of invoking getValidLetterGuess
    const userInput = getNonRepeatingLetter(lettersGuessed);
    //push non repeating letter to lettersGuessed Array
    lettersGuessed.push(userInput);

    //It checks if the user letter input is included in word
    if (word.includes(userInput)) {
      //use split method on word string no-space delimited to convert word to an array and then iterate through it
      word.split("").forEach((letterInWord, index) => {
        //if the current letter matches with userInput
        if (letterInWord === userInput) {
          //assign currentWordState at index to userInput
          currentWordState[index] = userInput;
          console.log(`\nThat's correct!`);
        }
      });
    } else {
      console.log(`\nThat's incorrect, The word '${userInput}' is not in the word`);
      remainingGuesses--;
    }
    //post iteration log to the console Remaining Guesses, LettersGuessed comma space seperated, and currentWordState using join method space seperated
    console.log("\nRemaining Guesses: ", remainingGuesses);
    console.log("Letters Guessed: ", lettersGuessed.join(", "));
    console.log("Word: ", currentWordState.join(" "));
  }
  return false;
}

module.exports = gameState;
