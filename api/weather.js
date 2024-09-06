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