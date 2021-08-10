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

//helper function that determines if the user's input is a letter, and is only one character
function alphabet(n) {
  let setOfAlphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (setOfAlphabets.includes(n) && n.length === 1) {
    return true;
  }
  return false;
}

/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/

/*
Future Thangs
1. looking at the length of the random word and showing dashes versus the word 
2. console.log or return the phrases - remaining incorrect, letters guessed, word
3. edge case - user input should only take one character, it can only be part of the alphabet - not numbers, symbols
4. the final return should return most of the helper functions - the result of a helper function is stored as variable

Things to figure Out
1. grab the random word
2. compare the random word to the user input =  ( random word.includes(user.input)
3. if correct, another helper function to push the correct user input into something else - a correct array
4. if incorrect, another function to lower the amount of guesses in the "guesses letter"
  a. count the letter the are in the user input array?


Global Scope/State
1. correct array - the phrase and filled in spaces
2. incorrect array - user input that are not in the random word
3. the random word function
4.create an empty array
*/



  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  // const userInput = readline.question("Guess a letter: ");
  // // This line of code will print out whatever is inputted in by the user.
  // console.log("THE USER INPUTTED:", userInput);

run();
