/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");
// get the function from the file
const imageSnowMan = require("./image");
// invoked the function to get the image string
const imageStr=imageSnowMan();
/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
/**
 * used the word chosen by the computer to create underscores string
 * used helper function to replace the underscores by letters
 * -check if the letter is in the hidden word
 * used helper function to check if player won
 * used helper function to check player inputs validity
 */
/**
 * Helper function to replace the underscores by corresponding letters
 * @param {string} computerWord - string chosen by the computer
 * @param {*} underStr - underscores string
 * @param {*} letter - letter from user input
 * @returns either the modified underscores string or false if letter is not included in the hidden word.
 */
 function replaceUnderScores(computerWord,underStr,letter) {
  if (computerWord.includes(letter)) {
    underStr = underStr.split(" ");
    for (let i=0; i<computerWord.length; i++) {
      if (computerWord[i]===letter) {
         underStr.splice(i, 1, letter);
      }
    }
    return underStr.join(" ");
  }
  else return false;

}
/**
 * Helper function to check if the player won.
 * @param {string} str1 - hidden word
 * @param {string} str2 - underscores string
 * @returns boolean- true if user wins or false
 */
function checkWinner(str1, str2) {
  str2 = str2.split(" ").join("");
  return str1===str2;
}
/**
 * Helper function to check if the player's input is valid
 * @param {string} userInput - a letter entered by the player
 * @returns boolean - true if it's a letter or false otherwise
 */
function userInputCheck(userInput){
    return typeof userInput === "string" && userInput.length === 1
           && (userInput >= "a" && userInput <= "z" );
  
}
/**
 * helper function to avoid repeated letter
 * @param {string} str - string that keep track of all inputs from the player
 * @param {string} letter - letter inputted by the player
 * @returns boolean
 */
function repeatedLetter(str, letter) {
  if (str.includes(letter)) {
    return `You have already tried the letter: ${letter}.\nPlease try another one!`;
  }
  return false;
}



/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function run() {
  
  // variable boolean to start the game
  let startGame = true;
  // number of allowed tries
  let nbrOfTries = 7;
  // keep track of the user's inputs
  let allPlayerInputs = "";
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  //console.log(word);
  // print snow man image
  console.log(imageStr + "\n\n\n");
  // get correct number of underscores
  let wordInUnderScores = "_ ".repeat(word.length);
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  // show the player how many underscores
  console.log(wordInUnderScores+ "\n");
  // logic that keeps the game running
  while(startGame) {
      // print guessed letters
      console.log("Guessed letters: ", allPlayerInputs);
      // print remaining guesses 
      console.log(`You have ${nbrOfTries} remaining`);
      // read user input
      const userInput = readline.question("Please enter your guess: ").toLowerCase();
      // check if player's input is valid
      if (userInputCheck(userInput)){
        // if the player have already tried the same letter, show a message saying so
        if (repeatedLetter(allPlayerInputs, userInput)) {
          console.log(repeatedLetter(allPlayerInputs, userInput));
          // go back to the while loop
          continue;
        }
        // otherwise add the new letter to the string
        else allPlayerInputs += " " + userInput;
        // check if we have a string or boolean
        let checkIfBoolean = replaceUnderScores(word, wordInUnderScores, userInput);
        // check if false, decrement the number of tries
        if (!checkIfBoolean) {
          nbrOfTries--;
        }
        // otherwise, change the value of the understring
        else {
          wordInUnderScores = checkIfBoolean;
          console.log(wordInUnderScores);
        }
      }
      // if the player's input is invalid
      else {
        // show the player this message
        console.log("Please enter a valid letter");
        // go to back to the while loop
        continue;
      }
      // check if the player won or if the number of tries is 0
      if (checkWinner(word, wordInUnderScores) || !nbrOfTries) {
        // show the player corresponding message
        console.log(checkWinner(word, wordInUnderScores) ? `You won! It took you ${allPlayerInputs.split(" ").length-1} guesses.` : `You lost! The correct guess was: ${word}`);
        // put startGame to false to stop the game
        startGame = false;
      }
  
  }
  // logic to replay the game
  if (!startGame) {
    let keepPlaying = readline.question("Do you want to keep playing?(Y or n): ").toLowerCase();
    if (keepPlaying !== "n" && keepPlaying !== "no") {
      run();
    }
  }
}
run();
