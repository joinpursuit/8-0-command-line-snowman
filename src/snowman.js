
const readline = require("readline-sync");

const dictionary = require("./dictionary");

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

function run() {
  const word = getRandomWord();
  let snowmanArr = [`_[_]_`,
  `_[_]_
    (")`,
    `_[_]_
      (")
  "--( : )--"`,
    `_[_]_
      (")
  "--( : )--"
    (  :  )`,
    `_[_]_
      (")
  "--( : )--"
    (  :  )
   ""-...-""`
  ];

  let state = {
    shouldKeepPlaying: true,
    playerWins: 0,
    playerLoses: snowmanArr
  }

  let answerArr = [];
    for(let i = 0; i < word.length; i++){
      answerArr[i] = "_";
    }

    let lettersLeft = word.length;

  while(state.shouldKeepPlaying){
    const userInput = readline.question(`**************************\nLets play a game!\r\n**************************\nA game of SNOW!(Yes or no) `).toLowerCase();
    
    if(userInput === "no" || userInput === "n"){
      console.log("Ending Game.....COWARD!");
      state.shouldKeepPlaying = false;
      break;
    }else{
      console.log("Let the Brrrrrrrrr game begin!");

    const guessedLetter = readline.question("Type a letter: ");
    
    if(!isNaN(guessedLetter)){
      console.log("HAHAHAHAHAHAAHAHAHA you really typed in a NUMBER! My guy LOL! Try again.");
      break;
    }else{
      console.log("So you do know what a letter is....good for you buddy!")
    }
      while(lettersLeft > 0){
          console.log((answerArr.join(" ")));
          let numOfGuessesLeft = lettersLeft;
          let guessInput = readline.question("Guess a letter: ").toLowerCase();

          while(numOfGuessesLeft > 0){
          numOfGuessesLeft--;
          console.log("Number of guesses left: " + numOfGuessesLeft);

          if(guessInput === null){
            break;
          }else if(guessInput.length !== 1){
          console.log("Chillllllllll just type a single letter my guy sheeeshhhhhhh.")
          }else{
            for(let j = 0; j < word.length; j++){
              if(word[j] === guessInput){
                answerArr[j] = guessInput;
                lettersLeft--;
                }   
              }
            }
          }
        }
      }
      if(numOfGuessesLeft === 0){
        console.log(answerArr.join(" "));
        console.log("HA HA HA HA HA HA HA HA BAKA! BAKA! BAKA! YOU KNOW NOTHING SNOW MAN!!! The easy word you couldn't guessed is " + word);
        break;
       }
    }
    if(answerArr.join("") === word){
      console.log(answerArr.join(" "));
      console.log("Grrrrrrr you won! The answer was indeed the word " + word);
     }
  }
run();