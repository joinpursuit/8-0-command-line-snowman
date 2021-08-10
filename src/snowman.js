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

function alphabet(n) {
  let alphabetta = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (alphabetta.includes(n) && n.length === 1) {
    return true;
  }
  return false;
}

/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
/**1. creat a function to get the user input meaning the letter they put in
 * 2. creat a function to check is a guess is incorrect
 * 3. maybe a function to access the  letters of the word to see if theyre incorrect or correct
 * we also have to keep track of the the letters the user inputs
 * keep track if its incorrect and if it is subtract it from the guesses we currently have left
 * the dashes have to be the length of the word taken from the random word function
 * if the letter is found in our word then we're going to have to replace the dash with said letter in the correct index
 * when we have out function to loop through our word to see if the inputed value is ther, then we can store that value in a created var and when we want to access the value we create an if statement to push that held value in the dashes
 * if this letter exists tell me what index it exists at in the array or string
 * if its correct then return the uservalue into the array index that it was found at
 * fuck a string we makin it an array and then at the end we can String() it
 *
 */
/*
Future Thangs
1. looking at the length of the random word and showing dashes versus the word 
2. console.log or return the phrases - remaining incorrect, letters guessed, word
3. edge case - user input should only take one character, it can only be part of the alphabet - not numbers, symbols
4. the final return should return most of the helper functions - the result of a helper function is stored as variable

Things to figure Out
1. grab the random word
2. compare the random word to the user input =  ( random word.includes(user.input)
3. if correct, another helper function to push the correct user input into something else - a correct array
4. if incorrect, another function to lower the amount of guesses in the "guesses letter"
  a. count the letter the are in the user input array?


Global Scope/State
1. correct array - the phrase and filled in spaces
2. incorrect array - user input that are not in the random word
3. the random word function
4.create an empty array
*/

function run() {
  const word = getRandomWord();
  const guessed = [];
  //starts with 9 guesses always
  let guessCounts = 9;
  const dash = "_";

  //this line is the amount of dashes thats equal in length to the word and then the Array.from is to make it into an array
  let dashes = Array.from(dash.repeat(word.length));
  //another way to do it word.replace(/[a-z]/g, '_')

  //while the guess counts (which is always 9) is more than 0
  while (guessCounts > 0) {
    //log the dashes
    console.log(`${dashes.join(" ")}`, word /*, word*/);
    //log the guess counts
    console.log("How many guesses you have left: " + guessCounts);
    //log the letters guessed
    console.log("Guessed:" + guessed);
    //this is the actaul code taking what the user is inputting (given)
    const userInput = readline.question("Guess a letter: ").toLowerCase();
    //log what the user input last
    console.log("THE USER INPUTTED:", userInput);
    //then we push the user input into the guessed array
    guessed.push(userInput);

    //if its anything outside of the alphabet or more then one character then "invalid input"
    if (!alphabet(userInput)) {
      console.log("Invalid input. Only letters. One by one pls.");
    }
    //if the word includes the user input
    if (word.includes(userInput)) {
      //then we'll for loop through word
      for (let i = 0; i < word.length; i++) {
        //if the word at any index is equal to the user input
        if (word[i] === userInput) {
          //then the word reveals the letter in place on the correct space
          dashes[i] = userInput;
        }
      }
      //else we subtract the guess count by 1 (becasue the guess is incorrect)
    } else {
      guessCounts--;
    }
    //if they win meaning they get the whole word
    if (word.toLowerCase() === dashes.join("").toLowerCase()) {
      //then congrats
      console.log(`The word was ${word}! Wonderful job honey (: `);
      return;
    }
  }
  //if while loop ends due to incorrect guesses
  if (guessCounts === 0) {
    //then we have a "better luck next time"
    console.log("Better luck next time! Try again.");
  }

  //if the user input is not included in the r

  //while the number of errors is less than the guesscounts

  // This line of code gets a random word. The `word` variable will be a string.
  /*
  The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
  
  The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
  
  After a user hits the 'return' key, the rest of the code will run.
  */

  // This line of code will print out whatever is inputted in by the user.
}

run();
// //we're splitting our string so we can have the individual letters in seperate strings
// let splitWord = Array.from(word); // not shown
// //then we're getitng the index of the letter if it matches the user input
// let indexOfLetters = splitWord.indexOf(userInput);

// //looping trough the letters of the word
// while (indexOfLetters != -1) {
//   //pushing the letters into our empty index array
//   indexArr.push(indexOfLetters);
//   //now our indexOfLetters is checking to see if the user input is in our array and where it is in the word
//   indexOfLetters = splitWord.indexOf(userInput, indexOfLetters + 1);
// }

// //we're looping through the my array (just incase there's more than one index)
// for (let i = 0; i < indexArr.length; i++) {
//   //a var that holds indexArr at any index
//   let eachIndexOfindexArr = indexArr[i];
//   //now we're just replacing the dash at the given index (eachIndexOfindexArr) with the user input
//   dashes.splice(eachIndexOfindexArr, 1, userInput);
// }
// //if we loop through the indexArr and we grab the value inside the array then we replace the underscores at the appropriate index
