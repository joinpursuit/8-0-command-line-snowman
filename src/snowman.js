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
const word = getRandomWord();
//global variables
let guessedWord = [] // stores the guessed letters forming the secret word
let guessedLetter = '' //letter guessed to form the word
let WordLength = word.length + 3; // maximum number of chances to play the game
let alreadyGuessedLetters =[]; //stores letters already guessed
//let guessString = '';
//Helper functions
/**
 * populate()
 * alreadyGuessed()
 * playGame()
 *
 * ****** Helper functions relation with run() ****
 * run(){
 *    populate()
 *    playGame() {alreadyGuessed()}
 * }
 */
// //determines a winner or a looser
//       if (guessedWord.join('') === word ) {
//        console.log(`Good job! You won!!! The secret word is  ${word}`)
//       } else if (guessedWord.join('') !== word && WordLength === 0){
//         console.log(`Hard luck! You lost!!! The secret word is  ${word}`)
//       }
//determines a winner or a looser
function gameWonLost(guessedWord, word){
guessedWord.join('') === word ? console.log(`Good job! You won!!! The secret word is  ${word}`) : console.log(`Hard luck! You lost!!! The secret word is  ${word}`)
 }
  function populate(){
    for (let i = 0; i < word.length; i++) {
        guessedWord[i] = "_";
      }
    }
  //determins if letter guessed is listed in alreadyGuessedLetters array
  function alreadyGuessed(){
    if(alreadyGuessedLetters.includes(guessedLetter)){
      //if letter is already guessed, error msg is logged
        console.log('Already guessed: '+ guessedLetter);
    } else {
      //otherwise the guessed letter is listed in alreadyGuessedLetters array
      alreadyGuessedLetters.push(guessedLetter)
    }
 }
  //As long as guessedWord has an underscore you'll have a change to play the game
function playGame(){
    //the while loop executes lines of codes in it's code block until the game ends
    //while (WordLength > 0){
        //guessedWord.join(' ')
        while(guessedWord.includes('_') && WordLength > 0){
          guessedLetter = readline.question("Guess a letter: ");
          guessedLetter = guessedLetter.toLowerCase()
          alreadyGuessed() //executes when user input a letter already inputted
          //checks if guessed letter is an empty string
          if (guessedLetter === "") {
            //if no input is given the user is asked for an input
            console.log('Please enter a single letter');
            // checks if the input is something other than a letter
          } else if (
            guessedLetter.length !== 1 ||
            guessedLetter.match(/[0-9]/g)
          ) {
            console.log(
              "Please type a single letter character [numbers or symbols not allowed]"
            );
          }
          else {
            //searches for the user's guessed input by iterating through the letters of the
            // random word given, if a match is found, it assigns(replaces the underscore '_') it to the corresponding index of
            //the guessedWord array
          for (let j = 0; j < word.length; j++) {
              if(word.charAt(j) === guessedLetter) {
                guessedWord[j] = guessedLetter;
            }
            }
          }
          //if user's guess is incorrect, the chance of play is decremented by 1 after each input
          if(guessedLetter.length > 1 || guessedLetter.match(/[0-9]/g)){
          }
          else if(!word.includes(guessedLetter)){
              WordLength--
              }
          console.log(`The user typed: ${guessedLetter} \nRemaining Incorrect Guesses:   ${WordLength}\nLetters Guessed: ${alreadyGuessedLetters.sort()} \nWord: ${guessedWord}`
          );
        }
      }
function run() {
  //populates the guessedWord array with underscores, with the same length as the random word
  populate()
  //As long as the chance to play is greater than zero, game is played
  while (WordLength > 0 && word !== guessedWord.join('')) {
      //Invoking playGame function starts the game
      playGame()
      }
      gameWonLost(guessedWord, word)
}
run();
