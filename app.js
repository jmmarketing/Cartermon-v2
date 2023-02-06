const container = document.querySelector('.search-container');
const searchElement = document.getElementById('search');
const searchInput = document.querySelector('input[name="search-bar"]');
const submit = document.getElementById('search-bar');
const loader = document.querySelector('.loader');
let names = [];

function searchPokemon(e) {
    e.preventDefault();

    searchElement.hidden = true;
    loader.hidden = false;
    searchInput.value = '';
    
    let pokeSearchValue = e.srcElement[0].value;
    console.log(pokeSearchValue);

    
}

submit.addEventListener('submit', searchPokemon);

async function pokeNames() {

    try {
    const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=151');

    if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        }
    // throw new Error('Request Failed!')

    } catch(error){
        console.log(error);
    }
}

window.onload = pokeNames;