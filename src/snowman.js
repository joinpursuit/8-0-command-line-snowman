
const readline = require("readline-sync");

const dictionary = require("./dictionary");

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
//----------------------------------------------------------------//
const userName = readline.question(`\nEnter your name:  `)

function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  const word = getRandomWord();
  let validEntry = "abcdefghijklmnopqrstuvwxyz"
  let wrongEntryType = "Not a letter, please enter a letter!"
  let endMessage = `\nOh,no 🧊🧊🧊! Sorry ${userName}, better luck next time! The correct word is "${word}".`
  let winningMessage = `\nYay! The word "${word}" saved your ⛄, ${userName}!`
  let incorrectGuesses = word.length + 1 
  let lettersGuessed = ""
  let theBlanks = ""

  for (let i = 0; i < word.length; i++){
    theBlanks += "_ "
  }
    console.log("\nWord: " + theBlanks)   
    console.log("Remaining Incorrect Guesses: " + incorrectGuesses)
    console.log("Letters Guessed: " + lettersGuessed)

  //the loop that starts the game + continue the game
  for (let i = 0; i < word.length; i++){
    //The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    let userInput = readline.question("\nPick a letter: ")
    userInput = userInput.toLowerCase()
    if(validEntry.includes(userInput) && userInput.length === 1){
      lettersGuessed += userInput + " "
    } 
  //lets the game actually work 
  //the loop that matches the guesses  
  //replaces the "_" with the userInput
  for (let i = 0; i < word.length; i++){
    if(userInput === word[i]){
      theBlanks = theBlanks.split("")
      theBlanks.splice(i*2, 1, userInput)
      theBlanks = theBlanks.join('')
    } 
  }
    //decrement remaining incorrect guess count each time user enters a wrong guess(letter only).
    if(!word.includes(userInput) && validEntry.includes(userInput)){
    incorrectGuesses --
    } 
    else if(userInput.length > 1 || !validEntry.includes(userInput)){
      console.log(wrongEntryType);
    }
      console.log("\nRemaining Incorrect Guesses: " + incorrectGuesses)
    //once the incorrectGuesses = 0 the game ends with an alert saying you lost
    if(incorrectGuesses === 0){
      return console.log(endMessage);
    }
      console.log("\nWord: " + theBlanks)
      console.log("Letters Guessed: " + lettersGuessed)
      console.log("You guessed:", userInput);
    if(!theBlanks.includes("_")) {
      return console.log(winningMessage);
    } 
      else {
           i--
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
//if(userInput typeOf = number || multiple letters)
//remaining incorrect guess count doesn't change but an alert pops up saying ... please enter a letter


       
     

  
  

  

         
  
        
  


 
 
 
 
 
 


   
  
  



