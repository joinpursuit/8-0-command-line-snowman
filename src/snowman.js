/*
  `readline-sync` is a library that allows you to access user input from the command line. The library is assigned to the variable `readline`. It is used in the `run()` function below.
*/
const readline = require("readline-sync");
const { join } = require("./dictionary");
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

// Run //
function run(UserInput){
  function correctGuess(userInput){
    let letter = userInput.toUpperCase()
    const secretWord = getRandomword().toUpperCase();
    return secretWord.includes(letter);
  }
  
  function addCorrectGuessToList(userInput){
    correctGuess.push(userInput)
    return correctGuess;
  }
  
  function generateLetters(getRandomWord){
    for(let i=0; i < letters.length; i++){
      letters[i] = new Letter (letters[i]);
      letters[i].showCharacter();
    }
  }
  const word = getRandomWord().toUpperCase();
  let isCorrect = false;
  let snowmanIndex = 5;
  let letters = word.split('');
  let long = letters.length;
  let underscores = [];
  for (let i=0; i < long; i++){
    underscores.push("_ ");
  }
  let printUnderscores = console.log(underscores.join(' '));
  let correctGuesses = [];
  let wrongGuesses = [];
  let snowman = [ `   __      
   _==_ _________
 _,(",)|Game_Over|
 \\/. \\----|
__( :  )    |_
=========== `,
`   __      
   _==_  
 _,(",) 
 \\/. \\----
__( :  ) 
=========== `,
`         

 _,(",)
 \\/. \\----
__( :  )

=========== `,

`         
   
 
 \\/. \\----
__( :  )

=========== `,

`         
   
 
 
__( :  )

=========== `,

]
  const userInput = readline.question("Guess a letter: ");
  console.log("THE USER INPUTTED:", userInput);
  isCorrect = correctGuess(userInput);
}



run();

