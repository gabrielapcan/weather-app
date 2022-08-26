// CURRENT TIME

let currentDate = new Date();
console.log(currentDate);
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = weekdays[currentDate.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dez",
];
let month = months[currentDate.getMonth()];
let today = currentDate.getDate();
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (String(minutes).length === 1) {
  minutes = `0${minutes}`;
}

let dayTime = document.querySelector("#current-date");
dayTime.innerHTML = `${weekday}, ${month} ${today}, ${hour}:${minutes}`;

// CHANGE LOCATION TO SEARCHED

function changeLocation() {
  let searchedLocation = document.querySelector("#new-location");
  searchedLocation = searchedLocation.value;
  let apiKey = "8d1684c8dfd4c7c9e701ecf0706e6732";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedLoc);
}

function displaySearchedLoc(response) {
  let searchedLocTemp = document.querySelector("#display-temp");
  let currentCity = document.querySelector("#current-city");
  let minmaxTemp = document.querySelector("#min-max-today");
  let skyInfo = document.querySelector("#clouds-clear");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  searchedLocTemp.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  minmaxTemp.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}-${Math.round(response.data.main.temp_max)}ºC`;
  skyInfo.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
}

let search = document.querySelector("#submit-button");
search.addEventListener("click", changeLocation);

// CURRENT LOCATION BUTTON

function changeTo() {
  navigator.geolocation.getCurrentPosition(getCurrent);
}

function getCurrent(position) {
  let apiKey = "8d1684c8dfd4c7c9e701ecf0706e6732";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedLoc);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", changeTo);

// CELSIUS-FAHRENHEIT

//function convertToFar() {
// let displayedTemp = document.querySelector("#display-temp");
//displayedTemp.innerHTML = 66;
//}
//let changeFar = document.querySelector("#fahrenheit");
//changeFar.addEventListener("click", convertToFar);

//function convertToCel() {
// let displayedTemp = document.querySelector("#display-temp");
//displayedTemp.innerHTML = 19;
//}
//let changeCel = document.querySelector("#celsius");
//changeCel.addEventListener("click", convertToCel);
