import { icons, avatars } from "../../../assets/game-assets.js";

export const playerCardComponent = (playerObj) => {
  return `
    <div class="player-card" data-id="${playerObj.id}">
        <div class="player-card__avatar-box">
              <img
                class="player-card__img"
                src="${avatars[playerObj.avatar]}"
                alt="${playerObj.name} Player"
              />
        </div>
        <p class="user-name">${playerObj.name}</p>
        <div class="player-card__pokeball-info">
              <p class="play-information">
                <span
                  ><img
                    src="${icons.pixelPokeball}"
                    alt="Pokeball"
                    class="player-card__pokeball-info--img"
                  />
                </span>
                X ${playerObj.pokeballs}
              </p>
        </div>
    </div>
    `;
};
