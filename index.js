async function getWeatherForecast(lat, lon, apiKey) {
    // Your code for retrieving the weather forecast...
  }
  
  function displayForecast(forecast) {
    const forecastContainer = document.getElementById('forecast');
  
    for (const item of forecast) {
      const timestamp = item.timestamp;
      const temperature = item.temperature;
      const description = item.description;
  
      const forecastItem = document.createElement('div');
      forecastItem.innerHTML = `Timestamp: ${timestamp}, Temperature: ${temperature}, Description: ${description}`;
  
      forecastContainer.appendChild(forecastItem);
    }
  }
  
  // Example usage
  const latitude = 40.7128;
  const longitude = -74.0060;
  const apiKey = 'your_api_key';
  
  getWeatherForecast(latitude, longitude, apiKey)
    .then((forecast) => {
      if (forecast) {
        displayForecast(forecast);
      }
    })
    .catch((error) => console.error('Error:', error));