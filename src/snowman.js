
//  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.

const readline = require("readline-sync");

const dictionary = require("./dictionary");

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}


//----------- GAME STATE ----------------

//HELPER FUNCTIONS 

//Set up guard clauses 
function checkInput(input) {
  if ((input >= 'a' && input <= 'z') && input.length - 1 === 0 || (input >= 'A' && input <= 'Z') && input.length - 1 === 0) {
    if (checkArray.includes(input)) {
      console.log("\n Error! You already guessed that. Input a different letter") 
      return true
    }
  } else {
    console.log("\n Error! Input a letter") 
    return true
  }
  checkArray.push(input)
} 

//List of letters guessed
function lettersList(input) {
  if ((input >= 'a' && input <= 'z') && input.length - 1 === 0 || (input >= 'A' && input <= 'Z') && input.length - 1 === 0) {
    letterArray.push(input.toUpperCase()) 
  } 
  return letterArray.join(", ")
} 

// The Word hidden in underscore
function hiddenLetters(word, input) {
  for (let i = 0; i < word.length; i++) {
    let letter = word[i]
    if (input === letter) {
      hiddenArray[i] = letter
    } else if (!hiddenArray[i]) {
      hiddenArray[i] = "_"
    }
    hiddenWord = hiddenArray.join(" ") 
  }
  return hiddenWord
}

// Remaining Incorrect Guesses
function guessesLeft (guesses, word, input) {
  if (!word.includes(input)) {
    guesses--
  } else {
    guesses
  }
  return guesses
}

// Set up global variables to access throughout
const word = getRandomWord();
let guesses = 7  
let guessCount = 0
let checkArray = []
let letterArray = []
let hiddenArray = []
let hiddenWord = ""

function run() {
  //Check the word to test
  //console.log(word)
  
  console.log("----------The Snowman Game----------\n\n Remaining Incorrect Guesses: "  + guesses + "\n Word: " + hiddenLetters(word) + "\n\n") 
  
  //While loop until word is complete or there are no more guesses 
  while (word !== hiddenWord && guesses > 0) {
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
    
    //Set up to compare hidden word with dictionary word
    hiddenArray = hiddenWord.split(" ")
    hiddenWord = hiddenArray.join("")
  }
  
  //Check if user won or lost
  if (word === hiddenWord) {
    console.log("You win! You took " + guessCount + " guesses.\n")
  } else {
    console.log("You lost! The correct word is " + word + ".\n")
  }

}

run();
