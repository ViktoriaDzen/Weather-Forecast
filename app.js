let form = document.querySelector("#search-form");
let iconElement = document.querySelector("#icon");
let dateElement = document.querySelector("#date");
let days = document.querySelectorAll(".day-block");
let temperatureElement = document.querySelector("#temperature");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let celsiusLink = document.querySelector("#celsius-link");
let date = document.querySelector("#weather-date");
let apiKey = "c3bcb3bc618a5bbe6638510330760ed9";

function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
              <div class="WeatherForecastPreview">
                <div class="forecast-time">${formatDay(forecastDay.dt)} </div>
    
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png"
  alt="" width="78" class="forecastPredict"/>
                <canvas width="5" height="5"></canvas>
                <div class="forecast-temperature">${Math.round(
                  forecastDay.temp.day
                )}°</div>
              </div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function forecastPredict(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let cityElement = (document.querySelector("#city").innerHTML =
    response.data.name);
  let descriptionElement = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let humidity = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let windSpeed = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  celsiusTemperature = Math.round(response.data.main.temp);
  console.log(response.data.dt);
  date.innerHTML = formatDate(response.data.dt * 1000);
  let iconNumber = response.data.weather[0].icon;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconNumber}@2x.png`
  );
  forecastPredict(response.data.coord);
}
function find(city) {
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlSearch).then(displayTemperature);
}
let celsiusTemperature = null;

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");
  find(cityInput.value);
}

form.addEventListener("submit", searchCity);

function convertToFahrenheit(event) {
  event.preventDefault();
  let tempToF = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(tempToF);
}
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  temperatureElement.innerHTML = celsiusTemperature;
}

celsiusLink.addEventListener("click", convertToCelsius);

find("London");
displayForecast();
