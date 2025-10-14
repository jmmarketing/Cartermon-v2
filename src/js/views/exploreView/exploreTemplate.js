import { backgrounds, imgAssets } from "../../../../assets/game-assets.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";
import { playerCardComponent } from "../../../components/playerCardComponent/playerCardComponent.js";
import { infoBarComponent } from "../../../components/infoBarComponent/infoBarComponent.js";

/**
 *
 * @param {*} gameModel - Object of model.gameModel
 * @param {*} pokemonObj - Pokemon specifc object from Fetch in model
 * @param {*} render - string -> 'full' || 'scene'
 * @returns
 */

export const exploreTemplate = (gameModel, pokemonObj, render = "full") => {
  const bgIndex = Math.floor(Math.random() * backgrounds.length);
  console.log("Background Index: " + bgIndex);
  const scene = backgrounds[bgIndex];

  const caught = gameModel.player.caught.includes(pokemonObj.name);
  const pokeballCount = gameModel.player.pokeballs;

  const {
    name,
    sprites: { front_default: spriteImg },
    sprites: {
      other: {
        showdown: { front_default: spriteGif },
      },
    },
  } = pokemonObj;

  const formattedName = name[0].toUpperCase() + name.slice(1);

  if (render == "full") {
    return `
    
    ${navbarComponent(gameModel)}
    <main>
      <section class="explore">
        ${playerCardComponent(gameModel.player, { cardSize: "main" })}

        <!-- This stays in template-->
        <div class="explore__game-container">
          
        ${infoBarComponent({
          name,
          page: "explore",
          caught,
          pokeballs: pokeballCount,
        })}

          <div class="explore__game-container--screen">
            <!-- MAIN EXPLORE SCREEN-->
            <div class="explore__game-container--pokemon">
              <img
                src="${scene}"
                class="explore__scene"
                alt="Scene Background"
              />
              <img
                src="${spriteGif}"
                class="explore__character"
                data-pokemon="${formattedName}"
                alt="${name}"
              />
            </div>

            <!-- SUCCESS SCREEN-->
            <div class="explore__game-container--success hide">
              <img src="${imgAssets.pokeball}" alt="Pokeball" />
              <p class="play-information">You caught a ${name}!</p>
              <div class="explore__game-container--success-button-group">
                <button
                  class="info-bar__button--search play-information"
                  id="search-pokemon"    
                >
                  search
                </button>

                <button
                  data-nav="/main"
                  class="info-bar__button--home play-information"
                  id="go-home"
                >
                  Go Home
                </button>
              </div>
            </div>
            <!--END SUCCESS SCREEN-->
          </div>
        </div>
      </section>
    </main>
    
    
    
    `;
  }

  if (render == "scene") {
    return `

      ${infoBarComponent({
        name,
        page: "explore",
        caught,
        pokeballs: pokeballCount,
      })}

          <div class="explore__game-container--screen">
            <!-- MAIN EXPLORE SCREEN-->
    <div class="explore__game-container--pokemon">
              <img
                src="${scene}"
                class="explore__scene"
                alt="Scene Background"
              />
              <img
                src="${spriteGif}"
                class="explore__character"
                data-pokemon="${formattedName}"
                alt="${name}"
              />
            </div>

            <!-- SUCCESS SCREEN-->
            <div class="explore__game-container--success hide">
              <img src="${imgAssets.pokeball}" alt="Pokeball" />
              <p class="play-information">You caught a ${name}!</p>
              <div class="explore__game-container--success-button-group">
                <button
                  class="info-bar__button--search play-information"
                  id="search-pokemon"    
                >
                  search
                </button>

                <button
                  data-nav="/main"
                  class="info-bar__button--home play-information"
                  id="go-home"
                >
                  Go Home
                </button>
              </div>
            </div>
            <!--END SUCCESS SCREEN-->
    
    `;
  }
};
