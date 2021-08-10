//`readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
const readline = require("readline-sync");
//The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
const dictionary = require("./dictionary");
//This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

function replaceLetters(word, placeholder, userInput){
  if(word.includes(userInput)){
    for(let i = 0; i < word.length; i++){
      if(word[i] === userInput){
        placeholder.splice(i, 1, userInput);
      }
    }
   return placeholder;
  }else{
    return false;
  }
}

function confirmWinner(word, placeholder){
  let placeholderStr = placeholder.join('');
  if(placeholderStr === word){
  return true;
  }
}

function inputValidityCheck(userInput, alphabet){
  if(alphabet.includes(userInput)){
    return true;
  }else{
    return false;
  }
}

function getUnderscores(word, placeholder){
  for(let i = 0; i < word.length; i++){
    placeholder.push('_');
  }
}
/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.
  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.
  Once you understand the code below, you may remove the comments if you like.
*/
function run() {
  //boolean that will keep the game running or not
  let continueGame = true;
  //keeps track of inputs and stores in an array
  let wrongGuess = [];
  //all valid inputs
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  //number of tries
  let tries = 7;
  const word = getRandomWord();
  //to be filled with spaces equal to number of letters in word
  let placeholder = [];
  //every valid userInput the function will work with
  if(placeholder.length === 0){
    getUnderscores(word, placeholder);
  }
  
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
    After a user hits the 'return' key, the rest of the code will run.
  */

  
  while(continueGame){
  //show the player how many spaces are left
    console.log(`\n${placeholder.join(' ')}`);
    const userInput = readline.question(`Remaining incorrect guesses: ${tries}\nLetters guessed: ${wrongGuess}\nGuess a lowercase letter: `);
  //if the input is valid, continue, also keeps track of wrong guesses in an array
    if(inputValidityCheck(userInput, alphabet)){
      let checkIfBoolean = replaceLetters(word, placeholder, userInput);
      //decrement remaining tries if valid letter is wrong
      if(!checkIfBoolean){
        if(!wrongGuess.includes(userInput)){
          wrongGuess.push(userInput);
          tries--;
        }
      }else{
        placeholder = checkIfBoolean;
       // console.log(placeholder.join(' '));
      }
    }else{
      console.log('Enter a valid lowercase letter.');
      continue;
    }
    if(confirmWinner(word, placeholder)){
      console.log(`The word was '${word}', you won with ${tries} guesses left!`);
      continueGame = false;
    }
    if(tries <= 0){
      console.log(`You ran out of guesses! The word was '${word}'. Try again next time.`);
      break;
    }
  }
  // This line of code will print out whatever is inputted in by the user.
 // console.log("THE USER INPUTTED:", userInput);
}

run();

/*pseudo code
***** add a placeholder '-' for each letter of the randomly selected word. 
* keep track of each valid incorrect letter given
***** check if each letter matches the hidden word
*****  HELPER FUNC: replace each placeholder '-' with the right amount of correct letters ex: 2 p's for apple
  needs to splice in the location that the correct letters appear, so index numbers will serve as a guide
* HELPER FUNC: check validity of user inputs (ex: multiple letters, numbers, etc)
*
*/