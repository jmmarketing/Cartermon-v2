import { icons } from "../../../assets/game-assets.js";
import { formatID } from "../../services/idFormatter.js";

export const pokemonCard = (pokeObj) => {
  const { id, name, sprite, caught } = pokeObj;
  const formattedID = formatID(id);

  return `
    <div class="pokemon-card" data-id="${id}">
        <img src="${sprite}" alt="${name}" class="pokemon-card__sprite">
        <p class="rowdie-label">${name}</p>
        <p class="pokedex-value pokemon-card__id">#${formattedID}</p>
        <img src="${
          icons.pixelPokeball
        }" alt="Caught" class="pokemon-card__caught ${caught ? "" : "hide"}">
    </div>
    `;
};
