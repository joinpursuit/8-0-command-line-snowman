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
// function run() {
//   // This line of code gets a random word. The `word` variable will be a string.
//   const word = getRandomWord();
//   /*
//     The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
//     The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
//     After a user hits the 'return' key, the rest of the code will run.
//   */
//   const userInput = readline.question("Guess a letter: ");
//   // This line of code will print out whatever is inputted in by the user.
//   console.log("THE USER INPUTTED:", userInput);
//   // Grab random word (line 27)
//   // Return string length with appropriate amount of `_`
//   // Assign word.length to a var placeholder (will return num)
//   let secretWord = getRandomWord();
//   let correctGuess = [];
//   let incorrectGuess = [];
//   let guessCount = 5;
//   // let maxNumIncorrectGuess = 

//   // HELPER FUNCTIONS
//   function isGuessCorrect(guess){
//     // let secretWord = "apple";
//     return secretWord.includes(guess);
//   }
//   function addCorrectGuessToList(guess){
//     // let correctGuess = [];
//     correctGuess.push(guess)
//     return correctGuess;
//   }
//   function addIncorrectGuessToList(guess){
//     // let correctGuess = [];
//     incorrectGuess.push(guess)
//     return correctGuess;
//   }
//   // function getRandomWord(){
//   // }
//   function run(){
//     const secretWord = getRandomWord();
//     // TODO: Put that random word into state!
//     secretWord = word;
//     const userInput = readline.question("Guess a letter: ");
//     // TODO: Check if guess is correct!
//     let isCorrect = isGuessCorrect(userInput);
//     // TODO: If the guess is correct, add it to correct guess.
//     //loop through secretword 
//     for(let i = 0; i < secretWord.length; i++){ 
//       //if userinput is included in secretWord do ....
//       if(secretWord.includes(userInput)) {
//       addCorrectGuessToList(guess);
//       } else { //else, push into incorrect list arr and decrease guessCount
//       addIncorrectGuessToList(guess);
//       guessCount--;
//       }
//       //if guess correct if '_' === 0 then Congrats you won!
//       if(guessCount === 0) {
//         return errorMsg;
//       }
//     }
//   }

//   console.log(addCorrectGuessToList("p"));
//   console.log(addCorrectGuessToList("l"));
//   // Use result of word.length to determine  `_`
//   // Use for loop so were able to replace letters or decrease guess count
//   // for (let i = 0; i < word.length; i++){
//   // }
//   // If user enters invalid input, return msg `enter letter`. Invalid guess should not decrease guess count. All guesses should be displayed.
//   // if (!userInput){
//   // }
//   // return
//   // If valid letter is inputted, update word to replace all `_` with correct letter. Should also not change guess count.
//   // else, if user inputs incorrect guess, decrease guess count.
//   // Regardless of whether or not the guess is correct, the number of remaining guesses should be shown to the user.
//   // The game should continue until user wins or guess count reaches 0
//   // If user wins, display congrats msg
//   // Else, if user loses, reveal word and display defeat msg
// }
// run();

//follow
//012345
//_ _ _ _ _ _
//0123456789t
//0 1 2 3 4 5


function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();

  // number of chances by the length of the word plus one more chance
  let incorrectGuesses = word.length + 1
  let lettersGuessed = ""
  let theBlanks = ""
  let validGuess = "a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z"
  //assign underscores to a var called theBlanks
  for (let i = 0; i < word.length; i++){
    // += adds on previous value
    theBlanks = theBlanks + "_ "
  }
  console.log("Remaining Incorrect Guesses: " + incorrectGuesses)
  console.log("Word Bank: " + lettersGuessed)
  console.log("Word: " + theBlanks)
  // console.log (typeof theBlanks)

  // _ _ _ _ _
  // s l e e p
  // if all of the letters have been guessed, underscores are replaced with letters
  // if lettersGuessed does not include any "_" then you have won the game
  // if lettersGuessed.includes("_") then you haven't won the game
    let arr = [0]
    for (i = 0; i < arr.length; i++){
      let userInput = readline.question("Choose A Letter: ");
      lettersGuessed += userInput + " "
      // loop through word.length to check if userInput is correct or not and modify theBlanks appropriately
      for (let i = 0; i < word.length; i++){
        //if userInput matches an element witihin word.length, replace theBlanks with i
        if(userInput.toLowerCase() === word[i]){
          //adds spaces in between characters
          theBlanks = theBlanks.split("")
          //replace every other element of string with userInput
          // .splice removes & replaces
          theBlanks.splice(i*2, 1, userInput)
          // console.log(theBlanks)     
          //returns concatenated  string
          theBlanks = theBlanks.join('')
        }
      }
      
      if(userInput !== validGuess){
        incorrectGuesses = incorrectGuesses - 1
      }
      
      if(incorrectGuesses === 0){
        console.log("Remaining Incorrect Guesses: " + incorrectGuesses)
        console.log("Word Bank: " + lettersGuessed)
        console.log("Word: " + theBlanks)
        console.log("Game Over, Try Again!")
        console.log("The Word Is: " + word)
        return
        
      } 
      
      /*
      The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
      
      The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
      
      After a user hits the 'return' key, the rest of the code will run.
      */
     
     console.log("Remaining Incorrect Guesses: " + incorrectGuesses)
     console.log("Word Bank: " + lettersGuessed)
     console.log("Word: " + theBlanks)
     
     // This line of code will print out whatever is inputted in by the user.
     console.log("You Chose:", userInput);
     
     if(theBlanks.includes("_")){
       i--
      }
      
    }
    // console.log("Enter Letter: ")
    console.log("You Won!")
    // Instructions to continue the game:
    // The code above allows the letters are being inputted into each "_"
    // If userInput corresponds with theBlanks
    // Use a loop to get the letters to stay each time the userInput(s) a guess

    // Instructions to decrease incorrect guesses:
    // The code is currently applying the same guess count to each guess
    // To decrease remaining incorrect guess count, subtract
    // incorrectGuesses - 1
    // When incorrectGuesses = 0, user loses game!
    // If userInput does not = validGuess display 'Enter Letter' message and do not decrease Remaining Incorrect Guesses

    // Instructions to add letters to the word bank:
    // No letters are appearing in the word bank

    // Instructions if user loses the game:
    // If the user loses, the word should reveal itself and a defeating message should appear
    
    
     
     
    }

run();