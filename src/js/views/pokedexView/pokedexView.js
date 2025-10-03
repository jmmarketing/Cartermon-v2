import { pokedexTemplate } from "./pokedexTemplate.js";

export class PokedexView {
  constructor() {
    this.container = document.querySelector("body");
  }

  _initiateElements() {
    // Event trigger elements
    this._search = document.querySelector("form");
    this._filterButtons = document.querySelectorAll('input[type="checkbox"]');
    this._clearFilter = document.querySelector("#clear-button");
    this._pokemonCards = document.querySelectorAll(".pokemon-card");

    // Element Containers
    this._emptyDetails = document.querySelector(".pokemon-details__empty");
    this._pokemonDataContainer = document.querySelector(
      ".pokemon-details__data"
    );
    this._gridContainer = document.querySelector(".pokedex__grid");

    //Event listeners
    this._search.addEventListener("submit", this._searchPokemon.bind(this));
    this._pokemonCards.forEach((card) =>
      card.addEventListener("click", this._showPokemonDetails)
    );

    console.log("Initated Elements");
    // console.log(this._filterButtons);
  }

  _searchPokemon(e) {
    e.preventDefault();
    console.log("Searching....");
  }

  _showPokemonDetails() {
    console.log("Getting Details..");
    const pokeId = this.dataset.id;
    console.log(pokeId);
  }

  _filterPokemon() {}

  _reset() {}

  render(gameModel) {
    const html = pokedexTemplate(gameModel);

    this.container.innerHTML = html;
  }
}

export default new PokedexView();

/*

Psuedo Code:
Declare/Initiate Elements
Calling individual pokemon and rendering in data column


Create Component for:
filter Icons
Search bar

Notes: 
When grabbing pokemonList in model, does it make sense to determine caught status in
cardComponent instead. This way can push to local storage and not need to call and compare on /main.

Will need to determine best approach for re-initializing cards after filer/search.

*/
