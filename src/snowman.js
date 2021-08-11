/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");

// This line of code gets a random word. The `word` variable will be a string.
const word = getRandomWord()


/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. 
  Instead, you only need to call it from the `run()` function.
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
  let remainingGuess=6;
  let storingGuess=[];
  let lettersGuessed = " ";

  


// I am pushing a underline
  for (let i = 0; i < word.length;i++){
   storingGuess.push("_");
  }
  // while the guesses are higher than zero the user can Input a letter 
  while (remainingGuess > 0 ){
  const userInput = readline.question("Guess a letter: ");
  
  console.log("Number of guesses left:" + remainingGuess)
        
  // This line of code will print out whatever is inputted in by the user.
  
    // if(userInput === null){
    //   break;
      
     



      if(userInput.length !== 1 || (!isNaN(userInput))){
        console.log(`Invalid input: ${userInput}, please type a valid letter`);
       
       } else if(!word.includes(userInput)){
        remainingGuess--;
        console.log(`You have ${remainingGuess} guesses left `)
       console.log(`the user inputted wrong letter`)
       } if(remainingGuess === 0){
         console.log(`You lost correct word is ${word}`)
       } else {
          for(let i = 0; i < word.length; i++){
        
        
         if(word[i] === userInput){
           storingGuess[i] = userInput;
           console.log(storingGuess.join(" "));
         } 
         if(storingGuess.join("")=== word){
           remainingGuess = 0;
         console.log(`Good job! The answer was  ${word}`);
         break;
         }
      }  
      //console.log(storingGuess.join(" "));
    }
    //console.log(`Good job! The answer was  ${word}`);
  }
}




 

  //let countDown 


  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
 // letter from user 
 


run();
