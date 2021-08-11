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

// This will give me a random word from a dictionary .
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

// This helper function check if the word inputted is valid and change it accordingly.
function replaceSpaceToWord (computerWord,underStr,letter){
  if(computerWord.includes(letter)){
    underStr = underStr.split(""); // if the word includes letter we split.
    for (let i = 0; i < computerWord.length; i ++){ // then we loop the word.
      if(computerWord[i] === letter) { // if it is === to letter.
        underStr.splice (i , 1 ,letter);// we remove the space and add the letter.
      }
    }
    return underStr.join(""); // then we join the it back together .
  }
  else {
    return false ;  // if it doesn't include return nothing. 
  }
}

function checkWinner(str1,str2) {
  return str1 === str2 ;
}

// this helper function is checking if the input is valid.
function userInputCheck (userInput){
  return typeof userInput === "string" && userInput.length === 1 // checks if it is a string and the length is = 1  .
   && (userInput >= "a" && userInput <= "z"); // the alphabet is = or greater than a and lesser and = to Z
}

function run() {
  // All The variable we need !!

  let allV = {
    startGame : true , //variable boolean to start the game 
    numTries : 7,     //number of allowed tries 
    inputStr : "",   // keep track of the users
    randWord : getRandomWord(),  // This line of code gets a random allV.randWord. The `Word` variable will be a string.
    
  }
  let spaceRepeat = "_".repeat(allV.randWord.length); //gets correct number of spaces the word has .
  

  console.log("                     Snow-Man  ") // The game Header .
  console.log(allV.randWord); // it shows us the word // just for practice.
  console.log(`     Word : ${spaceRepeat} ` + "\n" );

while(allV.startGame){ 
   // console logs the game instruction. 

   console.log("Guess The Letter in Space To Win !!! : ",  [allV.inputStr] + "\n" );
   console.log("* * * * * * * * * * * * * * * * * * * * * *  ");
   console.log(`You Have ${allV.numTries} Lives Remaining  -_-  \n `); // shows us the remaining lives. 
   console.log("* * * * * * * * * * * * * * * * * * * * * * ");

   //read the user input
   let userInput = readline.question("You guessed --> ")
   // add input to allV.inputStr
   allV.inputStr += ", " + userInput;
   // check if the input is valid 
   if(userInputCheck(userInput)){
     // checking if we have a string or a boolean 
     let checkIfBoolean = replaceSpaceToWord(allV.randWord, spaceRepeat, userInput ) // this will see if the user inputted a correct word.
     // check if false , decrement the number of tries
     if(!checkIfBoolean){
       allV.numTries--;
      console.log(spaceRepeat);
     }
     // change the value of the under string 
    else { 
      spaceRepeat = checkIfBoolean;
      console.log(spaceRepeat);
     }
    }else {
    console.log( "\n" + " WRONG!! Plz Enter A Valid Letter " + "\n" )
    continue;
    }
   if (checkWinner( allV.randWord , spaceRepeat) || !allV.numTries ) {
     console.log(checkWinner(allV.randWord,spaceRepeat));
     console.log ? " You won !! " : " you lost the game! " ;
     allV.startGame = false;
   }

   if(allV.numTries === 1){
     console.log("||||||||||||||||||||||||||||||");
     console.log("YOU HAVE 1 LIVES REMAINING !!!  *_* ")
     console.log("||||||||||||||||||||||||||||||");
   }

  if (!allV.startGame){
    let keepPlaying = readline.question("Do you want to keep playing (y or n): ").toLowerCase();
    if (keepPlaying !== "n" && keepPlaying !== "no") {
    run ();
   }
  }
 }
}

console.log("   ***  *      **    *   *   ");
console.log("   ***  *     ****    ***    ");
console.log("   *    ***  *    *    *     ");

run();
