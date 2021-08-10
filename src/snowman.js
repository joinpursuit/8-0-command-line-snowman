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

  
function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  // declared variables
  let incorrectGuesses = word.length + 3
  let lettersGuessed = ["None"];
  let theBlanks = "";
  let winningMsg = "Congrats! You Win!";
  let losingMsg = "Sorry, Game Over. :(";
  // var `validEntry` with array of strings that displays the alphabet `a-z`
  let validEntry = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let invalidGuess = "Invalid input. Please enter a lowercase letter.";
  //reassigns underscores to the variable called `theBlanks`.
  for (let i = 0; i < word.length; i++){
    theBlanks += "_ "
  }
  // for i loop that logs start of game and continues to loop it through over again until conditions are met.
  for (let i = word.length - 1; i < word.length; i++){
    //'prints' concatenated strings into terminal 
    console.log("Remaining Incorrect Guesses: " + incorrectGuesses);
    console.log("Letters Guessed: " + lettersGuessed);
    console.log("Word: " + theBlanks);
    // variable that instructs user to choose a letter
    let userInput = readline.question("Pick a letter: ");
    //creates space in after entering character and its result
    console.log("\n");
    // allows letter that user inputted to match with the variable `validEntry` and print in terminal else it will print `invalidGuess`.  This makes sure only lowercase alphabet characters are able to be printed in the terminal.
    if (userInput) {
      if (validEntry.includes(userInput)) {
        // 'pushes' `userInput` selection into "Letters Guessed" line
        lettersGuessed.push(" " + userInput);
      } else {
        incorrectGuesses++;
        console.log(invalidGuess);
      }
      
      // nested `if` condition to remove 'None' string printed in games inception.
      if (lettersGuessed.includes("None")){
        lettersGuessed.shift();
      }
    }
    //loop through `word.length` to check if `userInput` is correct or not and modifies `theBlanks` appropriately
    for (let i = 0; i < word.length; i++){
      //if `userInput` matches an element witihin `word.length`, replace `theBlanks` with `i`
      if(userInput === word[i]){
        //adds spaces in between characters
        theBlanks = theBlanks.split("");
        //replaces every other element of string with userInput
        theBlanks.splice(i*2, 1, userInput);
        //returns concatenated string
        theBlanks = theBlanks.join('');
      }
    
    }
    // condition that states if `word.includes` isn't true, then the remaining correct guesses must decrement
    if (!word.includes(userInput)){ 
      incorrectGuesses--;
    }
    // prints conditions if incorrectGuesses reaches '0'.
  if (incorrectGuesses === 0) {
    console.log("Remaining Incorrect Guesses: " + incorrectGuesses);
    console.log("Letters Guessed: " + lettersGuessed);
    console.log("Word: " + theBlanks);
    return console.log(losingMsg + " The correct word was: " + word);
  }
  /*
  The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
  
  The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
  
  After a user hits the 'return' key, the rest of the code will run.
  */
  // This line of code will print out whatever is inputted in by the user.
 console.log("Letter guessed:", userInput);
 // if theBlanks includes the string "_ "(underscore), `i` will decrement until user wins or loses game
 if (theBlanks.includes("_ ")){
   i--;
 } else {
   // prints congratulatory message if user meets conditions and wins the game
 return console.log(winningMsg);
  }
 }
}

run();

