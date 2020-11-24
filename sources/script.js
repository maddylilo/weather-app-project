// Display Current Time and Date

let now = new Date();
let currentHour = now.getHours();
let currentMinutes = now.getMinutes();
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = daysOfWeek[now.getDay()];

let dateTime = document.querySelector("#currentDayTime");
dateTime.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;


// Week 5 HOMEWORK

function showPlaceTemp(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperatureNow = document.querySelector("#temperatureNow");
  temperatureNow.innerHTML = Math.round(response.data.main.temp);
}

function searchCity(cityEntry) {
  let apiKey = "34d9ed3eeaae24ff1bdbb0e4f7d779cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntry}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showPlaceTemp);
}

function submitCity(event) {
  event.preventDefault();
  let cityEntry = document.querySelector("#search-bar").value;
  searchCity(cityEntry);
}

let searchBarEntry = document.querySelector("#search-form");
searchBarEntry.addEventListener("submit", submitCity);



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
