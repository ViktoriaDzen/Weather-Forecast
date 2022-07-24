let form = document.querySelector("#search-form");
let iconElelment = document.querySelector("#icon");
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
  iconElelment.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconNumber}@2x.png`
  );
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
