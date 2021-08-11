/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
   
//daughter
//01234567

//0 1 2 3 4 5 6 7 
//d_a_u_g_h_t_e_r
//0123456789TETTF

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
function gameStatus(divider, remainingGuesses, guessLetters, guessBox){
  

  console.log(divider)
  console.log("Lives Left: " + remainingGuesses)
  console.log("Letters Guessed: " + guessLetters )
  console.log("Word: " + guessBox)
}


function removeSpaces(guessBox){ 


  for(guess of guessBox){
  guessBox = guessBox.replace(" ","")
} 
return guessBox
}

function lowCase(userInput){

  return userInput.toLowerCase()

}

function letterChecker(userInput){
  if (userInput.toLowerCase() === 'a' ||
  userInput.toLowerCase() === 'b' ||
  userInput.toLowerCase() === 'c' ||
  userInput.toLowerCase() === 'd' ||
  userInput.toLowerCase() === 'e' ||
  userInput.toLowerCase() === 'f' ||
  userInput.toLowerCase() === 'g' ||
  userInput.toLowerCase() === 'h' ||
  userInput.toLowerCase() === 'i' ||
  userInput.toLowerCase() === 'j' ||
  userInput.toLowerCase() === 'k' ||
  userInput.toLowerCase() === 'l' ||
  userInput.toLowerCase() === 'm' ||
  userInput.toLowerCase() === 'n' ||
  userInput.toLowerCase() === 'o' ||
  userInput.toLowerCase() === 'p' ||
  userInput.toLowerCase() === 'q' ||
  userInput.toLowerCase() === 'r' ||
  userInput.toLowerCase() === 's' ||
  userInput.toLowerCase() === 't' ||
  userInput.toLowerCase() === 'u' ||
  userInput.toLowerCase() === 'v' ||
  userInput.toLowerCase() === 'w' ||
  userInput.toLowerCase() === 'x' ||
  userInput.toLowerCase() === 'y' || 
  userInput.toLowerCase() === 'z' ){
    return true

  }
}

function replaceBlanks(guessBox){
 
  guessBox = guessBox.split("")
  guessBox.splice((i * 2),1, letter)
  guessBox = guessBox.join('')
}

// This line of code gets a random word. The `word` variable will be a string.
/*
The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

After a user hits the 'return' key, the rest of the code will run.
*/
// create an array
// 
// put in "_" in each index of the array and the array should match the length of the word
// if user guesses incorrectly remainingGuesses -= 1
//
function run() {
  // random word to be guessed
  const word = getRandomWord();
  // Separates user inputs with a space for better visibility 
  let divider = " \n "
  // array used for infinite loop until game is won or lost 
  let array = [0]
  //number of chances left to guess
  let remainingGuesses = word.length + 1

  let guessBox = ""
  let guessLetters = ''
   // console.log(word)
  for (let letter of word){
    guessBox +=  "_ "
  }

  // This code represent the start screen of the game that appears in the terminal
  gameStatus(divider, remainingGuesses, guessLetters, guessBox)

 
  for (let i = 0; i < array.length; i++){ 
    // This line of code will print out whatever is inputted in by the user.
    const userInput = readline.question("Choose Wisely: ");

    for (let i = 0; i < word.length; i++){
      let letter = word[i]
      if (userInput.toLowerCase() === letter){

        guessBox = guessBox.split("")
        guessBox.splice((i * 2),1, letter)
        guessBox = guessBox.join('')
      }
      }
  
    gameStatus(divider, remainingGuesses, guessLetters, guessBox)   
 
    if(removeSpaces(guessBox) !== word){
      i = -1
    }

  } 
  console.log("You narrowly escaped this time but Frosty will be back"); 
}

run();
