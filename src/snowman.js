/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");



const wd = require("word-definition");


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


//Global Variables

let guessesArray = []

let lives = 7

let playAgain = true
  


//Gets the word and its definition and starts the game 
function startGame(){
    const word = getRandomWord();
    wd.getDef(word, "en", null, function(definition){
      //console.log(`HINT: ${definition.definition}`)
      if(run(definition.definition, word)){
        startGame()
      }
    
    });
}

//Restarts the game 
function isPlayingAgain(word){
  console.clear()
  console.log(`The word was ${word}`)
  if(readline.keyInYN("\nWould you like to play again..")){
    return true
  }
  return false
}


//Builds blank spaces for letters in hinden word
function wordUnderScore(word){
  let underScore = ''
  for(const i in word){
    underScore += '_ '
  }
  return underScore
}

//Check if user input is a letter
function isValidChar(input, word){
  if(input === word){return true}
  let valid = true
  if(input.match(/[a-z]/g) === null){
    valid = false
  } else if (input.length > 1){
    valid = "Enter one letter at a time"
  } else if (guessesArray.includes(input)){
    valid = "You've already guessed that letter"
  } else if (!word.includes(input)) {
    guessesArray.push(input)
  }

  return valid
}

//Reveals a letter when given a valid input
function revealLetter(underScore, input, word){
  if(input === word){return word}

  let reveal = underScore.split(' ')
  for(const i in word){
    if(input === word[i]){
      reveal.splice(i, 1, "\033[32m"+`${word[i]}`+"\033[39m")
    }
  }
  
  return reveal.join(' ')
}

//Removes a live if guess is the wrong letter
function removeLives(validChar, userInput, word){
  let removeLife = false
  if(validChar && !(word.includes(userInput))){
    removeLife = true
  }

  return removeLife
}

//Stops the game if player is out of lives or the word is guessed
function isStillPlaying(lives, underScore, word){
  underScore = underScore.split(' ').join('').trim()
  underScore = underScore.split('\033[32m').join('').split('\033[39m').join('').trim()
  let keepLooping = true
  if(lives === 0 || underScore === word){
    keepLooping = false
  }
  return keepLooping
}

function livesColor(lives){
  switch (true) {
    case lives > 6:
      return "\033[32m"+`🐵 `+lives+"\033[39m"
    case lives > 4:
      return "\033[33m"+`🙊 `+lives+"\033[39m"
    case lives > 2:
      return "\033[31m"+`🙉 `+lives+"\033[39m"
    case lives > 0:
      return "\033[31m"+`🙈 `+lives+"\033[39m"
  }
}


function run(hint, word){
  //CC- Get `userInput`
  //CC- Send `userInput` to function `isValidChar()` to check for valid characters
  guessesArray = []
  //Declare variable `underScore` = `wordUnderScore(`word`)`
  let underScore = wordUnderScore(word)
  //Declare variable `keepLooping` = true
  let keepLooping = true
  //Declare variable `lives` = 7
  lives = 7
  //While `keepLooping`
  while (keepLooping){
    console.clear()
    //console.log(word)
    console.log(`❌`+"\033[31m"+` ${guessesArray.sort().join(', ')}`+"\033[39m"+`\n\n${livesColor(lives)}`)
    //Console log `hint`
    console.log(`\n\tHINT: ${hint}`)
    //Console log `underScore`
    console.log(`\n\t\t${underScore}`)
    //Letters Guessed
    //console.log(`\tLETTERS GUESSED: ${guessesArray.sort().join(', ')}`)
    //Declare const `userInput` equal to `readline.question("Guess a letter: ")`
    const userInput = (readline.question("\n\t\tGuess a letter: ")).toLowerCase()
    //const userInput = 'zz'
    //Declare variable `validChar` = isValidChar(`userInput`)
    const validChar = isValidChar(userInput, word)
    //Compare `validChar` to/=== true
    if(validChar === true){
      //if true ressign `underScore` = `revealLetter(`underScore`, `userInput`)`
      underScore = revealLetter(underScore, userInput, word)
    }
    //Compare typeof `validChar` to === 'string'
    else if (typeof validChar === 'string'){
      //if 'string' console log `validChar` ---> "You've already guessed that letter"
      console.log(`\n\t   ${validChar}`)
      //---> press enter to try again ---> continue
      readline.question(`\n\n\t   Press Enter to continue...`)
      continue;
    } else {
      //if false console log "`userInput` is not a letter"
      console.log(`\n\t\t${userInput} is not a letter`)
      //---> press enter to try again ---> continue
      readline.question(`\n\t   Press Enter to continue...`)
      continue;
    }
    //Set `removeLife` equal to/= `removeLives(`validChar`, `userInput`)`
    let removeLife = removeLives(validChar, userInput, word)
    //Compare `removeLife` to/=== true
    if (removeLife){
      //if true `lives`--
      lives--
    }
    //Set `keepLooping` equal to/= `isStillPlaying(`lives`, `underScore`)`
    keepLooping = isStillPlaying(lives, underScore, word)
  }
  //Declare variable const `playAgain` = `isPlayingAgain()`
  playAgain = isPlayingAgain(word)
  //return `playAgain`
  return playAgain
}


startGame()