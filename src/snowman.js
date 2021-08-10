const readline = require("readline-sync");

const dictionary = require("./dictionary");

let word = getRandomWord();
// This line of code gets a random word. The `word` variable will be a string.

let win = "You lived! Victory is yours! 👑 ";
//winning message for the winning player
  
let lose = "Game Over. You're DEAD! 💀";
//losing message if player loses
  
let invalid = 'Invalid Entry!';
// an error message for when an invalid character entered
  
let repeat = 'Sorry, you already guessed that.';
// an error message letter repetition//

let wrong = 'Sorry, Wrong answer.';
//an error message that appears when the player inputs an incorrect answer//

let right = 'Great Job!';
//a message that appears when the player inputs a correct answer//

  function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
const intro = readline.question(`Do you want to build a snow man?\n\n 'Y', 'N': `)
//This is a intro to the game, Something to jazz it up a bit
if (intro === 'y') {
  console.log(`\nYou fool! Killer snowmen are on the loose. Every wrong letter is a step closer to death. Play at your own risk!\n`);
  run()
  //We added a run command because we noticed it would not continue
} else {
  console.log(`\nGood choice! Killer snowmen are on the loose. Every wrong letter is a step closer to death. Good Luck!\n`);
  //The response is different because we feel passionate about this answer. 
  run ()
  }
  function run(snowman) {
 
    const underScore = []
    //array that accounts for underscores
    
    const guesses = []
    //array that accounts for guesses
    
    let validGuess = /^[a-z]+$/;
    // Ensures selects lowercase letters only
    
    for(let i= 0; i < word.length; i++){
      underScore[i] = '_' 
      // underscore will represent hidden letters in their entirety. 
    } 