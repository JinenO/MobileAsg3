const apiKey = "YOUR_SOCIAL_MEDIA_API_KEY"; // Replace with actual API key

// Add an event listener to toggle the sidebar on button click
toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('open');  // Toggle the 'open' class on the sidebar
    mainContent.classList.toggle('shifted');  // Adjust the main content to shift when sidebar is open
  });

// Log out functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    alert('Logged out');
    window.location.href = 'login.html'; // Redirect to login page
});

// Fetch Social Media Posts (API call)
function fetchSocialMediaPosts() {
    const apiUrl = `https://api.example.com/socialmedia?api_key=${apiKey}`; // Example URL, replace with actual

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayPosts(data))
        .catch(error => console.error('Error fetching social media posts:', error));
}

// Function to Display Posts
function displayPosts(posts) {
    const postsContainer = document.getElementById('socialMediaPosts');
    postsContainer.innerHTML = ''; // Clear previous content

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.profilePic}" alt="Profile Picture">
                <h3>${post.author}</h3>
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            <div class="post-footer">
                <span>${post.timestamp}</span>
                <span>👍 ${post.likes} Likes</span>
                <span>💬 ${post.comments} Comments</span>
            </div>
            <div class="actions">
                <button>Like</button>
                <button>Comment</button>
            </div>
        `;

        postsContainer.appendChild(postElement);
    });
}

// Call Fetch Posts on Page Load
fetchSocialMediaPosts();
