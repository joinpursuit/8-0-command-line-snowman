



let congratulate = "Well done! You have guessed correctly!"

let notValidGuess = "Only letters apply here. Please re-enter your selection as a letter"


function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

let currentWordArr = [];
for (let i = 0; i < word.length; i++) {
  currentWordArr[i] = "_";
}

let remainingLetters = word.length;

while (remainingLetters > 0) {


  let userGuess = readline.question("Enter your guess. Only letters are allowed");

  if (userGuess === null) {
    exit() //create exit function
  }
  else if (userGuess !== 1) {
    console.log("Please type one letter")
  }
  else {
    for (i = 0; i < word.length; i++) {
      if (word[i] === userGuess) {
        currentWordArr[i] = userGuess;
        remainingLetters--;
      }
    }
  }

}
