const express = require("express");
const https = require("https");
const path = require("path");

const app = express();
const apiKey = "385abcddb33730c3ad3b1cab3712e717";
const location = "Nyeri";
const api = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Weather API 
app.get("/weather", (req, res) => {
  https.get(api, (response) => {
    let data = '';

    
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      res.json(weatherData); 
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(500).send("Error fetching weather data");
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
