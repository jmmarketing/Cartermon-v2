import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";

import { pokemonCard } from "../../../components/pokemonCardComponent/pokemonCard.js";

import { renderPokemonDetails } from "../../../components/pokemonDetailsComponent/pokemonDetails.js";

import { icons, sprites } from "../../../../assets/game-assets.js";

export const pokedexTemplate = (gameModel) => {
  return `
    ${navbarComponent(gameModel)}
        <main>
      <section class="pokedex">

<!-- #########################-->
<!-- Side Pokemon Details Card-->

        <div class="pokemon-details">
 <!-- Empty State-->
          <div class="pokemon-details__empty ">
            <p class="play-information" id="details-error">Select or <br />Search for <br />a Pokemon</p>
          </div>
<!-- End Empty State-->

 <!-- DATA -->
          <div class="pokemon-details__data hide">
            ${renderPokemonDetails()};
          </div>
        </div>

<!-- End Pokemon Details Card -->
<!-- #########################-->


        <div class="pokedex__container">

 <!-- Search Field -->
          <form>
              <input class="pokedex__search" name="pokemon-search" placeholder="Search Pokemon">
            </input>
            <button alt="Search Button" class="pokedex__search--btn"></button>
        </form>
          <!-- End Search Field -->
          <div class="pokedex__display">

 <!-- Filter Component-->
            <div class="pokedex__filter">
              <p class="play-label">Filter</p>

              <!--Type filter checkbox-->
              <div class="pokedex__filter--type pokedex__filter--caught">
                <input type="checkbox" name="type" id="caught" value="caught">
                <label for="caught" title="Caught Pokemon">
                  <img src="${
                    icons.pixelPokeball
                  }" alt="Caught" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="fighting" value="fighting">
                <label for="fighting" title="Fighting type">
                  <img src="${
                    icons.fighting
                  }" alt="fighting" class="pokedex__filter--icon">
                </label>
              </div>

                 <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="normal" value="normal">
                <label for="normal" title="Normal type">
                  <img src="${
                    icons.normal
                  }" alt="normal" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="fire" value="fire">
                <label for="fire" title="Fire type">
                  <img src="${
                    icons.fire
                  }" alt="fire" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="water" value="water">
                <label for="water" title="Water type">
                  <img src="${
                    icons.water
                  }" alt="water" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="electric" value="electric">
                <label for="electric" title="Electric type">
                  <img src="${
                    icons.electric
                  }" alt="electric" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="grass" value="grass">
                <label for="grass" title="Grass type">
                  <img src="${
                    icons.grass
                  }" alt="grass" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="ice" value="ice">
                <label for="ice" title="Ice type">
                  <img src="${
                    icons.ice
                  }" alt="ice" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="poison" value="poison">
                <label for="poison" title="Poison type">
                  <img src="${
                    icons.poison
                  }" alt="poison" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="ground" value="ground">
                <label for="ground" title="Ground type">
                  <img src="${
                    icons.ground
                  }" alt="ground" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="flying" value="flying">
                <label for="flying" title="Flying type">
                  <img src="${
                    icons.flying
                  }" alt="flying" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="psychic" value="psychic">
                <label for="psychic" title="Psychic type">
                  <img src="${
                    icons.psychic
                  }" alt="psychic" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="bug" value="bug">
                <label for="bug" title="Bug type">
                  <img src="${
                    icons.bug
                  }" alt="bug" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="rock" value="rock">
                <label for="rock" title="Rock type">
                  <img src="${
                    icons.rock
                  }" alt="rock" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="ghost" value="ghost">
                <label for="ghost" title="Ghosttype">
                  <img src="${
                    icons.ghost
                  }" alt="ghost" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="dragon" value="dragon">
                <label for="dragon" title="Dragon type">
                  <img src="${
                    icons.dragon
                  }" alt="dragon" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="dark" value="dark">
                <label for="dark" title="Dark type">
                  <img src="${
                    icons.dark
                  }" alt="dark" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="steel" value="steel">
                <label for="steel" title="Steel type">
                  <img src="${
                    icons.steel
                  }" alt="steel" class="pokedex__filter--icon">
                </label>
              </div>

                <!--Type filter checkbox-->
              <div class="pokedex__filter--type">
                <input type="checkbox" name="type" id="fairy" value="fairy">
                <label for="fairy" title="Fairy type">
                  <img src="${
                    icons.fairy
                  }" alt="fairy" class="pokedex__filter--icon">
                </label>
              </div>

<!-- END TYPES-->
              <button class="pokedex__filter--clear" id="clear-button">Clear</button>
            </div>



<!-- End Filter Component-->

<!-- Pokemon Grid Layout-->
            <div class="pokedex__grid">

            
<!--Pokemon Card-->
              ${gameModel.pokemon
                .map((pokemon) => pokemonCard(pokemon))
                .join("")}
<!--END Pokemon Card-->
             

            </div>

            <!-- No Pokemon Message-->
            <div class="pokedex__empty hide">
              <img src="${sprites.snorlax}" alt="Snorlax Empty">
              <p class="play-information">No Pokemon Found. <br> Try Again.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    
    `;
};
