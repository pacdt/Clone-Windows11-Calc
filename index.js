let display = document.getElementById("display");
let miniDisplay = document.getElementById("miniDisplay");
let displayIsZero = true;

function updateDisplay(value) {
	if (displayIsZero) {
		display.innerHTML = removeDecimalPoint(value);
		miniDisplay.innerHTML;
		displayIsZero = false;
	} else if (display.innerHTML.length < 12) {
		display.innerHTML += removeDecimalPoint(value);
	}
	addThousandsSeparator();
}
function removeDecimalPoint(value) {
	return value.toString().replace(".", "");
}

function addThousandsSeparator() {
	const displayValue = display.innerHTML.replace(".", "");
	const integerPart = displayValue.split(".")[0];
	const decimalPart = displayValue.split(".")[1];
	const integerPartWithSeparators = integerPart.replace(
		/\B(?=(\d{3})+(?!\d))/g,
		"."
	);
	if (decimalPart) {
		display.innerHTML = `${integerPartWithSeparators}.${decimalPart}`;
	} else {
		display.innerHTML = integerPartWithSeparators;
	}
}

function clearDisplay() {
	display.innerHTML = "0";
	displayIsZero = true;
}
function clearMiniDisplay() {
	miniDisplay.innerHTML = "&nbsp;";
}

let firstNumber = null;
let secondNumber = null;

const button0 = document.getElementById("button0");
const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");
const button5 = document.getElementById("button5");
const button6 = document.getElementById("button6");
const button7 = document.getElementById("button7");
const button8 = document.getElementById("button8");
const button9 = document.getElementById("button9");
const btVirgula = document.getElementById("virgula");
const btClear = document.getElementById("limpar");
const buttonAdd = document.getElementById("buttonAdd");
const buttonSubtract = document.getElementById("buttonSubtract");
const buttonClear = document.getElementById("buttonClear");
const buttonEquals = document.getElementById("buttonEquals");

buttonClear.addEventListener("click", function () {
	display.innerHTML = "0";
	displayIsZero = true;
});

btClear.addEventListener("click", function () {
	clearDisplay();
	clearMiniDisplay();
});

const buttons = [
	"button0",
	"button1",
	"button2",
	"button3",
	"button4",
	"button5",
	"button6",
	"button7",
	"button8",
	"button9",
];

for (let i = 0; i < buttons.length; i++) {
	const button = document.getElementById(buttons[i]);
	button.addEventListener("click", function () {
		updateDisplay(buttons[i].replace("button", ""));
	});
}

function backspace() {
	let displayValue = display.innerHTML;
	display.innerHTML = "";
	let newValue = displayValue.toString();
	if (newValue.length > 1) {
		newValue = newValue.slice(0, -1);
		displayValue = parseFloat(newValue.replace(/\./g, ""));
		updateDisplay(displayValue.toLocaleString("pt-BR"));
	} else {
		displayValue = 0;
		displayIsZero = true;
		updateDisplay(displayValue);
		clearDisplay();
	}
}

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", backspace);

buttonAdd.addEventListener("click", function () {
	firstNumber = display.innerHTML;
	clearDisplay();
	miniDisplay.innerHTML = `${firstNumber} + `;
	display.innerHTML = firstNumber;
	secondNumber = display.innerHTML;
	return Number(firstNumber.replace(/\./g, "").toLocaleString('pt-br', {style: 'decimal'}));
});

buttonMultiply.addEventListener("click", function () {
	firstNumber = display.innerHTML;
	clearDisplay();
	miniDisplay.innerHTML = `${firstNumber} x `;
	display.innerHTML = firstNumber;
	secondNumber = display.innerHTML;
	return Number(firstNumber.replace(/\./g, "").toLocaleString('pt-br', {style: 'decimal'}));
});

buttonDivide.addEventListener("click", function () {
	firstNumber = display.innerHTML;
	clearDisplay();
	miniDisplay.innerHTML = `${firstNumber} &divide;`;
	display.innerHTML = firstNumber;
	secondNumber = display.innerHTML;
	return Number(firstNumber.replace(/\./g, "").toLocaleString('pt-br', {style: 'decimal'}));
});

buttonSubtract.addEventListener("click", function () {
	firstNumber = display.innerHTML;
	clearDisplay();
	miniDisplay.innerHTML = `${firstNumber} - `;
	display.innerHTML = firstNumber;
	secondNumber = display.innerHTML;
	return Number(firstNumber.replace(/\./g, "").toLocaleString('pt-br', {style: 'decimal'}));
});


buttonEquals.addEventListener("click", function () {
	if (miniDisplay.innerHTML == `${firstNumber} - `) {
		secondNumber = display.innerHTML;
		clearDisplay();
		let result = Number(firstNumber) - Number(secondNumber);
		display.innerHTML = result
		miniDisplay.innerHTML = `${firstNumber} - ${secondNumber} =`;
		
	} else if (miniDisplay.innerHTML == `${firstNumber} + `) {
		secondNumber = display.innerHTML;
		secondNumber.replace(/\./g, "");
		clearDisplay();
		let result = Number(firstNumber) + Number(secondNumber);
		display.innerHTML = result;
		miniDisplay.innerHTML = `${firstNumber} + ${secondNumber} =`;

	} else if (miniDisplay.innerHTML == `${firstNumber} x `) {
		secondNumber = display.innerHTML;
		clearDisplay();
		let result = firstNumber * secondNumber;
		display.innerHTML = result
		miniDisplay.innerHTML = `${firstNumber} x ${secondNumber} =`;

	} else {
		secondNumber = display.innerHTML;
		clearDisplay();
		let result = firstNumber / secondNumber;
		display.innerHTML = result
		miniDisplay.innerHTML = `${firstNumber} &divide; ${secondNumber} =`;

	}
});
