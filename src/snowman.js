/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/

function gameIntro() {
  const userInput = readline.question("Do you want to play a Snowman? [Y][N] \n").toUpperCase();
  switch(userInput) {
    case "Y" : 
    case "YES" : run(); break;
    case "N" : 
    case "NO" : console.log("You have now exit the game!"); break;
    default : console.log("That is not one of the options"); gameIntro(); break;
  }
}
let word = getRandomWord();

let status = {
  dashArr: [],
  lettersGuessArr: [],
  guessRemaining: word.length + 1,
  gameContinue: true,
}


function putDashes(randomWord) {
  for(let l of randomWord) {
    status.dashArr.push("_");
  }
  return status.dashArr.join(" ");
}

// replaces the dash with the correct letter guess
function replaceDashLetters(randomWord, guessLetter) {
  for(let i = 0; i < randomWord.length; i++) {
    if(randomWord[i] === guessLetter) status.dashArr.splice(i, 1, guessLetter);
  }
  return status.dashArr.join(" ");
}

// an array of letters guessed
function guessLettersArr(guessLetter) {
  if(!status.lettersGuessArr.includes(guessLetter)) {
    status.lettersGuessArr.push(guessLetter);
  }
  return status.lettersGuessArr.join(" ");
}

// remaining of guesses
function letterRemaining(randomWord, guessLetter) {
  let correctLetter = false;
  for(let i = 0; i < randomWord.length; i++) {
    if(randomWord[i] === guessLetter) correctLetter = true;
  }
  if(correctLetter === false) status.guessRemaining--;
  return status.guessRemaining;
}

function isGameWon(secretWord) {
  let gameWon = false;
  if(secretWord === status.dashArr.join("")) gameWon = true;
  return gameWon;
}

// check if input is one letter or is an alphabetical letter
function checkCorrectInput(usrInput) {
  if(usrInput.length > 1 || !(/[a-z]/).test(usrInput)) {
    return "Please Input 1 Letter!";
  } else {
    return true;
  }
}

function resetStatus() {
  word = getRandomWord();
  status.dashArr = [];
  status.guessLettersArr = [];
  status.gameContinue = true;
  status.guessRemaining = word.length + 1;
  return status;
}

function run() {
  console.log("\n");
  console.log(putDashes(word));
  console.log("\n");
  console.log("Guessed Letters: ");
  console.log("\n");
  console.log(`You have ${status.guessRemaining} guesses remaining`);

  while(status.gameContinue) {
    const userInput = readline.question("Guess a letter: ").toLowerCase();
    let uiLetter = null;
    if(checkCorrectInput(userInput) === true) {
      uiLetter = userInput;
      console.log(`Guessed Letters: ${guessLettersArr(uiLetter)}`);
      console.log("\n");
      console.log(replaceDashLetters(word, uiLetter));
      console.log("\n");
      if(isGameWon(word) === true) {
        console.log(`You Win! You took ${status.lettersGuessArr.length} guesses`);
        status.gameContinue = false;
        resetStatus();
        return gameIntro();
      } else if(status.guessRemaining === 1) {
        console.log("You ran out of guesses!");
        console.log(`The Correct Word is ${word}.`)
        status.gameContinue = false;
        resetStatus();
        return gameIntro();
      } else if (status.guessRemaining === 2) {
        console.log(`You have ${letterRemaining(word, uiLetter)} guess remaining`);
      } else if (status.guessRemaining > 2) {
        console.log(`You have ${letterRemaining(word, uiLetter)} guesses remaining`);
      }
    } else {
      // if input is incorrect, will return a string
      console.log(checkCorrectInput(userInput));
    }
  }
}

gameIntro();

/*
// UNRESOLVED BUGS: 
- repeated letters in Guessed Letters Array appears and guesses remaining is reduced
*/
