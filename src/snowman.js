/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
const dictionary = require("./dictionary");
function getRandomWord(dictionary) {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}
/*
  This function will run your game. Everything you want to happen in your game should happen inside of here.

  You should still define other, smaller functions outside of the `run()` function that have a single specific purpose, such as getting user input or checking if a guess is correct. You can then call these helper functions from inside the `run()` function.

  Once you understand the code below, you may remove the comments if you like.
*/
function run() {
  const word = getRandomWord(dictionary);
  let answerArr = [];
  for (let i = 0; i < word.length; i++){
    answerArr[i] = "_";
  };

  let guessArr = [];
  let lives = word.length
  lives = lives + 2;
  let remainingLetters = word.length;
  
  while(remainingLetters > 0){
    console.log(answerArr.join(" "))
    if (lives == 1){
      console.log("you have 1 life left")
    }
    else if(lives > 1){
      console.log("You have" + lives + "lives left." + "\n")
    }
    const userInput = readline.question("Guess a letter: "); 
    if (guessArr.includes(userInput)){
      console.log("\n" + "Already chosen.")
    }
    console.log("THE USER INPUTTED:", userInput);
    guessArr.push(userInput)
    if(userInput === null){
      break;
    }
    else if(userInput.length !== 1){
      console.log("Please enter a single letter.")
    }
    else if (!word.includes(userInput)){
      lives--
      console.log("Another life bites the dust.")
    }
    else if (lives == 0){
      console.log("you lost bro.")
    }
    else {
      for (let j = 0; j < word.length; j++){
        if (word[j] === userInput){
          answerArr[j] = userInput
          remainingLetters--
        }
      }
    }
    if (lives == 0){
      console.log( "\n" +"You lost bro.")
      break;
    }
  }
  if (answerArr == guessArr){
  console.log(answerArr.join(" "))
  console.log("Look at you knowing how to spell the answer was" + " " + word + "!")
  }
  else{
  console.log(answerArr.join(" "))
  console.log("Damn I thought you could spell the word was" + " " + word + "!")
  }
}

run();

/*
The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!

The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.

After a user hits the 'return' key, the rest of the code will run.
*/
// This line of code will print out whatever is inputted in by the user.