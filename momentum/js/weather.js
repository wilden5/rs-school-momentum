const weatherIcon = document.querySelector('.weather__icon');
const weatherTemperature = document.querySelector('.weather__temperature');
const weatherDescription = document.querySelector('.weather__description');
const weatherCityInput = document.querySelector('.weather__city-input');
const weatherWind = document.querySelector('.weather__wind');
const weatherHumidity = document.querySelector('.weather__humidity');
const weatherError = document.querySelector('.weather__error');


function setLocalStorage() {
    localStorage.setItem('person-city', weatherCityInput.value);
}

window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if (localStorage.getItem('person-city')) {
        weatherCityInput.value = localStorage.getItem('person-city');
    }
}

window.addEventListener('load', getLocalStorage)

function checkLocalStorage() {
    return localStorage.length === 0;
}

async function getWeather(city) {
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=d5d445865cf8362c1394aad7f296c972&units=metric`;
    const response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        weatherIcon.style.display = 'inline-block';
        weatherIcon.className = 'weather__icon owf';
        weatherIcon.classList.add(`owf-${json.weather[0].id}`);
        weatherTemperature.textContent = `${json.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = json.weather[0].description;
        weatherWind.textContent = `Wind speed: ${json.wind.speed.toFixed(0)} m/s`;
        weatherHumidity.textContent = `Humidity: ${json.main.humidity}%`
        weatherError.textContent = '';
    } else {
        weatherError.textContent = `Error! city not found for '${weatherCityInput.value}'`;
        weatherTemperature.textContent = '';
        weatherDescription.textContent = '';
        weatherWind.textContent = '';
        weatherHumidity.textContent = '';
        weatherIcon.style.display = 'none';
    }
}

function run() {
    if (checkLocalStorage()) {
        weatherCityInput.value = 'Minsk';
        getWeather(weatherCityInput.value);
    } else {
        weatherCityInput.value = localStorage.getItem('person-city');
        getWeather(localStorage.getItem('person-city'));
    }
}

run();

weatherCityInput.addEventListener('change', () => {
    getWeather(weatherCityInput.value);
})
