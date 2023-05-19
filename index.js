const apiKey = '05ad95800a77ac03596ad1c59515e81e';

async function getWeatherByCity(city, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to retrieve weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error retrieving weather data:', error);
  }
}

async function getWeatherForecast(city, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to retrieve weather forecast');
    }
    const data = await response.json();
    return data.list; 
  } catch (error) {
    throw new Error('Error retrieving weather forecast:', error);
  }
}

document.getElementById('search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = document.getElementById('search-input').value.trim();

  try {
    const weatherData = await getWeatherByCity(city, apiKey);
    const forecastData = await getWeatherForecast(city, apiKey);
    displaySearchSummary(city);
    displayWeather(weatherData);
    displayForecast(forecastData);
  } catch (error) {
    console.error('Error:', error);
  }
});

function displaySearchSummary(city) {
  const frame = document.querySelector('.frame');

  const searchSummary = document.createElement('div');
  searchSummary.classList.add('search-summary');
  searchSummary.textContent = `Weather forecast for ${city}:`;

  frame.insertBefore(searchSummary, frame.firstChild);
}

function displayWeather(weatherData) {
  const weatherContainer = document.getElementById('weather');
  weatherContainer.innerHTML = '';

  const cityName = weatherData.name;
  const temperature = weatherData.main.temp;
  const weatherDescription = weatherData.weather[0].description;

  const weatherInfo = document.createElement('div');
  weatherInfo.classList.add('weather-info');
  weatherInfo.innerHTML = `City: ${cityName}, Temperature: ${temperature}, Description: ${weatherDescription}`;

  weatherContainer.appendChild(weatherInfo);
}

function displayForecast(forecastData) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = '';

  const forecastTable = document.createElement('table');
  forecastTable.classList.add('forecast-table');

  // table header
  const tableHeader = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>Timestamp</th>
    <th>Temperature</th>
    <th>Description</th>
  `;
  tableHeader.appendChild(headerRow);
  forecastTable.appendChild(tableHeader);

  //  table body
  const tableBody = document.createElement('tbody');
  for (const item of forecastData) {
    const timestamp = item.dt_txt;
    const temperature = item.main.temp;
    const weatherDescription = item.weather[0].description;

    const forecastRow = document.createElement('tr');
    forecastRow.innerHTML = `
      <td>${timestamp}</td>
      <td>${temperature}</td>
      <td>${weatherDescription}</td>
    `;
    tableBody.appendChild(forecastRow);
  }
  forecastTable.appendChild(tableBody);

  forecastContainer.appendChild(forecastTable);
}
