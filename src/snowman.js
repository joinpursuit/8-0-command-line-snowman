


/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");
const chalk = require("chalk");
const { whiteBright, blue } = require("chalk");

/*
  This function returns a random word from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
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
        letterDisplay.splice(i,1,"\033[1;34m" + `${guess}` + "\033[1;33m")
      }
    }
  }
}
// ------------------------------------------------------------------------------------


const enterUserName = readline.question("\033[0;32m" + `Enter your name:  ` + "\033[1;37m") // Take player's name in 
let winningSteaks = 0;
console.log( "\033[1;33m" + "\nYou will then be given a number of chances based on the word" + "\n **Only Enter a Number!**" + "\033[1;35m" + "\nPress 'return' if you don't want to choose.")
const askForNumberOfChances = Number(readline.question("\033[0;32m" + `Enter a number of chances you want:  ` + "\033[1;37m"))
const orange = chalk.hex('#FFA500')
const brightBlue = chalk.hex('#ccddff')
const brightYellow = chalk.yellowBright
const white = chalk.whiteBright



/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function run() {

  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();

  let listOfGuessedLetters = [];

  // Opening 

  const opening = readline.question("\033[0;33m" + `\n    
  **************************************************
  Welcome to Fatema and Ki Sub's Snowman Game World! \n 
  Please press 'return' button to start the game!\n
  **************************************************` + "\033[1;33m");




  let remainingChances = word.length + 1

  if(askForNumberOfChances){
    remainingChances = askForNumberOfChances
  } // the number of total chances that players have

  const letterDisplay = []; // Display the secret word's characters 

  function convertToUnderScore (word) { //Keeping inside the run function so it resets everytime a player starts a new game
    for (let characther of word) {
      characther = "_"
      letterDisplay.push(characther)
      }
    }
    convertToUnderScore (word)

  
  

  // ------------------------While Loop------------------------------------------------------------------------------------------------------------------------------
  //While this loop's condition is true, continue this game
  while (remainingChances && letterDisplay.includes("_")) {
    
    console.log("\033[1;31m" + `Your winning steaks: ${winningSteaks} `+ "\033[1;33m") // showing winning steaks if the player continued the game after winning

    console.log(`Player's name: ${"\033[1;37m" + enterUserName + "\033[1;33m"}`) // Display the player's name

    
      if (remainingChances > 5) {
        console.log(blue(`-----------------------------------\nThis word has ${word.length} characters.\n\n${letterDisplay.join("  ")}`))
      } else if (remainingChances > 3) {
        console.log(String("\033[1;35m" + `-----------------------------------\nThis word has ${word.length} characters.\n\n${letterDisplay.join("  ")}` + "\033[1;33m"))
      } else if (remainingChances > 1) {
        console.log(brightYellow(`-----------------------------------\nThis word has ${word.length} characters.\n\n${letterDisplay.join("  ")}`))
      }



    
    
    console.log(`\nList of your guessed characters: ${listOfGuessedLetters.concat()}`)
    

 
    const userInput = readline.question("\033[1;34m" + `\n***************\nGuess a letter: ` + "\033[1;33m").toLowerCase() ;
  
    console.log(chalk.bgBlue("You Guessed:", userInput))
   
    // Check if it is correct or not 
          if  (userInput.length > 1 || !isNaN(userInput)) { // why is typeof not working?
            console.log(`${userInput} is not valid. Please try again. You have '${chalk.bold.yellow(remainingChances)}' chance(s) left!`)
              if (userInput.length < 1) {
              const test = "empty space"
              console.log(chalk.bgYellow(chalk.blue("You entered nothing!")))
              listOfGuessedLetters.push(test)
          }
            }

          else if (checkGuess(word, userInput) === true) { // If userInput is correct
            console.log(orange(`Nailed it! Correct guess!!! You have '${chalk.bold.yellow(remainingChances)}' chance(s) left!`))
                listOfGuessedLetters.push(userInput)
                charReplacer (userInput, word, letterDisplay) 
                
            }
              else { // Otherwise, decrease the remiainingChances by 1
              remainingChances --;
              console.log(brightBlue('\nOoops! Wrong guess!') + orange(`\nYou have '${chalk.bold.yellow(remainingChances)}' chance(s) left!`))
              listOfGuessedLetters.push(userInput)
              } 

    } // While loop ends here

    console.log(`\nYour Guesses were: ${listOfGuessedLetters}.\nThe secret word was '${word}'\n`)


    if (!letterDisplay.includes("_")) { // If the player won
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
      console.log(brightYellow(`\So guessing is not your thing, huh? jkjk! the word was ${word}! \nYou did well`) + " " + whiteBright(`${enterUserName}!`))
      const startNewGameWhenLost = readline.question(orange(`\nMaybe you can try again?\nif yes, press 'y', if not, press 'n':`))
      if (startNewGameWhenLost === 'y') {
        console.log(brightBlue(`\n*****Maybe you will beat the game this time? huh?*****\n`))
        run()
    } else {
      console.log(`********************************************\n\nThank you for playing today! Have a good day!\n\n*********************************************`)
    }
  }
      
}

run();
