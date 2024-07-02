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
                    currentTemp: item.main.temp,
                    humidity: item.main.humidity,
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
            const currentTemp = data.currentTemp;
            const humidity = data.humidity;
            return { day, highTemp, lowTemp, currentTemp, humidity, description };
        });
    }
}

function displayWeatherData() {
    const weatherContent = document.getElementById("weather-content");
    const today = new Date().toDateString();
    if (weatherDataByDay.length > 0) {
        const { day, highTemp, lowTemp, currentTemp, humidity, description } = weatherDataByDay[currentDayIndex];
        weatherContent.innerHTML =
            `<h4>${day}</h4>
            <p><strong>High:</strong> ${highTemp.toFixed(0)} °F</p>
            <p><strong>Low:</strong> ${lowTemp.toFixed(0)} °F</p>`;
        
        if (day === today) {
            weatherContent.innerHTML +=
            `<p><strong>Current Temp:</strong> ${currentTemp.toFixed(0)} °F</p>`;
        }

        weatherContent.innerHTML +=
            `<p><strong>Humidity:</strong> ${humidity.toFixed(0)}%</p>
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
