import fetch from 'node-fetch';
console.log(fetch);

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=44ad5dd5f4fac258f761c9f5df786a86';
const apiUnits = '&units=metric';
const apiLanguage = '&lang=pl';

const apiCity = process.argv[2];

const URL = apiLink + apiCity + apiKey + apiUnits + apiLanguage;

fetch(URL).then(response => response.json()).then(response => {
    console.log();
    console.log("-----------------------------------------------------");
    if(response.cod == 404) {
        console.log("Błąd 404\nMiasto nie zostało znalezione");
    } else if (response.cod == 200) {
        console.log(response.name);
        console.log("‣ " + response.weather[0].description);
        console.log("‣ Temperatura: " + Math.round(response.main.temp) + "°C");
        console.log("‣ Temperatura odczuwalna: " + Math.round(response.main.feels_like) + "°C");
        console.log("‣ Wiatr: " + Math.round(response.wind.speed * 3.6) + " km/h");
        console.log("‣ Wilgotność: " + response.main.humidity + "%");
        console.log("‣ Ciśnienie atmosferyczne: " + response.main.pressure + " hPa");
    } else {
        console.log(response.cod + " - " + response.message);
    }
    console.log("-----------------------------------------------------");
    console.log();
});