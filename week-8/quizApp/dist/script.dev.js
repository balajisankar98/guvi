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

var getURL = function getURL() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var category = urlParams.get("category");
  var difficulty = urlParams.get("difficulty");
  var url = "https://opentdb.com/api.php?amount=10&type=multiple";

  if (category != 'any' && category != null) {
    url += "&category=".concat(category);
  }

  if (difficulty != 'any' && difficulty != null) {
    url += "&difficulty=".concat(difficulty);
  }

  return url;
};

var requestQuestions = function requestQuestions() {
  var apiResponse, result;
  return regeneratorRuntime.async(function requestQuestions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          document.querySelector('.loader').className = "text-center loader row";
          document.querySelector('#score_container').classList.toggle('d-none');
          questionContainer.innerHTML = "";
          addProgress();
          questionNoElement.innerHTML = "1";
          _context.next = 7;
          return regeneratorRuntime.awrap(fetch(getURL()));

        case 7:
          apiResponse = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(apiResponse.json());

        case 10:
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
          viewQuiz();

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
};

var viewQuiz = function viewQuiz() {
  document.querySelector('.carousel-control-prev').classList.toggle('d-lg-flex');
  document.querySelector('.carousel-control-next').classList.toggle('d-lg-flex');
  document.querySelector('.loader').classList.toggle('d-none');
  document.querySelector('#status_display').classList.toggle('d-none');
  document.querySelector('#submit-btn').classList.toggle('d-none');
  quizData.getQuestions().forEach(function (data, index) {
    var questionItem = createElement('div', "w-100 ".concat(index == 0 ? '' : 'right d-none', " p-3 animation card shadow bg-gradient"), questionContainer);
    questionItem.innerHTML = "<h1 class=\"text-black-50\">".concat(data.question, "</h1>");
    data.incorrect_answers.forEach(function (incorrectAnswer, answerIndex) {
      var answerItem = createElement('div', "row align-items-center m-0 mt-3", questionItem);
      answerItem.innerHTML = "<span class=\"btn btn-primary col-2 d-md-block d-none fs-4 rounded-0\">".concat(listStyle[answerIndex], "</span>\n                                    <input type=\"radio\" name=\"question_").concat(index, "\" id=\"q_").concat(index, "_").concat(answerIndex, "\" \n                                    class=\"answers d-none\" value=\"").concat(answerIndex, "\" onchange=\"addProgress()\">\n                                    <label class=\"col-12 col-md-10 fs-4 border btn btn-outline-primary rounded-0\" \n                                     for=\"q_").concat(index, "_").concat(answerIndex, "\">").concat(incorrectAnswer, "</label>");
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
    questionContainer.children[currentPage].classList.toggle('right');
    applyAfterDelay(questionContainer.children[currentPage], 'd-none');
    quizData.decrementPage();
    currentPage = quizData.getCurrentPage();
    applyAfterDelay(questionContainer.children[currentPage], 'd-none');
    applyAfterDelay(questionContainer.children[currentPage], 'left', 400);
    questionNoElement.innerHTML = "".concat(currentPage + 1);
  }
};

var applyAfterDelay = function applyAfterDelay(elem, elemClass) {
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
  setTimeout(function () {
    elem.classList.toggle(elemClass);
  }, delay);
};

var nextQuestion = function nextQuestion() {
  var currentPage = quizData.getCurrentPage();

  if (currentPage < questionContainer.children.length - 1) {
    questionContainer.children[currentPage].classList.toggle('left');
    applyAfterDelay(questionContainer.children[currentPage], 'd-none');
    quizData.incrementPage();
    currentPage = quizData.getCurrentPage();
    applyAfterDelay(questionContainer.children[currentPage], 'd-none');
    applyAfterDelay(questionContainer.children[currentPage], 'right', 400);
    questionNoElement.innerHTML = "".concat(currentPage + 1);
  }
};

var createElement = function createElement(elem, classes, parentElem) {
  var createdElement = document.createElement(elem);
  createdElement.setAttribute('class', classes);
  parentElem.append(createdElement);
  return createdElement;
};

var submitAnswers = function submitAnswers() {
  var answersArr = quizData.getQuestions();
  var score = 0;
  document.querySelectorAll(".answers:checked").forEach(function (answer) {
    var questionNo = answer.id.split('_');

    if (answersArr[+questionNo[1]].incorrect_answers[+answer.value] === answersArr[+questionNo[1]].correct_answer) {
      score += 2;
    }
  });
  document.querySelector('.carousel-control-prev').classList.toggle('d-lg-flex');
  document.querySelector('.carousel-control-next').classList.toggle('d-none');
  document.querySelector('#status_display').classList.toggle('d-none');
  document.querySelector('#score_container').classList.toggle('d-none');
  document.querySelector('#submit-btn').classList.toggle('d-none');
  document.querySelector('#score').innerHTML = score;
};

var save = function save() {
  var name = document.getElementById("name").value.replace(/\s+/g, ' ').trim();

  if (name !== '' || name.length < 3) {
    var alertElem = createElement('div', 'alert alert-warning alert-dismissible fade show', document.querySelector('.container'));
    console.log(alertElem);
    alertElem.role = 'alert';
    alertElem.innerHTML = "<strong>Please!</strong> Enter valid name.\n        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\" aria-label=\"Close\"></button>";
    var bsAlert = new bootstrap.Alert(alertElem);
    console.log(bsAlert);
    return false;
  }
};