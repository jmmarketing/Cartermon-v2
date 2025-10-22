import { mainTemplate } from "./mainTemplate.js";

class MainView {
  constructor() {
    this.container = document.querySelector("#game-container");
  }

  render(gameModel) {
    this.container.innerHTML = mainTemplate(gameModel);
  }
}

export default new MainView();
