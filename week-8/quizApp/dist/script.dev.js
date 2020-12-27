"use strict";

var quizData;
var listStyle = ['A', 'B', 'C', 'D'];
var questionNoElement = document.querySelector('#question_no');
var progressBar = document.querySelector('#progressBar');

function Quiz(data) {
  var questions = data;
  var currentPage = 0;

  this.getQuestions = function () {
    return questions;
  };

  this.incrementPage = function () {
    currentPage++;
  };

  this.decrementPage = function () {
    currentPage--;
  };

  this.getCurrentPage = function () {
    return currentPage;
  };
}

var questionContainer = document.querySelector('.question-container');

var requestQuestions = function requestQuestions() {
  var apiResponse, result;
  return regeneratorRuntime.async(function requestQuestions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"));

        case 2:
          apiResponse = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(apiResponse.json());

        case 5:
          result = _context.sent;
          result = result.results.map(function (data) {
            var category = data.category,
                correct_answer = data.correct_answer,
                difficulty = data.difficulty,
                incorrect_answers = data.incorrect_answers,
                question = data.question;
            incorrect_answers.push(correct_answer);
            shuffleArray(incorrect_answers);
            return {
              question: question,
              incorrect_answers: incorrect_answers,
              correct_answer: correct_answer
            };
          });
          quizData = new Quiz(result);
          console.log(quizData.getQuestions());
          viewQuiz();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

var viewQuiz = function viewQuiz() {
  document.querySelector('.loader').classList.toggle('d-none');
  document.querySelector('#status_display').classList.toggle('d-none');
  quizData.getQuestions().forEach(function (data, index) {
    var questionItem = createElement('div', "w-100 ".concat(index == 0 ? '' : 'd-none'), questionContainer);
    questionItem.innerHTML = "<h1>".concat(data.question, "</h1>");
    data.incorrect_answers.forEach(function (incorrectAnswer, answerIndex) {
      var answerItem = createElement('div', "row align-items-center m-0 mt-3", questionItem);
      answerItem.innerHTML = "<span class=\"btn btn-primary col-2 fs-4 rounded-0\">".concat(listStyle[answerIndex], "</span>\n                                    <input type=\"radio\" name=\"question_").concat(index, "\" id=\"q_").concat(index, "_").concat(answerIndex, "\" \n                                    class=\"answers d-none\" value=").concat(incorrectAnswer, " onchange=\"addProgress()\">\n                                    <label class=\"col-10 fs-4 border btn btn-outline-dark\" \n                                     for=\"q_").concat(index, "_").concat(answerIndex, "\">").concat(incorrectAnswer, "</label>");
    });
  });
};

var addProgress = function addProgress() {
  var answeredQuestions = document.querySelectorAll('.answers:checked');
  progressBar.style.width = "".concat(answeredQuestions.length, "0%");
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

requestQuestions();

var previousQuestion = function previousQuestion() {
  var currentPage = quizData.getCurrentPage();

  if (currentPage > 0) {
    questionContainer.children[currentPage].classList.toggle('d-none');
    quizData.decrementPage();
    currentPage = quizData.getCurrentPage();
    questionContainer.children[currentPage].classList.toggle('d-none');
    questionNoElement.innerHTML = "Question ".concat(currentPage + 1);
  }
};

var nextQuestion = function nextQuestion() {
  var currentPage = quizData.getCurrentPage();

  if (currentPage < questionContainer.children.length - 1) {
    questionContainer.children[currentPage].classList.toggle('d-none');
    quizData.incrementPage();
    currentPage = quizData.getCurrentPage();
    questionContainer.children[currentPage].classList.toggle('d-none');
    questionNoElement.innerHTML = "Question ".concat(currentPage + 1);
  }
};

var createElement = function createElement(elem, classes, parentElem) {
  var createdElement = document.createElement(elem);
  createdElement.setAttribute('class', classes);
  parentElem.append(createdElement);
  return createdElement;
};