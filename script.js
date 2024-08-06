document.getElementById('pokemon-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const pokemonInput = document.getElementById('pokemon-input').value.trim().toLowerCase();
    const pokemonNameElement = document.getElementById('pokemon-name');
    const pokemonImageElement = document.getElementById('pokemon-image');
    const pokemonTypesElement = document.getElementById('pokemon-types');
    const pokemonHeightElement = document.getElementById('pokemon-height');
    const pokemonWeightElement = document.getElementById('pokemon-weight');
    const pokemonInfoDiv = document.getElementById('pokemon-info');

    pokemonNameElement.textContent = '';
    pokemonImageElement.src = '';
    pokemonTypesElement.textContent = '';
    pokemonHeightElement.textContent = '';
    pokemonWeightElement.textContent = '';
    pokemonInfoDiv.classList.add('hidden');

    const isNumber = /^\d+$/.test(pokemonInput);
    const endpoint = isNumber ? `https://pokeapi.co/api/v2/pokemon/${pokemonInput}` : `https://pokeapi.co/api/v2/pokemon/${pokemonInput}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            return response.json();
        })
        .then(data => {
            pokemonNameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            pokemonImageElement.src = data.sprites.front_default;
            pokemonTypesElement.textContent = data.types.map(type => type.type.name).join(', ');
            pokemonHeightElement.textContent = `${data.height / 10} m`;
            pokemonWeightElement.textContent = `${data.weight / 10} kg`;

            pokemonInfoDiv.classList.remove('hidden');
        })
        .catch(error => {
            alert(error.message);
            pokemonInfoDiv.classList.add('hidden');
        });
});
