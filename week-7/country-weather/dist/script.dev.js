"use strict";

var API_key = 'c408268efc3dbdf97760c4d05926d1eb';
var row = document.querySelector('.row');
var allColumns = [];
var search = document.getElementById("search");
var noRecordFound = document.getElementById("noRecordFound");
fetch('https://restcountries.eu/rest/v2/all').then(function (data) {
  return data.json();
}).then(function (datas) {
  datas.forEach(function (data) {
    var column = createElement("div", "col-lg-4 border-0 p-4", row);
    var card = createElement("div", "card border-0 bg-dark shadow-lg bg-gradient", column);
    var cardBody = createElement("div", "card-body  text-white ", card);
    var cardHeader = createElement("h4", "card-title text-center m-0 p-0 pb-3", cardBody);
    cardHeader.innerText = data.name;
    var cardImage = createElement("img", "w-100", cardBody);
    cardImage.src = data.flag;
    cardImage.style.height = '235px';
    var cardFooter = createElement("div", "countryInfo text-white text-center border-0", card);
    var capital = createElement("p", "card-text mt-2", cardFooter);
    capital.innerText = "Capital : ".concat(data.capital != '' ? data.capital : ' - ');
    var region = createElement("p", "card-text", cardFooter);
    region.innerText = "Region : ".concat(data.region);
    var countryCode = createElement("p", "card-text", cardFooter);
    countryCode.innerText = "Country code : ".concat(data.alpha3Code);
    var getWeather = createElement("button", "btn btn-primary mb-4 shadow-lg", cardFooter);
    getWeather.innerText = 'Click here for weather';
    getWeather.setAttribute("onclick", "getWeather(".concat(data.latlng, ",event)"));
    var weatherInfoFooter = createElement("div", "weatherInfo text-white text-center border-0", card);
    weatherInfoFooter.innerHTML = "<div class=\"loader d-flex justify-content-center mt-5\">\n                                                <div class=\"spinner-border text-light\" style=\"width: 4rem; height: 4rem;\" role=\"status\">\n                                                        <span class=\"visually-hidden\">Loading...</span>\n                                                </div>\n                                            </div>\n                                            <div class=\"weatherInfoContent \">\n                                            </div>";
    var back = createElement("button", "btn btn-primary shadow-lg d-none back-button", weatherInfoFooter);
    back.innerText = 'Back';
    back.setAttribute("onclick", "back(event)");
    var columnObj = {
      contry: data.name,
      element: column
    };
    allColumns.push(columnObj);
  });
})["catch"](function (error) {
  return console.error(error);
});

var getWeather = function getWeather(lat, lng, event) {
  var card = event.path.find(function (elem) {
    return elem.classList && elem.classList.contains("card");
  });
  var countryInfo = card.children[1];
  countryInfo.style.display = 'none';
  var weatherInfoFooter = card.children[2];
  weatherInfoFooter.style.display = 'block';
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lng, "&appid=").concat(API_key, "&units=metric")).then(function (data) {
    return data.json();
  }).then(function (data) {
    weatherInfoFooter.children[0].setAttribute('class', "oader d-flex justify-content-center d-none");
    weatherInfoFooter.children[2].setAttribute('class', "btn btn-primary shadow-lg  back-button");
    weatherInfoFooter.children[1].innerHTML = "<div class=\"col-12 d-flex align-items-center justify-content-center\">\n                                                            <image src=\"http://openweathermap.org/img/wn/".concat(data.weather[0].icon, "@2x.png\">\n                                                            <h1>").concat(data.main.feels_like, "<sup>\xB0C</sup></h1>\n                                                        </div>\n                                                        <div class=\"col-12 row\">\n                                                            <h6 class=\"col-6 text-center\">Min : ").concat(data.main.temp_min, "<sup>\xB0C</sup></h6>\n                                                            <h6 class=\"col-6 text-center\">Max : ").concat(data.main.temp_max, "<sup>\xB0C</sup></h6>\n                                                        </div");
  })["catch"](function (error) {
    console.error(error);
    weatherInfoFooter.children[1].innerHTML = "<h4>No Weather data found</h4>";
  });
};

var back = function back(event) {
  var card = event.path.find(function (elem) {
    return elem.classList && elem.classList.contains("card");
  });
  var countryInfo = card.children[1];
  countryInfo.style.display = 'block';
  var weatherInfoFooter = card.children[2];
  weatherInfoFooter.style.display = 'none';
  weatherInfoFooter.children[0].setAttribute('class', "oader d-flex justify-content-center d-flex");
  weatherInfoFooter.children[2].setAttribute('class', "btn btn-primary shadow-lg  back-button d-none");
  weatherInfoFooter.children[1].innerHTML = "";
};

var createElement = function createElement(elem, classes, parentElem) {
  var createdElement = document.createElement(elem);
  createdElement.setAttribute('class', classes);
  parentElem.append(createdElement);
  return createdElement;
};

var searchCountry = function searchCountry() {
  var counter = 0;
  allColumns.forEach(function (column) {
    if (column.contry.toLocaleLowerCase().includes(search.value.toLocaleLowerCase())) {
      column.element.setAttribute('class', "col-lg-4 border-0 p-4");
    } else {
      column.element.setAttribute('class', "col-lg-4 border-0 p-4 d-none");
      counter++;
    }
  });
  console.log(counter, allColumns.length);

  if (counter == allColumns.length) {
    noRecordFound.classList.remove('d-none');
  } else {
    noRecordFound.classList.add('d-none');
  }
};