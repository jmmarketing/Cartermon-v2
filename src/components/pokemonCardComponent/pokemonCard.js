import { icons } from "../../../assets/game-assets.js";

export const pokemonCard = (pokeObj) => {
  //Pokemon id
  //name
  //sprite
  const { id, name, sprite, caught } = pokeObj;

  return `
    <div class="pokemon-card" data-id="${id}">
        <img src="${sprite}" alt="${name}" class="pokemon-card__sprite">
        <p class="rowdie-label">${name}</p>
        <p class="pokedex-value pokemon-card__id">${id}</p>
        <img src="${
          icons.pixelPokeball
        }" alt="Caught" class="pokemon-card__caught ${caught ? "" : "hide"}">
    </div>
    `;
};
