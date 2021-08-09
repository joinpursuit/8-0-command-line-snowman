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


const { default: axios } = require("axios");
  

async function definition() {
  let define = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
  define.data.map((word) => {
    word.meanings.map((meaning) => {
      console.log(`HINT: ${meaning.definitions[0].definition}`)
    })
  })
}

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
let word = getRandomWord();
let guessLeft = 8;

async function run() {
  let snowman = {
      letter: '',
      currentSolvedWord: [],
      guessedWords: '',
      arrayGuessedWords: [],
  }
//to start the game
let choice = readline.keyInYN("\x1b[1;39m" + '👺 Hi! Would you like to play a game? 👺' + "\x1b[39m")
    if (choice) {
      console.log("\x1b[1;93m" + "\nWelcome! Let's start!" + "\x1b[39m")
      //function to add definition for hint. 
      await definition()
      //function here to show hiddenWord to user
      makeTheBlanks()
      //function here for user to play the game
      gamePlay()
      } else {
          console.log("\x1b[1;91m" + '👎 Oh well! I tried 👎' + "\x1b[39m")
            //function to quit game 
            quitTest()
      }
//restart function when user wins or loses
function restartGame() {
  leaveChoice = readline.keyInYN("\x1b[1;95m" + 'Would you like to play again?' + "\x1b[39m")
    if (leaveChoice) {
      word = getRandomWord()
      definition()
      console.log("\x1b[1;93m" + "\nWelcome back, Let's start!" + "\x1b[39m")
      guessLeft = 8;
      //recreate initial starting object
      snowman = {
        letter: '',
        currentSolvedWord: [],
        guessedWords: '',
        arrayGuessedWords: [],
    }
        //function here to show hiddenWord to user
        makeTheBlanks()
        //function for gamePlay
        gamePlay()
        
    } else {
      //print if user chooses not to play
      console.log("\x1b[1;91m" + "Too bad, come back soon!" + "\x1b[39m")
        //function to quit game
        quitTest()
    }
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
    //function for valid guess
    getValidLetterGuess()
      let arrayChosenWord = word.split(''); 
      let arrayHiddenWord = hiddenWord.split('');
        //add letter to hidden word if correct letter is given
        for (let i = 0; i < word.length; i++) {
          if (word[i] === snowman.letter) {
            arrayHiddenWord[i * 2] = arrayChosenWord[i];
            snowman.currentSolvedWord[i] = arrayChosenWord[i];
          }
        }
      //add a point to guessLeft if a correct guess is given
      for (let i = 0; i < word.length; i++) {
        if (word[i] === snowman.letter) {
          guessLeft += 1
            break;
          }
        }
          //subtract from guessLeft when wrong guess is given
          guessLeft -= 1;
          word = arrayChosenWord.join(''); 
          hiddenWord = arrayHiddenWord.join('');
         let solvedWord = snowman.currentSolvedWord.join('');
      //winning message when word is guessed
      if (solvedWord === word) {
          console.log("\x1b[1;92m" + "🎉 🎊 🥳 Congratulations! 🎉 🎊 🥳" + "\x1b[39m")
          //print chosenWord for user to see
          console.log('The word was: ' + "\x1b[1;36m" + `"${word}"` + "\x1b[39m")
          //function here to show ending message and stop if user wins
          restartGame() 
        }
          //print hidden word for user
          console.log("\x1b[1;94m" + 'WORD: ' + "\x1b[39m" + `${hiddenWord}`)
          //function here to show user the letters that are already guessed
          showGuessedWord()
        }
          //function here for user to know how many guesses left
          guessLeftCounter()
      }
//show the letters the user already guessed
function showGuessedWord() {
    if (snowman.arrayGuessedWords.length === 0) {
      snowman.arrayGuessedWords.push(snowman.letter)
    } else {
      snowman.arrayGuessedWords.push((`${snowman.letter}`))
    }
      snowman.guessedWords = snowman.arrayGuessedWords.join(', ')
      //prints guessed letters for user to see 
      console.log("\x1b[1;93m" + '\nGuessed Letters: ' + snowman.guessedWords + "\x1b[39m")
    }
//count how many guesses the user has left until loses
function guessLeftCounter() {
  console.log(`\nYou have ${guessLeft} guess(es) remaining`)
    // print losing message if user has no more guesses left
    if (guessLeft === 0) {
      console.log("\x1b[1;91m" + '\nGAME OVER, 😔 better luck next time!' + "\x1b[39m")
      //prints chosenWord for the losing user
      console.log('The word was: ' + "\x1b[1;36m" + `"${word}"` + "\x1b[39m")
        //function here to show ending message and stop if user loses
        restartGame()
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
  console.log("\x1b[1;94m" + 'WORD: ' + "\x1b[39m" + `${hiddenWord}`)
} 
//checks for a valid guess
function getValidLetterGuess() {
  //function here for user to know how many guesses left
  guessLeftCounter()
//same inputted letters and numbers are invalid 
function guessIsValid(userInput) {
  return (userInput.length === 1) && (userInput.toUpperCase() !== userInput.toLowerCase()) && (!(snowman.guessedWords.includes(userInput)))
}
  //needs to stop taking in the same letter && invalid input.
  snowman.letter = ''
    while (!snowman.letter) {
  const userInput = readline.question("\nGuess a letter: ");
      if (guessIsValid(userInput) && userInput !== userInput.toUpperCase()) {
        snowman.letter = userInput
      } else if (snowman.guessedWords.includes(userInput)) {
        console.log("\x1b[1;91m" + "You've guessed that!" + "\x1b[39m")
      } else {
        console.log("\x1b[1;91m" + "Please enter a valid letter" + "\x1b[39m")
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