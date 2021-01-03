"use strict";

var quizData;
var listStyle = ['A', 'B', 'C', 'D'];
var questionNoElement = document.querySelector('#question_no');
var progressBar = document.querySelector('#progressBar');

var checkIfEmailIdPresent = function checkIfEmailIdPresent() {
  if (localStorage.getItem("emailId") === null) {
    window.location = "index.html";
  }
};

checkIfEmailIdPresent();

function Quiz(data) {
  var questions = data;
  var score = 0;
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

  this.setScore = function (currentScore) {
    score = currentScore;
  };

  this.getScore = function () {
    return score;
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

var saveData = function saveData() {
  var email, high_score, response, result;
  return regeneratorRuntime.async(function saveData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          email = document.getElementById("name").value;
          high_score = quizData.getScore();
          console.log(email, score);
          _context2.next = 5;
          return regeneratorRuntime.awrap(fetch("https://5fecbcd6595e420017c2c218.mockapi.io/quiz/score/", {
            method: 'POST',
            body: JSON.stringify({
              email: email,
              high_score: high_score
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }));

        case 5:
          response = _context2.sent;
          console.log(response);
          console.log({
            email: email,
            high_score: high_score
          });
          _context2.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          result = _context2.sent;
          console.log(result);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
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
  var answersArr, score, dbRecord;
  return regeneratorRuntime.async(function submitAnswers$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          document.querySelector('.carousel-control-prev').classList.toggle('d-lg-flex');
          document.querySelector('.carousel-control-next').classList.toggle('d-lg-flex');
          document.querySelector('#status_display').classList.toggle('d-none');
          document.querySelector('#submit-btn').classList.toggle('d-none');
          document.querySelector('.loader').classList.toggle('d-none');
          answersArr = quizData.getQuestions();
          score = 0;
          document.querySelectorAll(".answers:checked").forEach(function (answer) {
            var questionNo = answer.id.split('_');

            if (answersArr[+questionNo[1]].incorrect_answers[+answer.value] === answersArr[+questionNo[1]].correct_answer) {
              score += 2;
            }
          });
          _context3.next = 10;
          return regeneratorRuntime.awrap(getRecord());

        case 10:
          dbRecord = _context3.sent;
          quizData.setScore(score);
          console.log(dbRecord);

          if (dbRecord != null && dbRecord.high_score > score) {
            document.querySelector('#highScore').innerHTML = "High Score - ".concat(dbRecord.high_score);
            document.querySelector('#score').innerHTML = "Score - ".concat(score);
          } else {
            document.querySelector('#highScore').innerHTML = "High Score - ".concat(score);
            saveHighScore(dbRecord);
          }

          document.querySelector('.loader').classList.toggle('d-none');
          document.querySelector('#score_container').classList.toggle('d-none');

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var saveHighScore = function saveHighScore(dbRecord) {
  var email, high_score, response;
  return regeneratorRuntime.async(function saveHighScore$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = localStorage.getItem("emailId");
          high_score = quizData.getScore();
          _context4.next = 4;
          return regeneratorRuntime.awrap(fetch("https://5fecbcd6595e420017c2c218.mockapi.io/quiz/score/".concat(dbRecord != null ? dbRecord.id : ''), {
            method: "".concat(dbRecord != null ? 'PUT' : 'POST'),
            body: JSON.stringify({
              email: email,
              high_score: high_score
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }));

        case 4:
          response = _context4.sent;
          console.log(response);
          console.log({
            email: email,
            high_score: high_score
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var getRecord = function getRecord() {
  var emailId, apiResponse, result;
  return regeneratorRuntime.async(function getRecord$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          emailId = localStorage.getItem("emailId");
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch("https://5fecbcd6595e420017c2c218.mockapi.io/quiz/score?search=".concat(emailId)));

        case 3:
          apiResponse = _context5.sent;
          _context5.next = 6;
          return regeneratorRuntime.awrap(apiResponse.json());

        case 6:
          result = _context5.sent;
          console.log(result);

          if (!(result.length > 0)) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", result[0]);

        case 12:
          return _context5.abrupt("return", null);

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var save = function save() {
  saveData();
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