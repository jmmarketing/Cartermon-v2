import { pokedexTemplate } from "./pokedexTemplate.js";
import { pokemonCard } from "../../../components/pokemonCardComponent/pokemonCard.js";

export class PokedexView {
  // _rawList;
  // _filteredList;
  // _filterParams;
  _filterCaught = false;

  constructor() {
    this._filteredList = [];
    this._filterParams = [];
    this._rawList = [];
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
    this._filterButtons.forEach((filter) =>
      filter.addEventListener("change", this._triggerFilterPokemon.bind(this))
    );
    this._clearFilter.addEventListener("click", this._clearFilters.bind(this));

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

  _triggerFilterPokemon(e) {
    const filterButton = e.target;
    filterButton.disabled = true; // in place so user HAS to use clear button.
    if (filterButton.value == "caught") this._filterCaught = true;
    else this._filterParams.push(filterButton.value);

    this._compileFilteredList();
  }

  _compileFilteredList() {
    let results = this._rawList;

    if (this._filterParams.length > 0)
      results = this._rawList.filter((pokemon) => {
        return pokemon.types.some((type) => this._filterParams.includes(type));
      });

    if (this._filterCaught) {
      results = results.filter((pokemon) => pokemon.caught);
    }

    this._filteredList = results;
    this._renderFiltered();
  }

  _renderFiltered() {
    console.log("RENDERING FILETERED!");
    console.log(this._filteredList);
    const html = this._filteredList
      .map((pokemon) => pokemonCard(pokemon))
      .join("");
    this._gridContainer.innerHTML = "";

    this._gridContainer.innerHTML = html;
  }

  _reset() {
    const html = this._rawList.map((pokemon) => pokemonCard(pokemon)).join("");
    this._gridContainer.innerHTML = "";

    this._gridContainer.innerHTML = html;
  }

  _clearFilters() {
    for (const input of this._filterButtons) {
      input.disabled = false;
      input.checked = false;
    }

    this._filteredList = [];

    this._reset();
  }

  render(gameModel) {
    const html = pokedexTemplate(gameModel);
    this._rawList = [...gameModel.pokemon];

    this.container.innerHTML = html;

    console.log("RAW LIST:");
    console.log(this._rawList);
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


10/13
IN PROGRESS:
- Basic filter working for capturing filter params & setting caught filter flag 
(_triggerFilterPokemon & _filterCaught = false).
- _compileFilterList function. uses .filer, .some, .include on rawList &
_fiterParams to compile type based filtering. 
- _compileFilterList has bug with filteringt for caught. 
- _renderFiltered() calling console.log for now. 

BUG: 
- Need to create a function (model) that when user catches a pokemon
it updates the gameModel.pokemon to included updated caught pokemon.

TODO:
- Finish _renderFiltered with just type filter.
- Fix bug for caught and retest. 
- Build clearFilter function & reset function. 
- Search functionality
- Click and render pokemon details functionallity (evolution trickiest part)
- Show hide empty search (snorlax) function (toggle hide class)
- Loading feature

*/
