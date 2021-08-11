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
function run(userInput) {
  let userGuess;
  let isCorrect;
  let correctArr = [];
  let wrongArr = [];
  let guessesLeft = 5;
  const secretWord = getRandomWord().toUpperCase();
  let underscoresArr = Array(secretWord.length);
  let snowmanIndex = 5;
  
  let snowman = [
    `      __      
     _==_ _________
  _,( ◔̯◔)|Game_Over|
   \\/ . \\-----|
 __(  :  )____|_
 =========== `,

    `       __      
      _==_  
   _,(°ロ°) 
    \\/ . \\-----
  __(  :  )____
  =========== `,
    `         
   _,(°-°)
    \\/ . \\-----
  __(  :  )____
  =========== `,

    `         
    \\/ . \\-----
  __(  :  )____
  =========== `,

    `         
  __(  :  )____
  =========== `,
  ];

  function correctGuess(userGuess) {
    if (userGuess == null) {
      for (let i = 0; i < secretWord.length; i++){
      if (underscoresArr[i] == null){
        underscoresArr[i] = "_ ";
      }
     }
     isCorrect = false;
    } 
    if (snowmanIndex < 5) {
      console.log(snowman[snowmanIndex]);
    }
    if (correctArr.includes(userInput) || wrongArr.includes(userInput)){
      console.log("\x1b[31m You already tried that! /n Try again... \x1b[0m")
      isCorrect = 'dummy';
      return;
    }
    if (secretWord.includes(userGuess)){
    for(let x=0; x < secretWord.length; x++) {
      if (secretWord[x] == userGuess){
        underscoresArr[x] = userGuess;
        if (correctArr[x] !== underscoresArr[x]){
          correctArr[x] = userGuess;
          isCorrect = true;
          }
      }
        
      }
    }
    if (userGuess != null && isCorrect == false) {
      if (wrongArr.join("").includes(userGuess) == false){
        wrongArr.push(userGuess.toUpperCase());
      }
      snowmanIndex = snowmanIndex - 1;
      guessesLeft = guessesLeft - 1;
    }
   
   else {
     isCorrect = false;
   }
   if (userGuess != null){
   console.log("Your guess this round: " + userGuess);
   console.log(
    "\x1b[33m" + "Wrong: " +
      wrongArr.join(" ") +
      " " + "Correct: " +
      correctArr.join(" ") +
      "\x1b[0m" +
      "\n  ==========="
  );
  }
   return;
  }

  

  console.log(
    `\x1b[32m                                                                                                                                                        

       .---..-. .-..---. .-.  .-.        .--. .-. .-.  ,---. ,---.   .---.   .-,,---.   ,--,_______ 
       ( .-._) \\| / .-. )| |/\\| |\\    /|/ /\\ \\|  \\| |  | .-.\\| .-.\\ / .-. )  | || .-' .' .')__   __|
      (_)\\  |   | | | |(_) /  \\ |(\\  / / /__\\ \\   | |  | |-' ) '-'/ | | |(_) | || '-. |  |(_))| |   
     _  \\ \\ | |\\  | | | ||  /\\  (_)\\/  |  __  | |\\  |  | |--'|   (  | | | |  | || .-' \\  \\  (_) |   
    ( '-'  )| | |)\\ '-' /|(/  \\ | \\  / | |  |)| | |)|  | |   | |\\ \\ \\ '-' ('-' ||  '--.\\  '-. | |   
     '----' /(  (_))---' (_)   \\| |\\/| |_|  (_)(  (_)  /(    |_| \\)\\ )---' \\_ )|/( __.' \\____\\'-'   
           (__)   (_)           '-'  '-'     (__)     (__)       (__|_)      (_|__)                 
                                  Program by Charlie Moran
              ASCII Art by Charlie Moran & Anonymous User from https://textart.sh/topic
\n
Welcome to my Snowman Project! \nYou have 5 chances to guess the word or it's game over! \nOne letter at a time please or else... \x1b[0m`
  );

  //The Game Itself //
  while (guessesLeft != 0 && correctArr.join("") != secretWord && wrongArr.length <= 5 && snowmanIndex != 0) {
    if (userInput != null){
      console.clear();
    }
    if ((typeof userInput)  == "string") {
     userGuess = userInput.toUpperCase();
     if(userGuess == "BANANA"){
       console.clear();
       console.log (`\x1b[33m
       ██                                
       ██▒▒██       \x1b[35m    Bananas Are Love  \x1b[0m\x1b[33m                     
     ████▒▒██     \x1b[35m\x1b[2m  Bananas uoY truH oT yrT t'noD  \x1b[0m\x1b[33m               
     ██▒▒▒▒██       \x1b[32m    Bananas Are Life   \x1b[0m\x1b[33m                      
     ██▒▒▒▒██     \x1b[32m  Bananas Will Sustain You  \x1b[0m\x1b[33m                         
   ██▒▒▒▒██████▓▓    \x1b[35m   Bananas Are Love    \x1b[0m\x1b[33m                   
 ██  ████    ████  \x1b[35m\x1b[2m Bananas uoY nO taehC t'noW   \x1b[0m\x1b[33m                    
 ██░░    ██  ▓▓████   \x1b[32m  Bananas Are Life       \x1b[0m\x1b[33m               
 ██    ████      ██\x1b[32m\x1b[2m Bananas uoY evaeL oT yrT t'noD  \x1b[0m\x1b[33m                  
██    ░░  ████░░  ██ \x1b[31m\x1b[1m     Grrrrrrrrrr... \x1b[0m\x1b[33m                    
██                  ██                      
████████████████████████████████████████              
██    ████  ██  ██████████    ██  ████████              
████  ██  ████  ██████  ██  ████                
██████████      ▓▓██████████                  
 ██      ████░░    ████                    
 ██      ████░░      ██████                
   ██    ██              ██████            
     ██        ░░██████      ██████████    
     ████          ████              ░░████
         ████░░      ██      ████████░░  ██
           ████████    ░░    ██████  ████  
                 ████████          ████    
                       ████████████  \x1b[0m `);
                       return;
     }
      else if (userGuess.length > 1) {
        console.clear();
        console.log(snowman[0]);
        console.log(
          `\x1b[31m I said one letter at a time! \n Don't be like my wife no cheating! \x1b[0m`
        );
        return;
      }
    }
    if ((typeof userInput) == "number"){
      console.log(snowman[0]);
      console.log(
        `\x1b[31m I said guess letters you banana! \n Play by the rules! \x1b[0m`
      );
        return;
    }

    correctGuess(userGuess);

    

    console.log("The Secret Word: " + underscoresArr.join(" "));
    userInput = readline.question(`\x1b[36m  \n Guess a letter: \x1b[0m`);
  }
  if (correctArr.join("").toUpperCase() == secretWord) {
    console.clear();
    console.log(`     __      
    _==_   ________
  _,(◕‿◕) |You_Win!|
   \\/ . \\-----|
 __(  :  )____|_
 =========== `);
    console.log(
      `\x1b[32m Congratulations! You guessed the word ${secretWord} correctly! You are the wiener! \x1b[0m`
    );
    return;
  }

  if (snowmanIndex === 0 || guessesLeft === 0 || wrongArr.length >= 5) {
    console.clear();
    console.log(snowman[0]);
    console.log(
      `\x1b[31m Oh bummer, looks like you ran out of guesses! \n The word was ${secretWord} . \n Good Luck next time! \x1b[0m`
    );
    return;
  }

  
};

run();

