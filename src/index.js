function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
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

function displayTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let precipitationElement = document.querySelector("#precipitation");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  celsTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  precipitationElement.innerHTML = response.data.precipitation;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastElement.innerHTML = `
  <div class="col-2">
  <h3>${formatHours(forecast.dt * 1000)}</h3>
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="" />
  <div class="forecast-temp"><strong>${Math.round(
    forecast.main.temp_max
  )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
  </div>
  `;

  forecast = response.data.list[1];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h3>${formatHours(forecast.dt * 1000)}</h3>
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="" />
  <div class="forecast-temp"><strong>${Math.round(
    forecast.main.temp_max
  )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
  </div>
  `;

  forecast = response.data.list[2];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h3>${formatHours(forecast.dt * 1000)}</h3>
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="" />
  <div class="forecast-temp"><strong>${Math.round(
    forecast.main.temp_max
  )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
  </div>
  `;

  forecast = response.data.list[3];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h3>${formatHours(forecast.dt * 1000)}</h3>
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="" />
  <div class="forecast-temp"><strong>${Math.round(
    forecast.main.temp_max
  )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
  </div>
  `;

  forecast = response.data.list[4];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h3>${formatHours(forecast.dt * 1000)}</h3>
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="" />
  <div class="forecast-temp"><strong>${Math.round(
    forecast.main.temp_max
  )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
  </div>
  `;

  forecast = response.data.list[5];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h3>${formatHours(forecast.dt * 1000)}</h3>
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png" alt="" />
  <div class="forecast-temp"><strong>${Math.round(
    forecast.main.temp_max
  )}°</strong> ${Math.round(forecast.main.temp_min)}°</div>
  </div>
  `;
}

function search(city) {
  let apiKey = "b845e30b65afd54ed70dc17b14503f26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  let apiUrlF = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=b845e30b65afd54ed70dc17b14503f26&units=metric`;
  axios.get(apiUrlF).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFahrTemp(event) {
  event.preventDefault();
  let fahrTemp = Math.round((celsTemp * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = fahrTemp;
}

function showCelsTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsTemp);
}

let celsTemp = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let fLink = document.querySelector("#f");
fLink.addEventListener("click", showFahrTemp);

let cLink = document.querySelector("#c");
cLink.addEventListener("click", showCelsTemp);