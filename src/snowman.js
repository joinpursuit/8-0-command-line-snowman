
const readline = require("readline-sync");

const dictionary = require("./dictionary");

// * @param {}
// * @returns {string} string of random generated word
function getRandomWord() { 
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

lettersGuessed = [];

function replaceUnderScores(word){
  let dash = "";
  for(let i=0; i < word.length; i++){
    if(lettersGuessed.includes(word[i])){
      dash += word[i];
      dash += " ";
    } else {
      dash += "_";
      dash += " ";
    } 
  }
  return dash
}

function checkUserValidity(userInput) {
  return typeof userInput === "string" && userInput.length === 1 && (userInput >= "a" && userInput <="z");
}

function checkWinner(){
  let condition = true;
  for(let i=0; i < word.length; i++){
    if (!lettersGuessed.includes(letter)){
      return false
    }
  }
  return condition;
}

function repeatedLetters (string, letter){
  if (string.includes(letter)){
    console.log(`${userInput} has been inputed. \n Please try another letter!`);
  }
  return false
}


function run() { 

  const state = {
    numberOfGuesses : 12,
    shouldPlay : true,
  }

  const word = getRandomWord(); // word is equal to randomly generated word
  const userInput = readline.question("Do you wanna play Snow-Man? :) Press any key to play: ");

  console.log("THE USER INPUTTED:", userInput);   // This line of code will print out whatever is inputted in by the user.
  
  let wordLengthUnderscores = "_ ".repeat(word.length);

  console.log(wordLengthUnderscores + "\n");

  while (state.shouldPlay) {
    console.log(`Letters Guessed: ${lettersGuessed.join()}\n`);
    console.log(`Guesses Left: ${state.numberOfGuesses}`);
    const userInput = readline.question("Please enter your guess:").toLowerCase();


    let string = lettersGuessed.join();

    if (checkUserValidity(userInput)){
      if (repeatedLetters(string, userInput)){
        console.log(repeatedLetters(string, userInput));
        continue;
      } else {
        string += " " + userInput;
      }
    }
    
    let didPlayerGuessCorrectly = replaceUnderScores(word);

    if (!didPlayerGuessCorrectly) {
      state.numberOfGuesses--;
    } // 

  }
  
  



}

run();
