// store the first number that is input into the calculator
// operate when = key is pressed
// operate update the display
// + - % x = backspace clear exponent factorial remainder squareroot 
// digits 0 1 2 3 4 5 6 7 8 9 .
let operator = "";
let previousNumber = "";
let currentNumber = "";

let displayEquation = document.querySelector('.equation');
let displayAnswer = document.querySelector('.answer')
let equation = displayEquation.textContent;
let answer = displayAnswer.textContent;

function operate (event) {
	operator = event;
}

function addNumber (event) {
	if(displayEquation.textContent.length >= 16) {
		alert("You have reached the limit");
		return;
	}
	let num = event.target.textContent.toString();
	if(num == '.'){
		if(!displayEquation.textContent.includes('.'))
			displayEquation.textContent += '.';
	}else{
		displayEquation.textContent += num;
	}
}

function allClear() {
	displayEquation.textContent = '';
	displayAnswer.textContent = '';
}

function clear() {
	displayEquation.textContent = displayEquation.textContent.slice(0, -1);
}

function add (number1, number2) {
	return number1 + number2;
}

function subtract (number1, number2) {
	return number1 - number2;
}

function multiply (number1, number2) {
    return number1 * number2;
}

function divide (number1, number2) {
    return number1 / number2;
}

function power (number, power) {
	return Math.pow(number1, number2);
}

const digits = document.querySelectorAll(".digit");
digits.forEach(digit => digit.addEventListener('click', addNumber));

const allClearButton = document.getElementById("all-clear");
allClearButton.addEventListener('click', allClear, false);

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear, false);