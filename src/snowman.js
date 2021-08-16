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


function isInputValue(givenLetter, state){
  let errMsg = "Please enter a valid letter";
  
  if(givenLetter.length > 1){
    console.log("You entered more than one character, " + errMsg);
    return false;
  }
  if(!isNaN(givenLetter)){
    console.log("You entered a number, " + errMsg);
    return false;
  }
  if(state.guessedLetters.includes(givenLetter)){
    console.log("You have already guessed this value," + errMsg);
    return false;
  }
  return true;
}

function printGameStatus(state){
  console.log(state.dashedWord, "\n");
  let lettersWithCommas = "";

  for(let i = 0; i < state.guessedLetters.length;i++){
    lettersWithCommas += state.guessedLetters[i];
    if(i !== state.guessedLetters.length-1){
      lettersWithCommas += ",";
    }
  }
  console.log("Guessed lettersWithCommas;", lettersWithCommas, "\n");
  console.log(`You have ${state.numOfGuessesLeft} guesses remaining`)
}
/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
// function run() {
//   let word = getRandomWord();
//   let dashedWord = "";
//   const givenLetter = readline.question("Guess a letter: ");
//   if(isNaN(Number(givenLetter))){
//     console.log("This is a letter");
  
//   for(let i=0;i<word.length;i++){
//     if(word[i] === givenLetter){
//       // Givenletter is in the word -- Decrement numOfGuesses
//       dashedWord += givenLetter;
//     } else {
//       dashedWord += "_";
//     }

//     if(i !== word.length-1){
//       dashedWord+=" ";
//     }
//   }
//   }else{
//     console.log ("Error message")
  // }
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  // const userInput = readline.question("Guess a letter: ");
  // This line of code will print out whatever is inputted in by the user.
  // console.log("THE USER INPUTTED:", userInput);
// console.log("Word" + dashedWord);

function run(){
  let state = {
    word: getRandomWord(),
    dashedWord: "",
    guessedLetters: "",
    numOfGuessesLeft: 6
  }
  while(state.numOfGuessesLeft > 0){
    // acumulator 
  if(state.dashedWord.length > 0){
    state.dashedWord = "";
  }

  let solvedWord = true;
  for(let i = 0; i < state.word.length; i++){
    if(state.guessedLetters.includes(state.word[i])){
      state.dashedWord += state.word[i];
    }else {
      solvedWord = false;
      state.dashedWord += "_";
    }

    if(i !== state.word.length-1){
      state.dashedWord += " ";
    }
  }
  if(solvedWord){
    console.log("Congrats you dominated!");
    return;
  }

  printGameStatus(state);
  const givenLetter = readline.question("Please enter your guess: ");

  let isValid = isInputValue(givenLetter, state);
  if(!isValid){
    continue;
  }

  state.guessedLetters += givenLetter;

  if(!state.word.includes(givenLetter)){
    state.numOfGuessesLeft--;
  }
 }  
  console.log("Sorry you killed the Snowman. The correct word was " + state.word);

}

//   let numOfGuessesLeft = 6;
//   while(numOfGuessesLeft > 0){
//     const userInput = readline.question("Guess a letter: ");
//     console.log("THE USER INPUTTED:", userInput);  

//     numOfGuessesLeft--;
//     console.log("Number of guesses left: " + numOfGuessesLeft);
//   }
// }

run();





// function userInputCheck(userInput){
//   return typeof userInput === "string" && userInput.length === 1 && (userInput >= "a" && userInput <= "z");

// }
// userInputCheck("3")






// function isInputValue(givenLetter, state){
//   let errMsg = "please enter a valid letter";

//   if(givenLetter.length > 1){
//     console.log("You entered more than one character, " + errMsg);
//     return false;
//   }
//   if(!isNaN(givenLetter)){
//     console.log("You entered a number, " + errMsg);
//     return false;
//   }
//   if(state.guessedLetters.includes(givenLetter)){
//     console.log("You have already guessed this value," + errMsg);
//     return false;
//   }
//   return true;
// }

// function printGameStatus(state){
//   console.log(state.dashedWord, "\n");
//   let lettersWithCommas = "";

//   for(let i = 0; i < state.guessedLetters.length;i++){
//     lettersWithCommas += state.guessedLetters[i];
//     if(i !== state.guessedLetters.length-1){
//       lettersWithCommas += ",";
//     }
//   }
//   console.log("Guessed lettersWithCommas;", lettersWithCommas, "\n");
//   console.log(`You have ${state.numOfGuessesLeft} guesses remaining`)
// }

// function run(){
//   let state = {
//     word: getRandomWord(),
//     dashedWord: "",
//     guessedLetters: "",
//     numOfGuessesLeft: 6
//   }
//   while(state.numOfGuessesLeft > 0){
//     // acumulator 
//   }if(state.dashedWord.length > 0){
//     state.dashedWord = "";
//   }

//   let solvedWord = true;
//   for(let i = 0; i <state.word.length; i++){
//     if(state.guessedLetters.includes(state.word[i])){
//       state.dashedWord += state.word[i];
//     }else {
//       solvedWord = false;
//       state.dashedWord += "_";
//     }

//     if(i !== state.word.length-1){
//       state.dashedWord += " ";
//     }
//   }
//   if(solvedWord){
//     console.log("Congrats you dominated!");
//     return;
//   }

//   printGameStatus(state);
//   const givenLetter = readline.question("Please enter your guess: ");

//   let isValid = isInputValue(givenLetter, state);
//   if(!isValid){
//     continue;
//   }

//   state.guessedLetters += givenLetter;

//   if(!state.word.includes(givenLetter)){
//     state.numOfGuessesLeft--;
//   }

//   console.log("Sorry you killed the Snowman. The correct word was " + state.word);

// }