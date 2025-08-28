import { signupTemplate } from "./signupTemplate.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";

class SignUpView {
  constructor() {
    this.container = document.querySelector("body");
  }

  render() {
    const nav = `
    <nav class="navigation">
      <a href="/" data-nav="/"
        ><img
          class="navigation__logo"
          src="./assets/logo/logo.webp"
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
            src="./assets/img/pokedex.png"
            alt="Pokedex Icon"
        /></a>
        <a href="/learn" data-nav="/learn"
          ><img
            class="navigation__icon"
            src="./assets/img/backpack.webp"
            alt="Backpack Icon (Learn)"
        /></a>
        <a href="/explore" data-nav="/explore"
          ><img
            class="navigation__icon"
            src="./assets/img/pokeball.webp"
            alt="Explore Icon"
        /></a>
      </div>
    </nav>
    `;

    this.container.innerHTML = nav + signupTemplate;
  }
}

export default new SignUpView();
