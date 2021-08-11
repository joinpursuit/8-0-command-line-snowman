
const readline = require("readline-sync");

const dictionary = require("./dictionary");

//HELPER FUNCTIONS

//Generates a random word.
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
/**
 * @param {string} hiddenWord - hidden word
 * @param {string} underscoreStr - underscores string
 * @returns {boolean} true if user wins or false
 */

function checkWinner(hiddenWord, underscoreStr) {
  underscoreStr = underscoreStr.split(" ").join("");
  return hiddenWord === underscoreStr;
}
/**
 * @param {string} user input - word that gets inputted by player
 * @returns {typeOf} - checks several conditions
 */

function guessCheck(userInput){
    return typeof userInput === "string" && userInput.length === 1
           && (userInput >= "a" && userInput <= "z" );  
}
/**
 * @param {string} generatedWord - a random word chosen by the computer
 * @param {string} underscoreStr - underscores string
 * @param {string} letter - letter from user input
 * @returns {boolean}
 */

function replaceUnderscores(generatedWord,underscoreStr,letter) {
if (generatedWord.includes(letter)) {
underscoreStr = underscoreStr.split(" ");
for (let i = 0; i < generatedWord.length; i++) {
if (generatedWord[i] === letter) {
underscoreStr.splice(i, 1, letter);
}
}
return underscoreStr.join(" ");
}
else return false;
}

//*** Snowman game ***

function run() {

  console.log(`----------------------------------------
 ❄️       ❄️      _==_     ❄️     ❄️     ❄️
     ❄️          (",) ❄️            ❄️ 
  ❄️      ❄️      /. \\        ❄️         ❄️  
     ❄️     ____( :  )___ ❄️         ❄️  
-----------------------------------------
    ☃️   RONNIE'S SNOW MAN GAME  ☃️`)

let startGame = true;
let numberOfTries = 8;
let inputStr = "";   
const word = getRandomWord(); 
let wordInUnderScores = "_ ".repeat(word.length);
console.log(wordInUnderScores+ "\n"); 


while(startGame) {
console.log("Guessed letters: ", inputStr); 
console.log(`You have ${numberOfTries} tries remaining`); 
const userInput = readline.question(`Enter your guess: `); 
inputStr += " " + userInput;
if (guessCheck(userInput)){
let letterCheck = replaceUnderscores(word, wordInUnderScores, userInput);  
if (!letterCheck) {
numberOfTries--;  
} else {
  wordInUnderScores = letterCheck;
  console.log(wordInUnderScores);
  }      
} else {
  console.log("\nNumbers & symbols are not allowed!\n");
  continue;
}
  if (checkWinner(word, wordInUnderScores) || !numberOfTries) {
  console.log(checkWinner(word, wordInUnderScores) ? "You won! 🏆" : `You lost! the correct guess was: ${word}`);
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