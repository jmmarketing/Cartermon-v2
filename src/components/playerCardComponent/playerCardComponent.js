import { icons, avatars } from "../../../assets/game-assets.js";

/**
 *
 * @param {*} playerData - Active player data (gameModel.player)
 * @param {*} config - {cardsize: 'mini' || 'main}
 * @returns
 */
export const playerCardComponent = (
  playerData,
  config = { cardSize: "mini" }
) => {
  const { cardSize } = config;

  console.log("playerCardComponent compiling...");
  // console.log(cardSize);
  // console.log(cardSize === "main");

  // if (cardSize != "main" || cardSize != "mini") cardSize = "mini";

  const miniHTML = `
        <div class="player-card__avatar-box">
              <img
                class="player-card__img"
                src="${avatars[playerData.avatar]}"
                alt="${playerData.name} Player"
              />
        </div>
        <p class="user-name">${playerData.name}</p>
        <div class="player-card__info-title">
              
                <span
                  ><img
                    src="${icons.pixelPokeball}"
                    alt="Pokeball"
                    class="player-card__info-title--img"
                  />
                </span>
                <p class="play-information" id="pokeball-count">X ${
                  playerData.pokeballs
                }</p>
              
        </div>
    
    `;

  const mainHTML = `
    <div class="player-card__info-title">
      <p class="user-title">Pokemon Caught</p>
    </div>
    <p class="rowdie-stat stat-blue">${playerData.caught.length}</p>

    <div class="player-card__info-title">
        <p class="user-title">Math Questions</p>
    </div>
    <p class="rowdie-stat stat-purple" id="math-answers">${playerData.answers}</p>
    
    `;

  // console.log(cardSize);

  const template = `
    <div class="player-card player-card--${cardSize}" data-id="${
    playerData.id
  }">
    ${miniHTML}
    ${cardSize === "main" ? mainHTML : ""}
    </div>
    
    `;

  return template;
};
