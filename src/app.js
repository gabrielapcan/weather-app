function changeToCurrent() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

function getCurrentPosition(position) {
  let apiKey = "8d1684c8dfd4c7c9e701ecf0706e6732";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedLoc);
}

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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = weekdays[date.getDay()];
  return weekday;
}

function changeLocation(event) {
  event.preventDefault();
  let searchedLocation = document.querySelector("#new-location");
  searchCity(searchedLocation.value);
}
function searchCity(city) {
  let apiKey = "8d1684c8dfd4c7c9e701ecf0706e6732";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displaySearchedLoc);
}

function getCoordinates(coordinates) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`;
  //let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
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
  let iconSrc = `images/${response.data.weather[0].icon.replace("n", "d")}.png`;
  celsiusTemperature = Math.round(response.data.main.temp);
  minCelTemp = Math.round(response.data.main.temp_min);
  maxCelTemp = Math.round(response.data.main.temp_max);
  searchedLocTemp.innerHTML = celsiusTemperature;
  currentCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  minTemp.innerHTML = `${minCelTemp}-`;
  maxTemp.innerHTML = maxCelTemp;
  skyInfo.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  date.innerHTML = changeDateDisplay(response.data.dt * 1000);
  icon.setAttribute("src", iconSrc);
  icon.setAttribute("alt", response.data.weather[0].description);
  getCoordinates(response.data.coord);
}

// function getForecastSmall(list, incr) {
//  let result = [];
//  for (let index = 7; index < list.length; index += incr) {
//    result.push(list[index]);
//  }
//  return result;
//}

function displayForecast(response) {
  let forecastList = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;

  forecastList.forEach((forecastDay, index) => {
    if (index > 0 && index < 7) {
      let minTemp = `${Math.round(forecastDay.temp.min)}º`;
      let maxTemp = `${Math.round(forecastDay.temp.max)}º`;
      let day = formatDay(forecastDay.dt);
      let imgSrc = `images/${forecastDay.weather[0].icon.replace(
        "n",
        "d"
      )}.png`;
      forecastHTML += `<div class="col-4">
                <div class="card next-days" style="width: 7rem">
                  <div class="card-body">
                    <h5 class="card-title"><span class="min-forecast-temp">${minTemp}</span> <span class="max-forecast-temp">${maxTemp}</span></h5>
                    <div id="small-icon"><img src="${imgSrc}" alt="" id="forecast-icon"/></div>
                    <p class="card-text">${day}</p>
                  </div>
                </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", changeToCurrent);

let searchButton = document.querySelector("#submit-button");
searchButton.addEventListener("click", changeLocation);

searchCity("Porto");
