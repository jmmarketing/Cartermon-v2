import { icons, avatars } from "../../../assets/game-assets.js";

export const playerCardComponent = (
  playerData,
  config = { cardSize: "mini" }
) => {
  const { cardSize } = config;

  if (cardSize !== "main") cardSize = "mini";

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
              <p class="play-information">
                <span
                  ><img
                    src="${icons.pixelPokeball}"
                    alt="Pokeball"
                    class="player-card__info-title--img"
                  />
                </span>
                X ${playerData.pokeballs}
              </p>
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
    <p class="rowdie-stat stat-purple">${playerData.answers}</p>
    
    `;

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
