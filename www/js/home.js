document.addEventListener("DOMContentLoaded", function() {
  // Load user data from localStorage
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const profilePic = localStorage.getItem("profilePic") || "default-profile.jpg";

  // Add an event listener to toggle the sidebar on button click
  toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('open');  // Toggle the 'open' class on the sidebar
    mainContent.classList.toggle('shifted');  // Adjust the main content to shift when sidebar is open
  });

  // Display profile information in the sidebar
  document.getElementById("username").textContent = username;
  document.getElementById("email").textContent = email;
  document.getElementById("profilePic").src = profilePic;

  // Fetch current weather
  function fetchWeather() {
      if (navigator.geolocation) {
          // Get user's current location
          navigator.geolocation.getCurrentPosition(function(position) {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;
              
              // Call the OpenWeather API to get the weather for the user's location
              const weatherApiKey = "01c348787bf83521c5c58da319e62121"; // Replace with your OpenWeather API key
              const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

              fetch(weatherUrl)
                  .then(response => response.json())
                  .then(data => {
                      const weatherDetails = `
                          <p>Weather: ${data.weather[0].description}</p>
                          <p>Temperature: ${data.main.temp}°C</p>
                          <p>Humidity: ${data.main.humidity}%</p>
                      `;
                      document.getElementById("weatherDetails").innerHTML = weatherDetails;
                  })
                  .catch(error => {
                      document.getElementById("weatherDetails").textContent = "Error fetching weather data.";
                  });
          });
      } else {
          document.getElementById("weatherDetails").textContent = "Geolocation is not supported by this browser.";
      }
  }

  // Call fetchWeather on page load
  fetchWeather();

  // Fetch News from NewsAPI
  function fetchNews() {
      const newsApiKey = "your_news_api_key"; // Replace with your NewsAPI key
      const newsUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;
      
      fetch(newsUrl)
          .then(response => response.json())
          .then(data => {
              const newsList = data.articles.map(article => `
                  <div class="news-item">
                      <h3>${article.title}</h3>
                      <p>${article.description}</p>
                      <a href="${article.url}" target="_blank">Read more</a>
                  </div>
              `).join("");
              document.getElementById("newsList").innerHTML = newsList;
          })
          .catch(error => {
              document.getElementById("newsList").textContent = "Error fetching news.";
          });
  }

  // Fetch Social Media Posts from a Mock API (Replace with real social media API)
  function fetchSocialMediaPosts() {
      const socialMediaApiKey = "your_social_media_api_key"; // Replace with your Social Media API key (e.g., Twitter, Facebook)
      const socialMediaUrl = `https://api.mock.com/socialmedia/posts?apiKey=${socialMediaApiKey}`; // Replace with actual API endpoint

      fetch(socialMediaUrl)
          .then(response => response.json())
          .then(data => {
              const postsList = data.posts.map(post => `
                  <div class="post-item">
                      <h3>${post.user}</h3>
                      <p>${post.content}</p>
                      <a href="${post.url}" target="_blank">View Post</a>
                  </div>
              `).join("");
              document.getElementById("postsList").innerHTML = postsList;
          })
          .catch(error => {
              document.getElementById("postsList").textContent = "Error fetching social media posts.";
          });
  }

  // Call functions to fetch news and posts on page load
  fetchNews();
  fetchSocialMediaPosts();
});
