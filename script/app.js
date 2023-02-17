import { autocomplete } from "./autocomplete.js";

// ######## GLOBAL VARIABLES ############
//------- Selectors ----------
const container = document.querySelector('.search-container');
const searchElement = document.getElementById('search');
const searchInput = document.querySelector('input[name="search-bar"]');
const submit = document.getElementById('search-bar');
const loader = document.querySelector('.loader');
const results = document.querySelector('.results');
const resetButton = document.querySelector('.reset');
const errorMessage = document.querySelector('.error');
const heart = document.querySelector('#favorite');

//------- Arrays & Objects ----------
let names = [];
let pokemon = {};
let bgImages = ["./resources/images/forest_background.jpg", "./resources/images/field.jpg", "./resources/images/galar-scenery.png", "./resources/images/night.jpg", "./resources/images/training.jpg", "./resources/images/poke-background.webp"];


/* #### TRUE GLOBAL MODULE VARIABLES TO USE WHILE DEBUG ### */
// window.names = names;
// window.pokemon = pokemon;
// window.bgImages = bgImages;

//########## Grab & Store Pokemon Names for Autocomplete ##########
async function loadPokeNames() {

    try {
        const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=250');
    
        if (response.ok) {
          const jsonResponse = await response.json();
        //   console.log(jsonResponse)
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
    
    
    try {
        const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeSearchValue}`);
        if (pokeResponse.ok) {
            const pokeJSON = await pokeResponse.json();

            // Assign Values to Pokemon Object
            pokemon.name = pokeJSON["name"];
            pokemon.img = pokeJSON["sprites"]["other"]["official-artwork"]["front_default"];
            pokemon.hp = pokeJSON["stats"][0]["base_stat"];
            pokemon.attack = pokeJSON["stats"][1]["base_stat"];
            pokemon.speed = pokeJSON["stats"][5]["base_stat"];
            pokemon.defense = pokeJSON["stats"][2]["base_stat"];
            pokemon.special_attack = pokeJSON["stats"][3]["base_stat"];
            pokemon.special_defense = pokeJSON["stats"][4]["base_stat"];
            pokemon.fav = false;

            console.log(pokemon);
            createPokeCard(pokemon);
        } else {
            throw new Error("Something Went Wrong.");
        }
    } catch (error) {
        loader.hidden = true;
        errorMessage.hidden = false;
        resetButton.hidden = false;
        console.log(error);
    }
    
}

// ####### Generates the Pokemon Card #########
function createPokeCard(object) {
    const pokeName = document.querySelector('#poke-name p');
    const pokeHP = document.querySelector('#hp');
    const pokeImg = document.querySelector('#poke-image img');
    const pokeAttack = document.querySelector('#attack .num');
    const pokeSpeed= document.querySelector('#speed .num');
    const pokeDefense = document.querySelector('#defense .num');
    const pokeSpecialA = document.querySelector('#special-attack .num');
    const pokeSpecialD = document.querySelector('#special-defense .num');
    const backgroundImage = document.querySelector('#poke-image')

    // Assign values to Results Card

    backgroundImage.style.backgroundImage = `url('${bgImages[Math.floor(Math.random() * 6)]}')`;
    pokeName.textContent = object.name;
    pokeHP.textContent = `${object.hp} HP`;
    pokeImg.src = object.img;
    heart.dataset.saved = object.fav;
    pokeAttack.innerText = object.attack;
    pokeDefense.textContent = object.defense;
    pokeSpeed.textContent = object.speed;
    pokeSpecialA.textContent = object.special_attack;
    pokeSpecialD.textContent = object.special_defense;

    setTimeout(() => {
        loader.hidden = true;
        results.hidden = false;
        resetButton.hidden = false;
    }, 3000)
    

}

// ####### Resets Search & Card #########
function resetSearch() {
    searchInput.value = '';
    resetButton.hidden = true;
    heart.dataset.saved = '';
    heart.src = '../resources/images/heartline.png';
    results.hidden = true;
    searchElement.hidden = false;
    errorMessage.hidden = true;

    for (const att in pokemon){
        delete pokemon[att];
    }
}

//######## Favorite Functions ###########
function hoverFav() {
    this.dataset.saved == 'true' ? this.src = '../resources/images/heartline.png' : this.src = '../resources/images/heartline-fill.png';
}
function hoverOutFav() {
    this.dataset.saved == 'true' ? this.src = '../resources/images/heartline-fill.png' : this.src = '../resources/images/heartline.png';
}

function toggleFav() {
    pokemon.fav = !pokemon.fav;

    if (this.dataset.saved == 'false') { //Check if Pokemon previously saved?
        this.dataset.saved = 'true';
        this.src = '../resources/images/heartline-fill.png';

        if (!localStorage.fav) { //Checks to see if first pokemon saved
            localStorage.setItem('fav', `[${JSON.stringify(pokemon)}]`)
        } else {
            let pokeFav = JSON.parse(localStorage.getItem('fav'));
            pokeFav.push(pokemon);
            localStorage.setItem('fav', JSON.stringify(pokeFav));
        };


    } else {
        this.dataset.saved = 'false';
        this.src = '../resources/images/heartline.png';

        let pokeFav = JSON.parse(localStorage.getItem('fav'));
        console.log(pokeFav)
        let pokeIdx = pokeFav.findIndex(obj => obj.name === pokemon.name);
        console.log(pokeIdx);
        
        pokeFav.splice(pokeIdx, 1);
        console.log(pokeFav);

        localStorage.setItem('fav', JSON.stringify(pokeFav));
    }
    
}


// ########### EVENTS ##############
window.onload = loadPokeNames;
autocomplete(searchInput, names)
heart.addEventListener('mouseenter', hoverFav);
heart.addEventListener('mouseleave', hoverOutFav);
heart.addEventListener('click', toggleFav);
resetButton.addEventListener('click', resetSearch);
submit.addEventListener('submit', searchPokemon);