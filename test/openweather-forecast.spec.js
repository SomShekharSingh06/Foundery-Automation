import { test, expect } from '@playwright/test';
import fetch from 'node-fetch';

// Replace with your actual OpenWeather API key
const API_KEY = process.env.OPENWEATHER_API_KEY || 'ff3360130b9eee7c756bf931a9d512d9';
const CITY = 'London'; // You can change this to any city

// Helper to get date string for 5 days from now
function getDateFiveDaysFromNow() {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toISOString().split('T')[0];
}

test.use({ headless: false });

test('Check weather forecast for 5 days ahead (headed mode)', async ({ page }) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  expect(response.ok).toBeTruthy();
  const data = await response.json();

  const targetDate = getDateFiveDaysFromNow();
  // OpenWeather returns forecasts in 3-hour intervals
  const forecasts = data.list.filter(item => item.dt_txt.startsWith(targetDate));

  expect(forecasts.length).toBeGreaterThan(0);

  let html = `<h2>Weather forecast for ${CITY} on ${targetDate}:</h2><ul>`;
  forecasts.forEach(item => {
    html += `<li>Time: ${item.dt_txt}, Temp: ${item.main.temp}°C, Weather: ${item.weather[0].description}</li>`;
  });
  html += '</ul>';

  await page.setContent(html);
  await page.waitForTimeout(5000); // Show results for 5 seconds
});
