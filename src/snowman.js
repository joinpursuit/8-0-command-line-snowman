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

//Helper functions 
/**
 * populate()
 * alreadyGuessed()
 * playGame()
 * gameWonLost(guessedWord, word)
 * 
 * ****** Helper functions relation with run() ****
 * run(){
 * while(){
 *    populate()
 *    playGame() {
 *      alreadyGuessed()
 *    }
 *   }
 *    gameWonLost(guessedWord, word)
 * }
 */

/*
`readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
console.log(process.argv)
function undefinedCheck(){
  if(WordLength === null){
    log(`please type a game chance`)
  }
}


const readline = require("readline-sync");
/*
The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

const chalk = require("chalk");

const log = console.log;

const center = require("center-align");

/*
This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

// This line of code gets a random word. The `word` variable will be a string.
const word = getRandomWord();

//global variables
let guessedWord = []; // stores the guessed letters forming the secret word
let guessedLetter = ""; //letter guessed to form the word
//let WordLength = word.length +  3;
let WordLength = Number(process.argv[2]) || word.length + 3 // maximum number of chances to play the game
let alreadyGuessedLetters = []; //stores letters already guessed
//let invalidInput = "\n\n\n I don't understand your input. \n\n\n\n     Click 'OK' and try again.\n\n\n ";

let introMessage =
  chalk.magentaBright.bold(`\n\n \t\t\t*** The Snowman game *** \n\n`) +
  chalk.italic.blackBright(
    `This game allows you to guess letters of a secrete word that will be revealed \n`
  ) +
  chalk.italic.blackBright(
    `to you at the end of the game. You'll be given a maximum number of chances to \n`
  ) +
  chalk.italic.blackBright(
    `play this game. When you exhaust your chance without forming the word, then you lost \n`
  ) +
  chalk.italic.blackBright(
    `otherwise you won. Your chance of play is premise on two conditions: an invalid input\n`
  ) +
  chalk.italic.blackBright(
    `and an incorrect guess. In either case, your chance is decrement by 1 . Your chance \n`
  ) +
  chalk.italic.blackBright(
    `is not affected should you input a correct letter.`
  ) +
  chalk.bgRed(`\n\n\t\t Note: Your guess must be a single letter only.\n\n`);

  let winCount = 0;
  let looseCount = 0;
  let sessionWon = winCount;
  let sessionLost = looseCount;

undefinedCheck()
function screenMessage() {
  
  if (guessedWord.length === 0) {
    log(introMessage);
  }
}

//determines a winner or a looser
function gameWonLost(guessedWord, word) {
  if (guessedWord.join("") === word) {
    winCount++;

    log(chalk.green(`Good job! You won!!! The secret word is  ${word}`));
  } else {
    log(chalk.redBright(`Hard luck! You lost!!! The secret word is ${word}`));
    looseCount++;
  }
}


function populate() {
  for (let i = 0; i < word.length; i++) {
    guessedWord[i] = "_";
  }
  
}

//determins if letter guessed is listed in alreadyGuessedLetters array
function alreadyGuessed() {
  if (alreadyGuessedLetters.includes(guessedLetter)) {
    //if letter is already guessed, error msg is logged
    log("Already guessed: " + guessedLetter);
  } else {
    //otherwise the guessed letter is listed in alreadyGuessedLetters array
    alreadyGuessedLetters.push(guessedLetter);
  }
}



//As long as guessedWord has an underscore you'll have a change to play the game
function playGame() {

  //the while loop executes lines of codes in it's code block until the game ends

  while (guessedWord.includes("_") && WordLength > 0) {
    guessedLetter = readline.question(chalk.green("Guess a letter: "));
    guessedLetter = guessedLetter.toLowerCase();
    alreadyGuessed(); //executes when user input a letter already inputted

    //checks if guessed letter is an empty string
    if (guessedLetter === "") {
      //if no input is given the user is asked for an input
      log("Please enter a single letter");
      // checks if the input is something other than a letter
    } else if (guessedLetter.length !== 1 || guessedLetter.match(/[0-9]/g)) {
      log(
        "Please type a single letter character [numbers or symbols not allowed]"
      );
    } else {
      //searches for the user's guessed input by iterating through the letters of the
      // random word given, if a match is found, it assigns(replaces the underscore '_') it to the corresponding index of
      //the guessedWord array
      for (let j = 0; j < word.length; j++) {
        if (word.charAt(j) === guessedLetter) {
          guessedWord[j] = guessedLetter;
        }
      }
    }
    //if user's guess is incorrect, the chance of play is decremented by 1 after each input
    if (guessedLetter.length > 1 || guessedLetter.match(/[0-9]/g)) {
    } else if (!word.includes(guessedLetter)) {
      WordLength--;
    }
    //Located in the while loop to keep showing to the user
    log(
      center(
        chalk.grey(
          "*****************************************************" +
            `\n\tThe user typed: ${guessedLetter} \n
          
        Remaining Incorrect Guesses:   ${WordLength}\n
          
        Letters Guessed: ${alreadyGuessedLetters.sort()} \n
          
        Word: ${guessedWord.join(" ")}\n` +
            "\n*****************************************************"
        )
      )
    );
    log(`Won : ${sessionWon} \t\t Lost: ${sessionLost}`);
  }
}
// prints an introductory message 
screenMessage();

 
function run() {
 
  //populates the guessedWord array with underscores, with the same length as the random word
  populate();

  //As long as the chance to play is greater than zero, game is played
  while (WordLength > 0 && word !== guessedWord.join("")) {
    //Invoking playGame function starts the game
    playGame();
  }
  gameWonLost(guessedWord, word);
  //wantToPlay()
}

run();
