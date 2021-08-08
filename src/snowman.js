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
//GET UNDERSCORE TO MATCH THE LENGTH OF RANDOM WORD
//CONSOLE.LOG(GUESSED LETTERS: []) ARRAY TO STORE GUESSED LETTERS
//SKIP A LINE CONSOLE.LOG((YOU HAVE ?? GUESSES REMAINING))
//UPDATE "GUESS A LETTER:"" TO (("PLEASE ENTER YOUR GUESS:"))
//SKIP A LINE WITH LETTER INPUTTED AND REMAINING UNDERSCORES
//IF LETTER IS VALID IN RANDOM WORD, REPLACE UNDERSCORE POSITION W/THAT LETTER
//IF GUESS IS INCORRECT, DECREASE COUNT
//IF GUESS IS CORRECT, COUNT STAYS THE SAME
//IF INPUT IS INVALID CONSOLE.LOG((PLEASE ENTER A VALID LETTER))
//IF ALL UNDERSCORES ARE REPLACED BY LETTERS CONSOLE.LOG((YOU GOT IT!!))
//LOOP THRU AND UPDATE STATE OF GAME
///TRACKS HOW MANY ATTEMPTS, HOW MANY INCORRECT GUESSES MADE, AND WHAT WAS GUESSED
///TRACKS IF THE GAME IS OVER OR NOT
//LOOP THRU "PLEASE ENTER YOUR GUESS"
//EDGECASES: 1.IF DUPLICATE LETTER RETURN ((LETTER ALREADY EXISTS)) 2.IF USERINPUT IS MORE THAN ONE LETTER RETURN ((PLEASE ENTER A VALID LETTER)) 3.IF USERINPUT IS A NOT A STRING RETURN ((PLEASE ENTER A VALID LETTER)) 4.IF USERINPUT IS A CAPITALIZE LETTER RETURN ((PLEASE ENTER A LOWERCASE LETTER))
//IF USERINPUT IS ALREADY IN ARRAY, DON'T PUT IT IN AGAIN
//ALL EDGECASES WILL NOT DECREASE GUESSES
//IF(!userInput.toLowerCase() && answerArray.includes(userInput)) {
//return space + "PLEASE ENTER A VALID LETTER" + space
//}

function run() {
  ///SKIP A LINE VARIABLE
  const space = "\n";
  console.log(
    "Let's build a snowman ⛄" +
      space +
      "❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️ ❄️"
  );

  let incorrectGuesses = 0;
  const word = getRandomWord();
  //console.log(`${space}${word}`);

  //THIS CODE IS MAX AMOUNT OF ATTEMPTS
  let attempts = word.length + 1;
  console.log(`${space}You have ${attempts} guesses`);

  //ARRAY OF UNDERSCORES TO FILL LETTER SPACE MATCHING THE LENGTH OF RANDOM WORD
  const underscore_word = new Array(word.length).fill("_");

  //DEFAULT VARIABLE TO STORE ARRAY OF GUESSED LETTERS
  let answerArray = [];

  //THIS LOOP TRACKS IF USER WON OR LOST GAME
  for (let i = 0; incorrectGuesses < attempts; i++) {
    console.log(`${space}${underscore_word.join(" ")}${space}`);

    // This line of code will print out whatever is inputted in by the user.
    const userInput = readline.question("Please enter your guess: ");
    console.log(`You have ${attempts - incorrectGuesses} guess(es) left`);

    //IF THE LETTER IS ALREADY INSIDE THE GUESSED ARRAY
    if (answerArray.includes(userInput)) {
      console.log(space + "🔁 ALREADY GUESSED, TRY ANOTHER LETTER 🔁 " + space);
      console.log("GUESSED LETTERS:", answerArray);
        continue;
    }
    //EACH GUESS IS PUSHED INTO AN EMPTY ARRAY
    answerArray.push(userInput);

    //IF LETTER IS INVALID
    //THE GUESSED LETTER IS NOT IN THE RANDOM WORD
    if (!word.includes(userInput)) {
      
      //IF WE CAPITALIZED THE RANDOM WORD AND IT INCLUDES A CAPITALIZED GUESSED LETTER
      if (word.toUpperCase().includes(userInput)) {
        console.log(
          space + "✅ CORRECT!!! BUT PLEASE ENTER A lowercase LETTER " + space
        );
        console.log("GUESSED LETTERS:", answerArray);
        continue;

        //IF GUESS IS THE SAME AS A CAPITALIZED GUESS && IF GUESS IS NOT A NUMBER
      } else if (userInput === userInput.toUpperCase() && !Number(userInput)) {
        console.log(space + "❗ PLEASE ENTER A lowercase LETTER ❗ " + space);
        incorrectGuesses++;
        console.log("GUESSED LETTERS:", answerArray);
        continue;

        //IF GUESS IS A NUMBER
      } else if (Number(userInput)) {
        console.log(space + "🙅‍♀️  PLEASE ENTER A VALID LETTER 🙅‍♀️" + space);
        console.log("GUESSED LETTERS:", answerArray);
        continue;
        
        //IF GUESS IS MORE THAN ONE LETTER
      } else if (userInput.length > 1) {
        console.log(space + "👆 ONE LETTER AT A TIME PLEASE 👆")
        console.log("GUESSED LETTERS:", answerArray);
        continue;
      
      }
      //COUNT DOESN'T CHANGE FOR INVALID GUESSES
      //COUNT INCREASES WITH INCORRECT GUESSES ONLY
      incorrectGuesses++;
      console.log(`${space} 🤔 UH UH UH, GUESS AGAIN 🤔`);
      console.log("GUESSED LETTERS:", answerArray);

      //IF GUESS IS INVALID, CONTINUE; WILL SKIP INNER LOOP AND RETURN TO OUTTER LOOP TO START AGAIN UNTIL GUESSES RUN OUT BUTTTTT
      continue;
    }
    //IF GUESS IS VALID, INNER LOOP STARTS
    if (word.includes(userInput)) {
      
      //LOOPS THRU EACH LETTER OF THE RANDOM WORD TO COMPARE GUESS
      for (let k = 0; k < word.length; k++) {
        
        //AND SAVE THAT GUESS INTO CORRESPONDING UNDERSCORE[K] SPACE OF RANDOM WORD[K]
        if (word[k] === userInput) {
          underscore_word[k] = userInput;
        }

        //ONCE ALL UNDERSCORES ARE REPLACED, YOU WIN. WE HAVE TO USE .JOIN TO CONVERT THE ARRAY INTO A STRING. COMPARING A STRING TO A STRING.
        if (underscore_word.join("") === word) {
          console.log(space + "🎉 CONGRATS, YOU WIN THE GAME 🎉");
          //PRINTS COMPLETE RANDOM WORD AS A STRING
          console.log("THE WORD IS" + " " + underscore_word.join(""));

          //QUESTION ASKED AFTER WINNING
          let continuedPlay = readline.question(
            `${space}💭 DO YOU WANT TO PLAY AGAIN?❓❓${space}Yes: press Y      No: press N`
          );

          if (continuedPlay.toUpperCase() === "Y") {
            console.log(" 😼 YOU'RE A COOL CAT, LET'S PLAY!! 😼 " + space);
            run();

          } else if (continuedPlay.toUpperCase() === "N") {
            console.log(" 🖐️ MAYBE NEXT TIME, YOU'RE STILL COOL 🖐️ ");
          }
          return;
        }
      }
      console.log(`${space} 💪 YOU GOT IT!!! 💪`);
    }
    console.log("GUESSED LETTERS:", answerArray);
  }
  //GAME OVER
  if (incorrectGuesses === attempts) {
    console.log(`${space}👀 LOSER... try again. The word was "${word}" 👀 `);
  }
    //QUESTION ASKED AFTER LOSING 
  let continuedPlay = readline.question(
    `${space}💭 DO YOU WANT TO PLAY AGAIN?❓❓${space}Yes: press Y                 No: press N`
  );
  if (continuedPlay.toUpperCase() === "Y") {
    console.log(space + "😼 YOU'RE A COOL CAT, LET'S PLAY!! 😼 ");
    run();
    
  } else if (continuedPlay.toUpperCase() === "N") {
    console.log(space + " 🖐️  MAYBE NEXT TIME, BYE 🖐️ ");
  }
}
run();