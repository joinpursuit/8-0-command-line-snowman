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

  //declare empty string variable called "dashes"
  let dashes = ''

  //iterate through "word" string, each element is called "letter"
  for(const letter of word){
    //add an underscore to "dashes" (sort of a misnomer, but it stuck) 
    dashes += '_'
  }

  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */

    //Declare an empty array called "guessesArray" 
  let guessesArray = []

    //Declare a variable called "tries", set it equal to 7, so that we can decrement down for the number of tries left.
  let tries = 7

  //keep looping if the user has tries left, or if they haven't successfully guessed the full word yet.

  while(tries > 0 && dashes !== word){
    console.clear()
    console.log(word)
    console.log(dashes)
    //print whatever the user inputted
    console.log("YOU GUESSED: ", guessesArray.join(', '))
    console.log(`You have ${tries} guesses remaining`)

    const userInput = readline.question('Guess a letter: ')

    const userInput2 = userInput.toLowerCase()

    if(userInput2.match(/[a-z]/g) !== null && userInput2.length === 1){
      if(word.includes(userInput2)){
        let arrDashes = dashes.split('')
        for(const i in word){
          if(userInput2 === word[i]){
            arrDashes.splice(i, 1, word[i])
          }
        }
        dashes = arrDashes.join('')
      }else if(!word.includes(userInput2) && !guessesArray.includes(userInput2)){
        tries--
      }

      //compare "userInput2" to "guessesArray" using .includes() method.
      if(guessesArray.includes(userInput2)){
        console.log(`You've guessed ${userInput2} already, try again.`)
      }else{
        //if it evaluates to false, push "userInput2" into "guessesArray"
        guessesArray.push(userInput2)
      }
    }else{
      console.log(`"${userInput2}" is not a valid input`)
      readline.question('Press enter to continue...')
    }
  }

  console.clear()

  console.log(`The word was ${word}`)

  if(dashes === word){
    console.log('Congratulations! You won!')
  }else{
    console.log(`You/'ve run out of tries, try again.`)
  }

  
}

run();
