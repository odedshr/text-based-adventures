function pad(value) {
    return String(value).padStart(2, '0');
}
function formatTime(seconds) {
    // Calculate hours, minutes, and seconds
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    // Return the formatted time string
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}
const timerElement = document.getElementById('timer');
function updateTimer(timeLeft) {
    if (timeLeft) {
        if (timeLeft > 0) {
            const formattedTime = formatTime(--timeLeft);
            timerElement.textContent = formattedTime;
            timerElement.setAttribute('datetime', formattedTime);
        }
        else {
            timerElement.textContent = "Time's up!";
            alert("Game Over! Your time has run out.");
        }
    }
    else {
        timerElement.setAttribute('hidden', 'true');
    }
}
function updateScore(score) {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `${score}`;
}
export { updateTimer, updateScore };
