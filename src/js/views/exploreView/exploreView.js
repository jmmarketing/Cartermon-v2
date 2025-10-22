import { exploreTemplate } from "./exploreTemplate.js";
import * as controller from "../../controller.js";
import { backgrounds } from "../../../../assets/game-assets.js";

export class ExploreView {
  _currentPlayer;

  //   _catchButton;
  //   _sceneContainer;

  constructor() {
    this._container = document.querySelector("#game-container");
  }

  _initiateElements() {
    this._messageBar = document.querySelector(".info-bar__title p");
    //Handles updating UI to show gameModel Stats without a full model call.
    this._pokeCount = document.querySelector("#pokeball-count");
    this._caughtCount = document.querySelector("#caught-count");

    this._catchButton = document.querySelector("#catch");
    this._searchButtons = document.querySelectorAll("#search-pokemon");
    this._homeButton = document.querySelector("#go-home");

    this._successScreen = document.querySelector(
      ".explore__game-container--success"
    );
    this._pokemonSceneContainer = document.querySelector(
      ".explore__game-container--pokemon"
    );

    this._screenContainer = document.querySelector(
      ".explore__game-container--screen"
    );

    this._gameContainer = document.querySelector(".explore__game-container");

    this._pokemon = document.querySelector(".explore__character");
    this._scene = document.querySelector(".explore__scene");
    this._successText = document.querySelector(
      ".explore__game-container--success p"
    );

    // #### ASSIGN EVENT LISTNERS ###########

    this._catchButton.addEventListener("click", this._catchPokemon.bind(this));
    this._searchButtons.forEach((btn) =>
      btn.addEventListener("click", this._resetExplore.bind(this))
    );
  }

  _catchPokemon(e) {
    const target = e.target;
    const catchDisabled =
      target.classList.contains("caught") ||
      target.classList.contains("no-balls");

    //Catch state flag
    if (catchDisabled) return;

    // console.log(this._pokemon);
    // console.log(this._currentPlayer);
    this._showCaughtUI();

    this._currentPlayer.caught.push(this._pokemon.dataset.pokemon);
    this._currentPlayer.pokeballs--;
    this._updatePlayerCard();

    controller.updatePlayerDetails(this._currentPlayer);
  }

  _updatePlayerCard() {
    this._caughtCount.innerText = this._currentPlayer.caught.length;
    this._pokeCount.innerText = `X ${this._currentPlayer.pokeballs}`;
  }

  _showCaughtUI() {
    this._pokemonSceneContainer.classList.add("hide");
    this._successScreen.classList.remove("hide");

    this._messageBar.innerText = "Good job!";
    this._catchButton.classList.add("caught");
    this._catchButton.innerText = "caught";
  }

  async _resetExplore() {
    const newPokemon = await controller.getNewPokemon();

    const html = exploreTemplate(
      { player: this._currentPlayer },
      newPokemon,
      "scene"
    );

    this._gameContainer.innerHTML = html;

    this._initiateElements();
  }

  render(gameModel, pokemon) {
    this._currentPlayer = gameModel.player;
    const html = exploreTemplate(gameModel, pokemon);

    this._container.innerHTML = html;
  }
}

export default new ExploreView();
