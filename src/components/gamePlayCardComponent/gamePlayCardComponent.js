import { imgAssets } from "../../../assets/game-assets.js";

/**
 *
 * @param {*} string - 'pokedex' || 'learn' || 'explore'
 * @returns
 */

export const gamePlayCardComponent = (type) => {
  const configSettings = {
    pokedex: {
      name: "Pokedex",
      color: "red",
      text: "View all the Pokemon you have caught, and look up others you want to know more about.",
      cta: "view",
      image: imgAssets.pokedex,
      url: "/pokedex",
    },
    learn: {
      name: "Learn",
      color: "purple",
      text: "Earn Pokeballs by practicing your Math skills. Answer questions & get Pokeballs!",
      cta: "earn",
      image: imgAssets.backpack,
      url: "/learn",
    },

    explore: {
      name: "Explore",
      color: "blue",
      text: "Search for Pokemon in the wild. Capture them if you have a Pokeball.",
      cta: "search",
      image: imgAssets.pokeball,
      url: "/explore",
    },
  };

  return `
  <div class="gameplay-card gameplay-card--${configSettings[type].color}">
        <img
              src="${configSettings[type].image}"
              alt="Pokedex"
              class="gameplay-card__img"
        />
        <p class="play-information">${configSettings[type].name}</p>
        <p class="general-text">
              ${configSettings[type].text}
        </p>
        <a
              href="${configSettings[type].url}"
              class="play-information stat-${configSettings[type].color} gameplay-card__nav"
              >${configSettings[type].cta} >
        </a>
  </div>
  `;
};
