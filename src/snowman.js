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
  
  //Declare variable called `dashes` empty string
  let dashes = ''
  
  //iterate through `word` string, each element called `letter`
  for (const letter of word) {
    //ADD to `dashes` += '_'
    dashes += '_'
  }
  
  /*
  The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
  
  The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
  
  After a user hits the 'return' key, the rest of the code will run.
  */
 //Declare empty array called `guessesArray`
 let guessesArray = []
 
 //Declare variable called `tries` = 0
 let tries = 7
 
 
 //Keep looping if user has tries left or hasn't solved word
 while (tries > 0 && dashes !== word) {
   console.clear()
   console.log(word)
   
    // Console.log `dashes`
    console.log(dashes)
    
    // This line of code will print out whatever is inputted in by the user.
    console.log("THE USER GUESSES:", guessesArray.join(', '));

    console.log(`You have ${tries} guesses remaining`)

    const userInput = readline.question("Guess a letter: ");

    const userInput2 = userInput.toLowerCase()

    // if (userInput2 === word){
    //   dashes = word
    //   break;
    // }

    if(userInput2.match(/[a-z]/g) !== null && userInput2.length === 1) {
    
    if(word.includes(userInput2)){
      let arrDashes = dashes.split('')
      for(const i in word){
        if(userInput2 === word[i]){
          arrDashes.splice(i, 1, word[i])

        }
      }
      dashes = arrDashes.join('')
      //console.log("Space")

    } else if (!word.includes(userInput2) && !guessesArray.includes(userInput2)){
      //`tries`++
      tries--
    }


    //Compare `userInput2` to `guessesArray` using .includes
    if (guessesArray.includes(userInput2)){
      console.log(`You've guessed ${userInput2} already, try again`)

    } else {
      //if false .push `userInput2` into `guessesArray`
      guessesArray.push(userInput2)
    }
    
  } else {
    console.log(`"${userInput2}" is not a valid input`)
    readline.question("Press Enter to Continue...")
  }
   
  }
  
  console.clear()

  console.log(`The hidden word was ${word}`)
  
  if(dashes === word){
    console.log('Congratulations you won!!')
  } else {
    console.log('You\'ve run out of tries, Try Again')
  }





  
}

run();
