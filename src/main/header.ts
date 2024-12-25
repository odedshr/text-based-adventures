function pad(value:number) {
    return String(value).padStart(2, '0')
}

function formatTime(seconds:number) {
    // Calculate hours, minutes, and seconds
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Return the formatted time string
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

const timerElement = document.getElementById('timer') as HTMLTimeElement;

function updateClock(timeLeft:number) {
    if (timeLeft) {
        if (timeLeft > 0) {
            const formattedTime = formatTime(--timeLeft);

            timerElement.textContent = formattedTime;
            timerElement.setAttribute('datetime',formattedTime)
        } else {
            timerElement.textContent = "Time's up!";
            alert("Game Over! Your time has run out.");
        }
    } else {
        timerElement.setAttribute('hidden', 'true');
    }
}

function updateScore(score:number) {
    const scoreElement = document.getElementById('score') as HTMLSpanElement;
    scoreElement.textContent = `${score}`;
}

export {
    updateClock,
    updateScore
};