// all of my variables and selector declarations //

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


function buttonClickHandler(event) {
    var element = event.target;

  if (element.matches("button") === true) {
    var city = element.getAttribute("data-city");
    getCurrentCitysWeather(city);
    citySearchEl.value = "";
    currentCityWeatherEl.innerHTML = "";
    fiveDayForecastEl.innerHTML = "";
    fiveDayEl.innerHTML = '';
    
  }
}

  // contains the check to make sure the city entered is a valid city and contains the API url and my special key//
function getCurrentCitysWeather(city) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + ",US&limit=1&appid=0e4df6b1f19ede2dfe69a7674f664d07";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data){
                    if (data.length > 0) {
                        getCurrentWeatherData(data[0].lat, data[0].lon);
                        getFiveDayForecast(data[0].lat, data[0].lon);
                    } else {
                        alert("City " + city +  " is outside of the United States. Please enter a valid city.");
                    }  
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })

}

function getCurrentWeatherData(lat,lon){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=e82d07c38f8006d0d8ccd5d9f7f67108&units=imperial";
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data){
                      // passes these paramters into the display current weather function taken from the API //
                    displayCurrentWeather(data.name, data.dt, data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].icon);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
}


  // The main function that displays the CURRENT weather in the box at the top//

function displayCurrentWeather(cityName, currentDate, temp, humidity, windSpeed, iconcode) {
    var date =  moment.unix(currentDate).format("MM/DD/YYYY");
    var iconLink = "https://openweathermap.org/img/w/" + iconcode + ".png";

    var cityTitleEl = document.createElement("h3");
    cityTitleEl.innerHTML = cityName + " " + "(" + date + ") ";
    var spanEl = document.createElement("span");
    var iconEl = document.createElement("img");
    iconEl.src = iconLink;
    iconEl.classList.add("weather-image");
    spanEl.appendChild(iconEl);
    cityTitleEl.appendChild(spanEl);
    currentCityWeatherEl.appendChild(cityTitleEl);

    // This is the diplay functions for the TEMP of the current day //
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + temp + "°F";
    currentCityWeatherEl.appendChild(tempEl);
    // this is the display functions for the HUMIDITY for the current day //
    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + humidity + "%";
    currentCityWeatherEl.appendChild(humidityEl);
    currentCityWeatherEl.classList.add("border");
    // this is the display functions for the WIND for the current day //
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + windSpeed + " MPH";
    currentCityWeatherEl.appendChild(windEl);

}


  // The getter method for getting the forecast for the week //
function getFiveDayForecast(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=e82d07c38f8006d0d8ccd5d9f7f67108&units=imperial";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data){
                      // passes API aquired data from the API call to the forcast display //
                    displayFiveDayForecast(data);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
}

  // initializer for the forecast data creates the title and gives the dates to each of the cards //
function displayFiveDayForecast(info) {
   
    var titleEl = document.createElement("h4");
    titleEl.innerHTML = "5-Day Forecast:";
    fiveDayEl.appendChild(titleEl);
    var currentDate = moment().format("YYYYMMDD");

    for (var i = 0; i < info.list.length; i++){
        var nextDate = moment.unix(info.list[i].dt).format("YYYYMMDD");
        if (nextDate > currentDate){
            displayForecastData(info.list[i]);
            currentDate = nextDate;    
        } 
    }

}


  // The display function for all of the 5 day forecast //
function displayForecastData(weatherInfo){
    var date = moment.unix(weatherInfo.dt).format("MM/DD/YYYY");
    var iconLink = "https://openweathermap.org/img/w/" + weatherInfo.weather[0].icon + ".png";
    var temp = weatherInfo.main.temp;
    var humidity = weatherInfo.main.humidity;
    var windSpeed = weatherInfo.wind.speed;
    

    var divEl = document.createElement("div");
    var dateEl = document.createElement("p");
    dateEl.innerHTML = date;
    divEl.appendChild(dateEl);

    var iconEl = document.createElement("img");
    iconEl.src = iconLink;
    iconEl.classList.add("weather-image");
    divEl.appendChild(iconEl);

    // This is the diplay functions for the TEMP of the current day //
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temp: " + temp + "°F";
    divEl.appendChild(tempEl);

    // This is the diplay functions for the HUMIDITY of the current day //
    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + humidity + "%";
    divEl.appendChild(humidityEl);
    divEl.classList.add("five-day-forecast");

    // This is the diplay functions for the WIND of the current day //
    var windEl = document.createElement("p");
    windEl.textContent = "Wind: " + windSpeed + " MPH";
    divEl.appendChild(windEl);

    fiveDayForecastEl.appendChild(divEl)
   
}

 cityFormEl.addEventListener('submit', formSubmission);