import { icons } from "../../../assets/game-assets.js";

export const pokemonCard = (pokeObj) => {
  const { id, name, sprite, caught } = pokeObj;
  let formatID;

  if (id < 10) {
    formatID = `00${id}`;
  } else if (id >= 10 && id <= 99) {
    formatID = `0${id}`;
  } else {
    formatID = id;
  }

  return `
    <div class="pokemon-card" data-id="${id}">
        <img src="${sprite}" alt="${name}" class="pokemon-card__sprite">
        <p class="rowdie-label">${name}</p>
        <p class="pokedex-value pokemon-card__id">#${formatID}</p>
        <img src="${
          icons.pixelPokeball
        }" alt="Caught" class="pokemon-card__caught ${caught ? "" : "hide"}">
    </div>
    `;
};
