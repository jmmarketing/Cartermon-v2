import { imgAssets, avatars } from "../../../assets/game-assets.js";

export const navbarComponent = (data = {}) => {
  let avatarLink = "";

  console.log("navBarComponent compiling.....");

  if (data.avatar) {
    avatarLink = `
    
        <a href="/main" data-nav="/main"
          ><img
            class="navigation__icon"
            src="${avatars[data.avatar]}"
            alt="User Avatar"
        /></a>
 `;
  }

  return `
    <nav class="navigation">
      <a href="/" data-nav="/"
        ><img
          class="navigation__logo"
          src="${imgAssets.logo}"
          alt="Cartermon Logo"
      /></a>
      <div class="navigation__icon-container">
      ${avatarLink}

        <a href="/pokedex" data-nav="/pokedex"
          ><img
            class="navigation__icon"
            src="${imgAssets.pokedex}"
            alt="Pokedex Icon"
        /></a>
        <a href="/learn" data-nav="/learn"
          ><img
            class="navigation__icon"
            src="${imgAssets.backpack}"
            alt="Backpack Icon (Learn)"
        /></a>
        <a href="/explore" data-nav="/explore"
          ><img
            class="navigation__icon"
            src="${imgAssets.pokeball}"
            alt="Explore Icon"
        /></a>
      </div>
    </nav>
    
    
    `;
};
