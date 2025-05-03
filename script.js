// Sample game data - you would replace this with your actual games
const games = [
    {
        id: 1,
        title: "Space Adventure",
        thumbnail: "https://via.placeholder.com/300x200?text=Space+Adventure",
        category: "action",
        description: "Blast through space and defeat alien invaders in this exciting action game!",
        embedUrl: "https://example.com/games/space-adventure",
        plays: 12500,
        likes: 8700
    },
    {
        id: 2,
        title: "Jigsaw Puzzle",
        thumbnail: "https://via.placeholder.com/300x200?text=Jigsaw+Puzzle",
        category: "puzzle",
        description: "Solve beautiful jigsaw puzzles with hundreds of pieces and amazing images.",
        embedUrl: "https://example.com/games/jigsaw-puzzle",
        plays: 8900,
        likes: 6500
    },
    {
        id: 3,
        title: "Basketball Pro",
        thumbnail: "https://via.placeholder.com/300x200?text=Basketball+Pro",
        category: "sports",
        description: "Shoot hoops and become the basketball champion in this realistic sports game.",
        embedUrl: "https://example.com/games/basketball-pro",
        plays: 15000,
        likes: 9200
    },
    {
        id: 4,
        title: "Car Racing X",
        thumbnail: "https://via.placeholder.com/300x200?text=Car+Racing+X",
        category: "racing",
        description: "Race against the best drivers in the world on exciting tracks around the globe.",
        embedUrl: "https://example.com/games/car-racing-x",
        plays: 21000,
        likes: 14500
    },
    {
        id: 5,
        title: "Treasure Hunt",
        thumbnail: "https://via.placeholder.com/300x200?text=Treasure+Hunt",
        category: "adventure",
        description: "Explore ancient ruins and find hidden treasures in this thrilling adventure game.",
        embedUrl: "https://example.com/games/treasure-hunt",
        plays: 11000,
        likes: 7800
    },
    {
        id: 6,
        title: "Battle Royale",
        thumbnail: "https://via.placeholder.com/300x200?text=Battle+Royale",
        category: "multiplayer",
        description: "Join the ultimate battle with players from around the world. Only one can win!",
        embedUrl: "https://example.com/games/battle-royale",
        plays: 35000,
        likes: 28700
    }
];

// DOM Elements
const featuredGamesGrid = document.querySelector('.featured-games .games-grid');
const popularGamesGrid = document.querySelector('.popular-games .games-grid');
const gameModal = document.getElementById('gameModal');
const closeBtn = document.querySelector('.close-btn');
const gameFrame = document.getElementById('gameFrame');
const modalGameTitle = document.getElementById('modalGameTitle');
const gameDescription = document.getElementById('gameDescription');
const playCount = document.getElementById('playCount');
const likeCount = document.getElementById('likeCount');
const categoryCards = document.querySelectorAll('.category-card');
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');

// Display featured games (first 4 games)
function displayFeaturedGames() {
    featuredGamesGrid.innerHTML = '';
    const featuredGames = games.slice(0, 4);
    
    featuredGames.forEach(game => {
        const gameCard = createGameCard(game);
        featuredGamesGrid.appendChild(gameCard);
    });
}

// Display popular games (sorted by plays)
function displayPopularGames() {
    popularGamesGrid.innerHTML = '';
    const popularGames = [...games].sort((a, b) => b.plays - a.plays).slice(0, 6);
    
    popularGames.forEach(game => {
        const gameCard = createGameCard(game);
        popularGamesGrid.appendChild(gameCard);
    });
}

// Create game card element
function createGameCard(game) {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    gameCard.dataset.id = game.id;
    
    gameCard.innerHTML = `
        <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail">
        <div class="game-info">
            <h3>${game.title}</h3>
            <p>${game.category.charAt(0).toUpperCase() + game.category.slice(1)}</p>
            <div class="game-stats">
                <span><i class="fas fa-play"></i> ${game.plays.toLocaleString()}</span>
                <span><i class="fas fa-thumbs-up"></i> ${game.likes.toLocaleString()}</span>
            </div>
        </div>
    `;
    
    gameCard.addEventListener('click', () => openGameModal(game));
    return gameCard;
}

// Open game modal
function openGameModal(game) {
    modalGameTitle.textContent = game.title;
    gameDescription.textContent = game.description;
    playCount.textContent = game.plays.toLocaleString();
    likeCount.textContent = game.likes.toLocaleString();
    gameFrame.src = game.embedUrl;
    
    gameModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close game modal
function closeGameModal() {
    gameModal.style.display = 'none';
    gameFrame.src = '';
    document.body.style.overflow = 'auto';
}

// Filter games by category
function filterGamesByCategory(category) {
    if (category === 'all') {
        displayFeaturedGames();
        displayPopularGames();
        return;
    }
    
    const filteredGames = games.filter(game => game.category === category);
    
    featuredGamesGrid.innerHTML = '';
    popularGamesGrid.innerHTML = '';
    
    if (filteredGames.length > 0) {
        filteredGames.slice(0, 4).forEach(game => {
            const gameCard = createGameCard(game);
            featuredGamesGrid.appendChild(gameCard);
        });
        
        const sortedGames = [...filteredGames].sort((a, b) => b.plays - a.plays);
        sortedGames.slice(0, 6).forEach(game => {
            const gameCard = createGameCard(game);
            popularGamesGrid.appendChild(gameCard);
        });
    } else {
        featuredGamesGrid.innerHTML = '<p>No games found in this category.</p>';
        popularGamesGrid.innerHTML = '<p>No games found in this category.</p>';
    }
}

// Search games
function searchGames(query) {
    if (query.trim() === '') {
        displayFeaturedGames();
        displayPopularGames();
        return;
    }
    
    const searchResults = games.filter(game => 
        game.title.toLowerCase().includes(query.toLowerCase()) || 
        game.description.toLowerCase().includes(query.toLowerCase())
    );
    
    featuredGamesGrid.innerHTML = '';
    popularGamesGrid.innerHTML = '';
    
    if (searchResults.length > 0) {
        searchResults.slice(0, 4).forEach(game => {
            const gameCard = createGameCard(game);
            featuredGamesGrid.appendChild(gameCard);
        });
        
        const sortedGames = [...searchResults].sort((a, b) => b.plays - a.plays);
        sortedGames.slice(0, 6).forEach(game => {
            const gameCard = createGameCard(game);
            popularGamesGrid.appendChild(gameCard);
        });
    } else {
        featuredGamesGrid.innerHTML = '<p>No games found matching your search.</p>';
        popularGamesGrid.innerHTML = '<p>No games found matching your search.</p>';
    }
}

// Event Listeners
closeBtn.addEventListener('click', closeGameModal);
window.addEventListener('click', (e) => {
    if (e.target === gameModal) {
        closeGameModal();
    }
});

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        filterGamesByCategory(category);
    });
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    searchGames(query);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value;
        searchGames(query);
    }
});

// Initialize the page
displayFeaturedGames();
displayPopularGames();
