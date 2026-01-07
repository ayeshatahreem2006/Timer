let countdownInterval;
let remainingTime = 0;
let isPaused = false;

// Elements
const daysInput = document.getElementById("days");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const countdownDisplay = document.getElementById("countdownDisplay");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

const reminderText = document.getElementById("reminderText");
const reminderTime = document.getElementById("reminderTime");
const addReminderBtn = document.getElementById("addReminderBtn");
const reminderList = document.getElementById("reminderList");

// Audio setup
let audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
audio.preload = "auto";

// unlock audio on first user interaction
document.body.addEventListener("click", () => {
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
  }).catch(() => {
    // ignored
  });
}, { once: true });

// Format time
function formatTime(time) {
  const d = Math.floor(time / (24 * 3600));
  const h = Math.floor((time % (24 * 3600)) / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;
  return `${String(d).padStart(2, "0")}:${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Start timer
startBtn.addEventListener("click", () => {
  if (!countdownInterval) {
    const d = parseInt(daysInput.value) || 0;
    const h = parseInt(hoursInput.value) || 0;
    const m = parseInt(minutesInput.value) || 0;
    const s = parseInt(secondsInput.value) || 0;

    if (remainingTime <= 0 || !isPaused) {
      remainingTime = d * 86400 + h * 3600 + m * 60 + s;
    }

    if (remainingTime > 0) {
      countdownInterval = setInterval(() => {
        if (remainingTime > 0) {
          remainingTime--;
          countdownDisplay.textContent = formatTime(remainingTime);
        } else {
          clearInterval(countdownInterval);
          countdownInterval = null;
          audio.currentTime = 0;
          audio.play(); // ✅ will play when timer ends
        }
      }, 1000);
    }
    isPaused = false;
  }
});

// Pause timer
pauseBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  isPaused = true;
});

// Reset timer
resetBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  countdownInterval = null;
  isPaused = false;
  remainingTime = 0;
  countdownDisplay.textContent = "00:00:00:00";
});

// Add Todo
addTodoBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();
  if (task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const tickBtn = document.createElement("button");
    tickBtn.textContent = "✔";
    tickBtn.classList.add("tick-btn");
    tickBtn.addEventListener("click", () => {
      li.classList.toggle("done");
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(span);
    li.appendChild(tickBtn);
    li.appendChild(delBtn);

    todoList.appendChild(li);
    todoInput.value = "";
  }
});

// Add Reminder
addReminderBtn.addEventListener("click", () => {
  const text = reminderText.value.trim();
  const time = reminderTime.value;
  if (text && time) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${text} at ${time}`;

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(span);
    li.appendChild(delBtn);

    reminderList.appendChild(li);
    reminderText.value = "";
    reminderTime.value = "";
  }
});
