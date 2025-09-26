import { exploreTemplate } from "./exploreTemplate.js";
import * as controller from "../../controller.js";

export class ExploreView {
  _currentPlayer;

  _catchButton;
  _pokemonScene;

  constructor() {
    this._container = document.querySelector("body");
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
    this._pokemonScene = document.querySelector(
      ".explore__game-container--pokemon"
    );

    this._pokemon = document.querySelector(
      ".explore__character"
    ).dataset.pokemon;

    // #### ASSIGN EVENT LISTNERS ###########

    this._catchButton.addEventListener("click", this._catchPokemon.bind(this));
  }

  _catchPokemon(e) {
    const target = e.target;
    const catchDisabled =
      target.classList.contains("caught") ||
      target.classList.contains("no-balls");

    //Catch state flag
    if (catchDisabled) return;

    console.log(this._pokemon);
    console.log(this._currentPlayer);
    this._pokemonScene.classList.add("hide");
    this._successScreen.classList.remove("hide");

    this._messageBar.innerText = "Good job!";
    this._currentPlayer.caught.push(this._pokemon);
    this._currentPlayer.pokeballs--;

    this._updatePlayerCard();
  }

  _updatePlayerCard() {
    this._caughtCount.innerText = this._currentPlayer.caught.length;
    this._pokeCount.innerText = `X ${this._currentPlayer.pokeballs}`;
  }

  render(gameModel, pokemon) {
    this._currentPlayer = gameModel.player;
    const html = exploreTemplate(gameModel, pokemon);

    this._container.innerHTML = html;
  }
}

export default new ExploreView();
