//create a request variable.
let request = new XMLHttpRequest();

//open the request
request.open('GET','https://restcountries.eu/rest/v2/all',true);

const API_key = 'c408268efc3dbdf97760c4d05926d1eb';

//SEND REQUEST
request.send();

//load response
request.onload = function() {
    var countries = JSON.parse(this.response);
    
    countries.slice(0,9).forEach(country => {
        let lat = country.latlng[0];
        let lon = country.latlng[1];
        let city = country.capital;
        let name = country.name;
        // console.log(country)
        getWeatherDataByLatlng(lat,lon,name);
        getWeatherDataByCity(city)
    });
}

const getWeatherDataByLatlng = (lat,lon,name)=>{
    let request = new XMLHttpRequest();
    //open the request
    request.open('GET',`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`,true);
    //SEND REQUEST
    request.send();
    request.onload = function() {
        var weather = JSON.parse(this.response);
        console.log(name,weather)
    }
}

const getWeatherDataByCity = (city)=>{
    if(city !== '' ){
        let request = new XMLHttpRequest();
        //open the request
        request.open('GET',`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`,true);
        //SEND REQUEST
        request.send();
        request.onload = function() {
            var weather = JSON.parse(this.response);
            console.log(city,weather)
        }
    }
}