import { mainTemplate } from "./mainTemplate.js";

class MainView {
  constructor() {
    this.container = document.querySelector("body");
  }

  render(gameModel) {
    this.container.innerHTML = mainTemplate(gameModel);
  }
}

export default new MainView();
