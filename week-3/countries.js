//create a request variable.
var request = new XMLHttpRequest();

//open the request
request.open('GET','https://restcountries.eu/rest/v2/all',true);


//SEND REQUEST
request.send();


//load response
request.onload = function() {
    try{
        let countries = JSON.parse(this.response);
        printAsianCountries(countries);
        printAsiaPopulation(countries);
        printPopulationLessCountries(countries);
        printCountryBasicDetails(countries);
        printTotalPopulation(countries);
        printCountriesUsingUSD(countries);
    }
    catch(error){
        console.error("API FAILED =>",error);
    }
}

const printAsianCountries = (countries) =>{
    let asianCountries = countries.filter(country => country.region === 'Asia');
    console.log("asianCountries => ",asianCountries);
}

const printAsiaPopulation = (countries) =>{
    let asiaPopulation = countries.filter(country => country.region === 'Asia')
                            .reduce((population,country)=> population += country.population,0);
    console.log("asiaPopulation => ",asiaPopulation);
}

const printPopulationLessCountries = (countries) =>{
    let populationLessCountries = countries.filter(country => country.population < 200000);
    console.log("populationLessCountries => ",populationLessCountries);
}

const printCountryBasicDetails = (countries) =>{
    countries.forEach(country=>{ 
        console.log("name = ",country.name,", capital = ",country.capital,", flag = ",country.flag)
    });
}

const printTotalPopulation = (countries) =>{
    let totalPopulation = countries.reduce((population,country)=> population += country.population,0);
    console.log("totalPopulation => "+totalPopulation);
}

const printCountriesUsingUSD = (countries) =>{
    let countriesUsingUSD = countries.filter(country => country.currencies.some(currency => currency.code === 'USD'));
    console.log("countriesUsingUSD => ",countriesUsingUSD);
}