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
let answerStored;
// let equation = displayEquation.textContent;
// let answer = displayAnswer.textContent;


function addNumber (event) {
	// set limit for equation row display
	if(displayEquation.textContent.length >= 16) {
		alert("You have reached the limit");
		return;
	}
	// digits entered
	let num = event.target.textContent.toString();
	// if decimal are entered, check if the equation already include a decimal
	if(num == '.'){
		if(!displayEquation.textContent.includes('.'))
			displayEquation.textContent += '.';
	}
	else{
		displayEquation.textContent += num;
	}
}

function addOperation (event) {
	// set limit for equation row display
	if(displayEquation.textContent.length >= 16) {
		alert("You have reached the limit");
		return;
	}
	// cannot add operator if there is no digit input
	if(displayEquation.textContent == '') {
		return;
	}
	// when operator is added for the first time
	if(operator=="") {
		operator = event.target.textContent.toString();
		previousNumber = parseFloat(displayEquation.textContent);
		(operator != 'xy') ? displayEquation.textContent+=operator : displayEquation.textContent+='^';
	}
	// when operator is added after operation
	else if(operator=="n") {
		previousNumber = parseFloat(displayAnswer.textContent);
		operator = event.target.textContent.toString();
		displayEquation.textContent = (operator != 'xy') ? previousNumber+operator : previousNumber+'^';
		displayAnswer.textContent = '';
	}
	// when operator is entered second time, the equation are calculated automatically
	else {
		// let index = (operator != 'xy') ? displayEquation.textContent.indexOf(operator) : displayEquation.textContent.indexOf('^');
		// currentNumber = parseFloat(displayEquation.textContent.slice(index + 1));
		operate();
	}

}

function changeSign() {
	let firstChar = displayEquation.textContent.slice(0, 1);
	// Check the first character of equation row display
	// If it is not equals to - and not empty then change sign
	// changedSign variable to take note whether the signed are changed	
	// the Sign are change everytime the changeSign event triggered
	displayEquation.textContent = (firstChar != '-' && firstChar !='') ? '-' + displayEquation.textContent : displayEquation.textContent.slice(1);
	previousNumber = -previousNumber;
	// if (firstChar != '-' && firstChar != '') {
	// 	displayEquation.textContent = '-' + displayEquation.textContent;
	// 	previousNumber = -previousNumber;
	// }
	// else {
	// 	displayEquation.textContent = displayEquation.textContent.slice(1);
	// 	previousNumber = -previousNumber;
	// }
}

function operate() {
	if (currentNumber == ''){
		let index = (operator != 'xy') ? displayEquation.textContent.indexOf(operator) : displayEquation.textContent.indexOf('^');
		currentNumber = parseFloat(displayEquation.textContent.slice(index + 1));
	}
	switch(operator){
		case '+':
			answerStored = add(previousNumber,currentNumber);
			break;
		case '-':
			answerStored = subtract(previousNumber, currentNumber);
			break;
		case 'x':
			answerStored = multiply(previousNumber, currentNumber);
			break;
		case '÷':
			answerStored = divide(previousNumber, currentNumber);
			break;
		case 'xy':
			answerStored = power(previousNumber, currentNumber);
			break;
	}
	if (answerStored > 1e10) {
		displayAnswer.textContent = answerStored.toExponential(2);
	} else {
		displayAnswer.textContent = answerStored;
	}

	// in case the user want to use last results
	operator='n';
	// reset the previous number and current number memory
	previousNumber = 0;
	currentNumber = 0;
	// reset the equation row display
	changedSign = false;
}

function allClear() {
	// clear equation row display
	// clear answer row display
	// reset previous number, current number and operator memory
	displayEquation.textContent = '';
	displayAnswer.textContent = '';
	previousNumber = 0;
	currentNumber = 0;
	operator = '';
}

function clear() {
	// remove the last character from the equation row display
	displayEquation.textContent = displayEquation.textContent.slice(0, -1);
}

// functions for addition, subtraction, multiplication, division, exponentiation
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
	return Math.pow(number, power);
}

// add event listeners to each buttons
const digits = document.querySelectorAll(".digit");
digits.forEach(digit => digit.addEventListener('click', addNumber));

const allClearButton = document.getElementById("all-clear");
allClearButton.addEventListener('click', allClear, false);

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', clear, false);

const operationButton = document.querySelectorAll('.operation');
operationButton.forEach(operate => operate.addEventListener('click', addOperation));

const equalButton = document.getElementById('equals');
equalButton.addEventListener('click', operate);

const signButton = document.getElementById('sign');
signButton.addEventListener('click', changeSign);