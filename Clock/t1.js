
const readline = require("readline");


function startTimer(timeOutInSec, inputReaderArg) {
  let timeLeftInSec = timeOutInSec;
  let timerId = null;
  const inputReader = inputReaderArg;

  function doCountDown() {
    if (timeLeftInSec <= 0) {
      console.log("Time's up!");
      clearInterval(timerId);
      inputReader.close();
      return

    }
    console.log(`Time remaining: ${timeLeftInSec} seconds`);
    timeLeftInSec--;
  }

  timerId = setInterval(doCountDown, 1000);
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the timer duration (in secs): ", (input) => {
    let sec = Number(input);

    if (sec <= 0) {
      console.log("Invalid");
      // main();
    } else {
      startTimer(sec, rl);
    }
  });


}

main();
console.log('test');

