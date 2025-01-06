
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startTimer(seconds) {
  let timeLeft = seconds;

  function status() {
    if (timeLeft <= 0) {
      console.log("Time's up!");
      clearInterval(result);
      rl.close();

    } else {
      console.log(`Time remaining: ${timeLeft} seconds`);
      timeLeft--;
    }

  }

  let result = setInterval(status, 1000);
}

function main() {
  rl.question("Enter the timer duration (in secs): ", (input) => {
    let sec = Number(input);

    if (sec <= 0) {
      console.log("Invalid");
      main();
    } else {
      startTimer(sec);
    }
  });
}

main();
