const apiKey = "01c348787bf83521c5c58da319e62121"; // Replace with your OpenWeatherMap API key

// Handle Menu Button
document.getElementById('menuBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
});

// Handle Weather Search
document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetchWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

// Handle Current Location
document.getElementById('currentLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByLocation(lat, lon);
        }, function(error) {
            alert("Error fetching location: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

// Fetch Weather by City
function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert("Error fetching weather data: " + error));
}

// Fetch Weather by Location
function fetchWeatherByLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => alert("Error fetching weather data: " + error));
}

// Display Weather Data
function displayWeather(data) {
    const temperature = data.main.temp;
    const weatherCondition = data.weather[0].description;
    const humidity = data.main.humidity;

    // Update Weather Details
    document.getElementById('temperature').innerText = `Temperature: ${temperature}°C`;
    document.getElementById('weatherCondition').innerText = `Condition: ${weatherCondition}`;
    document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;

    // Fetch Forecast Data
    fetchForecast(data.coord.lat, data.coord.lon);
}

// Fetch Forecast Data (Next 5 days)
function fetchForecast(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => alert("Error fetching forecast data: " + error));
}

// Display Forecast Data
function displayForecast(data) {
    const temperatures = data.list.map(item => item.main.temp);
    const avgTemp = temperatures.reduce((sum, temp) => sum + temp, 0) / temperatures.length;

    // Update Average Temperature
    document.getElementById('averageTemperature').innerText = `Average Temperature: ${avgTemp.toFixed(2)}°C`;

    // Display Temperature Graph
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.list.map(item => item.dt_txt), // Get date/time for x-axis
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}
