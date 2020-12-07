// Display Current Time and Date

//let now = new Date();
//let currentHour = now.getHours();
//let currentMinutes = now.getMinutes();
//let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//let currentDay = daysOfWeek[now.getDay()];

//let dateTime = document.querySelector("#currentDayTime");
//dateTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;


// Week 5 HOMEWORK

//function showPlaceTemp(response) {
  //let h1 = document.querySelector("h1");
  //h1.innerHTML = response.data.name;
  //let temperatureElement = document.querySelector("#temperature");
  //temperatureElement.innerHTML = Math.round(response.data.main.temp);
//}

//function searchCity(cityEntry) {
  //let apiKey = "34d9ed3eeaae24ff1bdbb0e4f7d779cd";
  //let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntry}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrl).then(showPlaceTemp);
//}

//function submitCity(event) {
  //event.preventDefault();
  //let cityEntry = document.querySelector("#search-bar").value;
  //searchCity(cityEntry);
//}

//let searchBarEntry = document.querySelector("#search-form");
//searchBarEntry.addEventListener("submit", submitCity);



// Display (fake) temperature and link to convert between C and F

//function displayCelsius(event){
  //event.preventDefault();
  //let currentTemperature = document.querySelector("#temperatureNow");
  //currentTemperature.innerHTML = 12;
//}

//UNIT BUTTON C
//let celsiusButton = document.querySelector("#celsius");
//celsiusButton.addEventListener("click", displayCelsius);

//function displayFahrenheit(event){
  //event.preventDefault();
  //let currentTemperature = document.querySelector("#temperatureNow");
  //currentTemperature.innerHTML = 54;
//}

//UNIT BUTTON F
//let fahrenheitButton = document.querySelector("#fahrenheit");
//fahrenheitButton.addEventListener("click", displayFahrenheit);

let now = new Date();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = daysOfWeek[now.getDay()];

let dateTime = document.querySelector("#currentDayTime");
dateTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

function displayCurrentTemp(response){
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].main;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.main.humidity;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "34d9ed3eeaae24ff1bdbb0e4f7d779cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#search-bar");
  search(citySearchInput.value);
}

search("London");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);