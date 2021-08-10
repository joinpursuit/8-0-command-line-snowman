
const readline = require("readline-sync");

const dictionary = require("./dictionary");

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
//----------------------------------------------------------------//

//checks if userinput is correct 
function checkGuess (randomWord, guess) { 
  if (randomWord.includes(guess)) {
    return true
  } else {
    return false
  }
}
//the userinput matches 
//replace the "_" with userinput
//convert to lowercase
function charReplacer (guess, word, letterDisplay) {
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess) {
      if (word[i] === guess.toLowerCase()){
        letterDisplay.splice(i,1,guess)
      }
    }
  }
}

let listOfGuessedLetters = "";
const userName = readline.question(`Enter your name:  `)


function run(){
  const greeting = readline.question(`\nWelcome to Ki Sub & Fatema's Snowman Game World!\n\nPress the 'return' button to play the game!`);

  const word = getRandomWord(); 
  //generates a random word
  //console.log(word)
  let remainingChances = word.length + 1 
  const letterDisplay = [];

  //converts each letter of the word to "_" / empty blanks 
  function convertToUnderScore (word) {
  for (let character of word) {
    character = "_"
    letterDisplay.push(character)
    }
  }
  convertToUnderScore (word)
    //the loop that allows the game to continue
  while (remainingChances > 0 && letterDisplay.includes("_")) {
    console.log(String(`\nThis word has ${word.length} characters.\n\n${letterDisplay.join("  ")}`))
    console.log(`\n\nYou guessed: ${listOfGuessedLetters}`)
    const userInput = readline.question(`\n\nGuess a letter: `);
    
    // console.log(`You Guessed: ${listOfGuessedLetters}`);
    //check if userinput is correct or wrong
    //check if userInput is a valid character (userinput === number, multiple letters)
    //if user guesses wrong letter remaning chances decrement by 1
    //if user guesses invalid character no change in remaining chances count 
    //prompt accordingly
    //if userinput guesses are letters (only) add it to listofguessedletters
  if (userInput.length > 1 || !isNaN(userInput)) { 
    console.log(`Not a valid entry, please enter a letter! You have '${remainingChances}' chance(s) left!`)
  } else if (checkGuess(word, userInput) === true) {
    console.log(`Yay, that is correct! You have '${remainingChances}' chance(s)!`)  
    listOfGuessedLetters += userInput + " "
    charReplacer (userInput, word, letterDisplay) 
    }
    else {
      remainingChances --;
      console.log(`\nOh, no! That is incorrect!\nYou have '${remainingChances}' chance(s)!`)
      listOfGuessedLetters += userInput + " "
    } 
  } 
  //prompt message for a win or loss 
  if (letterDisplay.join("") === word) {
    console.log(`\nYay! You got it, the correct word is "${word}"!!\nCongratulations ${userName}!`)
    const startNewGame = readline.question(`Do you want to test your luck again?\nIf yes, press 'y'\nIf not, press 'n'`) 
    if (startNewGame === 'y') {
      console.log(`\nFeeling lucky ${userName}?! Let the game begin ...`)
      run()
    } else {
      console.log(`\nYou are a great sport ${userName}! Have a good day!`)
      }
    }
  if (remainingChances === 0) {
      console.log(`\nAlways a next time ${userName}!\nThe correct word is '${word}'.`)
      const startNewGameWhenLost = readline.question(`Wanna try again?\nIf yes, press 'y'\nIf not, press 'n'`) 
    if (startNewGameWhenLost === 'y') {
      console.log(`\nGood Luck ${userName}!`)
      run()
    } else {
      console.log(`\nHave a great day ${userName}!`)
    }
  }
}
run();


//how can i start / play the game
//ask for userinput
//if the userInput = word 
//replace the "_" with the matching userInput
//once the user guesses the correct word = win
//game ends when user wins(guesses the right word)
//if there are no ("_") remaining the game ends = win
//game ends when the user wins with an alert that congratulates the user "you win, the word is correct"
//if the userInput is a wrong letter / doesn't match any letter in the word
//incorrectGuess count decrements by 1
//if incorrectGuess count is 0 the user has no chances left game ends
//the game ends when the game is lost with an alert "you lost"
//if the user guesses a wrong character (number or multiple letters)
//if(userInput typeOf = number || symbol)
//remaining incorrect guess count doesn't change but an alert pops up saying ... please enter a letter


       
     

  
  

  

         
  
        
  


 
 
 
 
 
 


   
  
  



