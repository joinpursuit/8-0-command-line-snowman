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

/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/

// Add _ (underscore) in place of index
// Declare a variable that holds index.replace('_')
//let hiddenWord = index.replace("_");
// Create a for loop that loops through each word
//for (let i = 0; i < index.length; i++) {
// ---- > love
// If index includes 'guessed' letter, {replace underscore with guessed letter}
//if (index[i] === userInput) {
//hiddenWord[i] = userInput; // o
//console.log(hiddenWord); //_ _ _ _
//console.log(hiddenWord[i]); // o
//console.log(hiddenWord);
//console.log(index[i]) // o
// If letter index contains duplicates of the same letter, replace letters at the SAME time
//}
//console.log()
//}
// Letters that are already guessed should print out on the side
// The number of guesses should always be shown to the user
// console.log number of guesses with every input
//console.log(`You have 'guesses' remaining`);
// If userInput doesn't match index letter, make guesses go down {decrement number of guesses}
//if (index.includes(userInput) !== userInput) {
//console.log(`You lost a guess`);
// Already guessed letters should print as well
//}

// Print a message if the user wins
//if (index) {
// console.log winning message
//console.log(`Congrats, you've won!`);
//} else {
// Print a message declaring defeat if the user loses
// console.log losing message
//console.log(`Try again next time.`);
//}
// correct word should be shown(console.log index)

function run() {
  let snowman = {
    chosenWord: "",
    arrayChosenWord: [],
    letter: "",
    hiddenWord: "",
    arrayHiddenWord: [],
    guessedWords: "",
    arrayGuessedWords: [],
    guessLeft: 8,
    solvedWord: "",
    arrayCurrentSolvedWord: [],
    leaveChoice: "",
    countNumber: 0,
  };
  console.log("Welcome! Let's start!");
  makeTheBlanks();
  gameLoop();

  function quitTest() {
    console.log("Goodbye!");
    process.exit();
  }
  function gameLoop() {
    while (snowman.guessLeft !== 0) {
      getValidLetterGuess();
      snowman.arrayChosenWord = snowman.chosenWord.split("");
      snowman.arrayHiddenWord = snowman.hiddenWord.split("");
      for (let i = 0; i < snowman.chosenWord.length; i++) {
        if (snowman.chosenWord[i] === snowman.letter) {
          snowman.arrayHiddenWord[i * 2] = snowman.arrayChosenWord[i];
          snowman.arrayCurrentSolvedWord[i] = snowman.arrayChosenWord[i];
        }
      }
      for (let i = 0; i < snowman.chosenWord.length; i++) {
        if (snowman.chosenWord[i] === snowman.letter) {
          snowman.guessLeft = snowman.guessLeft + 1;
          break;
        }
      }
      snowman.guessLeft = snowman.guessLeft - 1;
      snowman.chosenWord = snowman.arrayChosenWord.join("");
      snowman.hiddenWord = snowman.arrayHiddenWord.join("");
      snowman.solvedWord = snowman.arrayCurrentSolvedWord.join("");
      if (snowman.solvedWord === snowman.chosenWord) {
        console.log("Congratulations! 🎉 🎊 🥳");
        console.log("You won the game in " + snowman.countNumber + " guesses!");
        console.log("The word was " + '"' + snowman.chosenWord + '"');
        quitTest();
      }
      console.log(snowman.hiddenWord);
      showGuessedWord();
    }
    guessLeftCounter();
  }
  function showGuessedWord() {
    if (snowman.arrayGuessedWords.length === 0) {
      snowman.arrayGuessedWords.push(snowman.letter);
    } else {
      snowman.arrayGuessedWords.push(", " + snowman.letter);
    }
    snowman.guessedWords = snowman.arrayGuessedWords.join("");
    console.log("\nGuessed Letters: " + snowman.guessedWords);
  }
  function guessLeftCounter() {
    console.log("\nYou have " + snowman.guessLeft + " guess(es) remaining");
    if (snowman.guessLeft === 0) {
      console.log("\nGAME OVER, 😔 better luck next time!");
      console.log("The word was " + '"' + snowman.chosenWord + '"');
      quitTest();
    }
  }
  function makeTheBlanks() {
    snowman.chosenWord = getRandomWord();
    snowman.hiddenWord = "";
    for (let i = 0; i < snowman.chosenWord.length; i++) {
      if (i === 0) {
        snowman.hiddenWord = snowman.hiddenWord + "_";
      } else {
        snowman.hiddenWord = snowman.hiddenWord + " _";
      }
    }
    console.log(snowman.hiddenWord + ` (${snowman.chosenWord})`);
  }
  function getValidLetterGuess() {
    guessLeftCounter();
    function guessIsValid(letterGiven) {
      return (
        letterGiven.length === 1 &&
        letterGiven.toUpperCase() != letterGiven.toLowerCase() &&
        !snowman.guessedWords.includes(letterGiven)
      );
    }
    snowman.letter = "";
    while (!snowman.letter) {
      let input = readline.question("\nGuess a letter: ");
      if (guessIsValid(input)) {
        snowman.letter = input;
      } else {
        console.log("Please enter a valid letter");
      }
    }
    snowman.countNumber = snowman.countNumber + 1;
    return snowman.letter.toLowerCase();
  }
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
