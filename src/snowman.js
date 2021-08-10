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
// an error message letter repetition

let wrong = 'Sorry, Wrong answer.';
//an error message that appears when the player inputs an incorrect answer//

let right = 'Great Job!';
//a message that appears when the player inputs a correct answer//