const container = document.querySelector('.search-container');
const searchElement = document.getElementById('search');
const searchInput = document.querySelector('input[name="search-bar"]');
const submit = document.getElementById('search-bar');
const loader = document.querySelector('.loader');

function searchPokemon(e) {
    e.preventDefault();

    searchElement.hidden = true;
    loader.hidden = false;
    searchInput.value = '';
    
    let pokeSearchValue = e.srcElement[0].value;
    console.log(pokeSearchValue);

    
}

submit.addEventListener('submit', searchPokemon);