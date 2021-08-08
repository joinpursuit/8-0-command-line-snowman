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
  

// function run(hint) {
//   // This line of code gets a random word. The `word` variable will be a string.

  
//   //Declare variable called `dashes` empty string
//   let dashes = ''
  
//   //iterate through `word` string, each element called `letter`
//   for (const letter of word) {
//     //ADD to `dashes` += '_'
//     dashes += '_ '
//   }
  
//   /*
//   The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
  
//   The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
  
//   After a user hits the 'return' key, the rest of the code will run.
//   */
//  //Declare empty array called `guessesArray`
//  let guessesArray = []
 
//  //Declare variable called `tries` = 0
//  let tries = 7

//  let foundWord
 
 
//  //Keep looping if user has tries left or hasn't solved word
//  while (tries > 0 && foundWord !== word) {
//    console.clear()
//    console.log(word)
   
   
//    console.log(`💜 ${tries}`)
   
//    if(tries < 6){
//      console.log(`\t\tHINT: ${hint}\n`)
     
//     } else {
//       console.log('\n')
//     }
    
//     // wd.getDef(word, "en", null, function(definition) {
//       //   console.log(definition.definition);
//       // });
      
      
    
      
      
//       // Console.log `dashes`
//       console.log(`\n\t\t\t${dashes}\n`)
      
      
//       // This line of code will print out whatever is inputted in by the user.
//       console.log("\n\t\tLETTERS GUESSED\n\t\t", guessesArray.join(', '));
      
//       //console.log(`\t\tYou have ${tries} guesses remaining`)
      
//       const userInput = readline.question("\n\n\t\tGuess a letter: ");
      
//       const userInput2 = userInput.toLowerCase()
      
//       if (userInput2 === word){
//         foundWord = word
//         break;
//       }
      
//       if(userInput2.match(/[a-z]/g) !== null && userInput2.length === 1) {
        
//         if(word.includes(userInput2)){
//           let arrDashes = dashes.split(' ')
//           for(const i in word){
//             if(userInput2 === word[i]){
//               arrDashes.splice(i, 1, word[i])
              
//             }
//           }
//           dashes = arrDashes.join(' ')
//           //console.log("Space")
          
//         } else if (!word.includes(userInput2) && !guessesArray.includes(userInput2)){
//           //`tries`++
//           tries--
//         }
        
        
//         //Compare `userInput2` to `guessesArray` using .includes
//         if (guessesArray.includes(userInput2)){
//           console.log(`You've guessed ${userInput2} already, try again`)
          
//         } else {
//           //if false .push `userInput2` into `guessesArray`
//           guessesArray.push(userInput2)

//         }
        
//       } else {
//         console.log(`\n"${userInput2}" is not a valid input`)
//         readline.question("\nPress Enter to Continue...")
//       }
      
//       foundWord = dashes.trim().split(' ').join('')
//       console.log(foundWord.length)
//       console.log(foundWord === word)
//     }
    
//     console.clear()
    
//     console.log(`The hidden word was ${word}`)
    
//     if(foundWord === word){
//     console.log('Congratulations you won!!')
//   } else {
//     console.log('You\'ve run out of tries, Try Again')
//   }

//  if(readline.keyInYN("\nPlay Again....?")){
//     word = getRandomWord()
//     startGame()
//  } else {
//    console.clear()
//  }



  
// }


 
function startGame(){
    const word = getRandomWord();
    wd.getDef(word, "en", null, function(definition){
      //console.log(`HINT: ${definition.definition}`)
      if(run(definition.definition, word)){
        startGame()
      }
    
    });
}

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
    underScore += '_'
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
  } else {
    guessesArray.push(input)
  }

  return valid
}

//Reveals a letter when given a valid input
function revealLetter(underScore, input, word){
  if(input === word){return word}

  let reveal = underScore.split('')
  for(const i in word){
    if(input === word[i]){
      reveal.splice(i, 1, word[i])
    }
  }
  
  return reveal.join('')
}


function removeLives(validChar, userInput, word){
  let removeLife = false
  if(validChar && !(word.includes(userInput))){
    removeLife = true
  }

  return removeLife
}

function isStillPlaying(lives, underScore, word){
  let keepLooping = true
  if(lives === 0 || underScore === word){
    keepLooping = false
  }
  return keepLooping
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

    console.log(word)

    console.log(lives)

    //Console log `hint`
    console.log(`HINT: ${hint}`)

    //Console log `underScore`
    console.log(underScore)

    //Letters Guessed
    console.log(`LETTERS GUESSED: ${guessesArray.sort().join(', ')}`)

    //Declare const `userInput` equal to `readline.question("Guess a letter: ")`
    const userInput = (readline.question("Guess a letter: ")).toLowerCase()
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
      console.log(validChar)
      //---> press enter to try again ---> continue
      readline.question("Press Enter to continue...")
      continue;
    } else {
      //if false console log "`userInput` is not a letter"
      console.log(`${userInput} is not a letter`)
      //---> press enter to try again ---> continue
      readline.question("Press Enter to continue...")
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
  let playAgain = isPlayingAgain(word)

  //return `playAgain`
  return playAgain
}


startGame()