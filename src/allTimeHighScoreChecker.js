function allTimeHighScoreChecker(name, currentSessionScore) {
  const fileSync = require("fs");
  //declare a constant variable called scores to get highScores Obj
  const scores = JSON.parse(fileSync.readFileSync("./src/highScores.json"));
}

module.exports = allTimeHighScoreChecker;
