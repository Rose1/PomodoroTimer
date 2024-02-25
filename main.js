let timerInterval;
let workDuration = 25 * 60; // 25 minutes in seconds
let breakDuration = 5 * 60; // 5 minutes in seconds
let remainingTime = workDuration;
let isWorking = true;
let isRunning = false;

const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const addTaskButton = document.getElementById('addTask');
const cancelTaskButton = document.getElementById('cancelTask');
const tasks = document.getElementById('tasks');
const todo = document.getElementById('todolist');
const inputTask = document.getElementById('addTaskInput');
let alarm = new Audio("./sounds/clock-alarm.mp3");

function formatTime(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secondsLeft = seconds % 60;
	return `${String(minutes).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
}

function updateDisplay() {
  	display.textContent = formatTime(remainingTime);
}

function startTimer() {
	if (!isRunning) {
		timerInterval = setInterval(function() {
		remainingTime--;
		updateDisplay();
		if (remainingTime === 0) {
			playAlarm();
			if (isWorking) {
			remainingTime = breakDuration;
			isWorking = false;
			} else {
			remainingTime = workDuration;
			isWorking = true;
			}
		}
		}, 1000);
		isRunning = true;
	}
}

function stopTimer() {
	clearInterval(timerInterval);
	isRunning = false;
}

function resetTimer() {
	clearInterval(timerInterval);
	remainingTime = workDuration;
	isWorking = true;
	updateDisplay();
	isRunning = false;
}

const playAlarm = () => alarm.play();

const clearInput = () => {
	inputTask.value = "";
};

const addTask = () => {
	let taskContent = inputTask.value;
	if (taskContent != "") {
		const divtask = document.createElement('div');
		divtask.setAttribute('class', 'item');
		const check = document.createElement('input');
		check.setAttribute('type','checkbox');
		check.setAttribute('display', 'inline')
		const item = document.createElement('label')
		item.textContent = taskContent;
		divtask.appendChild(check);
		divtask.appendChild(item);
		tasks.appendChild(divtask);
		clearInput();
	}
}

const cancelTask = () => {
	clearInput();
};

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
addTaskButton.addEventListener('click',addTask);
cancelTaskButton.addEventListener('click',cancelTask);

