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
const requestQuestions = async ()=>{
   let apiResponse = await fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple");
   let result = await apiResponse.json(); 
   result = result.results
                .map(data=>{
                    let {category,correct_answer,difficulty,incorrect_answers,question} = data;
                    incorrect_answers.push(correct_answer);
                    shuffleArray(incorrect_answers)
                    return {question,incorrect_answers,correct_answer};
                })
    quizData = new Quiz(result);
    console.log(quizData.getQuestions())
    viewQuiz();
}

const viewQuiz = () =>{
    document.querySelector('.loader').classList.toggle('d-none');
    document.querySelector('#status_display').classList.toggle('d-none');
    quizData.getQuestions().forEach((data,index)=>{
        let questionItem = createElement('div',`w-100 ${index == 0 ? '' : 'd-none'}`,questionContainer)
        questionItem.innerHTML = `<h1>${data.question}</h1>`
        data.incorrect_answers.forEach((incorrectAnswer,answerIndex)=>{
            let answerItem = createElement('div',`row align-items-center m-0 mt-3`,questionItem);
            answerItem.innerHTML = `<span class="btn btn-primary col-2 fs-4 rounded-0">${listStyle[answerIndex]}</span>
                                    <input type="radio" name="question_${index}" id="q_${index}_${answerIndex}" 
                                    class="answers d-none" value=${incorrectAnswer} onchange="addProgress()">
                                    <label class="col-10 fs-4 border btn btn-outline-dark" 
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
        questionContainer.children[currentPage].classList.toggle('d-none');
        quizData.decrementPage();
        currentPage = quizData.getCurrentPage();
        questionContainer.children[currentPage].classList.toggle('d-none');
        questionNoElement.innerHTML = `Question ${currentPage+1}`
    }
}

const nextQuestion = ()=>{
    let currentPage = quizData.getCurrentPage();
    if(currentPage < questionContainer.children.length - 1){
        questionContainer.children[currentPage].classList.toggle('d-none');
        quizData.incrementPage();
        currentPage = quizData.getCurrentPage();
        questionContainer.children[currentPage].classList.toggle('d-none');
        questionNoElement.innerHTML = `Question ${currentPage+1}`
    }
}

const createElement = (elem , classes , parentElem) =>{
    let createdElement = document.createElement(elem);
    createdElement.setAttribute('class',classes);
    parentElem.append(createdElement);
    return createdElement;
}