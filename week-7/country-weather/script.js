const API_key = 'c408268efc3dbdf97760c4d05926d1eb';
let row = document.querySelector('.row');
let allColumns = [];
let search = document.getElementById("search");
let noRecordFound = document.getElementById("noRecordFound");
fetch('https://restcountries.eu/rest/v2/all')
    .then(data=> data.json())
    .then(datas=> {
        datas.forEach(data => {
            let column = createElement("div","col-lg-4 border-0 p-4",row)
            let card = createElement("div","card border-0 bg-dark shadow-lg bg-gradient",column)
            let cardBody = createElement("div","card-body  text-white ",card)
            let cardHeader = createElement("h4","card-title text-center m-0 p-0 pb-3",cardBody)
            cardHeader.innerText = data.name;
            let cardImage = createElement("img","w-100",cardBody)
            cardImage.src = data.flag;
            cardImage.style.height = '235px'
            let cardFooter = createElement("div","countryInfo text-white text-center border-0",card)
            let capital = createElement("p","card-text mt-2",cardFooter);
            capital.innerText = `Capital : ${data.capital != '' ?  data.capital : ' - '}`
            let region = createElement("p","card-text",cardFooter);
            region.innerText = `Region : ${data.region}`
            let countryCode = createElement("p","card-text",cardFooter);
            countryCode.innerText = `Country code : ${data.alpha3Code}`
            let getWeather = createElement("button","btn btn-primary mb-4 shadow-lg",cardFooter);
            getWeather.innerText = 'Click here for weather'
            getWeather.setAttribute("onclick",`getWeather(${data.latlng},event)`)
            let weatherInfoFooter = createElement("div","weatherInfo text-white text-center border-0",card);
            weatherInfoFooter.innerHTML = `<div class="loader d-flex justify-content-center mt-5">
                                                <div class="spinner-border text-light" style="width: 4rem; height: 4rem;" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                            <div class="weatherInfoContent ">
                                            </div>`
            let back = createElement("button","btn btn-primary shadow-lg d-none back-button",weatherInfoFooter);
            back.innerText = 'Back'
            back.setAttribute("onclick",`back(event)`)
            let columnObj = {contry : data.name , element : column}
            allColumns.push(columnObj);
        });
    })
    .catch(error=> console.error(error));


const getWeather = (lat,lng,event) =>{ 
    let card = event.path.find(elem => elem.classList && elem.classList.contains("card"))
    let countryInfo = card.children[1];
    countryInfo.style.display = 'none';
    let weatherInfoFooter = card.children[2];
    weatherInfoFooter.style.display = 'block';
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_key}&units=metric`)
        .then(data=> data.json())
        .then(data=> {
            weatherInfoFooter.children[0].setAttribute('class',"oader d-flex justify-content-center d-none");
            weatherInfoFooter.children[2].setAttribute('class',"btn btn-primary shadow-lg  back-button");
            weatherInfoFooter.children[1].innerHTML = `<div class="col-12 d-flex align-items-center justify-content-center">
                                                            <image src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
                                                            <h1>${data.main.feels_like}<sup>°C</sup></h1>
                                                        </div>
                                                        <div class="col-12 row">
                                                            <h6 class="col-6 text-center">Min : ${data.main.temp_min}<sup>°C</sup></h6>
                                                            <h6 class="col-6 text-center">Max : ${data.main.temp_max}<sup>°C</sup></h6>
                                                        </div`
        })
        .catch(error=> {
            console.error(error);
            weatherInfoFooter.children[1].innerHTML = `<h4>No Weather data found</h4>`
        });
}

const back = (event) =>{ 
    let card = event.path.find(elem => elem.classList && elem.classList.contains("card"))
    let countryInfo = card.children[1];
    countryInfo.style.display = 'block';
    let weatherInfoFooter = card.children[2];
    weatherInfoFooter.style.display = 'none';
    weatherInfoFooter.children[0].setAttribute('class',"oader d-flex justify-content-center d-flex");
    weatherInfoFooter.children[2].setAttribute('class',"btn btn-primary shadow-lg  back-button d-none");
    weatherInfoFooter.children[1].innerHTML = ``;
}

const createElement = (elem , classes , parentElem) =>{
    let createdElement = document.createElement(elem);
    createdElement.setAttribute('class',classes);
    parentElem.append(createdElement);
    return createdElement;
}

const searchCountry = ()=>{
    let counter = 0;
    allColumns.forEach(column=>{
        if(column.contry.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())){
            column.element.setAttribute('class',"col-lg-4 border-0 p-4");
        }
        else{
            column.element.setAttribute('class',"col-lg-4 border-0 p-4 d-none");
            counter++;
        }
    })
    console.log(counter,allColumns.length)
    if(counter == allColumns.length){
        noRecordFound.classList.remove('d-none');
    }
    else{
        noRecordFound.classList.add('d-none');
    }
}