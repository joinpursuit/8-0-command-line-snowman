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
//function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  //const word = getRandomWord();
  
  
  /*
  The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
  
  The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
  
  After a user hits the 'return' key, the rest of the code will run.
  */
// const userInput = readline.question("Guess a letter: ");
 // This line of code will print out whatever is inputted in by the user.
 //console.log("THE USER INPUTTED:", userInput);
 // determine inputs and outputs
 // declare variables to hold the word
 // grab random word `const word = getRandomWord()`
 //let correctGuesses = [];
 //let incorrectGuesses = [];
 // assign word.length to a var placeholder and return appropiate amount of `_`  or depending on length of word, return appropiate amount of `_`.
 // use for loop so were able to replace letters or decrease guess count.
// for (let i = 0; i < word.length; i++) {
   // if user enters invalid input, return msg `enter letter`. invalid guess should not decrease guess count.
   // if valid letter is inputted, update word to replace all `_` with correct letter. Should also not change guess count.
   // else if user inputs incorrect guess, decrease guess count.
   // Regardless of whether or not the guess is correct, the number of remaining guesses should be shown to the user.
   // the game should continue user wins or guess count reaches 0.
   // if user wins, display `Congratulations! You won!`
   // else, if user loses, reveal word and display `Sorry, try again.`
  //}
  //return;
//}
  //run();
 // function run() {
    // This line of code gets a random word. The `word` variable will be a string.
   // const word = getRandomWord();
    /*
      The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
      The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
      After a user hits the 'return' key, the rest of the code will run.
    */
   // const userInput = readline.question("Guess a letter: ");
    // This line of code will print out whatever is inputted in by the user.
   // console.log("THE USER INPUTTED:", userInput);
    // Grab random word (line 27)
    // Return string length with appropriate amount of `_`
    // Assign word.length to a var placeholder (will return num)
   // let secretWord = getRandomWord();
   // let correctGuess = [];
   // let incorrectGuess = [];
   // let guessCount = 5;
   // let errorMsg = 'Game Over!'
    // let maxNumIncorrectGuess = ??

    // HELPER FUNCTIONS
    //function isGuessCorrect(guess) {
      // let secretWord = "apple";
    //  return secretWords.includes(guess);
  //  }

    //function addCorrectGuessToList(guess) {
      // let correctGuess = [];
    //  correctGuess.push(guess)
     // return correctGuess
    //}

   // function addIncorrectGuessToList(guess) {
      // let incorrectGuess = [];
    //  incorrectGuess.push(guess)
      //return incorrectGuess
    //}

    // function getRandomWord(){
    // }
    //function run() {
     // const secretWord = getRandomWord();
      // TODO: Put that random word into state!
     // secretWord = word;
     // const userInput = readline.question("Guess a letter: ");
      // TODO: Check if guess is correct!
     // let isCorrect = isGuessCorrect(userInput);
      // TODO: If the guess is correct, add it to correct guess.
     // for (let i = 0; i < secretWord.length; i++) {
     //   if(secretWord.includes(userInput)) {
          //if userInput 
        //  addCorrectGuessToList(guess)
       // }else { 
       //   addIncorrectGuessToList(guess)
       //   guessCount--
       // }

       // if(guessCount === 0) {
       //   return errorMsg;
       // }
     // }
   // }
   // console.log(addCorrectGuessToList("a"));
   // console.log(addCorrectGuessToList("p"));
  //  console.log(addCorrectGuessToList("p"));
  //  console.log(addCorrectGuessToList("l"));
   // console.log(addCorrectGuessToList("e"));
    // Use result of word.length to determine  `_`
    // Use for loop so were able to replace letters or decrease guess count
    // for (let i = 0; i < word.length; i++){
    // }
    // If user enters invalid input, return msg `enter letter`. Invalid guess should not decrease guess count. All guesses should be displayed.
    // if (!userInput){
    // }
    // return
    // If valid letter is inputted, update word to replace all `_` with correct letter. Should also not change guess count.
    // else, if user inputs incorrect guess, decrease guess count.
    // Regardless of whether or not the guess is correct, the number of remaining guesses should be shown to the user.
    // The game should continue until user wins or guess count reaches 0
    // If user wins, display congrats msg
    // Else, if user loses, reveal word and display defeat msg
    // edge case: must replace more than one correct letter (if letter appears more than one time in the word)
  //}
 // run();
//follow
//012345
//_ _ _ _ _ _
//0123456789t
//0 1 2 3 4 5


function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = 'follow';
  //getRandomWord();
  // declared variables
  let incorrectGuesses = word.length + 1
  let lettersGuessed = ["None"];
  let theBlanks = "";
  let winningMsg = "Congrats! You Win!";
  let losingMsg = "Sorry, Game Over. :(";
  let validEntry = /^[a-z]+$/;
  let invalidGuess = "Invalid input. Please enter a lowercase letter.";
  //reassigns underscores to the variable called `theBlanks`.
  for (let i = 0; i < word.length; i++){
    theBlanks += "_ "
  }
  // for i loop that logs start of game and continues to loop it through over again until conditions are met.
  for (let i = word.length - 1; i < word.length; i++){
    //'prints' concatenated strings into terminal 
    console.log("Remaining Incorrect Guesses: " + incorrectGuesses);
    console.log("Letters Guessed: " + lettersGuessed);
    console.log("Word: " + theBlanks);
    // console.log (typeof theBlanks)
    // console.log(theBlanks);
    // variable that lets instructs user to choose a letter
    let userInput = readline.question("Pick a letter: ");
    console.log("\n");
    //makes sure that correct letter needs to be lower case
    //userInput.toLowerCase();
    //If the user enters an invalid guess (e.g. `3` or `apple`), a message should display telling the user to enter a letter. Invalid guesses should not count against the guess count.
    // make sure its one character
    // make sure its a letter and that its lower case
    
    if (userInput) {
      if (userInput.match(validEntry)) {
        lettersGuessed.push(userInput)
      } else {
        incorrectGuesses++
        console.log(invalidGuess)
      }
      // 'pushes' `userInput` selection into "Letters Guessed" line
      // nested `if` condition to remove 'None'.
      if (lettersGuessed.includes("None")){
        lettersGuessed.shift();
      }
    }
    //loop through word.length to check if userInput is correct or not and modify theBlanks appropriately
    for (let i = 0; i < word.length; i++){
      //if userInput matches an element witihin word.length, replace theBlanks with i
      if(userInput === word[i]){
        //adds spaces in between characters
        theBlanks = theBlanks.split("")
        //replace every other element of string with userInput
        theBlanks.splice(i*2, 1, userInput)
        //returns concatenated string
        theBlanks = theBlanks.join('')
      }
    
    }
    // condition that states if word.includes isn't true,
    if (!word.includes(userInput)){ 
      incorrectGuesses--;
    }
  if (incorrectGuesses === 0) {
    console.log("Remaining Incorrect Guesses: " + incorrectGuesses);
    console.log("Letters Guessed: " + lettersGuessed);
    console.log("Word: " + theBlanks);
    return console.log(losingMsg + " The correct word was: " + word);
  }
  /*
  The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
  
  The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
  
  After a user hits the 'return' key, the rest of the code will run.
  */
 
 
 //console.log("Remaining Incorrect Guesses: " + incorrectGuesses)
 //console.log("Letters Guessed: " + lettersGuessed)
 //console.log("Word: " + theBlanks)
 //console.log (typeof theBlanks)
 //console.log(theBlanks)
 
 
 
 // This line of code will print out whatever is inputted in by the user.
 console.log("Letter guessed:", userInput);
 //userInput = readline.question("Pick a letter: ");
 if (theBlanks.includes("_ ")){
   i--;
 } else {
 return console.log(winningMsg);
  }
 }
}

run();


//how do I get the code to keep running
