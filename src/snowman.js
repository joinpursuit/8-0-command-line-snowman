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


//FUNCTIONS WE WILL USE TO HELP OUR MAIN FUNCTION() {}

//Function that helps Identify if input is other than a letter
function checkInput(input) {
  //Statement that identifies input
    if ((input >= 'a' && input <= 'z') && input.length - 1 === 0 || (input >= 'A' && input <= 'Z') && input.length - 1 === 0) {
  //Statement that checks if our array contains any giving letters given by input
      if (checkArray.includes(input)) {
  //If guessed letter was previously inputted should return an error
        console.log("\n Error! You already guessed that. Input a different letter") 
        return true;
      }
  //If given an input other than a letter
    } else {
      console.log("\n Error your input is Invalid! Input a letter") 
      return true;
    }
    checkArray.push(input);
  } 
  



  //List of letters guessed
function lettersList(input) {
//Checks for every given input and gives it back to you as an UpperCased letter and joins each letter with a space
    if ((input >= 'a' && input <= 'z') && input.length - 1 === 0 || (input >= 'A' && input <= 'Z') && input.length - 1 === 0) {
      letterArray.push(input.toUpperCase()) 
    } 
    return letterArray.join(" ")
  } 
  

// The Word hidden in underscore
function hiddenLetters(word, input) {
// Loops inside our randomly given word  
    for (let i = 0; i < word.length; i++) {
      let letter = word[i]
//checks if input is equal letter and it should show you the letter
      if (input === letter) {
        hiddenArray[i] = letter;
//if our letter is not guessed or given our word will be a set of underscores        
      } else if (!hiddenArray[i]) {
        hiddenArray[i] = "_";
      }
      hiddenWord = hiddenArray.join(" ") ;
    }
    return hiddenWord
  }


// Remaining Incorrect Guesses
function guessesLeft (guesses, word, input) {
  //Checks if our guesses are wrong it should decrease our guesses
    if (!word.includes(input)) {
      guesses--;
  //If guesses are correct number of guesses should NOT decrease they should stay the same
    } else {
      guesses;
    }
    return guesses;
  }
  

// Set up global variables to access them as we go
const word = getRandomWord();
let guesses = 7  ;
let guessCount = 0;
let checkArray = [];
let letterArray = [];
let hiddenArray = [];
let hiddenWord = "";



function run() {
    // This line of code gets a random word. The `word` variable will be a string.
    const word = getRandomWord();
    /*
      The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
      The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
      After a user hits the 'return' key, the rest of the code will run.
    */
    const userInput = readline.question("\nYou have entered => The Snowman Game!\n\nYou have 7 chances to Win :) or Lose :(\n\nPress any Key to Start the Game; \n\n");
    // This line of code will print out whatever is inputted in by the user.
    //Check the word to test
    //console.log(word)
  //Welcome to the Snowman Game!
    console.log("----------Welcome to the Snowman Game!----------\n\n Remaining Incorrect Guesses: "  + guesses + "\n Word: " + hiddenLetters(word) + "\n\n"); 
  
    //While loop until word is complete or there are no more guesses 
    while (word !== hiddenWord && guesses > 0) {
      let userInput = readline.question(" Guess a letter: ");
  
      //This While loop checks for Errors
      while (checkInput(userInput)) {
        userInput = readline.question(" Guess a letter: ");
      }
  
      //Count number of guesses taken
      if (guessesLeft(guesses, word, userInput) !== guesses) {
        guessCount += 1 ;
      }
  
      //Update remaining incorrect guesses(gets information from our helper function)
      guesses = guessesLeft(guesses, word, userInput);
  
      //Update letters guessed(gets information from our helper function)
      lettersGuessed = lettersList(userInput);
  
      //Update hidden word(gets information from our helper function)
      hiddenWord = hiddenLetters(word, userInput);
  
      console.log("----------------------------------------------");
      console.log("\nRemaining Incorrect Guesses: " + guesses + "\nLetters Guessed: " + lettersGuessed + "\n Word: " + hiddenWord + "\n\n");
  
      //Set up to compare hidden word with dictionary word
      hiddenArray = hiddenWord.split(" ");
      hiddenWord = hiddenArray.join("");
    }
  
    //let's user know if they win or lose
    if (word === hiddenWord) {
      console.log("You win! :) You took " + guessCount + " guesses\n");

    } else {
      console.log(`You lost! :( \n\nThe correct word is => "${word.toUpperCase()}"\n`);
    }
  
  }

run();