import fetch from 'node-fetch'; 

// display the value of the 'fetch' function
console.log(fetch);

// defining the API URL and parameters
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=44ad5dd5f4fac258f761c9f5df786a86';
const apiUnits = '&units=metric';
const apiLanguage = '&lang=pl';

// getting city name from command line
const apiCity = process.argv[2];

// constructing complete URL for the request
const URL = apiLink + apiCity + apiKey + apiUnits + apiLanguage;

// making API request
fetch(URL).then(response => response.json()).then(response => {     // parse to JSON
    console.log();
    console.log("-----------------------------------------------------");

    // checking the response status code
    if(response.cod == 404) {
        console.log("Błąd 404\nMiasto nie zostało znalezione");
    } else if (response.cod == 200) {
        // format and print all the data
        console.log(response.name);
        console.log("‣ " + response.weather[0].description);
        console.log("‣ Temperatura: " + Math.round(response.main.temp) + "°C");
        console.log("‣ Temperatura odczuwalna: " + Math.round(response.main.feels_like) + "°C");
        console.log("‣ Wiatr: " + Math.round(response.wind.speed * 3.6) + " km/h");
        console.log("‣ Wilgotność: " + response.main.humidity + "%");
        console.log("‣ Ciśnienie atmosferyczne: " + response.main.pressure + " hPa");
    } else {
        // print error message (if it's other than 404)
        console.log(response.cod + " - " + response.message);
    }

    console.log("-----------------------------------------------------");
    console.log();
});