import { imgAssets, icons } from "../../../assets/game-assets";

export const navbarComponent = () => {
  return `
    <nav class="navigation">
      <a href="/" data-nav="/"
        ><img
          class="navigation__logo"
          src="${imgAssets.logo}"
          alt="Cartermon Logo"
      /></a>
      <div class="navigation__icon-container">
        <a href="/main" data-nav="/main"
          ><img
            class="navigation__icon"
            src="./assets/avatars/girl1.webp"
            alt="User Avatar"
        /></a>
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
