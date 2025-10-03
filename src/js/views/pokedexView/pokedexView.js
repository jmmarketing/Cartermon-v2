import { pokedexTemplate } from "./pokedexTemplate.js";

export class PokedexView {
  constructor() {
    this.container = document.querySelector("body");
  }

  render(gameModel) {
    const html = pokedexTemplate(gameModel);

    this.container.innerHTML = html;
  }
}

export default new PokedexView();
