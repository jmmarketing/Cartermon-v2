import { icons } from "../../../assets/game-assets.js";

export const pokemonCard = (pokeObj) => {
  //Pokemon id
  //name
  //sprite

  return `
    <div class="pokemon-card" data-id="3">
        <img src="./assets/sprite/squirtle.webp" alt="Squirtle" class="pokemon-card__sprite">
        <p class="rowdie-label">Squirtle</p>
        <p class="pokedex-value pokemon-card__id">#003</p>
        <img src="${icons.pixelPokeball}" alt="Caught" class="pokemon-card__caught hide">
    </div>
    `;
};
