let quizData;
let listStyle = ['A','B','C','D']
let questionNoElement = document.querySelector('#question_no')
let progressBar = document.querySelector('#progressBar')
function Quiz(data){
    const questions = data;
    let currentPage = 0;
    this.getQuestions = ()=>{
        return questions;
    }
    this.incrementPage = ()=>{
        currentPage++;
    }
    this.decrementPage = ()=>{
        currentPage--;
    }
    this.getCurrentPage = ()=>{
        return currentPage;
    }
}
let questionContainer = document.querySelector('.question-container');

const getURL = ()=>{
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
    let category = urlParams.get("category");
    let difficulty = urlParams.get("difficulty");
    let url = `https://opentdb.com/api.php?amount=10&type=multiple`
    if(category != 'any' && category != null){
     url += `&category=${category}`;
    }
    if(difficulty != 'any' && difficulty != null){
     url += `&difficulty=${difficulty}`;
    }
    return url;
 }
 
const requestQuestions = async ()=>{
    document.querySelector('.loader').className = `text-center loader row`;
    document.querySelector('#score_container').classList.toggle('d-none');
    questionContainer.innerHTML = ``;
    addProgress();
    questionNoElement.innerHTML = `1`
   let apiResponse = await fetch(getURL());
   let result = await apiResponse.json(); 
   result = result.results
                .map(data=>{
                    let {category,correct_answer,difficulty,incorrect_answers,question} = data;
                    incorrect_answers.push(correct_answer);
                    shuffleArray(incorrect_answers)
                    return {question,incorrect_answers,correct_answer};
                })
    quizData = new Quiz(result);
    viewQuiz();
}

const viewQuiz = () =>{
    document.querySelector('.carousel-control-prev').classList.toggle('d-lg-flex');
    document.querySelector('.carousel-control-next').classList.toggle('d-none');
    document.querySelector('.loader').classList.toggle('d-none');
    document.querySelector('#status_display').classList.toggle('d-none');
    document.querySelector('#submit-btn').classList.toggle('d-none');
    quizData.getQuestions().forEach((data,index)=>{
        let questionItem = createElement('div',`w-100 ${index == 0 ? '' : 'right'} position-absolute t-0  animation card shadow p-3  bg-gradient`,questionContainer)
        questionItem.innerHTML = `<h1>${data.question}</h1>`
        data.incorrect_answers.forEach((incorrectAnswer,answerIndex)=>{
            let answerItem = createElement('div',`row align-items-center m-0 mt-3`,questionItem);
            answerItem.innerHTML = `<span class="btn btn-dark col-2 d-md-block d-none fs-4 rounded-0">${listStyle[answerIndex]}</span>
                                    <input type="radio" name="question_${index}" id="q_${index}_${answerIndex}" 
                                    class="answers d-none" value="${answerIndex}" onchange="addProgress()">
                                    <label class="col-12 col-md-10 fs-4 border btn btn-outline-dark" 
                                     for="q_${index}_${answerIndex}">${incorrectAnswer}</label>`
        })
    })
}
const addProgress = ()=>{
let answeredQuestions = document.querySelectorAll('.answers:checked');
    progressBar.style.width = `${answeredQuestions.length}0%`
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

requestQuestions();

const previousQuestion = ()=>{
    let currentPage = quizData.getCurrentPage();
    if(currentPage > 0){
        questionContainer.children[currentPage].classList.toggle('right');
        quizData.decrementPage();
        currentPage = quizData.getCurrentPage();
        questionContainer.children[currentPage].classList.toggle('left');
        questionNoElement.innerHTML = `${currentPage+1}`
    }
}

const nextQuestion = ()=>{
    let currentPage = quizData.getCurrentPage();
    if(currentPage < questionContainer.children.length - 1){
        questionContainer.children[currentPage].classList.toggle('left');
        quizData.incrementPage();
        currentPage = quizData.getCurrentPage();
        questionContainer.children[currentPage].classList.toggle('right');
        questionNoElement.innerHTML = `${currentPage+1}`
    }
}

const createElement = (elem , classes , parentElem) =>{
    let createdElement = document.createElement(elem);
    createdElement.setAttribute('class',classes);
    parentElem.append(createdElement);
    return createdElement;
}

const submitAnswers = () =>{
    let answersArr = quizData.getQuestions();
    let score = 0;
    document.querySelectorAll(".answers:checked")
            .forEach(answer =>{
                let questionNo = answer.id.split('_');
                if(answersArr[+questionNo[1]].incorrect_answers[+answer.value] === answersArr[+questionNo[1]].correct_answer){
                    score += 2;
                }
            })
    document.querySelector('.carousel-control-prev').classList.toggle('d-lg-flex');
    document.querySelector('.carousel-control-next').classList.toggle('d-none');
    document.querySelector('#status_display').classList.toggle('d-none');
    document.querySelector('#score_container').classList.toggle('d-none');
    document.querySelector('#submit-btn').classList.toggle('d-none');
    document.querySelector('#score').innerHTML = score
}

const save = ()=>{
    
    let name = document.getElementById("name").value.replace(/\s+/g, ' ').trim();
    if(name !== '' || name.length < 3){
        let alertElem = createElement('div','alert alert-warning alert-dismissible fade show',document.querySelector('.container'));
        console.log(alertElem)
        alertElem.role = 'alert'
        alertElem.innerHTML = `<strong>Please!</strong> Enter valid name.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`
        var bsAlert = new bootstrap.Alert(alertElem);
        console.log(bsAlert)
        return false;
    }
}