/*
  `readline-sync` is a library allowing you to access user input from the command line and
   is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");

const dictionary = require("./dictionary");


// ====== STATE ======
let state = {
correctGuesses: [],
wrongGuesses: [],
maxNumWrongGuesses: 6
}

// HELPER FUNCTIONS - returns True : False depending on right or wrong letter is found
function isGuessCorrect(guess){
  return word.includes(guess);
}
// console.log(isGuessCorrect("a"));


function addCorrectGuessToList(guess){
  state.correctGuesses.push(guess);
  return correctGuesses;
}
  //Is a string.
  const word = getRandomWord();
  //TODO: Put that random word into state!


  function getRandomWord() {
    const index = Math.floor(Math.random() * dictionary.length);
    return dictionary[index];
  }

function run() {
  
  let underScoredWord = "";

  // Create accumulator for handling isGivenLetterInWord, bool, false


  while(state.maxNumWrongGuesses > 0){
    const givenLetter = readline.question("Guess a letter: ");
    console.log("THE USER INPUTTED:", givenLetter);
    let isCorrect = isGuessCorrect(givenLetter);

    for(let i=0;i<word.length;i++){
      underScoredWord += "_";
      
      if(i !== word.length-1){
        if(word[i] === givenLetter){
          underScoredWord += givenLetter;
        } else {
          underScoredWord+=" ";
          state.maxNumWrongGuesses--; 
        } 
      }
    }
    console.log("Word: " + underScoredWord);
    
    console.log("Number of incorrect guesses left: " + state.maxNumWrongGuesses);
  } 
}

run();

  /*
    The code below stops execution of program to ask for user input who can enter whatever! 
    The text that shows up to the user is "Guess a letter: ". 
    Whatever is entered will be assigned to the variable `userInput`.
    After a user hits the 'return' key, the rest of the code will run.
  */

  //TODO: Check if the guess is correct
  //TODO: If correct, add to correct guesses
/*
 setup game state
 what data do I need to access or update?
 - secret word
 - correct guesses
 - incorrect guesses
 - max # of wrong guesses

 What do we do with that data?
 HELPER FUNCTIONS THAT USE STATE
 - put a random secret word into state
 - check if a guess is correct
 - add a correct guess to the list
 - check if the game is won
*/

// My snowman from  
// https://www.khanacademy.org/computer-programming/snowman/823735629


// // set the size of the biggest snowball
// var snowballSize = 154;
// // set x coordinate of the snowman
// var snowmanX = 200;

// // eye size
// var eyeSize = 12;
// var distanceFromCenter = 22;

//TODO: CREATE CONST BACKGROUND 

// const box = rect(0, 900, 1200, 300);
// const ground = rect(0, 300, 400, 100);
// const groundFill = (232, 235, 237);
// const sky = background(178, 231, 255);

// we don't need outlines for any of these shapes
// noStroke();??


// if(maxNumWrongGuesses = 1){
//   // bottom circle
//   return fill(255, 255, 255), 
//   ellipse(snowmanX, 309, snowballSize, snowballSize);
//   // (snowmanX, 200, 300, 150, 150);
// } if(maxNumWrongGuesses = 2){
//   // middle snowball shadow
//   return fill(255, 255, 255)/
//   ellipse(snowmanX, 212, 0.8 * snowballSize, 0.8 * snowballSize),
//   fill(240, 240, 240), 
//   ellipse(snowmanX, 218, 0.8 * snowballSize, 0.8 * snowballSize),
//   // buttons
//   fill(153, 40, 40), ellipse(snowmanX, 194, 10, 10),
//   ellipse(snowmanX, 222, 10, 10);

// } if(maxNumWrongGuesses = 3){
//   // head and face snowball
//   return fill(255, 255, 255), 
//   ellipse(snowmanX, 123, 0.6 * snowballSize, 0.6 *snowballSize),
//   // nose
//   fill(255, 119, 0),
//   triangle(snowmanX, 136, snowmanX, 147, snowmanX + 25, 151),
//   // eyes
//   ellipse(snowmanX - distanceFromCenter, 129, eyeSize, eyeSize),
//   ellipse(snowmanX + distanceFromCenter, 129, eyeSize, eyeSize);

// } if(maxNumWrongGuesses = 4){
//   // left arm
//   return stroke(43, 38, 38), strokeWeight(2),
//   line(snowmanX - 127, 140, snowmanX - 58, 187),
//   line(snowmanX - 109, 117, snowmanX - 101, 157),
//   line(snowmanX - 132, 171, snowmanX - 91, 165);
// } if(maxNumWrongGuesses = 5){
//   // right arm
//   return stroke(43, 38, 38),
//   strokeWeight(2),
//   line(snowmanX + 61, 192, snowmanX + 135, 144),
//   line(snowmanX + 104, 165, snowmanX + 142, 169),
//   line(snowmanX + 86, 176, snowmanX + 113, 125);
// } if(maxNumWrongGuesses = 6){
//   // hat
  
//   return fill(43, 38, 38), 
//   rect(snowmanX - 63, 92, 126, 5),
//   rect(snowmanX - 39, 37, 76, 60);
// }