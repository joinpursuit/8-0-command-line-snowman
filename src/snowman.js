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
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

    After a user hits the 'return' key, the rest of the code will run.
  */
  //const userInput = readline.question("Guess a letter: ");
  // This line of code will print out whatever is inputted in by the user.
  let wordCharacterArr =[];
  // making an empty array that will contain letters of the word generated from getRandomWord(). Using an array so I can loop through & compare userInput
  let letterSpaceArr =[];  // creating an array that will hold dashes that will equal word.length
  //below I create a variable for remaining guesses, starting with the number 6.
  let remainingGuess = 6;
  let count = 0; // trying to tally the muliple matched letters.  I will use this in spice hopefully to elminate proper number pf spaces, also , to add back to remaining guesses
  let guessedLetters = []

  for (let i =0;i < word.length; i++){
      wordCharacterArr.push(word.charAt(i));
      letterSpaceArr.push("_");
      // I want to put a while conditional here but it seems to be throwing off the results.  while (remaining guess > 0) , we want to continue to guess letters
    } 
    while (remainingGuess > 0){
      console.log(letterSpaceArr);
      const userInput = readline.question("Guess a letter: "); 

      console.log(word);// this is a helper for me to test my results

      
      if (userInput.length > 1){
        console.log(`Please enter a valid letter`);
        //console.log(letterSpaceArr);
        //console.log(`you have ${remainingGuess} guesses remaining.`);
        // if there is no matching userInput, I want the game to continue , and i will not subtract from remainingGuess

      }  if (userInput.length === 1 && !wordCharacterArr.includes(userInput)) {
            guessedLetters.push(userInput);
            console.log("THE USER INPUTTED:" +  guessedLetters);
            console.log(`you have ${remainingGuess} guesses remaining.`);
            console.log (letterSpaceArr);        
      } 
        if (wordCharacterArr.includes(userInput)){
            guessedLetters.push(userInput);

          for (let j =0; j < wordCharacterArr.length; j++){
            //let allCharacters = wordCharacterArr[j]; // Im creating variable for each array to compare values once letterspaceArr is complete.
            //let newAnswer  = letterSpaceArr[j];

                if (userInput === wordCharacterArr[j]){
                  
                    remainingGuess--;
                    count++;
                    letterSpaceArr.splice(j,1,userInput);

                    console.log("THE USER INPUTTED: " +  guessedLetters);
                    console.log(`You took ${count} guesses, you have ${remainingGuess} guesses remaining.`);
                    

                    console.log(letterSpaceArr); 

                } if (wordCharacterArr.toString() === letterSpaceArr.toString()) {
                      remainingGuess = 0;
                      console.log (`You win! You took ${count} guesses`);
                    break; // else if it does match then we will print you win ! # of turns remaining 
                  }
        }
  
    }
//console.log (wordCharacterArr); 
}
}
run();
