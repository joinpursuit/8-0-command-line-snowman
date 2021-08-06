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

// This helper function will convert the random word to be diplayed as a dashed word for the user to guess.
function dashedVersion(word) {
  let dashedWord = "";
  for (i = 0; i < word.length; i++) {
    dashedWord += "_ ";
  }
  return dashedWord;
}

function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();

  let state = {
    lettersGuessed: [],
    remainingGuesses: 7,
    hiddenWord: dashedVersion(word),
  };

  while (state.remainingGuesses > 0) {
    console.log(`${state.hiddenWord}\n`);
    const userInput = readline.question("Guess a letter: ");


    if (typeof userInput !== "string" || userInput.length > 1) {
      console.log("Please enter a valid letter.");
    } else {
      console.log("THE USER INPUTTED:", userInput);
      state.hiddenWord = state.hiddenWord.split(" ");

      for (let i = 0; i < word.length; i++) {
        if (word[i] === userInput.toLowerCase()) {
          //  state.hiddenWord[i] = userInput.toLowerCase()
          state.hiddenWord.splice(i, 1, userInput.toLowerCase());
          // console.log(state.hiddenWord);
        }
      }
      state.hiddenWord = state.hiddenWord.join(" ");
      state.lettersGuessed.push(userInput.toLowerCase());
      state.remainingGuesses--;
      console.log(`You have ${state.remainingGuesses} left.`);
    }
  }
}

run();
