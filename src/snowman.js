/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

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

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

const word = getRandomWord();
  // let guessChances = word.length + 1;
  // let underscore = "";

function checkInput (word,userInput){
  let result = false;
  for(let letter of word) {
    if (letter === userInput) {
       result = true;
    }
  }
  return result;
}

function checkCorrectInput(str) {
  if (str.length === 1 && str.match(/[a-z]/)){
    return true;
  }
  return false;
}

function chancesLeft(word,userInput,guessChances) {
  if(word.includes(userInput)) {
    return guessChances
  }
  guessChances--;
  return guessChances;
}

function replacedLetters(word, emptyStr ,userInput) {
  let emptyStrArr = emptyStr.split("");
  for(let i=0; i < word.length; i++) {
    if(word[i] === userInput) {
      emptyStrArr.splice(i,1,userInput);
    }
  }
  return emptyStrArr.join(" ");
}


function run() {
  let underscore = "_".repeat(word.length);
  console.log(underscore);
  let guessChances = word.length + 1;
  while (guessChances > 0) {
    console.log("Reminder: This secrect word should have " + word.length + " lowercase letters.");
    const userInput = readline.question("Guess a letter: ");
    console.log("THE USER INPUTTED:", userInput);
    if (checkCorrectInput(userInput)){
      underscore = replacedLetters(word, underscore, userInput);
      if (checkInput (word,userInput)){ 
        console.log(underscore);
        console.log("Good job! Keep going!")

      } else {
        guessChances = chancesLeft(word,userInput,guessChances)
        console.log(underscore);
        console.log("Incorrect! Please try again!")
        console.log("Chances less than " + guessChances);
      } 
      underscore = underscore.split(" ").join("");
      if (underscore ===  word) {
        console.log("Congratulations! You Win!")
        guessChances = 0;
        continue;
      }
    } 
    else {
        console.log("Please enter a valid letter!");
        continue;
    }
    if(!guessChances){
      console.log("Sorry, you lost! Take a break and try again!")
    }
  } 
}

run();

