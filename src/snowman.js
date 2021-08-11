const readline = require("readline-sync");

const dictionary = require("./dictionary");


gameState = {
  word: getRandomWord(),
  blankWordArr: [],
  guesses: [],
  maxWrongGuesses: 6
}

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

function displayBlankWord (word){
  for (let i=0; i<gameState.word.length; i++){
    gameState.blankWordArr.push('_');
  }
  return gameState.blankWordArr;
}

function addLettersToBlankWord(blankWordArr, word, userGuess){
  for (let i=0; i<gameState.word.length; i++){
    if (gameState.word[i] === userGuess){
      gameState.blankWordArr.splice(i, 1, userGuess);
    }
  }
  return gameState.blankWordArr.join(' ');
}

function addGuessToList(userGuess){
  gameState.guesses.push(userGuess);
  return gameState.guesses;
}

function run() {
  console.log('SNOWMAN GAME\n') // Title of Game
  const word = gameState.word;
  let blankWord = displayBlankWord(word).join(' ');
  console.log('Word: ' + blankWord + '\n');
 
  
  
  while (gameState.maxWrongGuesses > 0){
    if (!gameState.blankWordArr.includes('_')){
    console.log('!Winner Winner Chicken Dinner!')
    break;
    }

    console.log('Number of guesses remaining: ' + gameState.maxWrongGuesses);
    const userGuess = readline.question("Please guess a letter: ").toLowerCase();
    

    if (!isNaN(Number(userGuess)) || userGuess.length > 1){ // Checks if userGuess is a number or more than 1 letter
        // console.log('\nWord: ' + blankWord);
        console.log('\nERROR: Please enter a valid letter'); // Outputs the following error message
        gameState.maxWrongGuesses++; // Makes sure the user does not lose a guess when inputting a invalid letter/number
      } else {
        addGuessToList(userGuess); // Uses helper function to keep track and store letters that were guessed 
      } 

    if (word.includes(userGuess)){
      let wordArr = blankWord.split(" ");
      blankWord = addLettersToBlankWord(wordArr, word, userGuess);
      console.log('\nWord: ' + blankWord);
      console.log('\nGuessed letters: ' + gameState.guesses);
    } else {
      console.log('\nWord: ' + blankWord);
      console.log('\nGuessed letters: ' + gameState.guesses);
      gameState.maxWrongGuesses--;
    } 

  }
  if (gameState.maxWrongGuesses === 0){ // If maxwrongguesses is equal to 0, then it's gameover
    console.log('\n!GAME OVER! The word was: ' + gameState.word);
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