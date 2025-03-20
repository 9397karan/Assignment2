let vidContainer = document.getElementById('vid');

// Fetch API data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchApi);

async function fetchApi() {
    let res = await fetch('https://api.freeapi.app/api/v1/public/youtube/videos');
    let data = await res.json();
    
    let vidData = data.data.data; // Extract video data array

    vidContainer.innerHTML = ""; // Clear existing content

    vidData.forEach((e) => {
        let title = e.items.snippet.title; // Get video title
        let thumbnail = e.items.snippet.thumbnails.standard.url; // Get video thumbnail
        let channel = e.items.snippet.channelTitle; // Get channel name
        let views = e.items.statistics.viewCount; // Get view count
        let likes = e.items.statistics.likeCount; // Get like count
        let id = e.items.id; // Get video ID

        renderCard(title, thumbnail, channel, views, likes, id);
    });
}

// Function to render video card
function renderCard(title, thumbnail, channel, views, likes, id) {
    let card = `<div class="card">
                    <a href="https://www.youtube.com/watch?v=${id}">
                        <img src="${thumbnail}" alt="vid" id="img">
                    </a>
                    <h1 class="title">${title.slice(0, 30)}..</h1>
                    <h2 id="channel">${channel}</h2>
                    <div>
                        <p id="likes">♡ ${likes}</p>
                        <p id="views">views: ${views}</p>
                    </div>
                </div>`;

    vidContainer.innerHTML += card;
}

// Function to filter search results
function searchResult() {
    let inputSearch = String(document.getElementById('search').value.toLowerCase());
    const cards = document.querySelectorAll('.card');
    let found = false;

    clearResult(); // Reset previous search results

    cards.forEach((e) => {
        const title = e.querySelector('.title').textContent.toLowerCase();
        if (!title.includes(inputSearch)) {
            e.classList.add('invisible'); // Hide cards that don't match search
        } else {
            e.classList.remove('invisible'); // Show matching cards
            found = true;
        }
    });

    document.getElementById('search').value = ""; // Clear input field
    document.getElementById('err').style.display = found ? 'none' : 'block'; // Show error if no results found
}

// Function to reset search results
function clearResult() {
    const cards = document.querySelectorAll('.card');
    document.getElementById('err').style.display = 'none';

    cards.forEach((e) => {
        e.classList.remove('invisible'); // Show all cards
    });
}
