"use strict";

var body = document.querySelector('body');
var result = document.querySelector('#result');
var display = document.querySelector('#display');
var memory = document.querySelector('#memory');
var buttons = [];
var currentSum = 0;
var previousOperator = '';
var operators = ["+", "-", "*", "/", '='];
document.querySelectorAll('button').forEach(function (button) {
  return buttons.push(button);
});
body.addEventListener('keydown', function (e) {
  buttons.find(function (button) {
    if (button.value == e.key || e.key == 'Enter' && button.value == '=') {
      button.focus();
      button.click();
      return true;
    }
  });
});
buttons.forEach(function (button) {
  return button.addEventListener('click', function (e) {
    console.log(e.target);
    console.log(e.target.value);

    if (e.path[0].classList.contains('numbers')) {
      appendNumbers(e.target.value);
    } else {
      doOperation(e.target);
    }
  });
});

var appendNumbers = function appendNumbers(number) {
  if (previousOperator == '=') {
    previousOperator = '';
    currentSum = '';
    memory.innerHTML = '';
    result.innerHTML = 0;
  }

  result.setAttribute("hidden", true);
  display.removeAttribute("hidden");

  if (display.innerText.includes(".") && number === ".") {
    return;
  } else if (number === ".") {
    display.innerHTML = "".concat(display.innerHTML).concat(number);
  } else if (display.innerHTML === '0') {
    display.innerHTML = number;
  } else if (display.innerHTML.length < 14) {
    display.innerHTML = "".concat(display.innerHTML).concat(number);
  }
};

var doOperation = function doOperation(operator) {
  var displayNum = +display.innerText;

  if (operator.value === 'Backspace') {
    if (display.innerText.length === 1) {
      display.innerHTML = 0;
      return;
    }

    display.innerHTML = display.innerText.slice(0, display.innerText.length - 1);
  } else if (operators.includes(operator.value) && displayNum !== 0) {
    memory.innerHTML = memory.innerHTML + display.innerText + operator.innerHTML;

    if (previousOperator === '+') {
      currentSum += displayNum;
    } else if (previousOperator === '-') {
      currentSum -= displayNum;
    } else if (previousOperator === '*') {
      currentSum *= displayNum;
    } else if (previousOperator === '/') {
      currentSum /= displayNum;
    } else if (previousOperator === '') {
      currentSum = displayNum;
    }

    result.innerHTML = currentSum;
    previousOperator = operator.value;
    display.innerHTML = 0;
    display.setAttribute("hidden", true);
    result.removeAttribute("hidden");
  } else if (operator.value == 'clearEntry') {
    display.innerHTML = 0;
    result.setAttribute("hidden", true);
    display.removeAttribute("hidden");
  } else if (operator.value == 'clear') {
    previousOperator = '';
    currentSum = '';
    memory.innerHTML = '';
    display.innerHTML = 0;
    result.innerHTML = 0;
    result.setAttribute("hidden", true);
    display.removeAttribute("hidden");
  }
};