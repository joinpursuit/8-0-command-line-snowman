/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
/*
  The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
*/
const dictionary = require("./dictionary");
/*
  This function returns a random allV.randWord from the list in `src/dictionary.js`. You do not need to update or edit this function. Instead, you only need to call it from the `run()` function.
*/
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

function replaceSpaceToWord (computerWord,underStr,letter){
  if(computerWord.includes(letter)){
    underStr = underStr.split("");
    for (let i = 0; i < computerWord.length; i ++){
      if(computerWord[i] === letter) {
        underStr.splice (i , 1 ,letter);
      }
    }
    return underStr.join("");
  }
  else {
    return false ;
  }
}

function checkWinner(str1,str2) {
  return str1 === str2 ;
}
// this helper function is checking if the input is valid 
function userInputCheck (userInput){
  return typeof userInput === "string" && userInput.length === 1
   && (userInput >= "a" && userInput <= "z");
}
/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/

function run() {

  // All The variable we need !!

  let allV = {
     //variable boolean to start the game 
    startGame : true ,
    //number of allowed tries 
    numTries : 7,
    // keep track of the users
    inputStr : "",
    // This line of code gets a random allV.randWord. The `Word` variable will be a string.
    randWord : getRandomWord(),
  }
  // //gets correct number of spaces
  let spaceRepeat = "_".repeat(allV.randWord.length);

  console.log("                     Snow-Man  ")

  // console.log(allV.randWord);

  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */

console.log(`     ${spaceRepeat} ` + "\n" );

while(allV.startGame){
   //show the player how many underscore.
   console.log("Guess The Letter in Space To Win !!! : ",  [allV.inputStr] + "\n" );
   console.log(`you have ${allV.numTries} lives -_-  \n `);
   //read the user input
   let userInput = readline.question("You guessed : ")
   // add input to allV.inputStr
   allV.inputStr += ", " + userInput;
   // check if the input is valid 
   if(userInputCheck(userInput)){
     // checking if we have a string or a boolean 
     let checkIfBoolean = replaceSpaceToWord(allV.randWord, spaceRepeat, userInput )
     // check if false , decrement the number of tries
     if(!checkIfBoolean){
       allV.numTries--;
     }
     // change the value of the under string 
    else { 
      spaceRepeat = checkIfBoolean;
      console.log(spaceRepeat);
     }
    }else {
    console.log( "\n" + " WRONG!! please answer a valid letter " + "\n" )
    continue;
   }
    // This line of code will print out whatever is inputted in by the user.
  //  console.log("THE USER INPUTTED:", userInput + "\n" );

   if (checkWinner( allV.randWord,spaceRepeat) || !allV.numTries ) {
     console.log(checkWinner(allV.randWord,spaceRepeat));
     console.log ? " You won !! " : " you lost the game! " ;
     allV.startGame = false;
   }
   if(allV.numTries === 1){
     console.log("YOU HAVE 1 LIVES REMAINING (BE CAREFUL) *** ")
     continue ;
   }

  if (!allV.startGame){
    let keepPlaying = readline.question("Do you want to keep playing (y or n): ").toLowerCase();
    if (keepPlaying !== "n" && keepPlaying !== "no") {
    run ();
   }
  }
 }
}

console.log("   ---   -      -     -    -   ");
console.log("   ---   -     - -      --     ");
console.log("   -     ---  -   -     -      ");
run();
