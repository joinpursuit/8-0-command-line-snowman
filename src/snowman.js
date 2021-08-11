
const readline = require("readline-sync");
const dictionary = require("./dictionary");

function getRandomWord(dictionary) {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

function run() {
  const word = "apple";
  let answerArr = [];
  for (let i = 0; i < word.length; i++){
    answerArr[i] = "_";
  };
9
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
      console.log("You have"+ " " + lives + " " + "lives left." + "\n")
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
    else {
      for (let j = 0; j < word.length; j++){
        if (word[j] === userInput){
          answerArr[j] = userInput
          remainingLetters--
        }
      }
    }
    if (lives == 0){
      console.log(answerArr.join(" "))
      console.log("Damn I thought you could spell the word was" + " " + word + "!")
      break;
    }
    
  } 
  if (answerArr.join("") === word){
    console.log(answerArr.join(" "))
    console.log("Look at you knowing how to spell the answer was" + " " + word + "!")
    }
 
}

run();