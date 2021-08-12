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
function run() {
  let randomWord = getRandomWord();
  // let randomWord = 'test'
  let dashedWord ='';
  let numOfGuessesLeft= 6;
  let guessed = '';

  while(numOfGuessesLeft > 0){
    if(dashedWord.length >0){
      dashedWord = '';
    }
    let finished = true
    for(let i= 0; i<randomWord.length;i++){
      if(guessed.includes(randomWord[i])){
        dashedWord +=randomWord[i]
      } else{
        finished = false;
       dashedWord += '_'; 
      }
      
      if(i!== randomWord.length-1){
        dashedWord += ' ';
      }
    }
    if(finished){
      console.log('You beat me!');
      return;
    }

    console.log(dashedWord);
    console.log('guessed letters', guessed);
    console.log(`You have ${numOfGuessesLeft} guesses left`);

    let givenLetter = readline.question("Guess a letter: ");
    if(!isNaN(Number(givenLetter)) || givenLetter.length >1 || guessed.includes(givenLetter)){
      console.log(`This doesn't look right, try again!`);
      continue;
    }
    
    guessed += givenLetter;

    if(!randomWord.includes(givenLetter)){
      numOfGuessesLeft--;
    }
  }
  console.log('You lost!');
    numOfGuessesLeft--;
    console.log('Number of guesses left: ' + numOfGuessesLeft);

  
   


  
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

// PROBLEMS
// having trouble having the last letter show up when you guess the word correctly 
//even if its the right letter, your number of guesses still decrease
//counts '0 guesses left' as an additional guess