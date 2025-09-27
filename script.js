// Stopwatch JavaScript Implementation
class Stopwatch {
    constructor() {
        // DOM elements
        this.timeDisplay = document.getElementById('timeDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.lapBtn = document.getElementById('lapBtn');
        this.lapsList = document.getElementById('lapsList');
        
        // Timer variables
        this.startTime = 0;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
        
        // Lap counter
        this.lapCounter = 1;
        
        // Initialize event listeners
        this.initializeEventListeners();
        
        // Initialize display
        this.updateDisplay();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.lapBtn.addEventListener('click', () => this.handleLapReset());
    }
    
    // User Story 5: Start button starts the timer
    startTimer() {
        this.startTime = Date.now() - this.elapsedTime;
        this.isRunning = true;
        
        this.timerInterval = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.updateDisplay();
        }, 10); // Update every 10ms for smooth display
        
        // User Story 7: Change start button to stop with red background
        this.startBtn.textContent = 'Stop';
        this.startBtn.classList.remove('start-btn');
        this.startBtn.classList.add('stop-btn');
        
        // Enable lap button
        this.lapBtn.disabled = false;
        this.lapBtn.textContent = 'Lap';
        this.lapBtn.classList.remove('reset-btn');
        this.lapBtn.classList.add('lap-btn');
    }
    
    stopTimer() {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        
        // Change stop button back to start
        this.startBtn.textContent = 'Start';
        this.startBtn.classList.remove('stop-btn');
        this.startBtn.classList.add('start-btn');
        
        // User Story 8: Change Lap button to Reset when stopped
        this.lapBtn.textContent = 'Reset';
        this.lapBtn.classList.remove('lap-btn');
        this.lapBtn.classList.add('reset-btn');
    }
    
    toggleTimer() {
        if (this.isRunning) {
            this.stopTimer();
        } else {
            this.startTimer();
        }
    }
    
    // User Story 6: Lap button prepends new list element with current time
    addLap() {
        if (!this.isRunning) return;
        
        const lapTime = this.formatTime(this.elapsedTime);
        const lapElement = document.createElement('li');
        
        lapElement.innerHTML = `
            <span class="lap-number">Lap ${this.lapCounter}</span>
            <span class="lap-time">${lapTime}</span>
        `;
        
        // Prepend to the beginning of the list
        this.lapsList.insertBefore(lapElement, this.lapsList.firstChild);
        
        this.lapCounter++;
    }
    
    // User Story 8: Reset functionality
    resetTimer() {
        this.elapsedTime = 0;
        this.lapCounter = 1;
        this.updateDisplay();
        
        // Clear all laps
        this.lapsList.innerHTML = '';
        
        // Reset buttons to initial state
        this.startBtn.textContent = 'Start';
        this.startBtn.classList.remove('stop-btn');
        this.startBtn.classList.add('start-btn');
        
        this.lapBtn.textContent = 'Lap';
        this.lapBtn.classList.remove('reset-btn');
        this.lapBtn.classList.add('lap-btn');
        this.lapBtn.disabled = true;
    }
    
    handleLapReset() {
        if (this.isRunning) {
            this.addLap();
        } else {
            this.resetTimer();
        }
    }
    
    // User Story 3: Show time in label tag
    updateDisplay() {
        const formattedTime = this.formatTime(this.elapsedTime);
        this.timeDisplay.textContent = formattedTime;
    }
    
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const ms = Math.floor((milliseconds % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
    }
}

// Initialize the stopwatch when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Stopwatch();
});