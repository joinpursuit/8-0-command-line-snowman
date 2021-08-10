const readline = require("readline-sync");
const dictionary = require("./dictionary");

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

gameState = {
  playSnowman: true,
  word: 'apple', // getRandomWord(),
  guesses: [],
  maxWrongGuesses: 6
}

function displayBlankWord(){
  let blankWord = 'Word: ';
  for (let i=0; i<gameState.word.length; i++){
    blankWord += '_';
    if (i !== gameState.word.length-1){
      blankWord += ' ';
    } 
  }
  console.log(blankWord, '\n');
}

function addGuessToList(userGuess){
  gameState.guesses.push(userGuess);
  return gameState.guesses;
}


function run() {
  console.log('SNOWMAN GAME\n') // Title of Game
  
  //const word = getRandomWord(); // Picks out a random word for game
  
  displayBlankWord(); // Displays word in blank/underscore form

  while (gameState.maxWrongGuesses > 0){
    console.log('Number of guesses remaining: ' + gameState.maxWrongGuesses); // Prints out the number of guesses
    
    let userGuess = readline.question("Please guess a letter: "); // Lets user type a letter
    
    if (isNaN(Number(userGuess)) && userGuess.length === 1){ // Checks to see if userGuess is a letter and only 1 letter
      addGuessToList(userGuess); // Uses helper function to
    }
    
    let isGivenLetterInWord = false;
    
    if (!isNaN(Number(userGuess)) || userGuess.length > 1){
      console.log('ERROR: Please enter a valid letter');
      gameState.maxWrongGuesses++;
    } 

    let word = '\nWord: ';
    for (let i=0; i<gameState.word.length; i++){
      if (gameState.word[i] === userGuess) {
        word += userGuess;
        isGivenLetterInWord = true;
      } else {
        word += '_';
      }
      
      if (i !== gameState.word.length-1){
        word += ' ';
      }
    }

    console.log(word);
    
    if (isGivenLetterInWord === false){
      gameState.maxWrongGuesses--;
    }
    
    console.log("Guessed Letters: " + gameState.guesses);
    
  }

  if (gameState.maxWrongGuesses === 0){
    console.log('\nGAME OVER');
  }
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