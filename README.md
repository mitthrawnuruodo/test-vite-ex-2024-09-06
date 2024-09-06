# Exercise: Build a SPA with Vanilla JavaScript, APIs, and Vite

## Goal:

Create a Single Page Application (SPA) that fetches and displays data from two different APIs. Use Vite as the bundler, organize the project using JavaScript modules, and apply optional improvements (error handling, environment variables, and styling).

## Prerequisites:

Basic knowledge of JavaScript (functions, promises, ES modules).
Familiarity with APIs (RESTful APIs, fetch).
Understanding of HTML/CSS for basic UI.

## Step 1: Set up the Vite Project
Make a repo, navigate to it and initialize Vite in the current directory:
```bash
npm create vite@latest . -- --template vanilla
```
> Remember to choose Ignore files and continue
This will set up the Vite project with a main.js file, index.html, and the necessary configuration files in the root of the project.

Install Dependencies:
```bash
npm install
```

## Step 2: Project Structure
After setting up the project with Vite, update the project structure as follows:

```css
├── index.html
├── main.js
├── style.css
├── api
│   ├── countries.js
│   ├── weather.js
├── components
│   ├── Header.js
│   ├── Content.js
│   ├── Footer.js
├── package.json
├── vite.config.js
└── README.md
```

## Step 3: Fetch Data from Two APIs
We'll use the following APIs:

1. [REST Countries API](https://restcountries.com/): To fetch data about countries.
2. [Open-Meteo API](https://open-meteo.com/): To fetch weather data based on geographical coordinates.

API 1: Fetching Country Data (`api/countries.js`)

```javascript
// api/countries.js
export async function fetchCountries() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error('Failed to fetch country data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}
```

API 2: Fetching Weather Data (`api/weather.js`)

```javascript
// api/weather.js
export async function fetchWeather(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return { current_weather: { temperature: 'N/A', weathercode: 'N/A' } };
  }
}
```

## Step 4: Build Components

Header Component (`components/Header.js`)

```javascript
// components/Header.js
export function createHeader() {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Countries & Weather';
    header.appendChild(h1);
    return header;
}
```

Content Component (`components/Content.js`)

```javascript
// components/Content.js
import { fetchCountries } from '../api/countries.js';
import { fetchWeather } from '../api/weather.js';

export async function createContent() {
    const content = document.createElement('main');
    content.classList.add('content');
  
    // Fetch and display country data
    const countries = await fetchCountries();
    //console.log(countries);
    const countryList = document.createElement('ul');
    
    countries.slice(0, 10).forEach((country) => {
      const li = document.createElement('li');
      li.textContent = country.name.common;
      
      // Event listener to fetch weather when country is clicked
      li.addEventListener('click', async () => {
        if (country.capitalInfo && country.capitalInfo.latlng) {
          const [lat, lon] = country.capitalInfo.latlng;
          const weather = await fetchWeather(lat, lon);
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
```

Footer Component (`components/Footer.js`)

```javascript
// components/Footer.js
export function createFooter() {
    const footer = document.createElement('footer');
    footer.textContent = '© 2024 Weather App by Your Name';
    return footer;
}
```

## Step 5: Assemble the App (`main.js`)

```javascript
// main.js
import { createHeader } from './components/Header.js';
import { createContent } from './components/Content.js';
import { createFooter } from './components/Footer.js';

document.addEventListener('DOMContentLoaded', async () => {
    const app = document.getElementById('app');

    // Add header
    const header = createHeader();
    app.appendChild(header);

    // Add main content (list of countries and weather info)
    const content = await createContent();
    app.appendChild(content);

    // Add footer
    const footer = createFooter();
    app.appendChild(footer);
});
```

## Step 6: Add Styling (`style.css`)
```css
/* style.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

header {
  background-color: #282c34;
  color: #fafafa;
  text-align: center;
  padding: 1rem;
}

.content {
  padding: 1rem;
  margin-bottom: 60px; /* To prevent footer overlap */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  padding: 1rem;
  margin: 0.5rem 0;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #f1f1f1;
}

footer {
  background-color: #282c34;
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  width: 100%;
}
```

## Step 7: Update `index.html`
Ensure that your `index.html` includes the stylesheet and the main script:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Country and Weather App</title>
    <link rel="stylesheet" href="./style.css">
  </head>
  <body>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

## Step 8: Run the App

Update `vite.config.js` with

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({

});
```

Not making any configurations, yet. But note that if `vite.config.js` exists, it cannot be empty.

Start the development server with:

```bash
npm run dev
```

Navigate to the URL provided in the terminal (typically http://localhost:5173) to view your SPA. You should see a list of countries, and clicking on a country will display an alert with the current weather in its capital city.

Using the App:
* View Countries: A list of the first 10 countries is displayed.
* View Weather: Click on a country to view the current weather in its capital city. 

## Improvements:
1. Make sure your default browser opens every time you run the app with `npm run dev`.
1. Add and configure `eslint` (or `vite-plugin-eslint`) to the project
    * *Optional*: add and configure `@vitejs/plugin-legacy` and `vite-plugin-pwa`
1. Make the weather appear inline and not in an alert.
    * And display the weather forcast better (maybe with icons)
1. List all countries and add a search field to find/filter the list.
1. Style the app with basic CSS (aka make it look better), and display the flag for each country.
1. Add [JSDocs](https://jsdoc.app/about-getting-started) for all relevant JS code.

**Tip**: Make new branches for each improvement, and merge back into `main` when it works.