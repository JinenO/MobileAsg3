const apiKey = "YOUR_API_KEY"; // Replace with your NewsAPI key
const newsEndpoint = "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey; // Change country if needed

// Handle Menu Button
document.getElementById('menuBtn').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
});

// Fetch Latest News
fetch(newsEndpoint)
    .then(response => response.json())
    .then(data => displayNews(data.articles))
    .catch(error => console.error("Error fetching news: " + error));

// Display News
function displayNews(articles) {
    const newsListContainer = document.getElementById('newsList');
    newsListContainer.innerHTML = ""; // Clear previous list
    articles.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.classList.add('newsItem');
        newsItem.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <small>${new Date(article.publishedAt).toLocaleString()}</small>
        `;
        newsItem.addEventListener('click', function() {
            window.location.href = article.url; // Redirect to the full news article
        });
        newsListContainer.appendChild(newsItem);
    });
}
