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
};

// create a helper function to check for invalid guesses 
function valid (userInput) {
  // valid guesses included the following letters 
  const alphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
  // if the user inputted `&` or `7` or `09` or `%%`
  if (!alphabet.includes(userInput) && userInput.length >= 1) {
    return false
  }; 
};

// create a helper function to play snowman again
function playAgain() {
  /*
  The line of code below stops the execution of your program to ask for input from the user.
   
  The text that will show up to the user will be 'Do you want to play again? enter y/n '. Whatever value is entered will be assigned to the variable `userInput`.
  
  After a user hits the 'return' key, the rest of the code will run.
  */ 

 const rematch = readline.question('Do you want to play again? enter y/n ');
 
 // if the user entered 'y'
 if (rematch === 'y') {
   // lets run the game again by invoking the function 
   run()
   
   // otherwise the user entered 'n' or any other letter, any number or symbol
  } else {
    console.log('That\'s cool, byee ✌️')
    // the game will end
    return
  }
}

/*
This function will run your game. Everything you want to happen in your game should happen inside of here.

You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

Once you understand the code below, you may remove the comments if you like.
*/

function run() {
  // log snow decorations to make the interface more user friendly
  console.log('❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️');

  // log a brief description about the game to the console 
  console.log('L E T \'S  P L A Y  S N O W M A N')
  console.log('\nIt\'s "easy!" 🤔')
  console.log('Just find out what the mystery word is before you run out of guesses...')
  console.log('If you think you know the word enter the word')
  console.log('Otherwise, enter any lowercase letter one by one for a chance to win')
  console.log('\nG E T  R E A D Y 😎');

  // This line of code gets a random word. The `word` variable will be a string
  const word = getRandomWord(); //> 'send'
  console.log(word)

  /* 
   'underscoreWord' is an array and the number of elements are based on length of the random word generated 
   the elements are empty slots that get replaced by underscores
  */
  const underscoreWord = new Array(word.length).fill('_');

  // 'attempts' is the number of guesses the player gets
  const attempts = word.length + 4; //> 4 + 4 = 8

  // 'incorrect' gets reassigned to the number of incorrect guesses
  let incorrect = 0;

  // 'lettersGuessed' is where all the letters guessed will be pushed to 
  let lettersGuessed = []; 
  

  // as long as the player does not exceed their number of attempts they can continue to play
  for (let i = 0; incorrect < attempts; i++) {
    // log more snow decorations to make the interface more user friendly
    console.log('❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️');
    // log the 'underscoreWord'
    console.log(`\n${underscoreWord.join(' ')}\n`);
    // log the 'lettersGuessed' and join the strings in the array with a comma and a space
    console.log(`Guessed letters: ${lettersGuessed.join(', ')}\n`)
    // log the remaining guesses left
    console.log(`You have ${attempts - incorrect} guesses`)

    /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    
    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
    
    After a user hits the 'return' key, the rest of the code will run.
    */
    let userInput = readline.question('Please enter your guess: ');

    // if the letter has already been guessed
    if (lettersGuessed.includes(userInput)) {
      // log a message to tell the user that letter was already guesssed
      console.log('Already guessed, try another letter 🚫🔤')
      continue
    }
    // otherwise push the letter guessed into the array 'lettersGuessed'
    lettersGuessed.push(userInput);
   

    // correct guess
    if (word.includes(userInput)) { 

      // loop through the each character in the word 'send' 
      //       j = 1  1 < 3 
      for (let j = 0; j < word.length; j++) {
        // if the player guesses the right letter 'e' === 'e'
        if (word[j] === userInput) {
          // reaasign the underscore at index j to the letter && log something nice
          underscoreWord[j] = userInput;
          console.log('You got it! 🎯')

        } 
      } 

      // if they take a shot at guessing the word and get it right
      if (userInput === word) {
        // log snowmansss, a congratualtion, reveal the word they guessed correctly all on the console
        console.log('\n☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️')
        console.log('W O W, your amazing! 😎')
        console.log(`The word is ${word}\n`)
        // the player has a choice they can choose to play again or end the game
        playAgain()
        return
     
        // if the player wins 'send' === 'send'
      } else if (underscoreWord.join('') === word) {
        // log snowmans with winter emojis to set the vibe && reveal the word the player guessed correctly
        console.log('\n☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️ 🌨️ ☃️')
        console.log('Your amazing at this game!')
        console.log(`The word is ${underscoreWord.join('')}\n`)
        playAgain()
      }

      // wrong guess
    } else {

      // invoke the function valid and if the function returns false 
      if (valid(userInput) === false) {
        // log please enter a valid letter to the console
        console.log('\nPlease enter a valid letter 🚫')
        
        // if the word is uppercased 'SEND' and the user inputted the correct letter but uppercased 'S'
      } else if (word.toUpperCase().includes(userInput)) {
        // log correct but enter the lowercase letter to the console
        console.log('\nCorrect, but please enter the lowercase letter 👇');
      
        // if the user inputted the an incorrect uppercased letter 'M'  === 'M'        
      } else if (userInput === userInput.toUpperCase()) {
        // log please enter the lowercase letter to the console
        console.log('\nPlease enter a lowercase letter 🚫🧢');

      } else {
        // the count goes up and 'incorrect' gets reassigned to that number
        incorrect++
        console.log(`Wrong letter 🚫`)
      };
    };
  };
 
  console.log('❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️');
  // the player used up their number of attempts they cannot continue to play let's reveal the word
  console.log(`\nBetter luck next time. 🍀\nThe word was ${word}\n`);
  // the player has a choice they can choose to play a rematch or end the game
  playAgain()
  
};

run();

