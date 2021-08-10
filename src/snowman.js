/** 
||The Snowman Game

||Global Variables

let guessedWord {[]} // stores the guess letters forming the secret word
let guessedLetter {string} //letter guessed to form the word 
let WordLength {number}. // length of the word to be guessed
let alreadyGuessedLetters {[]} //stores letters already guessed

||The Game flow process

=>  Randomly gets a word to be guessed.
1)  Declare an empty array called guessedWord = [].
2)  Do a for loop on the random word called word in order to populate the empty array, 
    guessedWord {[]}, with '_' and having the same array size as guessedWordn.
3)  Declare a varaible called WordLength to keep track of the game progress.
    =>  Game starts:
    =>  while the given WordLength greater than zero.
        
        a)  Iterate the the given word and compare each letter with the user's guessedLetter
        b)  if they are the same and the same letter not found in alreadyGuessedLetters array,
            i) Assign the guessedLetter to the corresponding index in the guessedWord array
            ii) push a guessedLetter copy in alreadyGuessedLetters array.
            iii) if the same letter is found in alreadyGuessedLetters array, display an error msg
            iv) if guessedWord is the same as the randomly given word, the user is declared the winner
        c) Otherwise if guessedLetter is incorrect, decrement the WordLength by 1 
        b)  keep asking the user to guess a letter in the word until there is no chance to guess.

=> Edge Cases (invalid input decrease the chance by 1 after each play)
if user's input, guessedLetter is equal to ''/null/undefined, display message
if user's input, guessedLetter.length is not equal to 1, or a number, ask the user to type a single 
letter and that a number or symbol is not allowed

*/


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









function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
    After a user hits the 'return' key, the rest of the code will run.
  */
  const userInput = readline.question("Guess a letter: ");
  // This line of code will print out whatever is inputted in by the user.
  console.log("THE USER INPUTTED:", userInput);
}

run();