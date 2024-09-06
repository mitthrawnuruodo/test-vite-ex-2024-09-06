// components/Content.js
import { getCountries } from '../api/api1.js';
import { getWeather } from '../api/api2.js';

export async function Content() {
  const content = document.createElement('div');
  content.classList.add('content');

  // Fetch countries and display
  const countries = await getCountries();
  const countryList = document.createElement('ul');

  // Display first 10 countries for brevity
  countries.slice(0, 10).forEach((country) => {
    const li = document.createElement('li');
    li.textContent = country.name.common;

    li.addEventListener('click', async () => {
      if (country.capitalInfo && country.capitalInfo.latlng) {
        const [lat, lon] = country.capitalInfo.latlng;
        const weather = await getWeather(lat, lon);
        alert(
          `Weather in ${country.capital ? country.capital[0] : 'Capital'}: ${
            weather.current_weather.temperature
          }°C, Code: ${weather.current_weather.weathercode}`
        );
      } else {
        alert('Weather data not available for this country.');
      }
    });

    countryList.appendChild(li);
  });

  content.appendChild(countryList);
  return content;
}