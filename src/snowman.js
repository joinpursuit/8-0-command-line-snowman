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

//Create empty array of underscores to start

//Loop start
//Display
  //Remaining Guesses
  //Guessed letters/words
  //Empty array above
  //

//Check Input
  //I'm allowing full word guesses, maybe allow weird non letters but also return a message questioning your decisions

//Update Display, 
  //push to array of guessed
  //update word if applicable(maybe use splice(i,1,letter))

//Check if done or out of lives
  //if done break loop
  //If win return word and congrat msg 
    //If win by word input return a different message
    
  //might include a continue option for like 2 extra lives or something
    //should probably be asked for continues before the end of the loop
    //finished display, should have remaining lives, continues used if any, final word, random congrats msg
    //play again or finished prompt

function guessCheck(input, word){
  if (input.length > 1){
    if (input.toLowerCase() === word){
      return true
    }else{return false}
  }else{
    if (word.includes(input.toLowerCase())){
      return true
    }else { return false}
  }
}

function charReplacer(input, word, wordDisplay){//should be ran if guess check returned true
  for (let i = 0; i < word.length; i++){
    if (word[i] === input.toLowerCase()){
      wordDisplay.splice(i,1,input)
    }
  }
}

function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  let wordDisplay = []
  let guessedLetters = []
  let lives = 7
  let continues = 0
  for (let i = 0; i< word.length; i++){
    wordDisplay.push('_')
  }
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
    After a user hits the 'return' key, the rest of the code will run.
  */
  while(wordDisplay.includes('_') && lives > 0){
    console.log(`\n___________________________________________________________________\n___________________________________________________________________\n\n${wordDisplay.join(' ')}\n\nGuessed Values: ${guessedLetters.join(', ')}\n\nYou have ${lives} guesses remaining\n`)
    const userInput = readline.question("Guess a letter: ");
    // This line of code will print out whatever is inputted in by the user.
    if (guessCheck(userInput, word)){
      if (guessedLetters.includes(userInput)){
        console.log(`Already guessed ${userInput}, but it's all good.`)
      }else{
        guessedLetters.push(userInput)
        charReplacer(userInput, word, wordDisplay)
        if(userInput === word){
          for (let letter of word){
            charReplacer(letter, word, wordDisplay)
          }
        }
      }
    }else{
      lives -=1
      if (guessedLetters.includes(userInput)){
        console.log(`Already guessed ${userInput}, still taking a life though.`)
        guessedLetters.push(userInput + ' again')
      }else{
        guessedLetters.push(userInput)
      }
    }
    if (lives === 0) {
      const cont = readline.question("Out of Lives, CONTINUE? y/n");
      if (cont === 'y'){
        lives +=2
        continues += 1
        console.log('2 more lives added\n')
      }
    }
  }
  if (wordDisplay.includes('_')){
    console.log(`\nLost this time to "${word}."`)
  }else if(continues === 0){
    console.log(`\nCongratulations you got the word "${word}" with no continues.`)
  }else{console.log(`\nCongratulations you got the word "${word}" with ${continues} continues.`)}
  const newGame = readline.question('\nWould you like to start a new game? y/n\n')
  if (newGame === 'y'){
    run()
  }else{console.log('Thank you for playing!!')}

}

run();
