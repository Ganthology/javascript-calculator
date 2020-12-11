// store the first number that is input into the calculator
// operate when = key is pressed
// operate update the display
// + - % x = backspace clear exponent factorial remainder squareroot 
// digits 0 1 2 3 4 5 6 7 8 9 .
let operator = "";
let previousNumber = 0;
let currentNumber = 0;

let displayEquation = document.querySelector('.equation');
let displayAnswer = document.querySelector('.answer')
// let equation = displayEquation.textContent;
// let answer = displayAnswer.textContent;


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

function addOperation (event) {
	if(displayEquation.textContent.length >= 16) {
		alert("You have reached the limit");
		return;
	}
	if(operator=="") {
		operator = event.target.textContent.toString();
		previousNumber = parseFloat(displayEquation.textContent);
		displayEquation.textContent+=operator;
	} else if(operator=="n") {
		previousNumber = parseFloat(displayAnswer.textContent);
		operator = event.target.textContent.toString();
		displayEquation.textContent = previousNumber+operator;
		displayAnswer.textContent = '';
	}
	else {
		let index = displayEquation.textContent.indexOf(operator);
		currentNumber = parseFloat(displayEquation.textContent.slice(index + 1));
		operate();
	}

}

function operate () {
	switch(operator){
		case '+':
			displayAnswer.textContent = add(previousNumber,currentNumber);
			break;
		case '-':
			displayAnswer.textContent = subtract(previousNumber, currentNumber);
			break;
		case 'x':
			displayAnswer.textContent = multiply(previousNumber, currentNumber);
			break;
		case '÷':
			displayAnswer.textContent = divide(previousNumber, currentNumber);
			break;
	}
	operator='n';
}

function allClear() {
	displayEquation.textContent = '';
	displayAnswer.textContent = '';
	previousNumber = 0;
	currentNumber = 0;
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

const operationButton = document.querySelectorAll('.operation');
operationButton.forEach(operate => operate.addEventListener('click', addOperation));