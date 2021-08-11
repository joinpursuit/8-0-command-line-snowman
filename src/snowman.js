const readline = require("readline-sync");

const dictionary = require("./dictionary");


gameState = {
  playSnowman: true,
  word: getRandomWord(),
  blankWordArr: [],
  guesses: [],
  maxWrongGuesses: 6
}

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

function displayBlankWord (word){ // Helper function that push underscores to blankWordArr in gameState with same length of the word
  for (let i=0; i<gameState.word.length; i++){
    gameState.blankWordArr.push('_');
  }
  return gameState.blankWordArr;
}

function addLettersToBlankWord(blankWordArr, word, userGuess){ // Add letters to blankWordArr if userGuess is equal to any letters in word
  for (let i=0; i<gameState.word.length; i++){
    if (gameState.word[i] === userGuess){
      gameState.blankWordArr.splice(i, 1, userGuess); // Starts at the index that equals userGuess, deletes one element(underscore), then replaces it with userGuess letter
    }
  }
  return gameState.blankWordArr.join(' '); // concatenated all the elements with spacing
}

function addGuessToList(userGuess){ // Pushes userGuess to guess array in gameState and returns it
  gameState.guesses.push(userGuess);
  return gameState.guesses;
}

function run() {
  while (gameState.playSnowman){ // As long as playSnowman in gameState is true, run the following 
    let userAnswer = readline.question('\nDo you want to play Snowman? (Y or n)\n').toLowerCase(); // Asks user if they would like to play Snowman
    if (userAnswer === 'n' || userAnswer === 'no'){
      console.log('Okay, bye...'); // If they don't want to play, bummer
      gameState.playSnowman = false; // Changes to false and ends the code
    } else { // If they they do want to play, yippie
      console.log('\nSNOWMAN GAME\n') // Title of Game
      const word = gameState.word; // Declare variable for the word from gameState
      let blankWord = displayBlankWord(word).join(' ');  // Declare variable for the called function which returns underscores with spaces in between them
      console.log('Word: ' + blankWord + '\n'); // Prints out the underscores 
    
      while (gameState.maxWrongGuesses > 0){ 
        if (!gameState.blankWordArr.includes('_')){ // Checks to see if any underscores is NOT in the array
        console.log('\n!Winner Winner Cold Chicken Dinner!\n'); // If so, print out message
        gameState.playSnowman = false; // Changes the value to false
        break; // Prevents the game from asking for more letters
        }

        console.log('Number of guesses remaining: ' + gameState.maxWrongGuesses); // Prints out the number of guesses
        const userGuess = readline.question("Please guess a letter: ").toLowerCase(); // Lets user type a letter which is then converted to lowercase

        if (!isNaN(Number(userGuess)) || userGuess.length > 1){ // Checks if userGuess is a number or more than 1 letter
          console.log('\nERROR: Please enter a valid letter'); // Outputs the error message
          gameState.maxWrongGuesses++; // Makes sure the user does not lose a guess when inputting a invalid letter/number
        } else {
          addGuessToList(userGuess); // Uses helper function to keep track and store letters that were guessed 
        } 

        if (word.includes(userGuess)){ // Checks if userGuess is within the word
          let wordArr = blankWord.split(" "); // Declares a variable to split blankWord into elements in an array
          blankWord = addLettersToBlankWord(wordArr, word, userGuess); // Replaces underscores with letters that was guessed right
          console.log('\nWord: ' + blankWord);
          console.log('\nGuessed letters: ' + gameState.guesses);
        } else { // If UserGuess is not with the word;
          console.log('\nWord: ' + blankWord);
          console.log('\nGuessed letters: ' + gameState.guesses);
          gameState.maxWrongGuesses--; // Decrements # of guesses by 1
        } 
      }
      if (gameState.maxWrongGuesses === 0){ // If maxwrongguesses is equal to 0, then it's gameover
        console.log('\n!GAME OVER! The word was: ' + gameState.word);
        gameState.playSnowman = false; // Changes the value to false and ends the code
      }
    }
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