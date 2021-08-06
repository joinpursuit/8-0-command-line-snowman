//The `dictionary` variable will have an array of words that can be used for your game. It is used in the `getRandomWord()` function.
const dictionary = require("./dictionary");

//This function returns a random word from the dictionary.
function getRandomWord() {
  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
}

module.exports = getRandomWord;
