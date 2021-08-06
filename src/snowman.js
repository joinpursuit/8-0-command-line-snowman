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

//Create empty array of underscores to start

//Loop start
//Display
  //Remaining Guesses
  //Guessed letters/words
  //Empty array above
  //

//Check Input
  //I'm allowing full word guesses, maybe allow weird non letters but also return a message questioning your decisions

//Update Display, 
  //push to array of guessed
  //update word if applicable(maybe use splice(i,1,letter))

//Check if done or out of lives
  //if done break loop
  //If win return word and congrat msg 
    //If win by word input return a different message
    
  //might include a continue option for like 2 extra lives or something
    //should probably be asked for continues before the end of the loop
    //finished display, should have remaining lives, continues used if any, final word, random congrats msg
    //play again or finished prompt

function guessCheck(input, word){
  if (input.length > 1){
    if (input.toLowerCase() === word){//just for fun check for whole words
      return true
    }else{return false}
  }else{
    if (word.includes(input.toLowerCase())){
      return true
    }else { return false}
  }
}

function charReplacer(input, word, wordDisplay){//should be ran if guess check returned true
  for (let i = 0; i < word.length; i++){
    if (word[i] === input.toLowerCase()){//iterates through letter of the word for the inputted letter and replaces the same index in the displayed word
      wordDisplay.splice(i,1,input)
    }
  }
}

let streak = 0
let sessionWins = 0
let continueWins = 0
let sessionLosses = 0
let topStreak = 0
const playerName = readline.question('Whose playing today?')//Just a random feature

function run() {
  // This line of code gets a random word. The `word` variable will be a string.
  console.log(`
  .      *    *           *.       *   .                      *     .
               .   .                   __   *    .     * .     *
    *       *         *   .     .    _|__|_        *    __   .       *
  .  *  /\\       /\\          *        ('')    *       _|__|_     .
       /  \\   * /  \\  *          .  <( . )> *  .       ('')   *   *
  *    /  \\     /  \\   .   *       _(__.__)_  _   ,--<(  . )>  .    .
      /    \\   /    \\          *   |       |  )),\`   (   .  )     *
   *   \`||\` ..  \`||\`   . *.   ... ==========='\`   ... '--\`-\` ... *    .
      
      Hello and Welcome to the Snowman Game!!
      Rules: I will give you the length of a word and 7 lives.
          You can take your time guessing either letters or full words,
          but for each wrong guess you make I will take a life. However,
          I will give you access to a continue for 2 more lives whenever 
          you run out, try your best to not need them, but you may push 
          through as you wish.
  `
  )
  let snowman = [
    `
          ___
    ___._|_>_|_.___---<
    `,
    `
        ___
      _|___|_
    __._(>)_.____---<
    `,
    `
        ___
      _|___|_
    ___(*>*)____---<
    `,
    `
      ___
    _|___|_
     (*>*)
    __(*)____---<
    `,
    `
      ___
    _|___|_
     (*>*)
     ( * )____---<
    `,
    `
      ___
    _|___|_
     (*>*)
      (*)
     ( * )___ ---<
    `,
    `
      ___
    _|___|_
     (*>*)   V
     ( * )___|
    _( * )_  |
    `,
    `
      ___
    _|___|_
     (*>*)   V
     ( * )___|
    (  *  )  |
    `
    ]
  const word = getRandomWord();
  let wordDisplay = []
  let guessedLetters = []
  let lives = 7
  let snowmanStage = 7
  let continues = 0
  for (let i = 0; i< word.length; i++){
    wordDisplay.push('_')
  }
  console.log(`Let's get started ${playerName}.\nThe word is ${word.length} letters long.`)
  /*
    The line of code below stops the execution of your program to ask for input from the user. The user can enter whatever they want!
    The text that will show up to the user will be "Guess a letter: ". Whatever value is entered will be assigned to the variable `userInput`.
    After a user hits the 'return' key, the rest of the code will run.
  */
  while(wordDisplay.includes('_') && lives > 0){
    console.log(`\n___________________________________________________________________\n___________________________________________________________________\n\n${wordDisplay.join(' ')}\n\nGuessed Values: ${guessedLetters.join(', ')}\n\nYou have ${lives} guesses remaining\n${snowman[snowmanStage]}\n`)//display of everything, should repost every loop
    const userInput = readline.question("Guess a letter: ");
    // This line of code will print out whatever is inputted in by the user.
    if (guessCheck(userInput, word)){// t/f check from helper function
      if (guessedLetters.includes(userInput)){// Accounts for repeated correct guesses
        console.log(`\nAlready guessed ${userInput}, but it's all good.`)
      }else{
        guessedLetters.push(userInput)
        charReplacer(userInput, word, wordDisplay)
        if(userInput === word){//just for fun check if they get the user gets the entire word
          for (let letter of word){
            charReplacer(letter, word, wordDisplay)
          }
          console.log(`Impressive ${playerName}, you managed to get the word exactly!!`)
        }
      }
    }else{//subtract lives for every wrong guess
      lives -=1
      if (snowmanStage>0){
        snowmanStage-=1
      }
      if (guessedLetters.includes(userInput)){// extra message for repeated wrong guess
        console.log(`\nAlready guessed ${userInput}, still taking a life though.`)
        guessedLetters.push(userInput + ' again')
      }else{// general incorrect
        if (userInput.length> 1){
          console.log(`\n${userInput} is not the word, but good try.`)
        }else{
          guessedLetters.push(userInput)
        }
      }
    }
    if (lives === 0) {// continue check before it goes back to the while checks
      const cont = readline.question("\nOut of Lives, CONTINUE? y/n");
      if (cont === 'y'){// Only accepts y, everything else is no
        lives +=2
        continues += 1
        console.log('\n2 more lives added\n')
      }
    }
  }
  let msgFlag = true
  if (wordDisplay.includes('_')){// check if game ended with an unsolved character
    console.log(`\nLost this time to "${word}."`)
    sessionLosses++
    streak = 0
  }else if(continues === 0){// Just for fun message if completed without continues
    console.log(`\n${snowman[snowmanStage]}\nCongratulations ${playerName}, you got the word "${word}" with NO continues!!`)
    sessionWins++
    streak++
    if (streak> topStreak)(topStreak=streak)
    const winStreak = readline.question(`Currently on a winning streak of ${streak}, would you like to start another round? y/n`)
    if (winStreak=== 'y'){
      run()
    }else{console.log(`Thank you for playing ${playerName}!!\nSession record of: ${sessionWins} wins, ${sessionLosses} losses, ${continueWins} continued wins, and a top streak of ${topStreak} games in a row.`)}
    msgFlag = false
  }else{
    console.log(`\n${snowman[snowmanStage]}\nNot bad ${playerName}, you got the word "${word}" with ${continues} continues.\nJust a bit more to save the snowman.`)
    continueWins++
    streak = 0
  }
  if (msgFlag){
    const newGame = readline.question('\nWould you like to start a new game? y/n\n')
    if (newGame === 'y'){//check if user wants another round
      run()
    }else{console.log(`Thank you for playing ${playerName}!!\nSession record of: ${sessionWins} wins, ${sessionLosses} losses, ${continueWins} continued wins, and a top streak of ${topStreak} games in a row.`)}
  }
}

run();
