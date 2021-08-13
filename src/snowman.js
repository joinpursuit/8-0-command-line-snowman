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

function run() {
  const word = getRandomWord();
  //empty array for guessed letters
  const guessed = [];
  //the amount of guess counts allocated to a users
  let guessCounts = word.length;
  //underscore to show to users
  const underscore = "_"

  //the amount of underscores are equal to the length of a word, the Array.from turns the dashes into an array
  let underscores = Array.from(underscore.repeat(word.length));
  
  //while loop will say that while the guess counts is less than 9 and more than 0
  while (guessCounts > 0) {
    //log the underscores
    console.log(`${underscores.join(" ")}`);
    //log the guess counts
    console.log("How many guesses you have left: " + guessCounts);
    //log the letters guessed by users
    console.log("Guessed:" + guessed);
    //this is the actual code taking the user input and lower case it
    const userInput = readline.question("Guess a letter: ").toLowerCase();
    //log what the user input lastn
    console.log("THE USER INPUTTED:", userInput);
    //then we push the user input into the guessed array
    guessed.push(userInput);

    //if the helper function rings true on in valid then fire an error
    if (!alphabet(userInput)) {
      console.log("Invalid input. Only letters. One by one pls.");
    }

    //if the random word includes the user input
    if (word.includes(userInput)) {
      //then we'll for loop through random word
      for (let i = 0; i < word.length; i++) {
        //if the random word at any index is equal to the user input
        if (word[i] === userInput) {
          //then the word reveals the letter in place on the correct space
          underscores[i] = userInput;
        }
      }
      
    //else we subtract the guess count by 1 (because the guess is incorrect)
    } else {
      guessCounts--;
    }

    //if they win meaning they get the whole word
    if (word.toLowerCase() === underscores.join("").toLowerCase()) {
      //then congrats and end the function
      console.log(`The word was ${word}! Wonderful job honey (: `);
      return;
      }
    }
  //if while loop ends due to incorrect guesses
  if (guessCounts === 0) {
    //then we have a "better luck next time"
    console.log(`The word was: ${word}.Better luck next time! Try again.`);
  }
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
