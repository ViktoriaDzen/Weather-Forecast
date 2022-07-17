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
