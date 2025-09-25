import { exploreTemplate } from "./exploreTemplate.js";
import * as controller from "../../controller.js";

export class ExploreView {
  _currentPlayer;

  constructor() {
    this._container = document.querySelector("body");
  }

  render(gameModel, pokemon) {
    this._currentPlayer = gameModel.player;
    const html = exploreTemplate(gameModel, pokemon);

    this._container.innerHTML = html;
  }
}

export default new ExploreView();
