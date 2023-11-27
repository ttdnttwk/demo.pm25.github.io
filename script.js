const app = document.getElementById('app');

fetch('www.abcd.com/api')
  .then(response => response.json())
  .then(data => {
    if (data.status === 'ok') {
      const aqiData = data.data;

      // Display AQI data
      const aqiContainer = document.createElement('div');
      aqiContainer.classList.add('data-container');

      const aqiLabel = document.createElement('span');
      aqiLabel.classList.add('data-label');
      aqiLabel.textContent = 'AQI:';

      const aqiValue = document.createElement('span');
      aqiValue.classList.add('data-value');
      aqiValue.textContent = aqiData.aqi;

      aqiContainer.appendChild(aqiLabel);
      aqiContainer.appendChild(aqiValue);
      app.appendChild(aqiContainer);

      // Display city information
      const cityContainer = document.createElement('div');
      cityContainer.classList.add('data-container');

      const cityLabel = document.createElement('span');
      cityLabel.classList.add('data-label');
      cityLabel.textContent = 'City:';

      const cityValue = document.createElement('span');
      cityValue.classList.add('data-value');
      cityValue.textContent = aqiData.city.name;

      cityContainer.appendChild(cityLabel);
      cityContainer.appendChild(cityValue);
      app.appendChild(cityContainer);

      // Display dominant pollutant
      const dominantPollutantContainer = document.createElement('div');
      dominantPollutantContainer.classList.add('data-container');

      const dominantPollutantLabel = document.createElement('span');
      dominantPollutantLabel.classList.add('data-label');
      dominantPollutantLabel.textContent = 'Dominant pollutant:';

      const dominantPollutantValue = document.createElement('span');
      dominantPollutantValue.classList.add('data-value');
      dominantPollutantValue.textContent = aqiData.dominantpol;

      dominantPollutantContainer.appendChild(dominantPollutantLabel);
      dominantPollutantContainer.appendChild(dominantPollutantValue);
      app.appendChild(dominantPollutantContainer);
    } else {
      const errorContainer = document.createElement('div');
      errorContainer.classList.add('data-container');

      const errorMessage = document.createElement('span');
      errorMessage.textContent = 'Error retrieving AQI data.';

      errorContainer.appendChild(errorMessage);
      app.appendChild(errorContainer);
    }
  });
