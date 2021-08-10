// /*
//   `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
// */
// const readline = require("readline-sync");
// /*
//   The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
// */
// const dictionary = require("./dictionary");

// /*
//   This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
// */
// function getRandomWord() {
//   const index = Math.floor(Math.random() * dictionary.length);
//   return dictionary[index];
// }

// /*
//   This function will run your game. Everything you want to happen in your game should happen inside of here.

//   You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

//   Once you understand the code below, you may remove the comments if you like.
// */
// function run() {
  

//   // This line of code gets a random word. The `word` variable will be a string.
//   const word = getRandomWord();
//   /*
//     The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

//     The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

//     After a user hits the 'return' key, the rest of the code will run.
//   */
//  while () {
//     const userInput = readline.question("Guess a letter: ");
//     if (userInput === ) {
//       // This line of code will print out whatever is inputted in by the user.
//       console.log("THE USER INPUTTED:", userInput);
//     }
//  }
  
  
// }

// run();


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
/**
 * used the word chosen by the computer to create underscores string
 * used helper function to replace the underscores by letters
 * -check if the letter is in the hidden word
 * used helper function to check if someone wins
 * used helper function to check user inputs validity
 */
/**
 * 
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
 * 
 * @param {string} str1 - hidden word
 * @param {string} str2 - underscores string
 * @returns boolean- true if user wins or false
 */
function checkWinner(str1, str2) {
  str2 = str2.split(" ").join("");
  return str1===str2;
}

function userInputCheck(userInput){
    return typeof userInput === "string" && userInput.length === 1
           && (userInput >= "a" && userInput <= "z" );
  
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
  let nbrTries = 7;
  // keep track of the user's inputs
  let inputStr = "";
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  // console.log(word);
  // get correct number of underscores
  let wordInUnderScores = "_ ".repeat(word.length);
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  // show the player how many underscores
  console.log(wordInUnderScores+ "\n");
  while(startGame) {
      // print guessed letters
      console.log("Guessed letters: ", inputStr);
      // print remaining guesses 
      console.log(`You have ${nbrTries} remaining`);
      // read user input
      const userInput = readline.question("Please enter your guess: ").toLowerCase();
      // check if user input is valid
      if (userInputCheck(userInput)){
        // add input to inputStr
        inputStr += " " + userInput;
        // check if we have a string or boolean
        let checkIfBoolean = replaceUnderScores(word, wordInUnderScores, userInput);
        // check if false, decrement the number of tries
        if (!checkIfBoolean) {
          nbrTries--;
        }
        // change the value of the understring
        else {
          wordInUnderScores = checkIfBoolean;
          console.log(wordInUnderScores);
        }
      
      }
      else {
        console.log("Please enter a valid letter");
        continue;
      }
      if (checkWinner(word, wordInUnderScores) || !nbrTries) {
        console.log(checkWinner(word, wordInUnderScores) ? `You won! It took you: ${inputStr.split(" ").length-1}`:`You lose! The correct word is: ${word}`);
        startGame = false;
      }
  // This line of code will print out whatever is inputted in by the user.
  // console.log("THE USER INPUTTED:", userInput);
  }
  if (!startGame) {
    let continuePlaying = readline.question("Play again? (y / n): ").toLowerCase();
      if (continuePlaying !== "n" && continuePlaying !== "no") {
        run()
      }
  }
}
run();