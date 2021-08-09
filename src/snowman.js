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

function myFunction() {   
document.write("welcome to Javatpoint");  
}  

// const letterDisplay = [];

// ------------------------------------------------------------------------------------
function checkGuess (randomWord, guess) { // Check if input is correct or not
  if (randomWord.includes(guess)) {
    return true
  } else {
    return false
  }
}

function charReplacer (guess, word, letterDisplay) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      if (word[i] === guess.toLowerCase()){
        letterDisplay.splice(i,1,guess)
      }
    }
  }
}

// ------------------------------------------------------------------------------------

/*
  This function will run your game. 
*/


const enterUserName = readline.question(`Enter your name:  `) // Take player's name in 
let winningSteaks = 0;

function run() {
  let listOfGuessedLetters = ""; 
  
  const opening = readline.question(`\n    
  **************************************************
  Welcome to Fatema and Ki Sub's Snowman Game World! \n 
  Please press 'return' button to start the game!\n
  **************************************************`);

  const word = getRandomWord(); // Generate a random word
  // console.log(word)

  let remainingChances = word.length + 1 // the number of total chances that players have
  
  const letterDisplay = []; // Display the secret word's characters 

  function convertToUnderScore (word) { //Keeping inside the run function so it resets everytime a player starts a new game
  for (let characther of word) {
    characther = "□"
    letterDisplay.push(characther)
    }
  }
  convertToUnderScore (word)

  
  
  //While this loop's condition is true, continue this game
  while (remainingChances && letterDisplay.includes("□")) {
    
      console.log(`Your winning steaks: ${winningSteaks}`) // showing winning steaks if the player continued the game after winning
      console.log(`Player's name: ${enterUserName}`) // Display the player's name
      
      console.log(String(`-----------------------------------\nThis word has ${word.length} characters.\n\n${letterDisplay.join("  ")}`))
      
      

      console.log(`\nList of your guessed characters: ${listOfGuessedLetters}`)
      const userInput = readline.question(`\n***************\nGuess a letter: `);
      console.log("You Guessed:", userInput);
      
      // Check if it is correct or not
            if  (userInput.length > 1 || typeof userInput !== "string") { // why is typeof not working?
              console.log(`Please only enter one character at a time! You have '${remainingChances}' chance(s) left!`)
              
              }

            else if (checkGuess(word, userInput) === true) { // If userInput is correct
                  console.log(`Nailed it! Correct guess!!! You have '${remainingChances}' chance(s) left!`)  
                  listOfGuessedLetters += userInput + ", "
                  charReplacer (userInput, word, letterDisplay) 
                  
              }
                else { // Otherwise, decrease the remiainingChances by 1
                remainingChances --;
                console.log(`\nOoops! Wrong guess!\nYou have '${remainingChances}' chance(s) left!`)
                listOfGuessedLetters += userInput + ", "
                } 
      } // While loop ends here

      console.log(`\nYour Guesses were: ${listOfGuessedLetters}.\nThe secret word was '${word}'\n`)

      if (letterDisplay.join("") === word) { // If the player won
        console.log(`\Holy Moly Cow!!! You beat the game!!!\nCongratulations! ${enterUserName} !!!\n`) // Offer a chance to continue
        const startNewGame = readline.question(`Feeling like you wanna test your luck again?\nif yes, press 'y', if not, press 'n':`) 
        if (startNewGame === 'y') { // If the player wishes to continue
          console.log(`\n*****Decided to try your luck again today? huh?*****\n`)
          winningSteaks ++ // Add 1 to the winningSteaks
          run()
        } else { // Otherwise, print out the following message
          console.log(`********************************************\n\nThank you for playing today! Have a good day!\n\n*********************************************`)
        }
      }
      if (remainingChances === 0) { // If the player lost
        console.log(`\So guessing is not your thing, huh? jkjk! the word was ${word}! You did well ${enterUserName}!`)
        const startNewGameWhenLost = readline.question(`Maybe you can try again?\nif yes, press 'y', if not, press 'n':`) 
        if (startNewGameWhenLost === 'y') {
          console.log(`\n*****Maybe you will beat the game this time? huh?*****\n`)
          run()
      } else {
        console.log(`********************************************\n\nThank you for playing today! Have a good day!\n\n*********************************************`)
      }
    }


    
}


run();

