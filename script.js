const form = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");
const message = document.querySelector("#message");
const weatherCard = document.querySelector("#weather-card");
const searchButton = form.querySelector("button");

const weatherDescriptions = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Depositing rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Moderate drizzle", "🌦️"],
  55: ["Dense drizzle", "🌧️"],
  56: ["Light freezing drizzle", "🌧️"],
  57: ["Dense freezing drizzle", "🌧️"],
  61: ["Slight rain", "🌦️"],
  63: ["Moderate rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  66: ["Light freezing rain", "🌧️"],
  67: ["Heavy freezing rain", "🌧️"],
  71: ["Slight snow", "🌨️"],
  73: ["Moderate snow", "🌨️"],
  75: ["Heavy snow", "❄️"],
  77: ["Snow grains", "🌨️"],
  80: ["Slight rain showers", "🌦️"],
  81: ["Moderate rain showers", "🌧️"],
  82: ["Violent rain showers", "⛈️"],
  85: ["Slight snow showers", "🌨️"],
  86: ["Heavy snow showers", "❄️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm with hail", "⛈️"],
  99: ["Thunderstorm with heavy hail", "⛈️"]
};

function showMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#ffb4b4" : "#c3d2e6";
}

async function getWeather(city) {
  const geocodingUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
  geocodingUrl.search = new URLSearchParams({
    name: city,
    count: "1",
    language: "en",
    format: "json"
  });

  const geoResponse = await fetch(geocodingUrl);
  if (!geoResponse.ok) throw new Error("Could not search for that city. Please try again.");
  const geoData = await geoResponse.json();
  if (!geoData.results || geoData.results.length === 0) {
    throw new Error("City not found. Check the spelling and try again.");
  }

  const place = geoData.results[0];
  const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
  weatherUrl.search = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m",
    temperature_unit: "celsius",
    wind_speed_unit: "kmh",
    timezone: "auto"
  });

  const weatherResponse = await fetch(weatherUrl);
  if (!weatherResponse.ok) throw new Error("Weather data is temporarily unavailable.");
  const weatherData = await weatherResponse.json();
  return { place, current: weatherData.current };
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (!city) {
    showMessage("Please enter a city name.", true);
    return;
  }

  searchButton.disabled = true;
  searchButton.textContent = "Loading...";
  showMessage("Getting the latest weather...");
  weatherCard.classList.add("hidden");

  try {
    const { place, current } = await getWeather(city);
    const [description, icon] = weatherDescriptions[current.weather_code] || ["Weather conditions", "🌡️"];
    const placeName = [place.name, place.admin1, place.country].filter(Boolean)
      .filter((value, index, array) => array.indexOf(value) === index)
      .join(", ");

    document.querySelector("#location").textContent = placeName;
    document.querySelector("#description").textContent = description;
    document.querySelector("#weather-icon").textContent = icon;
    document.querySelector("#temperature").textContent = Math.round(current.temperature_2m);
    document.querySelector("#feels-like").textContent = Math.round(current.apparent_temperature);
    document.querySelector("#humidity").textContent = current.relative_humidity_2m;
    document.querySelector("#wind").textContent = Math.round(current.wind_speed_10m);
    weatherCard.classList.remove("hidden");
    showMessage(`Weather updated for ${place.name}.`);
  } catch (error) {
    showMessage(error.message || "Something went wrong. Please try again.", true);
  } finally {
    searchButton.disabled = false;
    searchButton.textContent = "Search";
  }
});
