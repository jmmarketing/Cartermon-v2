import { signupTemplate } from "./signupTemplate.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";
import * as controller from "../../controller.js";

class SignUpView {
  _startButton;
  _form;
  _avatarContainer;
  _difficultyContainer;
  _nameInput;
  _inputContainers;
  _allInputFields;

  userDetails = {
    name: "",
    avatar: "",
    difficulty: "",
    id: "",
    caught: [],

    pokeballs: 0,
    answers: 0,
  };

  constructor() {
    this.container = document.querySelector("body");
  }

  // Initiates page element variables & Sets eventlistners after DOM updated with render.
  _initSignUpBehavior() {
    this._setPageElements();
    this._applyEventListener();
  }

  // Sets page elements
  _setPageElements() {
    this._startButton = document.querySelector('[type="submit"]');
    this._form = document.querySelector(".signup-form");
    this._avatarContainer = document.querySelector(".signup-form--avatar");
    this._difficultyContainer = document.querySelector(
      ".signup-form--difficulty"
    );
    this._nameInput = document.querySelector(".signup-form--username");
    this._allInputFields = document.querySelectorAll("input");

    this._inputContainers = {
      name: this._nameInput,
      avatar: this._avatarContainer,
      difficulty: this._difficultyContainer,
    };
  }

  //Applies event listeners
  _applyEventListener() {
    this._startButton.addEventListener("click", this._getPlayerData.bind(this));
  }

  // Gets data from form via eventlistner on submit button & passes to
  // validation method.
  _getPlayerData(e) {
    e.preventDefault();

    const userData = new FormData(this._form);

    const rawData = {
      name: userData.get("name"),
      avatar: userData.get("avatar"),
      difficulty: userData.get("difficulty"),
    };

    this._validatePlayerData(rawData);
  }

  // Basic input validation (basically 'not empty' validation) & sends to setPlayerData
  _validatePlayerData(inputData) {
    console.log("Validating Inputs");

    let validData = true;

    for (const [key, value] of Object.entries(inputData)) {
      if (!value) {
        console.log(this._inputContainers);
        validData = false;
        this._inputContainers[key].classList.add("error");
      }
    }

    if (validData) {
      //Removes errors on parent container
      Object.values(this._inputContainers).forEach((container) => {
        container.classList.remove("error");
      });

      //Clears any value attributes on input
      this._allInputFields.forEach((input) => {
        input.value = "";
        input.checked = false;
      });

      this._setPlayerData(inputData);
    }
  }

  //Sets the player Data in view State (userDetails) & passes to controller for updating model.
  _setPlayerData(playerData) {
    console.log("Setting Player DATA!");
    // console.log(data);

    this.userDetails.id = Math.ceil(Math.random() * 1000000000);
    this.userDetails.pokeballs =
      playerData.difficulty == "easy"
        ? 5
        : playerData.difficulty == "normal"
        ? 3
        : 1;

    for (const [key, value] of Object.entries(playerData)) {
      this.userDetails[key] = value;
    }

    controller.handleNewSignUp(this.userDetails);
  }

  // Renders the page in DOM
  render(gameData) {
    // console.log(data);
    const nav = navbarComponent(gameData);

    this.container.innerHTML = nav + signupTemplate;
  }
}

export default new SignUpView();
