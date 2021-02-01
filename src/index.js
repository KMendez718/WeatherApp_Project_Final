let apiKey = "b845e30b65afd54ed70dc17b14503f26";

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
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  celsTemp = response.data.main.temp;

  tempElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
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
    if (document.getElementById('f').checked) {
    units="imperial";
    } else {
        units="metric";
    }
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);

  let apiUrlF = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlF).then(displayForecast);
}

function handlePosition(position) {
    if (document.getElementById('f').checked) {
    units="imperial";
    } else {
        units="metric";
    }
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(displayTemperature);

    let apiUrlF = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrlF).then(displayForecast);
}


function handleSubmit(event) {
  event.preventDefault();
  searchCity();
}

function searchCity() {
   let cityInputElement = document.querySelector("#city-input");
   if (cityInputElement.value == "") {
       navigator.geolocation.getCurrentPosition(handlePosition);
   } else {
  search(cityInputElement.value);
   }   
}


document.getElementById("f").onclick = searchCity;
document.getElementById("c").onclick = searchCity;

let celsTemp = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", handleSubmit);

navigator.geolocation.getCurrentPosition(handlePosition);
