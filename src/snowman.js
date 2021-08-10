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

function run() {
  const word = getRandomWord();

  let wordCharacterArr =[]; // An empty array that will contain letters of the word generated from getRandomWord(). Using an array allows me iterate through & compare userInput to each letter.
  let letterSpaceArr =[];  // Creating an array that will hold dashes equal to word.length. Each correct guess will be spliced in at index position.
  let remainingGuess = 6; // a variable for remaining guesses, starting with the number 6.
  let guessedLetters = []; // Will push guessed letters that are = 1 character into this array. 
  let count = 0; // count for number of correct guesses.
  

  for (let i =0;i < word.length; i++){  // this loop pushes all charcters of secret word into an array , and creates a second array with " _ " equal to word.length
      wordCharacterArr.push(word.charAt(i));
      letterSpaceArr.push("_");
    } 
      while (remainingGuess > 0){ // conditional set for the game. As long as remainingGuess is > 0 , the game will continue. 
        console.log("\n" + letterSpaceArr.join(" ") + "\n");  // this line generates the number of dashes equal to word being guessed
        console.log("Guessed letters: " +  guessedLetters + "\n"); // prints guessed letters
        console.log(`You have ${remainingGuess} guesses remaining`); 
        const userInput = readline.question("Please enter your guess: ").toLowerCase(); 

          if (!isNaN(userInput) || userInput.length > 1){ // if more than one letter is entered , request for a valid entry is returned 
              console.log(`\nPlease enter a valid letter`);

          } else if (userInput.length === 1 && !wordCharacterArr.includes(userInput)){ // This is the conditional for an incorrect guess that is one character length
              guessedLetters.push(userInput); // this enters the incorrect guessed letter into the array to be returned later.
              remainingGuess--; // for each wrong guess, a guess is subtracted from remaining guesses, when it reaches 0 game will end.    
            }  if (remainingGuess === 0 && wordCharacterArr.toString() !== letterSpaceArr.toString()){ // the conditional for 0 remaining guesses and unsolved word.
                console.log("\nThe secret word was: " + word + "\n");
                console.log(`You have ${remainingGuess} guesses remaining. Try again.\n`);
                break;
            }  if (wordCharacterArr.includes(userInput)){ // conditional statement for each correct letter that is guessed.
                guessedLetters.push(userInput); // guessed letter will be pushed into guessedLetters array
                count++; // for each guessed letter, count is increased by 1 , to be returned later if all correct letters are guessed.

                  for (let j =0; j < wordCharacterArr.length; j++){ 
                  // loop to iterate through wordcharacterArr & find matching userInput to specific index postions, based on the above conditional being met.
                    if (userInput === wordCharacterArr[j]){  
                      letterSpaceArr.splice(j,1,userInput); // each matching userInput will be spliced into letterSpaceArray
                    }  
                      if (wordCharacterArr.toString() === letterSpaceArr.toString()){ // if all letters match , the following code executes to end game 
                        remainingGuess = 0;
                        console.log("\n" + letterSpaceArr.join(" ") + "\n")
                        console.log (`You win! You took ${count} guesses \n`);
                        break;  
                      }
                  }
  
          }     
      } 
}
run();
