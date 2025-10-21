import { formatID } from "../services/idFormatter.js";

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
  limit: 252, //151
};

//Basic Update of Player values (Might need updates, could be too simple)
export function _updateActivePlayer(userObj) {
  // const { name, avatar, difficulty, id, caught, pokeballs, answers } = data;
  console.log("_updateActivePlayer, userObj passed");
  // console.log(userObj);

  gameModel.player = userObj;

  console.log("UPDATE! 🗃 Current Game Model");
}

export function _setActivePlayer(id) {
  const playerID = +id;

  console.log("setActivePlayer => to Current Game Model");

  //Finds index of player in allPlayers
  const playerIndex = gameModel.allPlayers.findIndex(
    (player) => player.id === playerID
  );

  //Assigns selected player to variable
  const selectedPlayer = gameModel.allPlayers[playerIndex];
  console.log("setActivePlayer, to selectedPlayer in gameModel");

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

  console.log("Updated gameModel. ");
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

  const pokemon = localStorageData.pokemon || [];
  const allPlayersData = localStorageData.allPlayers || [];

  gameModel.pokemon = pokemon;
  gameModel.allPlayers = allPlayersData;
}

//Blanket update for whole gameModel to local storage.
export function _updateAllLocalStorage() {
  const gameModelJSON = JSON.stringify(gameModel);
  localStorage.setItem("gameModel", gameModelJSON);
}

export async function getRandomPokemon() {
  const pokemonId = Math.floor(Math.random() * gameModel.limit) + 1;

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
  if (gameModel.pokemon.length == gameModel.limit) {
    // console.log("Pokemon already in gameModel");
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
          types: pokemonDetails.types.map((type) => type.type.name),
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

    _updateAllLocalStorage();
  } catch (error) {
    console.log(error);
    console.error(`Uh-oh Something Happened: ${error} `);
  }
}

export async function _updatePokedexList() {
  for (const pokemon of gameModel.pokemon) {
    // console.log(`Updating: ${pokemon.name}`);
    pokemon.caught = gameModel.player.caught.includes(pokemon.name);
  }

  _updateAllLocalStorage();
}

export async function _getPokemonFullDetails(id) {
  try {
    const request = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!request.ok) throw new Error(`HTTP ${request.status}`);

    const rawDetails = await request.json();

    const formatName =
      rawDetails.name[0].toUpperCase() + rawDetails.name.slice(1);

    const pokemon = {
      name: formatName,
      id: formatID(rawDetails.id),
      // sprite: rawDetails.sprites.front_default,
      sprite: rawDetails.sprites.other.showdown.front_default,
      caught: gameModel.player.caught.includes(formatName), //check if breaks.
      types: rawDetails.types.map((type) => type.type.name),
      abilities: rawDetails.abilities
        .map((ability) => ability.ability.name)
        .slice(0, 2),
      height: rawDetails.height,
      weight: rawDetails.weight,
      hp: rawDetails.stats[0].base_stat,
      speed: rawDetails.stats[5].base_stat,
      attack: rawDetails.stats[1].base_stat,
      attack_special: rawDetails.stats[3].base_stat,
      defense: rawDetails.stats[2].base_stat,
      defense_special: rawDetails.stats[4].base_stat,
      // evolution:
    };

    return pokemon;
  } catch (error) {
    console.error(error);

    throw error;
  }
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
