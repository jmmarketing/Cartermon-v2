// import { autocomplete } from "./autocomplete.js";

/////////////////////////////////////////
///////######## GLOBAL VARIABLES ############
//------- Selectors ----------
const container = document.querySelector(".search-container");
const searchElement = document.getElementById("search");
const searchInput = document.querySelector('input[name="search-bar"]');
const submit = document.getElementById("search-bar");
const loader = document.querySelector(".loader");
const results = document.querySelector(".results"); //
const resetButton = document.querySelector(".reset");
const errorMessage = document.querySelector(".error");
let heart;
///////////////////////////////////////////
/////////------- Arrays & Objects ----------
let names = [];
let pokemon = {};
let bgImages = [
  "./resources/images/forest_background.jpg",
  "./resources/images/field.jpg",
  "./resources/images/galar-scenery.png",
  "./resources/images/night.jpg",
  "./resources/images/training.jpg",
  "./resources/images/poke-background.webp",
];

/* #### TRUE GLOBAL MODULE VARIABLES TO USE WHILE DEBUG ### */
// window.names = names;
// window.pokemon = pokemon;
// window.bgImages = bgImages;

///////////////////////////////////////////
/////////------- FUNCTIONS ----------

//########## Grab & Store Pokemon Names for Autocomplete ##########
async function loadPokeNames() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=250");

    if (response.ok) {
      const jsonResponse = await response.json();
      //   console.log(jsonResponse)
      for (const poke of jsonResponse.results) {
        names.push(poke.name);
      }
    }
    // throw new Error('Request Failed!')
  } catch (error) {
    console.log(error);
  }
}

//############ Search Function ###############
function searchPokemon(e) {
  e.preventDefault();

  let pokeSearchValue = searchInput.value.toLowerCase();
  let localSaved = JSON.parse(localStorage.getItem("fav")) || [];
  searchElement.hidden = true;
  loader.hidden = false;

  if (!localStorage.fav) {
    console.log("NO FAVORITES! -> API SEARCH TRIGGERED");
    searchPokemonAPI(pokeSearchValue);
  } else if (localSaved.some((obj) => obj.name === pokeSearchValue)) {
    console.log("POKEMON FOUND! -> In Favorite LocalStorage");
    localSaved.forEach((obj) => {
      if (obj.name === pokeSearchValue) {
        pokemon.name = obj.name;
        pokemon.img = obj.img;
        pokemon.hp = obj.hp;
        pokemon.attack = obj.attack;
        pokemon.speed = obj.speed;
        pokemon.defense = obj.defense;
        pokemon.special_attack = obj.special_attack;
        pokemon.special_defense = obj.special_defense;
        pokemon.fav = obj.fav;

        console.log("CARD CREATED! -> From LocalStorage");
        console.log(pokemon);
        createPokeCard(pokemon);
      }
    });
  } else {
    console.log("NOT A FAVORITE! -> Searching API");
    searchPokemonAPI(pokeSearchValue);
  }
}

async function searchPokemonAPI(pokemonSearched) {
  try {
    const pokeResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonSearched}`
    );
    if (pokeResponse.ok) {
      const pokeJSON = await pokeResponse.json();

      // Assign Values to Pokemon Object
      pokemon.name = pokeJSON["name"];
      pokemon.img =
        pokeJSON["sprites"]["other"]["official-artwork"]["front_default"];
      pokemon.hp = pokeJSON["stats"][0]["base_stat"];
      pokemon.attack = pokeJSON["stats"][1]["base_stat"];
      pokemon.speed = pokeJSON["stats"][5]["base_stat"];
      pokemon.defense = pokeJSON["stats"][2]["base_stat"];
      pokemon.special_attack = pokeJSON["stats"][3]["base_stat"];
      pokemon.special_defense = pokeJSON["stats"][4]["base_stat"];
      pokemon.fav = false;

      console.log("CARD CREATED! -> From API Search");
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
  // Assign values to Results Card

  const cardHTML = `
<div class="results">
  <div class="row" id="poke-name">
    <p>${object.name}</p>
    <p id="hp">${object.hp} HP</p>
    <img
      src="${
        object.fav
          ? "./resources/images/heartline-fill.png"
          : "./resources/images/heartline.png"
      }"
      id="favorite"
      data-saved="${object.fav}"
    />
  </div>
  <div class="row" id="poke-image" style="background-image: url('${
    bgImages[Math.floor(Math.random() * 6)]
  }')">
    <img src="${object.img}" />
  </div>

  <div class="row" id="poke-stats">
    <div class="stats" id="stats1">
      <div id="attack">
        <h6>attack</h6>
        <p class="num">${object.attack}</p>
      </div>
      <div id="speed">
        <h6>speed</h6>
        <p class="num">${object.speed}</p>
      </div>
      <div id="defense">
        <h6>defense</h6>
        <p class="num">${object.defense}</p>
      </div>
    </div>

    <div class="stats" id="stats2">
      <div id="special-attack">
        <h6>special attack</h6>
        <p class="num">${object.special_attack}</p>
      </div>
      <div id="special-defense">
        <h6>special defense</h6>
        <p class="num">${object.special_defense}</p>
      </div>
    </div>
  </div>
</div>
`;

  setTimeout(() => {
    loader.hidden = true;
    resetButton.hidden = false;
    resetButton.insertAdjacentHTML("beforebegin", cardHTML);
    heart = document.querySelector("#favorite");
    heart.addEventListener("mouseenter", hoverFav);
    heart.addEventListener("mouseleave", hoverOutFav);
    heart.addEventListener("click", toggleFav);
  }, 3000);
}

// ####### Resets Search & Card #########
function resetSearch() {
  searchInput.value = "";
  resetButton.hidden = true;
  heart.dataset.saved = "";
  heart.src = "./resources/images/heartline.png";
  searchElement.hidden = false;
  errorMessage.hidden = true;
  document.querySelector(".results").remove();

  for (const att of pokemon) {
    delete pokemon[att];
  }
}

//######## Favorite Functions ###########
function hoverFav() {
  this.dataset.saved == "true"
    ? (this.src = "./resources/images/heartline.png")
    : (this.src = "./resources/images/heartline-fill.png");
}
function hoverOutFav() {
  this.dataset.saved == "true"
    ? (this.src = "./resources/images/heartline-fill.png")
    : (this.src = "./resources/images/heartline.png");
}

function toggleFav() {
  pokemon.fav = !pokemon.fav;

  if (this.dataset.saved == "false") {
    //Check if Pokemon previously saved?
    this.dataset.saved = "true";
    this.src = "./resources/images/heartline-fill.png";

    if (!localStorage.fav) {
      //Checks to see if first pokemon saved
      localStorage.setItem("fav", `[${JSON.stringify(pokemon)}]`);
    } else {
      let pokeFav = JSON.parse(localStorage.getItem("fav"));
      pokeFav.push(pokemon);
      localStorage.setItem("fav", JSON.stringify(pokeFav));
    }
  } else {
    this.dataset.saved = "false";
    this.src = "./resources/images/heartline.png";

    let pokeFav = JSON.parse(localStorage.getItem("fav"));
    console.log(pokeFav);
    let pokeIdx = pokeFav.findIndex((obj) => obj.name === pokemon.name);
    console.log(pokeIdx);

    pokeFav.splice(pokeIdx, 1);
    console.log(pokeFav);

    localStorage.setItem("fav", JSON.stringify(pokeFav));
  }
}
//////////////////////////////////////
// ########### EVENTS ##############
window.onload = loadPokeNames;
// autocomplete(searchInput, names);

resetButton.addEventListener("click", resetSearch);
submit.addEventListener("submit", searchPokemon);
