function changeDateDisplay(timeObtained) {
  let currentDate = new Date(timeObtained);
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  return `${weekday}, ${month} ${today}, ${hour}:${minutes}`;
}

function changeLocation(event) {
  event.preventDefault();
  let searchedLocation = document.querySelector("#new-location");
  searchedLocation = searchedLocation.value;
  let apiKey = "8d1684c8dfd4c7c9e701ecf0706e6732";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedLocation}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedLoc);
}

function displaySearchedLoc(response) {
  let searchedLocTemp = document.querySelector("#display-temp");
  let currentCity = document.querySelector("#current-city");
  let minTemp = document.querySelector("#min-today");
  let maxTemp = document.querySelector("#max-today");
  let skyInfo = document.querySelector("#clouds-clear");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#current-date");
  let icon = document.querySelector("#main-icon");
  celsiusTemperature = Math.round(response.data.main.temp);
  minCelTemp = Math.round(response.data.main.temp_min);
  maxCelTemp = Math.round(response.data.main.temp_max);
  searchedLocTemp.innerHTML = celsiusTemperature;
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  minTemp.innerHTML = minCelTemp;
  maxTemp.innerHTML = maxCelTemp;
  skyInfo.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  date.innerHTML = changeDateDisplay(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function changeTo() {
  navigator.geolocation.getCurrentPosition(getCurrent);
}

function getCurrent(position) {
  let apiKey = "8d1684c8dfd4c7c9e701ecf0706e6732";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedLoc);
}
function convertToFar(event) {
  event.preventDefault();
  let displayedTemp = document.querySelector("#display-temp");
  let intervalUnit = document.querySelector("#interval-unit");
  let minTemp = document.querySelector("#min-today");
  let maxTemp = document.querySelector("#max-today");
  displayedTemp.innerHTML = Math.round(celsiusTemperature * (9 / 5) + 32);
  minTemp.innerHTML = Math.round(minCelTemp * (9 / 5) + 32);
  maxTemp.innerHTML = Math.round(maxCelTemp * (9 / 5) + 32);
  intervalUnit.innerHTML = `ºF`;
  changeCel.classList.remove("active");
  changeFar.classList.add("active");
}

function convertToCel(event) {
  event.preventDefault();
  let displayedTemp = document.querySelector("#display-temp");
  let intervalUnit = document.querySelector("#interval-unit");
  let minTemp = document.querySelector("#min-today");
  let maxTemp = document.querySelector("#max-today");
  displayedTemp.innerHTML = celsiusTemperature;
  minTemp.innerHTML = minCelTemp;
  maxTemp.innerHTML = maxCelTemp;
  intervalUnit.innerHTML = `ºC`;
  changeFar.classList.remove("active");
  changeCel.classList.add("active");
}

let celsiusTemperature = null;
let minCelTemp = null;
let maxCelTemp = null;
let changeFar = document.querySelector("#fahrenheit");
changeFar.addEventListener("click", convertToFar);
let changeCel = document.querySelector("#celsius");
changeCel.addEventListener("click", convertToCel);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", changeTo);

let search = document.querySelector("#submit-button");
search.addEventListener("click", changeLocation);
