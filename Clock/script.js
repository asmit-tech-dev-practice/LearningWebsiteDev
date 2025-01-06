const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const timerInput = document.getElementById('timerInput');

let countdownInterval;

function drawClock(remainingTime, totalTime) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2 - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f3f3f3';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ccc';
    ctx.stroke();

    const angle = (2 * Math.PI * (remainingTime / totalTime)) - Math.PI / 2;
    const handLength = radius * 0.8;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
        centerX + handLength * Math.cos(angle),
        centerY + handLength * Math.sin(angle)
    );
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#ff6347';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer(duration) {
    let remainingTime = duration;

    drawClock(remainingTime, duration);
    timerDisplay.textContent = formatTime(remainingTime);

    countdownInterval = setInterval(() => {
        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = "Time's Up!";
            return;
        }

        drawClock(remainingTime, duration);
        timerDisplay.textContent = formatTime(remainingTime);
    }, 1000);
}

startButton.addEventListener('click', () => {
    const duration = parseInt(timerInput.value);

    if (isNaN(duration) || duration <= 0) {
        alert('Please enter a valid number of seconds.');
        return;
    }

    clearInterval(countdownInterval);
    startTimer(duration);
});
