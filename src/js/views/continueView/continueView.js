import { continueTemplate } from "./continueTemplate.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";

class ContiueView {
  constructor() {
    this.container = document.querySelector("body");
  }

  render(gameData) {
    const players = gameData.allPlayers;
    const nav = navbarComponent(gameData.player);

    this.container.innerHTML = nav + continueTemplate(players);
  }
}

export default new ContiueView();
