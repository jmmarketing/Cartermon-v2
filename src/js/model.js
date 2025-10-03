// ORganizing Old function that could be use for model.

export const gameModel = {
  player: {
    name: null,
    avatar: "",
    difficulty: "",
    id: "",
    pokeballs: 3,
    answers: 0,
    caught: [],
  },
  pokemon: [],
  allPlayers: [],
  limit: 17, //151
};

//Basic Update of Player values (Might need updates, could be too simple)
export function _updateActivePlayer(userObj) {
  // const { name, avatar, difficulty, id, caught, pokeballs, answers } = data;
  console.log("_updateActivePlayer, userObj passed");
  // console.log(userObj);

  gameModel.player = userObj;

  console.log("UPDATE! 🗃 Current Game Model");
  // console.log(gameModel);
}

export function _setActivePlayer(id) {
  const playerID = +id;
  // console.log("Player ID is: " + playerID);
  // console.log("ID is a: " + typeof playerID);
  console.log("setActivePlayer => to Current Game Model");
  // console.log(gameModel);

  //Finds index of player in allPlayers
  const playerIndex = gameModel.allPlayers.findIndex(
    (player) => player.id === playerID
  );

  console.log("Player Index: " + playerIndex);
  //Assigns selected player to variable
  const selectedPlayer = gameModel.allPlayers[playerIndex];
  console.log("setActivePlayer, to selectedPlayer in gameModel");
  // console.log(selectedPlayer);

  // Passes selected player to update gameModel
  _updateActivePlayer(selectedPlayer);
}

//Checks to see if player exists in gameModel.allPlayers, if not push.
// If so, updage player in allPlayers, then update LocalStorage
export function _updateAllPlayersData(playerData) {
  const userID = playerData.id;
  const playerExistsInDB = gameModel.allPlayers.find(
    (player) => player.id == userID
  );

  if (!playerExistsInDB) gameModel.allPlayers.push(playerData);
  else {
    const playerIndex = gameModel.allPlayers.findIndex(
      (player) => player.id == userID
    );

    console.log("Found Index: " + playerIndex);

    gameModel.allPlayers[playerIndex] = playerData;
  }

  console.log("Updated gameModel: ");
  console.log(gameModel);
  console.log("Updating Local Storage....");
  _updateAllLocalStorage();
}

// Loads all Players and Pokemon from Local Storage
// Used for /continue page & pokemon look up (tbd)
export function _loadPokemonAndAllPlayersFromLS() {
  //Check --> if first time, creates local storage.
  if (!localStorage.getItem("gameModel"))
    localStorage.setItem("gameModel", JSON.stringify(gameModel));

  const rawLocalStorageData = localStorage.getItem("gameModel");
  const localStorageData = JSON.parse(rawLocalStorageData);
  // console.log("Raw: " + rawLocalStorageData);
  // console.log("Parse: " + localStorageData);

  const pokemon = localStorageData.pokemon || [];
  const allPlayersData = localStorageData.allPlayers || [];

  // console.log("Pokemon: " + pokemon);
  // console.log("All Players: " + allPlayersData);

  gameModel.pokemon = pokemon;
  gameModel.allPlayers = allPlayersData;

  // console.log(gameModel);
}

//Blanket update for whole gameModel to local storage.
export function _updateAllLocalStorage() {
  const gameModelJSON = JSON.stringify(gameModel);
  localStorage.setItem("gameModel", gameModelJSON);
}

// PSUEDO CODE 9-3-25
/*
-- ANY Page Load (not / or /continue or /singup)
  + Check player -> if name: null direct to /Continue page

-- New Signup:
  + Add player details to player
  + Add player to allPlayers. 
  + Update LocalStorage

-- Continue Page:
  + Pull allPlayers from LocalStorage
  + Loop over & create cards for UX
  + Selected Player pushed to Player property
  + Redirect to /Main. 














*/

export async function getRandomPokemon() {
  const pokemonId = Math.floor(Math.random() * gameModel.limit) + 1;
  console.log(pokemonId);

  try {
    const pokeRequest = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    if (!pokeRequest.ok)
      throw new Error(`HTTP ${pokeRequest.status}: ${pokeRequest.statusText}`);

    const pokemon = await pokeRequest.json();
    return pokemon;
  } catch (error) {
    console.log(error);
    console.error(error);
  }
}

// Loads on the main page, after continue selection. This way we
// can use the player.caught to determine if caught. When player
// Selects card from pokedex, we do anohter call to load side data.
export async function _setPokedexListInfo() {
  if (gameModel.pokemon.length) {
    console.log("Pokemon already in gameModel");
    return;
  }

  try {
    const request = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${gameModel.limit}`
    );

    if (!request.ok)
      throw new Error(
        `Failed to fetch Pokemon List ${request.status}: ${request.statusText}`
      );

    const { results: list } = await request.json();

    // Individual Pokemon Promise/Fetch Loop
    const compilePokemonBasicDetails = list.map(async (pokemon) => {
      try {
        const pokemonRaw = await fetch(pokemon.url);

        if (!pokemonRaw.ok) {
          throw new Error(`HTTP ${pokemonRaw.status}`);
        }

        const pokemonDetails = await pokemonRaw.json();
        return {
          name:
            pokemonDetails.name[0].toUpperCase() + pokemonDetails.name.slice(1),
          id: pokemonDetails.id,
          sprite: pokemonDetails.sprites.front_default,
          caught: gameModel.player.caught.includes(pokemonDetails.name), //check if breaks.
        };
      } catch (error) {
        console.warn(`Failed to load ${pokemon.name}: ${error}`);
        return null;
      }
    });
    //End Individual Pokemon Promise/fetch loop
    const results = await Promise.all(compilePokemonBasicDetails);

    const pokemonList = results.filter((pokemon) => pokemon !== null);

    gameModel.pokemon = [...pokemonList];

    console.log("Get Basic Pokedex List Called");
    console.log(gameModel);
  } catch (error) {
    console.log(error);
    console.error(`Uh-oh Something Happened: ${error} `);
  }
}

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
