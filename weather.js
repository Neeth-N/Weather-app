const apiKey = '5cbfc498199ff5f29ac1ac8feb66c7f8';
const currentLocation = document.getElementById('current-location');
const currentTemperature = document.getElementById('current-temperature');
const currentDescription = document.getElementById('current-description');
const currentHumidity = document.getElementById('current-humidity');
const currentWindSpeed = document.getElementById('current-wind-speed');
const currentDateTime = document.getElementById('current-date-time');
const forecastContainer = document.getElementById('forecast-container');
const form = document.getElementById('search-form');
const forecastDiv = document.querySelector('.forecast');

getWeatherData()

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const loc = form.elements.city.value;
  getWeatherData(loc)
});

function getWeatherData(loc) {

    const location = loc || 'Delhi'; 
    forecastContainer.innerHTML = ''; 

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      currentLocation.textContent = `Location: ${data.name}`;
      currentTemperature.textContent = `Temperature: ${data.main.temp}°C`;
      currentDescription.textContent = `Description: ${data.weather[0].description}`;
      currentHumidity.textContent = `Humidity: ${data.main.humidity}%`;
      currentWindSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      const date = new Date(data.dt * 1000);
      const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      currentDateTime.textContent = `Date and Time: ${dateString}`;
    });

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

      dailyData.forEach(day => {
        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');

        const date = new Date(day.dt * 1000);
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        const dateDay = `${weekday[date.getDay()]}`;

        forecastDay.innerHTML = `
        <div align="center" class="wee">
        Day: ${dateDay}<br><br>
        Date: ${dateString}<br><br>
        Temperature: ${day.main.temp}°C<br><br>
        Description: ${day.weather[0].description}<br>
        </div>
        `;

        forecastContainer.appendChild(forecastDay);
        

        
      });
      
    });
}
