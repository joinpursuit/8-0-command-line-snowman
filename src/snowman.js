/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

//This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

//This function returns a valid letter guess
function getValidLetterGuess() {
  //This helper function is used to determine if letter guess is valid
  function guessIsValid(letter) {
    //use regex to determine if letter is in the alphabet and ignore case sensitivty
    const validEntries = /[a-z]/i;
    //if the letter is in the alphabet and the length of the letter is 1
    if (validEntries.test(letter) && letter.length === 1) {
      return letter;
    } else {
      return false;
    }
  }
  //declare a variable named letter and assign it a falsy value to start off
  let letter = "";
  //while the letter is falsy
  while (!letter) {
    //program will stop to get user input
    let input = readline.question("Guess a letter: ");
    if (guessIsValid(input)) {
      letter = input;
    } else {
      console.log("Please enter a valid letter");
    }
  }
  return letter.toLowerCase();
}
//This function returns a letter that wasn't guessed already
function getNonRepeatingLetter(lettersGuessed) {
  //while letterGuess from user input is included in lettersGuessedArray
  let userInput = getValidLetterGuess();
  while (lettersGuessed.includes(userInput)) {
    //if the guess is included in letter guesses have the user type in another guess
    if (lettersGuessed.includes(userInput)) {
      console.log("\nYou already guessed this letter: ", userInput + "\n" + "These are all your guesses: ", lettersGuessed.join(" ") + "\nTry Again!\n");
      userInput = getValidLetterGuess();
    }
  }
  return userInput;
}

function runSnowman() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  //declare a variable called currentWordState and assign it an array filled with underscores depending on length of the word
  const currentWordState = new Array(word.length).fill("_"); //[_,_,_,_,_]
  const lettersGuessed = [];
  let remainingGuesses = 7;
  //declare a flag variable called userIsWinner and assign it false to start off
  let userIsWinner = false;

  console.log("☃️  Welcome To Snowman! ☃️\n\nRemaining Guesses: ", remainingGuesses + "\nWord: ", currentWordState.join(" ") + "\n");

  //while we still have remaining guesses
  while (remainingGuesses > 0) {
    if (word === currentWordState.join("")) {
      userIsWinner = true;
      break;
    }
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
        }
      });
    } else {
      console.log("\n That's incorrect, The word " + userInput + "is not in the word.");
      remainingGuesses--;
    }
    //post iteration log to the console Remaining Guesses, LettersGuessed comma space seperated, and currentWordState using join method space seperated
    console.log("\nRemaining Guesses: ", remainingGuesses);
    console.log("Letters Guessed: ", lettersGuessed.join(", "));
    console.log("Word: ", currentWordState.join(" "));
  }

  if (userIsWinner) {
    console.log("\nYou Won! The word was: " + word + "!\n🌟 You're a star! 🌟");
  } else {
    console.log("\nYou Lost! The word was: " + word + "!");
  }
}

runSnowman();
