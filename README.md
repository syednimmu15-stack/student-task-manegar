# Weather Report App

A beginner-friendly weather report website built with **HTML, CSS, and JavaScript**. Search for a city to view current temperature, feels-like temperature, humidity, wind speed, and a weather icon.

## Project files

- `index.html` — page structure
- `style.css` — design and responsive layout
- `script.js` — city search and weather API logic

## How to run

1. Download and extract the ZIP file.
2. Open the `weather_report_project` folder.
3. Double-click `index.html` to open it in a modern browser.
4. Enter a city name, such as `Hyderabad`, `London`, or `Delhi`, and press **Search**.
5. Keep an internet connection on because the app retrieves live weather data.

## API used

This project uses the free Open-Meteo APIs:
- Geocoding: `https://geocoding-api.open-meteo.com/v1/search`
- Current weather: `https://api.open-meteo.com/v1/forecast`

No API key is needed for this demo.

## Upload to GitHub

1. Sign in to GitHub and create a new repository named `weather-report-app`.
2. Choose **Public** or **Private**, then create the repository.
3. Select **Add file → Upload files**.
4. Upload `index.html`, `style.css`, `script.js`, and `README.md`.
5. Enter a commit message such as `Add weather report app` and click **Commit changes**.

### Optional: run with Git

If Git is installed, open a terminal inside this folder and run:

```bash
git init
git add .
git commit -m "Add weather report app"
```

Create an empty repository on GitHub, then follow GitHub's instructions to connect it as a remote and push the files.

## Troubleshooting

- If a city is not found, check its spelling.
- If weather does not load, check your internet connection and try again.
- This is a simple student project, not an emergency or official weather-alert service.
