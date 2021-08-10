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

function getDashedWord(word){
  let wordArr = [];
  for(let char of word){
    wordArr.push("_");
  }
  return wordArr;
}

function replaceUnderscoresWithLetters(wordArr,word,userInput) {
  for (let i = 0; i < word.length;i++){
    if(word[i]=== userInput){
    wordArr.splice(i,1,userInput)
  }
}
  return wordArr.join(' ');
}


// function checkGuessedWord (word, guess) { 
//   if (word.includes(guess)) {
//     return true
//   } else {
//     return false
//   }
// }



// function userInputControl(userInput){
//   return userInput.match(/[a-z]/) && userInput.length === 1;
// }

// /*

//   You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.
// */
function run() {
let numOfTries = 7;
let keepPlaying = true;
const word = getRandomWord();
let guessedLetters = " ";
let dashedVersion = getDashedWord(word).join(" ");
while(keepPlaying){
  console.log(`Remaining Incorrect Guesses: ${numOfTries}`);
  console.log(`Word: ${dashedVersion}`);
  const userInput = readline.question("Guess a letter: ").toLowerCase();
  guessedLetters += " " + userInput;// keep track of all player's inputs
  if(userInput.length ===1 && typeof userInput === "string" && userInput.match(/[a-z]/)){
    if(word.includes(userInput)){
      let wordArr = dashedVersion.split(" ");
      dashedVersion = replaceUnderscoresWithLetters(wordArr,word,userInput);
      console.log(dashedVersion);
    } else {
      numOfTries--;
    }
  } else {
    console.log("Please enter a valid letter.");
    continue;
  }
  let wordArr = dashedVersion.split(" ");
  let underscoreString = replaceUnderscoresWithLetters(wordArr,word,userInput);
  underscoreString = underscoreString.split(" ").join("");
  if(underscoreString === word){
      console.log("You won!");
      keepPlaying = false;
  } else if(!numOfTries){
    keepPlaying = false;
    console.log(`You lost! The correct word is ${word}`);
  }
}
}
run();
