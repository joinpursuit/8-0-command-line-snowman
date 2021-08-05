/*
  readline-sync is a library that allows you to access user input from the command line. The library is assigned to the variable readline. It is used in the run() function below.
*/
const readline = require("readline-sync");
/*
  The dictionary variable will have an array of words that can be used for your game. It is used in the getRandomWord() function.
*/
const dictionary = require("./dictionary");
//.Length for covering the whole word.
/*
  This function returns a random word from the list in src/dictionary.js. You do not need to update or edit this function. Instead, you only need to call it from the run() function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.
  You should still define other, smaller functions outside of the run() function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the run() function.
  Once you understand the code below, you may remove the comments if you like.
*/
const word = getRandomWord();
// This line of code gets a random word. The word variable will be a string.
function addcorrectGuessToList(word){
  let correctGuesses = [];
  correctGuesses.push(word)
  return correctGuesses
}
// Keeps it in memory according to mike
let correctGuesses = []
// array calls everything??
function run(snowman) {
  const userInput = readline.question("Guess a letter: ");
  // Tells them to guess a letter
  let wrongGuesses = 10;
  //number of guesses
  let win = "Victory is yours!"
  //winning message
  let lose = "Game Over"
  //losing message
  let invalid = 'Invalid Entry'
  // invalid character entered
  let repeat = 'Sorry, you already guessed that'
  // letter repetition
  let hidden = '_'
  // adds underscore to blank space?
  let validGuess = /^[A-Za-z]+$/;
  // Ensures selects letters only
  if (userInput.match(validGuess)){
    return true
  }
  else {
    console.log(invalid)
  }

  
  word = word.toUpperCase();
  if (!correct){
  }
  //Assure input matches valid characters
  /** 
   * Mike Video Notes
   * What Data are we acessing? 
   * Double letters, 
   * list of correct guesses (We may have this writing just in case)
   * Add max number of wrong guesses im thinking maybe if guesses <= 10 then it goes until complete
   * 
   * We need total number of incorrect guesses to be a global variable so: 
      let totalWrongGuesses = 0; 
   * 
   * Mikes helper Functions
   * Make a helper function that returns dictonary like select it so example:
   * how to keep previous guesses in memory 
      fuction addisGuessCorrect(guess)
      let correctGuess = []
      correctGuess.push(guess)
      return (correct)
      we would be pulling from get random word which I gave the paramitor word so correct.push   (words)
   *  Need a different word rach game 
      function isGuessCorrect(guess){
        return secretWord.includes(guess)
      }
   * How to keep in memory
      function addCorrectGuessToList(guess)
      let correctGuess =  [];
      correctGuess.push(guess)
      return correct Guess
      ? in place of _ for blank space
      Alternate Question before game: Do You want to build a snow man?
      if yes = "Warning, man eating snow man ahead. If you build a snow man you will die"
      else No = "Smart choice. Warning, man eating snowman ahead. If you build a snow man you will die. Good Luck!"
   * If else statements
   *  - 'If Guess !== Incorrect keep going
   *     else return number of chances until zero' (This keeps score)
   *    I think it can be coded like: 
        if(!== incorect && Answer <=10)
        keep the same else 
        {count down from 10 -1 if wrong}
   *  - If 10 guesses stays the same
   *     else count -1 
   *    If guesses 0 returns "You lose"
   *    If guesses correct shows correct
   *    If guesses all correct "Congrats you won"
   * it should account for multiple letters
   * Should account for capitals and lower cases. 
   *  ReGex SnowMan.ValidGuess = /[a-zA-Z]; 
   * Return Error message if number/not letter entered. 
   * Add in underscore for blank spaces that match length. 
   * Something that tells them what they already guessed. 
   * If guessing same letter return error.
   * If same letter is guessed count stays the same. 
   * If guess wrong letter twice doesn't take away returns error. 
   * 
   * need .toUpperCase
   * .split([,]) - to break up letters
   * Loop to start and end the game keep doing it until it ends number
   * At the end of the game it should restart file. 
   */
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable userInput.
    After a user hits the 'return' key, the rest of the code will run.
  */
  // This line of code will print out whatever is inputted in by the user.
  console.log("THE USER INPUTTED:", userInput);
}
run();