document.addEventListener("DOMContentLoaded", function() {
    fetchWeatherData();
});

let weatherDataByDay = [];
let currentDayIndex = 0;

function fetchWeatherData() {
    fetch('/weather')
        .then(response => response.json())
        .then(data => {
            processWeatherData(data);
            displayWeatherData();
        })
        .catch(error => console.log('Error fetching weather data:', error));
}

function processWeatherData(data) {
    if (data && data.list && data.list.length > 0) {
        const days = {};
        data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dateString = date.toDateString();
            if (!days[dateString]) {
                days[dateString] = {
                    temps: [],
                    descriptions: []
                };
            }
            days[dateString].temps.push(item.main.temp);
            days[dateString].descriptions.push(item.weather[0].description);
        });

        weatherDataByDay = Object.entries(days).map(([day, data]) => {
            const highTemp = Math.max(...data.temps);
            const lowTemp = Math.min(...data.temps);
            const description = data.descriptions[0];
            return { day, highTemp, lowTemp, description };
        });
    }
}

function displayWeatherData() {
    const weatherContent = document.getElementById("weather-content");
    if (weatherDataByDay.length > 0) {
        const { day, highTemp, lowTemp, description } = weatherDataByDay[currentDayIndex];
        weatherContent.innerHTML =
            `<h4>${day}</h4>
            <p><strong>High:</strong> ${highTemp.toFixed(2)} °F</p>
            <p><strong>Low:</strong> ${lowTemp.toFixed(2)} °F</p>
            <p><strong>Weather:</strong> ${description}</p>`;
    } else {
        weatherContent.innerHTML = 'No weather data available';
    }
}

function prevDay() {
    if (currentDayIndex > 0) {
        currentDayIndex--;
        displayWeatherData();
    }
}

function nextDay() {
    if (currentDayIndex < weatherDataByDay.length - 1) {
        currentDayIndex++;
        displayWeatherData();
    }
}
