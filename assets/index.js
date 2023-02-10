var cityFormEl = document.querySelector('#city-form');
var citySearchEl = document.querySelector('#nameOfCity');
var fiveDayEl = document.querySelector("#fiveDayTitle");
var currentCityWeatherEl = document.querySelector("#citys-current-weather");
var fiveDayForecastEl = document.querySelector("#five-day-forecast-weather");

function formSubmission(event) {
    event.preventDefault();

    var cityName = citySearchEl.value.trim();

    if (cityName){
        getCurrentCitysWeather(cityName);

        citySearchEl.value = "";
        currentCityWeatherEl.innerHTML = "";
        fiveDayForecastEl.innerHTML = "";
        fiveDayEl.innerHTML = '';
    } else {
        alert("This is a required Field!");
    }
}


