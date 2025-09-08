import { continueTemplate } from "./continueTemplate.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";
import * as controller from "../../controller.js";

class ContiueView {
  _playerCards;

  constructor() {
    this.container = document.querySelector("body");
  }

  _initContinueBehavior() {
    this._playerCards = document.querySelectorAll(".player-card");
    console.log(this._playerCards);

    this._playerCards.forEach((element) =>
      element.addEventListener("click", this._getAndSendPlayerID)
    );
  }

  _getAndSendPlayerID() {
    const playerId = this.dataset.id;
    console.log("This is player: " + playerId);
    controller.handleContinuePlay(playerId);
  }

  render(gameData) {
    const players = gameData.allPlayers;
    const nav = navbarComponent();

    this.container.innerHTML = nav + continueTemplate(players);
  }
}

export default new ContiueView();
