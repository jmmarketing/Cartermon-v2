import { icons, sprites } from "../../../assets/game-assets.js";

export const renderPokemonDetails = (pokemon = {}) => {
  /*
sprite ✅
id (formatted) -- meed logic
caught status -- need logic ✅
name ✅
types [array] -- need logic for class & element creation ✅
abilities [array] -- need logic for element creation ✅
height ✅
weight ✅
hp ✅
speed ✅
attack ✅
attack-special ✅
defense ✅
defense-special ✅
evolution (name, sprite) [array of {}] - logic for creation
*/

  const {
    name = null,
    id = null,
    caught = null,
    sprite = null,
    types = [],
    abilities = [],
    height = null,
    weight = null,
    hp = null,
    speed = null,
    attack = null,
    defense = null,
    attack_special = null,
    defense_special = null,
  } = pokemon;

  return `

<!--Pokemon Img-->
            <img
              src="${sprite}"
              alt="${name}"
              class="pokemon-details__sprite"
            />
            <!--Pokemon #003-->
            <p class="pokedex-value pokemon-details__id">#${id}</p>
            <!-- Pokemon caught icon | hidden by default-->
            <img
              src="${icons.pixelPokeball}"
              alt="Caught"
              class="pokemon-details__caught ${caught ? "" : "hide"}"
            />
            <!--Pokemon Name-->
            <p class="rowdie-title">${name}</p>
            <!--Pokemon Type Container-->
            <div class="pokemon-details__type">
                ${types
                  .map(
                    (type) =>
                      `<p class="pokemon-details__type--${type}">${type}</p>`
                  )
                  .join("")}

            </div>
            <!--Pokemon Abilities Container-->
            <div class="pokemon-details__abilities">
              <p class="rowdie-label">Abilities</p>
              ${abilities
                .map(
                  (
                    ability
                  ) => `<p class="pokedex-value pokemon-details__abilities--text">
                ${ability}
              </p>`
                )
                .join("")}
            </div>
            <!--Pokemon Height & Weight-->
            <div class="pokemon-details__attributes">
              <div class="pokemon-details__attributes--height">
                <p class="rowdie-label">Height</p>
                <p
                  class="pokedex-value pokemon-details__attributes--text"
                  id="height"
                >
                  ${height}
                </p>
              </div>
              <div class="pokemon-details__attributes--weight">
                <p class="rowdie-label">Weight</p>
                <p
                  class="pokedex-value pokemon-details__attributes--text"
                  id="weight"
                >
                  ${weight} lbs
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
                <p class="pokedex-value" id="hp">${hp}</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.speed}"
                  alt="Speed"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="speed">${speed}</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.attack}"
                  alt="Attack"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="attack">${attack}</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.attackSpecial}"
                  alt="Special Attack"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="attack-special">${attack_special}</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.defense}"
                  alt="Defense"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="defense">${defense}</p>
              </div>
              <!-- end skill -->
              <!-- skill -->
              <div class="pokemon-details__skills--skill">
                <img
                  src="${icons.defenseSpecial}"
                  alt="Defense Special"
                  class="pokemon-details__skills--icon"
                />
                <p class="pokedex-value" id="defense-special">${defense_special}</p>
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

`;
};
