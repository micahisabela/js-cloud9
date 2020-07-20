// time and date
function getTime(time) {
  let timeH = time.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  return `${timeH}`;
}

function getDate(date) {
  let daysOfWeek = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
  let currentWeekday = daysOfWeek[date.getDay()];
  let currentMonth = date.getMonth() + 1;
  let currentDayNumber = date.getDate();
  let currentYear = date.getFullYear();

  return `${currentWeekday} ${currentMonth}/${currentDayNumber}/${currentYear}`;
}

let now = new Date();

let currentTime = document.querySelector("#time");
currentTime.innerHTML = getTime(now);

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = getDate(now);

// search engine
function search(city) {
  let units = "imperial";
  let apiKey = "ae34e38ff098831b63cd4c4969e133cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCity);
}

function getCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;

  if (city === "") {
    alert("Please enter a city");
  } else {
    search(city);
  }
}

function showCity(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  // unit conversion
  // let farenheitTemp = Math.round(response.data.main.temp);
  // let celsiusTemp = Math.round(((farenheitTemp - 32) * 5) / 9);
  // let convertToCelsius = document.querySelector("#celsius");
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

function getCoordinates(position) {
  let longitudeCoordinate = position.coords.longitude;
  let latitudeCoordinate = position.coords.latitude;
  console.log(longitudeCoordinate);
  console.log(latitudeCoordinate);
  let units = "imperial";
  let apiKey = "ae34e38ff098831b63cd4c4969e133cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeCoordinate}&lon=${longitudeCoordinate}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCity);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", getCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("North Pole");
