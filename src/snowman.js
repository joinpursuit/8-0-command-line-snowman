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
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    //const userInput = readline.question("Guess a letter: ");

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  

  let wordCharacterArr =[]; // making an empty array that will contain letters of the word generated from getRandomWord(). Using an array so I can loop through & compare userInput
  let letterSpaceArr =[];  // creating an array that will hold dashes that will equal word.length
  let remainingGuess = 6; // a variable for remaining guesses, starting with the number 6.
  let guessedLetters = []; // Will push guessed letters that are  = 1 character into this array 
  let count = 0; // 

  for (let i =0;i < word.length; i++){  // this loop pushes all charcters of word into an array , and creates a second array with " _ " equal to word.length
      wordCharacterArr.push(word.charAt(i));
      letterSpaceArr.push("_");
    } 
      while (remainingGuess > 0){ // conditional set for the game. As long as remainingGuess is > 0 , the game will continue. 
        console.log("\n");
        console.log(letterSpaceArr.join(" ") + "\n");  // this line generates the number of dashes equal to word being guessed
        console.log("Guessed letters: " +  guessedLetters + "\n");
        console.log(`You have ${remainingGuess} guesses remaining`);
        const userInput = readline.question("Please enter your guess: \n"); 

        console.log(word);// this is a helper for me to test my results

      
        if (userInput.length > 1){ // if more than one letter is entered , request for a valid entry is returned 
          console.log(`Please enter a valid letter`);

        }  
          if (userInput.length === 1 && !wordCharacterArr.includes(userInput)) { // This is the conditional for an incorrect guess that is one character length
              guessedLetters.push(userInput); // this enters the guessed letter into guessed letters array to be returned later.
              remainingGuess--; // for each wrong guess, a guess is subtracted from remaining guesses    
        } 
          if (wordCharacterArr.includes(userInput)){ // conditional statement for each correct letter that is guessed.
              guessedLetters.push(userInput); // guessed letter will be pushed into guessedLetters array
              count++; // for each guessed letter, count is increased by 1 

          for (let j =0; j < wordCharacterArr.length; j++){ // loop to iterate through wordcharacterArr & find matching input to specific index postions
                if (userInput === wordCharacterArr[j]){  
                  letterSpaceArr.splice(j,1,userInput); // each matching userImput will be spliced into letterSpaceArray

                    console.log("Guessed letters: " +  guessedLetters);

                }   if (wordCharacterArr.toString() === letterSpaceArr.toString()) { // if all letters match , the following code executes to end game 
                      remainingGuess = 0;
                      console.log(letterSpaceArr.join(" "))
                      //console.log (word);
                      console.log (`You win! You took ${count} guesses`);
                    break;  
                  }
        }
  
    }
//console.log (wordCharacterArr); 
}
}
run();
