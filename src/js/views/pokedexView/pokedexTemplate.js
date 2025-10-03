import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";

import { pokemonCard } from "../../../components/pokemonCardComponent/pokemonCard.js";

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
            <p class="play-information">Select a <br />Pokemon</p>
          </div>
<!-- End Empty State-->

 <!-- DATA -->
          <div class="pokemon-details__data hide">
            <!--Pokemon Img-->
            <img
              src="${sprites.squirtle}"
              alt="Squirtle"
              class="pokemon-details__sprite"
            />
            <!--Pokemon #003-->
            <p class="pokedex-value pokemon-details__id">#003</p>
            <!-- Pokemon caught icon | hidden by default-->
            <img
              src="${icons.pixelPokeball}"
              alt="Caught"
              class="pokemon-details__caught"
            />
            <!--Pokemon Name-->
            <p class="rowdie-title">Squirtle</p>
            <!--Pokemon Type Container-->
            <div class="pokemon-details__type">
              <p class="pokemon-details__type--water">Water</p>
              <p class="pokemon-details__type--electric">Electric</p>
            </div>
            <!--Pokemon Abilities Container-->
            <div class="pokemon-details__abilities">
              <p class="rowdie-label">Abilities</p>
              <p class="pokedex-value pokemon-details__abilities--text">
                Torrent
              </p>
              <p class="pokedex-value pokemon-details__abilities--text">
                rain-dish
              </p>
            </div>
            <!--Pokemon Height & Weight-->
            <div class="pokemon-details__attributes">
              <div class="pokemon-details__attributes--height">
                <p class="rowdie-label">Height</p>
                <p
                  class="pokedex-value pokemon-details__attributes--text"
                  id="height"
                >
                  5
                </p>
              </div>
              <div class="pokemon-details__attributes--weight">
                <p class="rowdie-label">Weight</p>
                <p
                  class="pokedex-value pokemon-details__attributes--text"
                  id="weight"
                >
                  90 lbs
                </p>
              </div>
            </div>
            <!--Pokemon SWkills Container-->
            <div class="pokemon-details__skills">
              <p class="rowdie-label">Skills</p>
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.heart}"
                  alt="HP"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="hp">44</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.speed}"
                  alt="HP"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="speed">144</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.attack}"
                  alt="HP"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="attack">17</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.attackSpecial}"
                  alt="HP"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="attack-special">34</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.defense}"
                  alt="HP"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="defense">51</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.defenseSpecial}"
                  alt="HP"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="defense-special">108</p>
              </div>
              <!-- end skill -->
            </div>

            <!--Pokemon Evolution-->
            <div class="pokemon-details__evolution">
              <p class="rowdie-label">Evolution</p>
              <img
                src="${sprites.squirtle}"
                alt="Squritle"
                class="pokemon-details__evolution--stage"
              />
              <img
                src="${sprites.bulbasaur}"
                alt="Squritle"
                class="pokemon-details__evolution--stage"
              />
              <img
                src="${sprites.pikachu}"
                alt="Squritle"
                class="pokemon-details__evolution--stage"
              />
            </div>
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
              <img src="./assets/sprite/snorlax.webp" alt="Snorlax Empty">
              <p class="play-information">No Pokemon Found. <br> Try Again.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    
    `;
};
