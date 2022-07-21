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
  console.log(response.data.main.temp);
  let temperatureElement = (document.querySelector("#temperature").innerHTML =
    Math.round(response.data.main.temp));
  let cityElement = (document.querySelector("#city").innerHTML =
    response.data.name);
  let descriptionElement = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  console.log(response.data);
  let humidity = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let windSpeed = (document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  ));
  let date = document.querySelector("#weather-date");
  date.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "c3bcb3bc618a5bbe6638510330760ed9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

let dateElement = document.querySelector("#date");
let days = document.querySelectorAll(".day-block");

function friendlyDay(dayNumber) {
  let days = ["Sun", "Mon", "Wed", "Thu", "Fri", "Sat"];
  return days[dayNumber];
}
