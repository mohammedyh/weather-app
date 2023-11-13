const input = document.querySelector('.location-input'),
      form = document.querySelector('.weather-submit'),
      temperature = document.querySelector('.degrees'),
      city = document.querySelector('.location'),
      dateAndTime = document.querySelector('.date-time'),
      cloudy = document.querySelector('.cloudy-value'),
      humidity = document.querySelector('.humidity-value'),
      wind = document.querySelector('.wind-value'),
      rain = document.querySelector('.rain-value'),
      weatherIcon = document.querySelector('.weather-icon'),
      API_KEY = '8f2f7275a1e84d90a05173508202011';

form.addEventListener('submit', getWeather);

async function fetchWeather(e) {
  const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${input.value}`);
  const data = await res.json();
  return data;
}

function getWeather(e) {
  e.preventDefault();
  fetchWeather()
  .then(res => {
    console.log(res);
    temperature.textContent = res.current.temp_c + '°C';
    city.textContent = res.location.name;
    const weatherDate = new Date(res.location.localtime).toDateString();
    dateAndTime.textContent = weatherDate;
    cloudy.textContent = res.current.cloud + '%';
    humidity.textContent = res.current.humidity + '%';
    wind.textContent = res.current.wind_mph + 'mph';
    rain.textContent = res.current.precip_mm + 'mm';
    weatherIcon.classList.remove('hidden');
    weatherIcon.setAttribute('src', `https:${res.current.condition.icon}`);
    input.value = '';
  })
  .catch(err => console.log(err));
}