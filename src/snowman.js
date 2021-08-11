/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
// const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
// const dictionary = require("./dictionary");

// /*
//   This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
// */
// function getRandomWord() {
//   const index = Math.floor(Math.random() * dictionary.length);
//   return dictionary[index];
// }

// /*
//   This function will run your game. Everything you want to happen in your game should happen inside of here.

//   You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

//   Once you understand the code below, you may remove the comments if you like.
// */
// function run() {
//   // This line of code gets a random word. The `word` variable will be a string.
//   const word = getRandomWord();
//   /*
//     The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

//     The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

//     After a user hits the 'return' key, the rest of the code will run.
//   */
//   const userInput = readline.question("Guess a letter: ");
//   // This line of code will print out whatever is inputted in by the user.
//   console.log("THE USER INPUTTED:", userInput);
// }

// run();

//-------------------------------------------------- LET'S START FROM HERE --------------------------------------------------

const readline = require("readline-sync"); // Declare a variable 'readline' which enable you get the userInput from the command line. 
const dictionary = require("./dictionary"); // Declare a variable 'dictionary' which is used for generate the random words.

// Create a function to return the random words which should be called in the main function.
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

// // Declare a variable 'word' equals to the value, which is calling the getRandomWord function.
// const word = getRandomWord();

// First helper function:
// To check if the userInput matches the requirements or not, each time should enter one lowercase letter.
function checkCorrectInput(letter) {
  if (letter.length === 1 && letter.match(/[a-z]/)){
    return true;
  }
  return false;
}

// Second helper function:
// Loop the random word to check if the userInput matches the current letter
// Compare with every letter in the word with the userInput, if they are the same return true, otherwise false.
function checkInput (word,userInput){
  let result = false;
  for(let letter of word) {
    if (letter === userInput) {
       result = true;
    }
  }
  return result;
}

// Third helper function:
// The format exchanger between before and after guessing 
  // The parameter 'storage' should be related with the argument (the orginal format) 
  // -->'underscore' without space which set up in the main function.
function replacedLetters(word, storage ,userInput) {
  // The inputExchanger is the basic format exchanger
  let inputExchanger = storage.split("");
  for(let i=0; i < word.length; i++) {
    // Loop through every letter in the word to check if it equals to the userInput 
    if(word[i] === userInput) {
      // If uerInput is correct, update the format exchanger, 
        // which would replace the underscore'_' with userInput according to the letter's index 
      inputExchanger.splice(i,1,userInput);
    }
  }
  // If userInput is not correct, remain the orginal format but with space.
  return inputExchanger.join(" ");
}

// Fourth helper function:
// Keep tracking the guessChances, if userInput is correct, remain the guessChances
  // Otherwise, decrease the guessChances.
function chancesLeft(word,userInput,guessChances) {
  if(word.includes(userInput)) {
    return guessChances
  }
  // According to the condition to return different result
  guessChances--;
  return guessChances;
}

// Main function:
function run() {
  // Declare a variable 'word' equals to the value, which is calling the getRandomWord function.
  const word = getRandomWord();
  // Declare a variable 'underscore' which according to the word's length to repeat "_"
  let underscore = "_".repeat(word.length);
  // Prints the format before guessing
  console.log(underscore.split("").join(" ") + "\n");
  // Declare a variable 'guessChances' which means how many times could guess in total (before guessing)
  let guessChances = word.length + 1;
  // While Loop if guessChances is greater than 0
  while (guessChances > 0) {
    // Print: the reminder of the length of word and the userInput 
    console.log("Reminder: This secrect word should have " + word.length + " lowercase letters." + "\n");
    const userInput = readline.question("Guess a letter: ");
    console.log("\n" + "THE USER INPUTTED:", userInput + "\n");
    // If the userInput is a lowercase letter, then continue to check, otherwise 
      // --> Prints "Please enter a valid letter!" and go back to the beginning of the while loop
    if (checkCorrectInput(userInput)){
      // Calling the function
      // --> re-assign the value to the variable 'underscore' which replace "_" with the userInput
      underscore = replacedLetters(word, underscore, userInput);
      // To check the userInput is the exactly the same with the letter of the word
      if (checkInput (word,userInput)){ 
        // If true, prints the updated format
        console.log(underscore + "\n" );
        console.log("Good job! Keep going!" + "\n")

      } else {
        // If false, calling the function
        // --> re-assign the value to the variable 'guessChances'
        guessChances = chancesLeft(word,userInput,guessChances)
        // Prints the updated underscore above which without any changing
        console.log(underscore + "\n");
        // Prints "Incorrect! Please try again!"
        console.log("Incorrect! Please try again!" + "\n")
        // Prints the updated guessChances which would decrease by one after each incorrect userInput
        console.log("Chances less than " + guessChances + "\n");
      } 
      // Re-assign the value (the final format) to the variable 'underscore' 
      underscore = underscore.split(" ").join("");
      // If the final format underscore equals to the random word
        // Prints the congrat sentence.
      if (underscore ===  word) {
        console.log("Congratulations! You Win!")
        // Stop the game and go back to the beginning of the while loop
        guessChances = 0;
        continue;
      }
    } 
    else {
      // If the userInput is not a lowercase letter 
      // --> Prints "Please enter a valid letter!" and go back to the beginning of the while loop
        console.log("Please enter a valid letter!" + "\n");
        continue;
    }
    // If no more guessChances, prints "Sorry, you lost! Take a break and try again!"
    if(!guessChances){
      console.log("Sorry, you lost! Take a break and try again!")
    }
  } 
}

run();

