const container = document.querySelector('.search-container');
const searchElement = document.getElementById('search');
const searchInput = document.querySelector('input[name="search-bar"]');
const submit = document.getElementById('search-bar');

function searchPokemon(e) {
    e.preventDefault();
    
    let pokeSearchValue = e.srcElement[0].value;
    console.log(pokeSearchValue);


    searchInput.value = '';
}

submit.addEventListener('submit', searchPokemon);