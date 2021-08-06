
const readline = require("readline-sync");

const dictionary = require("./dictionary");

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

/**
 * 
 * @param {string} generatedNumber - string chosen by the computer
 * @param {*} underscoreStr - underscores string
 * @param {*} letter - letter from user input
 * @returns either the modified underscores string or false if letter is not included in the hidden word.
 */

 function replaceUnderscores(generatedNumber,underscoreStr,letter) {
  if (generatedNumber.includes(letter)) {
    underscoreStr = underscoreStr.split(" ");
    for (let i = 0; i < generatedNumber.length; i++) {
      if (generatedNumber[i] === letter) {
         underscoreStr.splice(i, 1, letter);
      }
    }
    return underscoreStr.join(" ");
  }
    else return false;
}

/**
 * 
 * @param {string} hiddenWord - hidden word
 * @param {string} underscoreStr - underscores string
 * @returns boolean- true if user wins or false
 */
function checkWinner(hiddenWord, underscoreStr) {
  underscoreStr = underscoreStr.split(" ").join("");
  return hiddenWord === underscoreStr;
}


/**
 * @param {string} user input - word that gets inputted by player
 * @returns typeOf - checks several conditions
 */
function guessCheck(userInput){
    return typeof userInput === "string" && userInput.length === 1
           && (userInput >= "a" && userInput <= "z" );  
}

function run() {

  console.log(` ________________________________________

      ☃️  PURSUIT SNOW MAN GAME  ☃️

 ----------------------------------------
 ❄️       ❄️      _==_     ❄️     ❄️   ❄️
     ❄️          (",) ❄️           ❄️
  ❄️      ❄️      /. \\        ❄️        ❄️  
    ❄️      ____( :  )___❄️        ❄️  
-----------------------------------------`)

  let startGame = true;
  let numberOfTries = 7;
  let inputStr = "";   // keeps track of the user's inputs
  const word = getRandomWord(); // This line of code gets a random word.
  // console.log(word); // ** DISPLAYS HIDDEN WORD WHEN TURNED ON **
  let wordInUnderScores = "_ ".repeat(word.length); // displays an underscore in place of each letter from our hidden word
  console.log(wordInUnderScores+ "\n"); // shows the player how many underscores
    while(startGame) {
        console.log("Guessed letters: ", inputStr); // print guessed letters
        console.log(`You have ${numberOfTries} guesses remaining`); // print remaining guesses 
        const userInput = readline.question(`Enter your guess: `); 
        inputStr += " " + userInput; // adds user input to inputStr
        if (guessCheck(userInput)){
        let checkIfBoolean = replaceUnderscores(word, wordInUnderScores, userInput);  // checks for a true or false value
        if (!checkIfBoolean) {
          numberOfTries--;  //decrements the amount of tries every time a guess is made
        } else {
          wordInUnderScores = checkIfBoolean;
          console.log(wordInUnderScores);
        }
      
        } else {
          console.log("Please enter a valid letter");
          continue;
        }
        if (checkWinner(word, wordInUnderScores) || !numberOfTries) {
        console.log(checkWinner(word, wordInUnderScores) ? "You won!" : `You lost! the correct guess was: ${word}`);
        startGame = false;
      }
  }
        if (!startGame){
        let continuePlaying = readline.question("Play again? (y / n): ").toLowerCase();
        if(continuePlaying !== "n" && continuePlaying !== "no") {
     run()
   }
  }
}
run();