/*
  Function is being used to create a closure in which we will use to create persistent memory when working with a current game session
*/
function trackCurrentScore() {
  let currentScore = 0;

  return function (reset = false) {
    //if reset is true, create a temp variable and return that while resetting currentScore to 0.
    if (reset === true) {
      const tempScoreHolder = currentScore;
      currentScore = 0;
      return tempScoreHolder;
      //otherwise return incremented current score
    } else {
      return ++currentScore;
    }
  };
}

const getIncrementedOrPreResetScore = trackCurrentScore();

module.exports = getIncrementedOrPreResetScore;
