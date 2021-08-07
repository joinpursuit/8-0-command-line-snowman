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
let word = getRandomWord();

function run() {

  let arrayChosenWord = [];
  let letter = '';
  let hiddenWord = '';
  let arrayHiddenWord = [];
  let guessedWords = '';
  let arrayGuessedWords = [];
  let solvedWord = '';
  let arrayCurrentSolvedWord = [];
      
let guessLeft = 8;
//to start the game
let choice = readline.keyInYN('👺 Hi! Would you like to play a game? 👺')
    if(choice) {
      console.log("\nWelcome! Let's start!")
      //function here to show hiddenWord to user
      makeTheBlanks()
      //function here for user to play the game
      gamePlay()
      } else {
        console.log('👎 Oh well! I tried 👎')
          quitTest()
      }
//quit the test after the user is done
function quitTest() {
        console.log("Goodbye! 👋")
        //stop program from running
          process.exit()
      }

//replace the hidden word with letters if guessed correctly
function gamePlay() {
  //make the function run until no guesses left
    while (guessLeft !== 0) {
  getValidLetterGuess()
    arrayChosenWord = word.split(''); 
    arrayHiddenWord = hiddenWord.split('');
    //add letter to hidden word if correct letter is given
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          arrayHiddenWord[i * 2] = arrayChosenWord[i];
          arrayCurrentSolvedWord[i] = arrayChosenWord[i];
            }
          }
          //negate the subtraction from receiving a guess by adding a point to guessLeft if a correct guess is given
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          guessLeft += 1
            break;
          }
        }
          //subtract from guessLeft when wrong guess is given
          guessLeft -= 1;
          word = arrayChosenWord.join(''); 
          hiddenWord = arrayHiddenWord.join('');
          solvedWord = arrayCurrentSolvedWord.join('');
      //winning message when word is guessed
      if (solvedWord === word) {
          console.log("🎉 🎊 🥳 Congratulations! 🎉 🎊 🥳")
          //print chosenWord for user to see
          console.log(`The word was "${word}"`)
          //function here to show ending message and stop if user wins
          quitTest() 
        }
          //print hidden word for user
          console.log(`WORD: ${hiddenWord}`)
          //function here to show user the letters that are already guessed
          showGuessedWord()
        }
        //function here for user to know how many guesses left
        guessLeftCounter()
      }
//show the letters the user already guessed
function showGuessedWord() {
    if (arrayGuessedWords.length === 0) {
      arrayGuessedWords.push(letter)
    } else {
      arrayGuessedWords.push((`, ${letter}`))
    }
    guessedWords = arrayGuessedWords.join('')
      //prints guessed letters for user to see 
      console.log(`\nGuessed Letters: ${guessedWords}`)
    }
//count how many guesses the user has left until loses
function guessLeftCounter() {
  console.log(`\nYou have ${guessLeft} guess(es) remaining`)
    // print losing message if user has no more guesses left
    if (guessLeft === 0) {
      console.log('\nGAME OVER, 😔 better luck next time!')
      //prints chosenWord for the losing user
      console.log(`The word was "${word}"`)
        //function here to show ending message and stop if user loses
        quitTest()
      }
    }
//turns the dictionary word into a hidden word
function makeTheBlanks() {
  hiddenWord = ''
    // iterate through chosenWord to determine the hiddenWord
    for (let i = 0; i < word.length; i++) {
      if (i === 0) {
        hiddenWord += '_'
      } else {
     hiddenWord += ' _'
    }
  }
  //prints the hiddenWord and the chosenWord(hint)
  console.log(`WORD: ${hiddenWord} (${word})`)
} 
//checks for a valid guess
function getValidLetterGuess() {
  //function here for user to know how many guesses left
  guessLeftCounter()
//same inputted letters and numbers are invalid 
function guessIsValid(letterGiven) {
  return (letterGiven.length === 1) && (letterGiven.toUpperCase() !== letterGiven.toLowerCase()) && (!(guessedWords.includes(letterGiven)))
}
  letter = ""
    while (!letter) {
  const userInput = readline.question("\nGuess a letter: ");
      if (guessIsValid(userInput)) {
        letter = userInput
      } else {
        console.log("Please enter a valid letter")
    }
  }
}

  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  const userInput = readline.question("Guess a letter: ");
  
  // This line of code will print out whatever is inputted in by the user:
  console.log("THE USER INPUTTED:", userInput);
  
}

  run();