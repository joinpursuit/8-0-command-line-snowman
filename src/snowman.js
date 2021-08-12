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
function replaceLetters(word, placeholder, userInput){
  if(word.includes(userInput)){
    for(let i = 0; i < word.length; i++){
      if(word[i] === userInput){
        placeholder.splice(i, 1, userInput);
      }
    }
   return placeholder;
  }else{
    return false;
  }
}

function confirmWinner(word, placeholder){
  let placeholderStr = placeholder.join('');
  if(placeholderStr === word){
  return true;
  }
}

function inputValidityCheck(userInput, alphabet){
  if(alphabet.includes(userInput)){
    return true;
  }else{
    return false;
  }
}

function getUnderscores(word, placeholder){
  for(let i = 0; i < word.length; i++){
    placeholder.push('_');
  }
}

/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  //boolean that will keep the game running or not
  let continueGame = true;
  //keeps track of all the inputs and stores it in this array
  let wrongGuess = [];
  //all alphabet inputs
  const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  //number of tries/guesses
  let tries = 7;
  const word = getRandomWord();
  //to be entered with spaces equal to number of letters in word
  let placeholder = [];
  //all the valid player Inputs the function will work with
  if(placeholder.length === 0){
    getUnderscores(word, placeholder);
  }

  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  const userInput = readline.question("Guess a letter: ");
  // This line of code will print out what the player has input.
  while(continueGame){
    //This shows the player how many spaces are left
      console.log(`\n${placeholder.join(' ')}`);
      const userInput = readline.question(`Remaining incorrect guesses: ${tries}\nLetters guessed: ${wrongGuess}\nGuess a lowercase letter: `);
    //if the input is valid, it continues and keeps track of all the wrong guesses in this array
      if(inputValidityCheck(userInput, alphabet)){
        let checkIfBoolean = replaceLetters(word, placeholder, userInput);
        //remaining guesses if valid letter is a wrong guess 
        if(!checkIfBoolean){
          if(!wrongGuess.includes(userInput)){
            wrongGuess.push(userInput);
            tries--;
          }
        }else{
          placeholder = checkIfBoolean;
         // console.log(placeholder.join(' '));
        }
      }else{
        console.log('Enter a valid lowercase letter.');
        continue;
      }
      if(confirmWinner(word, placeholder)){
        console.log(`The word was '${word}', you won! you saved the Snowman with ${tries} guesses left!`);
        continueGame = false;
      }
      if(tries <= 0){
        console.log(`You ran out of guesses! Your luck run out! The word was '${word}'. The snowman did not survive.  Try your luck again and save the snowman next time.`);
        break;
      }
    }
  }

run();
