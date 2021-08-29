//----------- GAME SET UP ----------------

// access the chalk package through the variable. One of the most powerful ways to improve look of game with colors might be to use a package, such as chalk.
const chalk = require("chalk");

// `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. 
const readline = require("readline-sync");

// create variable to reference dictionary list from file
const dictionary = require("./dictionary");

// create function to get a dictionary word at random
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
};


//----------- GAME STATE ----------------

//HELPER FUNCTIONS 

//Set up guard clauses 
function checkInput(input) {
  if ((input >= 'a' && input <= 'z') && input.length - 1 === 0 || (input >= 'A' && input <= 'Z') && input.length - 1 === 0) {
    if (checkArray.includes(input)) {
      console.log("\n Error! You already guessed that. Input a different letter"); 
      return true;
    };
  } else {
    console.log("\n Error! Input a letter"); 
    return true;
  };
  checkArray.push(input);
}; 

//List of letters guessed
function lettersList(input) {
  if ((input >= 'a' && input <= 'z') && input.length - 1 === 0 || (input >= 'A' && input <= 'Z') && input.length - 1 === 0) {
    letterArray.push(input.toUpperCase()); 
  }; 
  return letterArray.join(", ");
}; 

// The Word hidden in underscore
function hiddenLetters(word, input) {
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (input === letter) {
      hiddenArray[i] = letter;
    } else if (!hiddenArray[i]) {
      hiddenArray[i] = "_";
    };
    hiddenWord = hiddenArray.join(" "); 
  };
  return hiddenWord;
};

// Remaining Incorrect Letter Guesses
function guessesLeft (guesses, word, input) {
  if (!word.includes(input)) {
    guesses--;
  } else {
    guesses;
  };
  return guesses;
};


//----------- GLOBAL VARIABLES----------------
// Set up global variables to access throughout
let word = getRandomWord();
let guesses = Number(process.argv[2]) || word.length;  
let guessCount = 0;
let checkArray = [];
let letterArray = [];
//NOTE: Consider if it's best to work with array vs string. Though array is easier (strings are immutable). String easier to print out. If ever need to change, just convert real quick and use it but without separate variable. Console log array converted to a string.
let hiddenArray = [];
let hiddenWord = "";
let scoreWins = 0;
let scoreLosts = 0;
let wordGuess = 3
let remainingWordGuess = 0
let dashCount = 0
let guessedWord = false;


//------------GAME LOOP----------------

function run() {
  //Check the word to test
  // console.log(word)

  console.log(chalk.blue("----------The Snowman Game----------\n\n Remaining Incorrect Letter Guesses: "  + guesses + "\n " + hiddenLetters(word) + "\n\n")) 
  
  //While loop until word is complete or there are no more letter guesses left
  while (word !== hiddenWord && guesses) {
    // Check if it's time to guess word
    dashCount = hiddenArray.filter(letter => letter === "_").length
      while (dashCount <= 2 && wordGuess) {
        let makeGuess = readline.question("Would you like to guess the word? You have " + wordGuess + " tries. Y/N?")
        makeGuess = makeGuess.toLowerCase()
        if (makeGuess === 'y') {
          let wordInput = readline.question(" Guess the word: ")
          wordInput = wordInput.toLowerCase();
          if (wordInput === word) {
            console.log(`That's correct! You've won! You took ${remainingWordGuess} word guesses and ${guessCount} letter guesses`)
            hiddenWord = wordInput
            scoreWins++
            guessedWord = true;
            break;
          } else {
            if (wordGuess > 0) {
              wordGuess--
              remainingWordGuess++
              console.log(`That's incorrect. Try again!`)
            }
          }
        } else {
          break;
        }
      }

    // Switch to letter guesses if you haven't guessed the word 
    if (guessedWord) {
      break;
    } else {
      let userInput = readline.question(" Guess a letter: ");
      // set to lower case to accept values in uppercase as well
      userInput = userInput.toLowerCase()
  
      //Check for Errors
      while (checkInput(userInput)) {
        userInput = readline.question(" Guess a letter: ")
      }
      
      //Count number of guesses taken
      if (guessesLeft(guesses, word, userInput) !== guesses) {
        guessCount += 1 
      }
  
      //Update remaining incorrect guesses
      guesses = guessesLeft(guesses, word, userInput)
      
      //Update letters guessed
      lettersGuessed = lettersList(userInput)
  
      //Update hidden word
      hiddenWord = hiddenLetters(word, userInput)
  
      console.log("-----------------------------------")
      console.log("\nRemaining Incorrect Guesses: " + guesses + "\nLetters Guessed: " + lettersGuessed + "\n Word: " + hiddenWord + "\n\n")
      
    }
  }
  
  //Check if user won or lost
  if (word === hiddenWord && !guessedWord) {
    console.log("You win! You took " + guessCount + " guesses.\n")
    scoreWins++
  } else if (word !== hiddenWord && !guessedWord) {
    console.log("You lost! The correct word is " + word + ".\n")
    scoreLosts++
  }

  // Give user the option to replay and if yes, reset all applicable variables 
  console.log("Would you like to play another game?")
  let userChoice = readline.question("Enter Y/N ")
  userChoice = userChoice.toLowerCase()

  if (userChoice === 'y') {
    word = ""
    word = getRandomWord();
    guesses = process.argv[2] || word.length  
    guessCount = 0
    checkArray = []
    letterArray = []
    hiddenArray = []
    hiddenWord = ""
    remainingWordGuess = 0
    dashCount = 0
    guessedWord = false; 
    run()
  } else {
    console.log(`Great! You've won ${scoreWins}x and lost ${scoreLosts}x.`)
  }

}

run();
