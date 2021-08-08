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
  maxWrongGuesses: 0
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



function run() {
  let userGuess = readline.question('Do you want to play Snowman? (Y or n) ').toLowerCase();
  if(userGuess === 'n' || userGuess === 'no'){
    console.log('Okay, bye...');
    gameState.playSnowman = false;
  } else {
    userGuess = readline.question("Guess a letter: ");
    console.log("THE USER INPUTTED:", userGuess);
  }
  
  // if (wrongGuesses.length === 6){}

  
}

run();


/*
Planning:

*/