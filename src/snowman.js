
const readline = require("readline-sync");

const dictionary = require("./dictionary");

function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

const word = "apple";
let snowman =
  `
  , ,    ,      ,    ,     ,     ,   ,      ,     ,     ,      ,      ,
,HA HA HA HA HA HA HA HA BAKA! BAKA! BAKA! YOU KNOW NOTHING SNOW MAN!!!  
,       ,     ,    ,       ,   .____. ,   ,     ,      ,       ,      ,
 ,    ,   ,    ,     ,   ,   , |   :|         ,   , ,   ,   ,       ,
   ,        ,    ,     ,     __|====|__ ||||||  ,        ,      ,      ,
 ,   ,    ,   ,     ,    , *  / o  o \  ||||||,   ,  ,        ,    ,
,   ,   ,         ,   ,     * | -=   |  \====/ ,       ,   ,    ,     ,
   ,  ,    ,   ,           , U==\__//__. \\//    ,  ,        ,    ,
,   ,  ,    ,    ,    ,  ,   / \\==// \ \ ||  ,   ,      ,          ,
 ,  ,    ,    ,     ,      ,|    o ||  | \||   ,      ,     ,   ,     ,
,      ,    ,    ,      ,   |    o ""  |\_|B),    ,  ,    ,       ,
  ,  ,    ,   ,     ,      , \__  --__/   ||  ,        ,      ,     ,
,  ,   ,       ,     ,   ,  /          \  ||,   ,   ,      ,    ,    ,
 ,      ,   ,     ,        |            | ||      ,  ,   ,    ,   ,
,    ,    ,   ,  ,    ,   ,|            | || ,  ,  ,   ,   ,     ,  ,
 ------_____---------____---\__ --_  __/__LJ__---------________-----___
   `;

// let state = {
//   shouldKeepPlaying: true,
//   playerWins: 0,
//   playerLoses: snowman,
//   guess: word.length,
//   answerArr: [],
//   usedLetters: []
// }

function run() {

  let state = {
    shouldKeepPlaying: true,
    playerWins: 0,
    playerLoses: snowman,
    guess: word.length,
    answerArr: [],
    usedLetters: []
  }
  
  function underscoresFilledArr(){ 
    for(let i = 0; i < word.length; i++){
      state.answerArr[i] = "_";
    }
      console.log(state.answerArr.join(" "));
  }

  underscoresFilledArr();

  function inputsSpliced(guessInput){
    for(let j = 0; j < word.length; j++){
      if(word[j] === guessInput){
        state.answerArr.splice(j, 1, guessInput);
      } 
    }
    console.log(state.answerArr.join(" "))
  }

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
        console.log("HAHAHAHAHAHAAHAHAHA you really didn't type anything! My guy LOL! GAME OVER!!!...Try again.");
        state.shouldKeepPlaying = false;
      }else{
        console.log("So you do know what a letter is....good for you buddy!")
        state.shouldKeepPlaying = false;
      }
    }
  }// first while loop ending
  state.shouldKeepPlaying = true;
  underscoresFilledArr();
   // Second While loop Begins 
  while(state.guess > 0 && state.shouldKeepPlaying){
    const guessInput = readline.question("Guess a letter: ").toLowerCase();
  
    if(guessInput === null){
      break;
    }else if(guessInput.length !== 1 || !isNaN(guessInput)){
      console.log("Chillllllllll just type a single letter! Oh and no numbers my guy sheeeshhhhhhh.");
    }else if(!word.includes(guessInput)){
      state.guess--;
    }

    console.log(`You have ${state.guess} guesses left!`);

    if(state.guess === 0){
      console.log(`${state.playerLoses}\nThe easy word you couldn't guessed is: ${word.toUpperCase()}!`);
      break;
    }
    
    inputsSpliced(guessInput);

    if(state.answerArr.join("") === word){
      console.log("Grrrrrrr you won! The answer was indeed the word: " + word.toUpperCase() + "!");
      state.shouldKeepPlaying = false;
    }

  }// Second while loop ending
}//run function ending
run();

// //if(guessInput.length === 1){
      // if(state.usedGuessLetters.includes(guessInput)){
      //   console.log("You really guessed the same letter my guy.....BAKA!");
      //   state.usedGuessLetters.push(guessInput);
// while(numOfGuessesLeft > 0){
//   numOfGuessesLeft--;
//   console.log("Number of guesses left: " + numOfGuessesLeft);
// }