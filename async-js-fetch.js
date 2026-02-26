// Cache for API responses
const pokemonCache = new Map();

// Team storage (max 6)
let team = [];
const MAX_TEAM_SIZE = 6;

// Current Pokemon data
let currentPokemon = null;

// DOM Elements
const pokemonInput = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const errorMessage = document.getElementById('errorMessage');
const pokemonDisplay = document.getElementById('pokemonDisplay');
const addToTeamBtn = document.getElementById('addToTeamBtn');
const teamGrid = document.getElementById('teamGrid');
const teamCount = document.getElementById('teamCount');

// Initialize event listeners
searchBtn.addEventListener('click', handleSearch);
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
addToTeamBtn.addEventListener('click', handleAddToTeam);

// Fetch Pokemon with caching
async function fetchPokemon(nameOrId) {
    const query = nameOrId.toLowerCase().trim();

    // Check cache first
    if (pokemonCache.has(query)) {
        console.log('Loading from cache:', query);
        return pokemonCache.get(query);
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        const data = await response.json();

        // Cache by both name and ID
        pokemonCache.set(query, data);
        pokemonCache.set(data.id.toString(), data);
        pokemonCache.set(data.name, data);

        console.log('Fetched from API:', query);
        return data;
    } catch (error) {
        throw new Error('Pokemon not found. Please check the name or ID (1-151).');
    }
}

// Handle search
async function handleSearch() {
    const query = pokemonInput.value.trim();

    if (!query) {
        showError('Please enter a Pokemon name or ID');
        return;
    }

    // Clear previous error
    hideError();

    // Disable button during fetch
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching...';

    try {
        const data = await fetchPokemon(query);
        displayPokemon(data);
        pokemonInput.value = '';
    } catch (error) {
        showError(error.message);
        pokemonDisplay.classList.remove('show');
    } finally {
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
    }
}

// Display Pokemon data
function displayPokemon(data) {
    currentPokemon = data;

    // Set image
    document.getElementById('pokemonImage').src = data.sprites.front_default || '';
    document.getElementById('pokemonImage').alt = data.name;

    // Set basic info
    document.getElementById('pokemonName').textContent = data.name;
    document.getElementById('pokemonId').textContent = `#${data.id}`;

    const types = data.types.map(t => t.type.name).join(', ');
    document.getElementById('pokemonType').textContent = types;

    document.getElementById('pokemonHeight').textContent = `${(data.height / 10).toFixed(1)} m`;
    document.getElementById('pokemonWeight').textContent = `${(data.weight / 10).toFixed(1)} kg`;

    // Set audio (cry)
    const audioPlayer = document.getElementById('pokemonCry');
    const cryUrl = data.cries?.latest || data.cries?.legacy || '';
    if (cryUrl) {
        audioPlayer.src = cryUrl;
    } else {
        audioPlayer.src = '';
    }

    // Populate move dropdowns
    populateMoves(data.moves);

    // Show display
    pokemonDisplay.classList.add('show');
}

// Populate move dropdowns
function populateMoves(moves) {
    const moveSelects = [
        document.getElementById('move1'),
        document.getElementById('move2'),
        document.getElementById('move3'),
        document.getElementById('move4')
    ];

    // Clear all dropdowns
    moveSelects.forEach(select => {
        select.innerHTML = '<option value="">-- Select Move --</option>';
    });

    // Add moves to each dropdown
    moves.forEach(moveData => {
        const moveName = moveData.move.name;
        moveSelects.forEach(select => {
            const option = document.createElement('option');
            option.value = moveName;
            option.textContent = moveName.replace(/-/g, ' ');
            select.appendChild(option);
        });
    });
}

// Handle add to team
function handleAddToTeam() {
    if (!currentPokemon) {
        showError('Please search for a Pokemon first');
        return;
    }

    if (team.length >= MAX_TEAM_SIZE) {
        showError('Team is full! Maximum 6 Pokemon. Remove one to add another.');
        return;
    }

    // Check if Pokemon already in team
    if (team.some(p => p.id === currentPokemon.id)) {
        showError('This Pokemon is already in your team!');
        return;
    }

    // Get selected moves
    const selectedMoves = [
        document.getElementById('move1').value,
        document.getElementById('move2').value,
        document.getElementById('move3').value,
        document.getElementById('move4').value
    ].filter(move => move !== ''); // Remove empty selections

    if (selectedMoves.length === 0) {
        showError('Please select at least one move');
        return;
    }

    // Add to team
    const teamMember = {
        id: currentPokemon.id,
        name: currentPokemon.name,
        sprite: currentPokemon.sprites.front_default,
        moves: selectedMoves
    };

    team.push(teamMember);
    updateTeamDisplay();
    hideError();

    // Clear move selections
    document.getElementById('move1').value = '';
    document.getElementById('move2').value = '';
    document.getElementById('move3').value = '';
    document.getElementById('move4').value = '';
}

// Update team display
function updateTeamDisplay() {
    teamGrid.innerHTML = '';
    teamCount.textContent = team.length;

    team.forEach((member, index) => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';

        memberCard.innerHTML = `
            <img src="${member.sprite}" alt="${member.name}">
            <div class="team-member-name">${member.name}</div>
            <div class="team-member-id">#${member.id}</div>
            <ul class="team-member-moves">
                ${member.moves.map(move => `<li>${move.replace(/-/g, ' ')}</li>`).join('')}
            </ul>
            <button class="remove-btn" onclick="removePokemon(${index})">Remove</button>
        `;

        teamGrid.appendChild(memberCard);
    });
}

// Remove Pokemon from team
function removePokemon(index) {
    team.splice(index, 1);
    updateTeamDisplay();
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
}

// Hide error message
function hideError() {
    errorMessage.classList.remove('show');
}