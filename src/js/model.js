// ORganizing Old function that could be use for model.

export const gameModel = {
  player: {
    name: "",
    avatar: "girl1",
    difficulty: "",
    stats: {
      pokeballs: 3,
      answers: 0,
    },
    pokemonCaught: [],
  },
  pokemon: [],
  allPlayers: [],
};

/// **** REFACTOR CATCH / SHOW HIDE
function _searchPokemonAPI(pokemonSearched) {
  const pokeRequest = fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonSearched}`
  );

  pokeRequest
    .then((response) => response.json())
    .then((pokeJSON) => {
      // console.log(pokeJSON);
      // Destructure Response into Pokemon Object//
      ({
        name: this.pokemon.name,
        sprites: {
          other: {
            "official-artwork": { front_default: this.pokemon.img },
          },
        },
        stats: [
          { base_stat: this.pokemon.hp },
          { base_stat: this.pokemon.attack },
          { base_stat: this.pokemon.defense },
          { base_stat: this.pokemon.special_attack },
          { base_stat: this.pokemon.special_defense },
          { base_stat: this.pokemon.speed },
        ],
        fav: this.pokemon.fav = false,
      } = pokeJSON);

      console.log("Pokemon API Search Found 🔍", this.pokemon);
      console.log("🃏 CARD CREATED! -> From API");
      this._createPokeCard(this.pokemon);
    })
    .catch((error) => {
      loader.hidden = true;
      errorMessage.hidden = false;
      resetButton.hidden = false;
      console.log(error);
    });
}

//########## Grab & Store Pokemon Info ##########
function _loadPokeInfo() {
  let names250;
  const request = fetch("https://pokeapi.co/api/v2/pokemon?limit=250");
  request
    .then((response) => response.json())
    .then((data) => {
      for (const poke of data.results) {
        this.names250.push({
          name: poke.name,
          image: poke.sprites.other["official-artwork"]["front_default"],
          hp: poke["stats"][0]["base_stat"],
        });
      }
      localStorage.setItem("allnames", JSON.stringify(this.names250));

      this._createPreviewCards(this.names250);
    })
    .catch((error) => console.log(error));
}

function _loadPokeNames() {
  // IF Names in local Storage then set to #names from localstorage
  let names = this._getLocalstorage("autoNames") || [];
  // IF names NOT in localstorage, then feth from API
  if (!names.length) {
    const request = fetch("https://pokeapi.co/api/v2/pokemon?limit=250");

    request
      .then((response) => response.json())
      .then((data) => {
        //Takes response and loops through results to push pokemon names to names array.
        data.results.forEach((poke) => {
          names.push(poke.name);
        });
        this._setLocalstorage("autoNames", names);
      })
      .catch((error) => console.log(error));
  }
}

function _setLocalstorage(key, value) {
  if (!localStorage[key]) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    const storageArr = this._getLocalstorage(key);
    storageArr.push(value);
    localStorage.setItem(key, JSON.stringify(storageArr));
  }
}

function _getLocalstorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function _removeFromLocalstorage() {
  let pokeFav = this._getLocalstorage("fav");
  let pokeIdx = pokeFav.findIndex((obj) => obj.name === this.pokemon.name);

  pokeFav.splice(pokeIdx, 1);
  console.log(pokeFav);
  // localStorage.removeItem("fav");
  localStorage.setItem("fav", JSON.stringify(pokeFav));
}
