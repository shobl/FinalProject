function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

/*function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML + `
       
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">
            ${Math.round(forecastDay.temp.max)}°
            </span>
            <span class="weather-forecast-temperature-min">
            ${Math.round(forecastDay.temp.min)}°
            </span>
          </div>
        </div>
      </div>
      
    </div>

    `;
    }
  })
  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}
*/

function search(event) {
  event.preventDefault();
  let newCity = document.querySelector("#city");
  let cityRequest = document.querySelector("#city-request");
  newCity.innerHTML = cityRequest.value;
  
}

function getForecast(coordinates) {
  let apiKey = "91e4be9d3f0ce62462b88df7804804ae";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
   
function displayWeatherCondition(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  /*getForecast(response.data.coord);*/
}

function searchCity(city) {
  let apiKey = "91e4be9d3f0ce62462b88df7804804ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-request").value;
  searchCity(city);
}

/*function headCity(event) {
  event.preventDefault();
  let city = document.querySelector("cities").value;
  searchCity(city);
}
*/

function searchLocation(position) {
  let apiKey = "91e4be9d3f0ce62462b88df7804804ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatuteElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatuteElement.innerHTML = Math.round(fahrenheitTemperature);
 
}

function convertToCelsius(event) {
 event.preventDefault();

 celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active");

 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

/*let chooseCity = document.querySelector("#city-head"); 
chooseCity.addEventListener("click", headCity);*/

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


let fahrenheitLink = document.querySelector("#fahrenheit-recalculation");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-recalculation");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Kyiv");