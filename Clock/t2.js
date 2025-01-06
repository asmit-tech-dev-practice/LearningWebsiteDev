const readline = require("readline");

function startTimer(timeOutInSec) {
    let timeLeftInSec = timeOutInSec;
    const p = new Promise((resolve, reject) => {
        if (timeOutInSec <= 0) {
            reject(timeOutInSec);
            return;
        }
        let timerId = setInterval(() => {
            if (timeLeftInSec <= 0) {
                console.log("Time's up!");
                clearInterval(timerId);
                // 
                resolve(timeOutInSec);
                return;
            }
            console.log(`Time remaining: ${timeLeftInSec} seconds`);
            timeLeftInSec--;
        }, 1000);
    });
    return p;
}


function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    function isValidInput(input) {
        const sec = Number(input);
        if (sec <= 0 || isNaN(sec))
            return -1;
        return sec;
    }
    function getTimeOutSpan(resolve, reject) {
        rl.question("Enter the timer duration (in secs): ", (input) => {
            const sec = isValidInput(input);
            if (sec >= 0) {
                resolve(sec);
                return;
            }
            reject(input);
        });
    }
    const promiseA = new Promise(getTimeOutSpan);
    promiseA
        .then((timeOutInSec) => startTimer(timeOutInSec))
        .then((timeOutInSec) => startTimer(timeOutInSec*2))
        .then((timeOutInSec) => startTimer(timeOutInSec*2))
        .then((timeOutInSec) => console.log(`Successfully executed, retunrned value: ${timeOutInSec}`))
        .catch((error) => console.log(`Error Encountered, Error: ${error}`))
        .finally(() => rl.close());

    // rl.question("Enter the timer duration (in secs): ", (input) => {
    //     isValidInput(input)
    //         .then((validTimeInSec) => {
    //             startTimer(validTimeInSec, rl).then(() => {
    //                 console.log("Time's up!");
    //             }).catch(err => {
    //                 console.error(err);
    //                 rl.close();
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             rl.close();
    //         });
    // });
}

main();
