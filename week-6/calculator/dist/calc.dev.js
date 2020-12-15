"use strict";

var body = document.querySelector('body');
var buttons = document.querySelectorAll('button');
body.addEventListener('keydown', function (e) {
  console.log(e.key);
  buttons.forEach(function (button) {
    if (button.innerText == e.key) {
      console.log(button);
      button.focus();
    }
  });
});
buttons.forEach(function (button) {
  return button.addEventListener('click', function (e) {
    console.log(e.path[0].innerText);
  });
});