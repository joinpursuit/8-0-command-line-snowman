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

// set up game state
//    what data do we need to access or update?
//      State:
/**     secret word
 *      correct guesses
 *      wrong guesses 
 *      max num of wrong guesses
 * 
 * What do we do with that data?
 *  Helper Functions that use state
 *  put a random secret word into state
 *  check if a guess is correct
 *  add a correct guess to the list
 *  check if th game is won
 * 
 * //How to keep previous guesses in memory
 * */

//Helper Functions

// let word = getRandomWord(); 
// let correctGuesses = [];
// let wrongGuesses = [];
// let maxNumWrongGuesses = [];

// //Helper Functions

// function isGuessCorrect(guess){
//   return word.includes(guess);
// }

// function addCorrectGuessToList(guess){
  
//   correctGuesses.push(guess);
//   return correctGuesses
// }

// function isGuessWrong(guess){
//   return word.includes(guess)
// }

  
// function addWrongGuessToList(guess){
  
//   wrongGuesses.push(guess);
//   return wrongGuesses;
// }



// console.log(addCorrectGuessToList('p'));
// console.log(addCorrectGuessToList('l'));
// console.log(addWrongGuessToList('x'));
// console.log(addWrongGuessToList('m'));

//Pick a random word
// While the word has not been guessed {
//   Show the player their current progress
//   Get a guess from the player
//   If the player wants to quit the game {
//   Quit the game
//   }
//   Else If the guess is not a single letter {
//   Tell the player to pick a single letter
//   }
//   Else {
//   If the guess is in the word {
//   Update the player's progress with the guess
//   }
//   }
//  }


 // This line of code gets a random word. The `word` variable will be a string.
 
 //Put random word into state
//  let word = word;
 let startingDashes = [];
 let userInputArr = [];

 
 // loop through the word to get dashes
 //for (let i = 0; i < word.length; i++) 

// this function is taking the word and creating the matching dashes
function addUnderscores(word, state){
 for(let char of word){
   state.wordArr.push("_ ")
 }
 return state.wordArr
}

//addUnderscores()
// this function is converting each correct userInput from a dash into the correct guess
function convertCorGuesses(word,userInput, state){
 for(let i = 0; i < word.length; i++){
   if(word[i] === userInput.toLowerCase()){
     state.wordArr.splice(i, 1, userInput)
   }
 } 
 return state.wordArr
}
//this fuction is checking the validity of each guess
function checkingValidity(userInput, state){
  if(userInput.length === 1 && typeof userInput === 'string' && userInput >= "a" && userInput <= "z" )
  { 
         state.allGuesses --;
         state.answerArr.push(userInput)
         return state.answerArr
 }
 return false
}
function ifPlayerWon(word, state){
  if(word === state.wordArr.join("")){
    return true
  } else {false}
}
function run() {
  let state = {
    wordArr: [],
    allGuesses: 7,
    validGuesses: [],
    answerArr: [],
    shouldKeepPlaying: true
 
  }
  //get the word
  // const word = getRandomWord();
  const word = "cocoa"
  //put the word into dashes according to length
  let convertToDashes = addUnderscores(word, state);
  // console log the game structure
  
  //start the game 
  while(state.shouldKeepPlaying){
    //have player guess the letter
    const userInput = readline.question("Guess a letter: ");
    // 
    let apprGuess = checkingValidity(userInput, state);
    if(apprGuess){
      console.log(`Letters Guessed: ${state.answerArr}`)
      console.log(`Word: ${convertToDashes.join(' ')}`)
      console.log(`Remaining Guesses: ${state.allGuesses}`)
      
     

      // console.log("Invalid response: only single letters, no numbers, and no symbols.")
      // continue;
    } else {
      state.allGuesses --;
      console.log(`Remaining Incorrect Guesses: ${state.allGuesses}`)
      console.log(`Letters Guessed: ${state.answerArr}`)
      console.log(`Word: ${convertToDashes.join(' ')}`)
      console.log("Invalid response: only single letters, no numbers, and no symbols.")
      continue;
    }
    if(state.allGuesses===0){
      console.log(`Game Over: the secret word was ${word}`)
      return "Game Over"
      
    }
    let letterToDashes = convertCorGuesses(word,userInput,state)
    // console.log(`Word: ${letterToDashes.join(" ")}`);
    let playerOutcome = ifPlayerWon(word, state)
    if(playerOutcome){
      console.log("You won!")
      console.log(`${state.wordArr.join(' ')}`)
      return
      
    }
    // after each incorrect guess all guesses --
    // after each guess the guesses need to be added to the answer array

  }

//for each icorrect guess the guesses go down


//letters guessed needs to be displayed
  
    

 //replace dashes with correct user guesses with letters
 //if the user input is included in word then replace dash with correct guess

 //make sure correct guess goes in the appr. index

  
  // 
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  const userInput = readline.question("Guess a letter: ");
  
  
  // This line of code will print out whatever is inputted in by the user.
  console.log("THE USER INPUTTED:", userInput);
  // Check if the guess is correct
  let isCorrect = isGuessCorrect(userInput);
  //if the guess is correct add it to correct guesses
}

run();
