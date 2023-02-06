// ######## GLOBAL VARIABLES ############
const container = document.querySelector('.search-container');
const searchElement = document.getElementById('search');
const searchInput = document.querySelector('input[name="search-bar"]');
const submit = document.getElementById('search-bar');
const loader = document.querySelector('.loader');
let names = [];

//########## Grab & Store Pokemon Names for Autocomplete ##########
async function loadPokeNames() {

    try {
        const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=151');
    
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse)
            for (const poke of jsonResponse.results){
               names.push(poke.name);
            }
        }
        // throw new Error('Request Failed!')
    
    } catch(error){
            console.log(error);
        }
}

//############ Search Function ###############
async function searchPokemon(e) {
    e.preventDefault();

    let pokeSearchValue = e.srcElement[0].value.toLowerCase();
    searchElement.hidden = true;
    loader.hidden = false;
    // searchInput.value = '';
    
    try {
        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeSearchValue}`);
        if (pokeResponse.ok) {
            const pokeJSON = await pokeResponse.json();
            console.log(pokeJSON);
        } else {
            throw new Error('Something Went Wrong!');
        }
    } catch (error) {
        console.log(error);
    }
    
}

// ####### Generates the Pokemon Card #########
function createPokeCard() {

}


window.onload = loadPokeNames;
submit.addEventListener('submit', searchPokemon);