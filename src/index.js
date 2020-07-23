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

// function formatDate(timestamp) {
//   let date = new Date(timestamp);

//   let daysOfWeek = ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
//   let currentWeekday = daysOfWeek[date.getDay()];

//   let time = timestamp.toLocaleString("en-US", {
//     hour: "numeric",
//     hour12: true,
//     minute: "numeric",
//   });

//   return `${time}, ${currentWeekday}`;
// } // commenting this out because openweatherapi is not rendering the time correctly

// search engine
function getCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;

  if (city === "") {
    alert("Please enter a city");
  } else {
    search(city);
  }
}

function search(city) {
  let units = "imperial";
  let apiKey = "ae34e38ff098831b63cd4c4969e133cd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showCity);
}

function showCity(response) {
  console.log(response);
  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  currentTemperature = response.data.main.temp;

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  // document.querySelector("#current-date").innerHTML = formatDate(
  //   response.data.dt * 1000
  // ); // commenting this out for now because openweatherapi is not rendering the time correctly

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// use the Current Location button:
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

// temperature conversion feature:
function convertToCelsius(event) {
  event.preventDefault();

  let celsiusTemperature = document.querySelector("#current-temp");
  celsiusTemperature.innerHTML = Math.round(currentTemperature - (32 * 5) / 9);
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

function convertToFarenheit(event) {
  event.preventDefault();

  let farenheitTemperature = document.querySelector("#current-temp");
  farenheitTemperature.innerHTML = Math.round(currentTemperature);
  farenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", getCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let now = new Date();

let currentTime = document.querySelector("#time");
currentTime.innerHTML = getTime(now);

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = getDate(now);

let currentTemperature = null;
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", convertToFarenheit);

search("North Pole");
