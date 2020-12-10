let now = new Date();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = daysOfWeek[now.getDay()];

let dateTime = document.querySelector("#currentDayTime");
dateTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;


function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayCurrentTemp(response){
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = Math.round(response.data.wind.speed/1.609);
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#hourly-forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(forecast);

  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2 day">
      <p class="day-titles">${formatTime(forecast.dt * 1000)}</p> <br />
      <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
      <p><strong>${Math.round(forecast.main.temp_max)}°</strong><span class="min"> / ${Math.round(forecast.main.temp_min)}°</span></p>
    </div>`
  }
}

function search(city) {
  let apiKey = "34d9ed3eeaae24ff1bdbb0e4f7d779cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#search-bar");
  search(citySearchInput.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("inactive");
  fahrenheitLink.classList.remove("inactive");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("inactive");
  fahrenheitLink.classList.add("inactive");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

search("London");