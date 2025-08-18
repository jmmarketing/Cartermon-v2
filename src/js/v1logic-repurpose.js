"use strict";

///////////////////////////////////////////
/////////------- Arrays & Objects ----------
const bgImages = [
  "./resources/images/forest_background.jpg",
  "./resources/images/field.jpg",
  "./resources/images/galar-scenery.png",
  "./resources/images/night.jpg",
  "./resources/images/training.jpg",
  "./resources/images/poke-background.webp",
];

///////////////////////////////////////////
/////////------- FUNCTIONS ----------

//############ Search Function ###############
// **** REFACTOR HIDE/SHow
function _searchPokemon(e) {
  e.preventDefault();

  // Saves Searched Value
  const pokeSearchValue = searchInput.value.toLowerCase();
  // Pulls LocalStore or Assigns Empty Array
  const localSaved = JSON.parse(localStorage.getItem("fav")) || [];

  // Hide Search Field and Show Loader
  searchElement.hidden = true;
  loader.hidden = false;

  // For Saved Pokemon & Creates card if Found
  if (localSaved.some((obj) => obj.name === pokeSearchValue)) {
    console.log("✔ FAVORITE POKEMON! -> In Favorite LocalStorage");
    this.pokemon = localSaved.find((obj) => obj.name === pokeSearchValue);

    console.log("🃏 CARD CREATED! -> From LocalStorage");
    console.log(this.pokemon);
    this._createPokeCard(this.pokemon);
  }
  // If not Saved Searches API
  else {
    console.log("❌ NOT A FAVORITE! -> Searching API");
    this._searchPokemonAPI(pokeSearchValue);
  }
}

// ####### Generates the Pokemon Card #########
//***** REFACTOR EVENT DELEGATION / SHOW HIDE
function _createPokeCard(object) {
  // Assign values to Results Card
  console.log("create", object);
  const cardHTML = `
    <div class="results">
          <div class="row" id="poke-name">
              <p>${object.name}</p>
              <p id="hp">${object.hp} HP</p>
              <img
                src="${
                  object.fav
                    ? "./resources/images/heartline-fill.png"
                    : "./resources/images/heartline.png"
                }"
                id="favorite"
                data-saved="${object.fav}"
              />
          </div>
          <div class="row" id="poke-image" style="background-image: url('${
            bgImages[Math.floor(Math.random() * 6)]
          }')">
             <img src="${object.img}" />
          </div>

          <div class="row" id="poke-stats">
            <div class="stats" id="stats1">
                <div id="attack">
                  <h6>attack</h6>
                  <p class="num">${object.attack}</p>
                </div>
                <div id="speed">
                  <h6>speed</h6>
                  <p class="num">${object.speed}</p>
                </div>
                <div id="defense">
                  <h6>defense</h6>
                  <p class="num">${object.defense}</p>
              </div>
            </div>

            <div class="stats" id="stats2">
                <div id="special-attack">
                  <h6>special attack</h6>
                  <p class="num">${object.special_attack}</p>
                </div>
                <div id="special-defense">
                  <h6>special defense</h6>
                  <p class="num">${object.special_defense}</p>
                </div>
            </div>
        </div>
    </div>
`;
  // *** Refactor for Event Delegation and Hide
  setTimeout(() => {
    loader.hidden = true;
    resetButton.hidden = false;
    container.insertAdjacentHTML("afterbegin", cardHTML);
    heart = document.querySelector("#favorite"); //Need to move to here because HTML does not exist prior
    heart.addEventListener("mouseenter", this._hoverFav); // Same as above
    heart.addEventListener("mouseleave", this._hoverOutFav);
    heart.addEventListener("click", this._toggleFav.bind(this));
  }, 3000);
}

// ####### Resets Search & Card #########
function _resetSearch() {
  searchInput.value = "";
  resetButton.hidden = true;
  searchElement.hidden = false;
  searchInput.focus();
  errorMessage.hidden = true;
  document.querySelector(".results").remove();
}
