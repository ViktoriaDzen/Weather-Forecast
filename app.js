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
  let date = document.querySelector("#weather-date");
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let dateElement = document.querySelector("#date");
let days = document.querySelectorAll(".day-block");

function find(city) {
  let apiKey = "c3bcb3bc618a5bbe6638510330760ed9";
  let apiUrlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlSearch).then(displayTemperature);
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchCity");
  search(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
