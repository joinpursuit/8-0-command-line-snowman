const readline = require("readline-sync");
const dictionary = require("./dictionary");


function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

gameState = {
  playSnowman: true,
  word: 'apple', // getRandomWord(),
  correctGuesses: [],
  wrongGuesses: [],
  maxWrongGuesses: 6
}

function isLetterGuessCorrect(userGuess){
  return gameState.word.includes(userGuess) //getRandomWord().includes(userGuess)
}

// console.log(isLetterGuessCorrect('a'));

function addCorrectGuessToList(userGuess){
  gameState.correctGuesses.push(userGuess);
  return gameState.correctGuesses;
}

// console.log(addCorrectGuessToList('p'));
// console.log(addCorrectGuessToList('l'));

function addWrongGuessToList (userGuess){
  gameState.wrongGuesses.push(userGuess);
  return gameState.wrongGuesses;
}

// console.log(addWrongGuessToList('b'));
// console.log(addWrongGuessToList('q'));

function getBlankWord (){
  let blankWord = '';
  for (let i=0; i<gameState.word.length; i++){
    blankWord += '_ ';
  }
  console.log(blankWord, '\n');
}

function run() {
  while (gameState.playSnowman){
    let userGuess = readline.question('Do you want to play Snowman? (Y or n) \n').toLowerCase();
    if(userGuess === 'n' || userGuess === 'no'){
      console.log('Okay, bye...');
      gameState.playSnowman = false;
    } else {
      getBlankWord();
      while (gameState.maxWrongGuesses > 0){
        console.log('Number of guesses left: ' + gameState.maxWrongGuesses);
        userGuess = readline.question("Please guess a letter: ");
        if (gameState.word.includes(userGuess)){
          console.log('TRUE');
        } else {
          gameState.maxWrongGuesses--;
        }
      
      console.log("Guessed Letters: ", );
      }
    }
  }
  
  // if (wrongGuesses.length === 6){}

  
}

run();


/*
Understanding:
We get a random word
Display underscores that equals the same amount of letters in the random word.
Ask the user to guess a letter
If the guessed letter is included in the random word, replace the underscore(s) with the correct guessed letter
If not included in the word, none of the underscores change and the total amount of guesses is reduced by 1. 
A list of guessed letters should be displayed and keep track of letters guessed for the user
User guess should only receive 1 letter, any more than 1 letter should output an error, and ask for a valid guess
*/