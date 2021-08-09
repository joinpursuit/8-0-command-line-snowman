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
//follow
//012345
//_ _ _ _ _ _
//0123456789t
//0 1 2 3 4 5


function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = "good"
  //getRandomWord();
  let winMessage = "Yay!"
  let incorrectGuesses = word.length + 1
  let lettersGuessed = ""
  let theBlanks = ""
  for (let i = 0; i < word.length; i++){
    theBlanks += "_ "
  }

  console.log("Remaining Incorrect Guesses: " + incorrectGuesses)
  console.log("Letters Guessed: " + lettersGuessed)
  console.log("Word: " + theBlanks)
//game ends when someone wins
//once they guess the correct word = win
// _ _ _ _
// g o o d
//if there are no blanks remaining the game ends
//if (theBlanks.includes("_") )

//neverending loop
  for (let i = 0; i < word.length; i++){
//ask for userinput
    let userInput = readline.question("Pick a letter: ")
  //the loop that matches the guesses   
  for (let i = 0; i < word.length; i++){
    if(userInput === word[i]){
      theBlanks = theBlanks.split("")
      theBlanks.splice(i*2, 1, userInput)
      theBlanks = theBlanks.join('')
    }
  } 
  console.log("Remaining Incorrect Guesses: " + incorrectGuesses)
  console.log("Letters Guessed: " + lettersGuessed)
  console.log("Word: " + theBlanks)
  
    console.log("Letter guessed:", userInput);
      if(!theBlanks.includes("_")) {
        
       return console.log (winMessage);
  
//decrement remainingg incorrect guesses each time user enters a wrong guess

     
      } else {
      i--
    }
  }


  


  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */


  // console.log("Remaining Incorrect Guesses: " + incorrectGuesses)
  // console.log("Letters Guessed: " + lettersGuessed)
  // console.log("Word: " + theBlanks)
  // // console.log (typeof theBlanks)




  // // This line of code will print out whatever is inputted in by the user.
  // console.log("Letter guessed:", userInput);
  
}
 
 run();
  


//how do I get the code to keep running
