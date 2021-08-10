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

//Using function from GitHub to add colors to my game!!

var colors = {
	0: "\033[0;30m", /* 00 BLACK    0x30 */
	1: "\033[0;34m", /* 01 BLUE     0x31 */
	2: "\033[0;32m", /* 02 GREEN    0x32 */
	3: "\033[0;36m", /* 03 CYAN     0x33 */
	4: "\033[0;31m", /* 04 RED      0x34 */
	5: "\033[0;35m", /* 05 PURPLE   0x35 */
	6: "\033[0;33m", /* 06 GOLD     0x36 */
	7: "\033[0;37m", /* 07 GREY     0x37 */
	8: "\033[1;30m", /* 08 DGREY    0x38 */
	9: "\033[1;34m", /* 09 LBLUE    0x39 */
	a: "\033[1;32m", /* 10 LGREEN   0x61 */
	b: "\033[1;36m", /* 11 LCYAN    0x62 */
	c: "\033[1;31m", /* 12 LRED     0x63 */
	d: "\033[1;35m", /* 13 LPURPLE  0x64 */
	e: "\033[1;33m", /* 14 YELLOW   0x65 */
	f: "\033[1;37m", /* 15 WHITE    0x66 */
};
function c(r, msg) {
	return '§' + r + msg + '§r'; // I do have questions about this line of code
}

function mccolor(str) {
	return str.replace(/§([0-9a-fr])/g, function(m, contents) { //Also have questions about this line of code
		return colors[contents] || "\033[0m";
	});
}


//FUNCTIONS WE WILL USE TO HELP OUR MAIN FUNCTION() {}
let errorMessage = "";
//Function that helps Identify if input is other than a letter
function checkInput(input) {
  //Statement that identifies input
    if ((input >= 'a' && input <= 'z') && input.length - 1 === 0 || (input >= 'A' && input <= 'Z') && input.length - 1 === 0) {
  //Statement that checks if our array contains any giving letters given by input
      if (checkArray.includes(input)) {
        errorMessage = colors[4] + "Error! You already guessed that. Input a different letter"
  //If guessed letter was previously inputted should return an error
        console.log(errorMessage) 
        // return true;
      }
  //If given an input other than a letter
    } else {
      errorMessage = colors[4] + "Error your input is Invalid! Input a letter"
      console.log(errorMessage) 
      // return true;
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
    console.log(`${colors[3]} ----------Welcome to the Snowman Game!----------\n\n Remaining Incorrect Guesses: ${guesses} \n Word: ${hiddenLetters(word)} \n\n`); 
  
    //While loop until word is complete or there are no more guesses 
    while (word !== hiddenWord && guesses > 0) {
      let userInput = readline.question(`${colors[3]} Guess a letter: `);
  
      //This While loop checks for Errors
      while (checkInput(userInput)) {
        userInput = readline.question(`${colors[3]} Guess a letter: `);
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
  
      console.log(`${colors[3]}----------------------------------------------`);
      console.log(`${colors[3]}\nRemaining Incorrect Guesses: ${guesses}\nLetters Guessed: ${lettersGuessed}\n Word: ${hiddenWord}\n\n`);
  
      //Set up to compare hidden word with dictionary word
      hiddenArray = hiddenWord.split(" ");
      hiddenWord = hiddenArray.join("");
    }
  
    //let's user know if they win or lose
    if (word === hiddenWord) {
      console.log(`${colors[6]}You win! :) You took ${guessCount} guesses\n`);

    } else {
      console.log(`${colors[4]} You lost! :( \n\n ${colors[2]} The correct word is => "${word.toUpperCase()}"\n Thank You for playing "The Snowman Game"`);
    }
  
  }

run();