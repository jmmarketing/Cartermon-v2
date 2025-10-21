import { pokedexTemplate } from "./pokedexTemplate.js";
import { pokemonCard } from "../../../components/pokemonCardComponent/pokemonCard.js";
import * as controller from "../../controller.js";
import { renderPokemonDetails } from "../../../components/pokemonDetailsComponent/pokemonDetails.js";

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
    this._searchField = document.querySelector(".pokedex__search");
    this._filterButtons = document.querySelectorAll('input[type="checkbox"]');
    this._clearFilter = document.querySelector("#clear-button");
    this._iniatePokedexCards();

    // Element Containers
    this._emptyDetails = document.querySelector(".pokemon-details__empty");
    this._pokemonDataContainer = document.querySelector(
      ".pokemon-details__data"
    );
    this._gridContainer = document.querySelector(".pokedex__grid");
    this._notFoundContainer = document.querySelector(".pokedex__empty");
    this._detailsErrorMessage = document.querySelector("#details-error");

    //Event listeners
    this._search.addEventListener("submit", this._searchPokemon.bind(this));
    // this._searchField.addEventListener("keyup", this._searchPokemon.bind(this));

    this._filterButtons.forEach((filter) =>
      filter.addEventListener("change", this._triggerFilterPokemon.bind(this))
    );
    this._clearFilter.addEventListener("click", this._clearFilters.bind(this));
  }

  // After pokedex grid if filtered/cleared need to re-declare the cards & add the
  // event listener for showing the details card.
  _iniatePokedexCards() {
    this._pokemonCards = document.querySelectorAll(".pokemon-card");
    this._pokemonCards.forEach((card) =>
      card.addEventListener("click", this._showPokemonDetails.bind(this))
    );
  }

  async _searchPokemon(e) {
    e.preventDefault();
    console.log("8. View Initiated - Searching....");
    const inputValue = this._searchField.value;

    console.log(`9. View search input: ${inputValue}`);
    try {
      const pokemon = await controller.fetchPokemonDetails(inputValue);
      this._searchField.value = "";
      console.log(`10. View: Pokemon Recieved: ${pokemon?.name}`);

      //Should be refactored into own function (also used in showPokemonDetails)
      const html = renderPokemonDetails(pokemon);

      console.log(`11. View rendering Details`);
      //Hid/Show empty / details elements
      this._emptyDetails.classList.add("hide");
      this._pokemonDataContainer.classList.remove("hide");
      this._pokemonDataContainer.innerHTML = "";

      this._pokemonDataContainer.innerHTML = html;
    } catch (error) {
      const message = `${inputValue}... <br> not found. <br> Search Again!`;
      this._detailsErrorMessage.innerText = "";
      this._detailsErrorMessage.innerHTML = message;

      this._emptyDetails.classList.remove("hide");
      this._pokemonDataContainer.classList.add("hide");

      console.log(`12. View caught error: ${error.message}`);
      console.log(`13. View error stack: ${error.stack}`);
      console.log(`NO POKEMON NAMED ${inputValue}`);
    }

    // console.log(inputValue);

    /*
    For live filtered searches as user types:
    - Loop through list (raw, filter). Use string.substring() on each item. 
    - Check if input.value is same as list item.substrtinc(value.length)
    - Push to list variable.
    - Build pokemonCard elements from list. 
    - Render elements to DOM

    - Will live filtering of pokemoncards be too resource intensive. Need lodash (debounce or throttle)?

    */
  }

  // Calls controller to get details from model (API) via target data-id
  // Renders data in details cards
  async _showPokemonDetails(e) {
    // Get Pokemon Details

    const pokeId = e.target.dataset?.id ?? e.target.parentElement.dataset.id;
    console.log(pokeId);

    const details = await controller.fetchPokemonDetails(pokeId);

    //Hid/Show empty / details elements
    this._emptyDetails.classList.add("hide");
    this._pokemonDataContainer.classList.remove("hide");

    // Render the details via component in details container.
    const html = renderPokemonDetails(details);
    this._pokemonDataContainer.innerHTML = "";

    this._pokemonDataContainer.innerHTML = html;
  }

  // Action for filtering pokemon (used on filterButtons)
  // Gets filter criteria and adds to filterList array.
  _triggerFilterPokemon(e) {
    const filterButton = e.target;

    filterButton.disabled = true; // in place so user HAS to use clear button.
    if (filterButton.value == "caught") this._filterCaught = true;
    else this._filterParams.push(filterButton.value);

    // Calls to compile all pokemon that match the filter
    this._compileFilteredList();
  }

  // Compiles pokemon from rawList that match filter criteria
  _compileFilteredList() {
    //Copies rawList to be maniupated wihout effecting rawList
    let results = [...this._rawList];

    //Condition whne there are no filter parameters
    if (this._filterParams.length > 0)
      results = this._rawList.filter((pokemon) => {
        return pokemon.types.some((type) => this._filterParams.includes(type));
      });

    //Condiiton when caught is true
    if (this._filterCaught) {
      results = results.filter((pokemon) => pokemon.caught);
    }

    // Assings manipulated list to filteredList to use when rendering to DOM
    this._filteredList = results;
    this._renderFiltered();
  }

  //Renders filteredList to the DOM
  _renderFiltered() {
    console.log("RENDERING FILETERED!");
    console.log(this._filteredList);
    console.log(`_filteredList length: ${this._filteredList.length}`);

    // Control for if there is no filterable pokemon
    if (this._filteredList.length == 0) {
      this._toggleNotFound();
      return;
    }

    // Creates HTML to be instered via pokemonCard component.
    const html = this._filteredList
      .map((pokemon) => pokemonCard(pokemon))
      .join("");

    // DOM updates
    this._gridContainer.innerHTML = "";

    this._gridContainer.innerHTML = html;

    // Reinitiates event listeners for pokemonCards
    this._iniatePokedexCards();

    // Acts as a catch if previous filter meets any of the controls in the function.
    this._toggleNotFound();
  }

  //Resets pokedex back to initiate DOM state.
  _reset() {
    //Rebuild pokemonCards from rawList in gameModel
    const html = this._rawList.map((pokemon) => pokemonCard(pokemon)).join("");

    this._gridContainer.innerHTML = "";

    this._gridContainer.innerHTML = html;

    this._iniatePokedexCards();

    // Updates grid if notFound is showing.
    this._toggleNotFound();
  }

  // Used as clearButton event.
  _clearFilters() {
    //Control state based off filterPArams and if filterCaught is true
    if (this._filterParams.length == 0 && !this._filterCaught) return;

    //Clears the properties of the filterButtons
    for (const input of this._filterButtons) {
      input.disabled = false;
      input.checked = false;
    }

    //Clears any filter lists, params, or caught
    this._filteredList = [];
    this._filterParams = [];
    this._filterCaught = false;

    //Triggers the reset.
    this._reset();
  }

  // Controls showing and hiding not-found(Snorlaxx) element
  _toggleNotFound() {
    console.log("Toggle Not Found FIRED");

    // Checks to see if snorlaxx is showing if it does not contain 'hide' then it is showing
    const notFoundShowing = !this._notFoundContainer.classList.contains("hide");
    console.log(`Snorlax is showing: ${notFoundShowing}`);

    //Condition if showing (simple).
    if (notFoundShowing) {
      this._gridContainer.classList.remove("hide");
      this._notFoundContainer.classList.add("hide");
      return;
    }

    // Condition based on list length, showing, and filter params.
    if (
      this._filteredList.length == 0 &&
      !notFoundShowing &&
      this._filterParams.length > 0
    ) {
      this._gridContainer.classList.add("hide");
      this._notFoundContainer.classList.remove("hide");
    }
  }

  // Renders the initial DOM
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

✅ BUG: 
- Need to create a function (model) that when user catches a pokemon
it updates the gameModel.pokemon to included updated caught pokemon.

TODO:
✅- Finish _renderFiltered with just type filter.
✅- Fix bug for caught and retest. 
✅- Build clearFilter function & reset function. 
- Search functionality
- Click and render pokemon details functionallity (evolution trickiest part)
- Show hide empty search (snorlax) function (toggle hide class)
- Loading feature

*/
