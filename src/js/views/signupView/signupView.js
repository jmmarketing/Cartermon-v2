import { signupTemplate } from "./signupTemplate.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";

class SignUpView {
  _startButton;
  _form;
  _avatarContainer;
  _difficultyContainer;
  _nameInput;
  _inputContainers;

  userDetails = {
    name: "",
    avatar: "",
    difficulty: "",
    id: "",
    stats: {
      pokeballs: 0,
      answers: 0,
    },
  };

  constructor() {
    this.container = document.querySelector("body");
  }

  _initSignUpBehavior() {
    this._setPageElements();
    this._applyEventListener();
  }

  _setPageElements() {
    this._startButton = document.querySelector('[type="submit"]');
    this._form = document.querySelector(".signup-form");
    this._avatarContainer = document.querySelector(".signup-form--avatar");
    this._difficultyContainer = document.querySelector(
      ".signup-form--difficulty"
    );
    this._nameInput = document.querySelector(".signup-form--username");

    this._inputContainers = {
      name: this._nameInput,
      avatar: this._avatarContainer,
      difficulty: this._difficultyContainer,
    };
  }

  _applyEventListener() {
    this._startButton.addEventListener("click", this._getPlayerData.bind(this));
  }

  _getPlayerData(e) {
    e.preventDefault();

    const userData = new FormData(this._form);

    const rawData = {
      name: userData.get("username"),
      avatar: userData.get("avatar"),
      difficulty: userData.get("difficulty"),
    };

    this._validatePlayerData(rawData);
  }

  _validatePlayerData(obj) {
    console.log("Validating Inputs");

    let validData = true;

    for (const [key, value] of Object.entries(obj)) {
      if (!value) {
        console.log(this._inputContainers);
        validData = false;
        this._inputContainers[key].classList.add("error");
      }
    }

    if (validData) {
      Object.values(this._inputContainers).forEach((container) => {
        container.classList.remove("error");
        container.value = "";
      });

      this._setPlayerData(obj);
    }
  }

  _setPlayerData(data) {
    console.log("Setting Player DATA!");
  }

  render(data) {
    console.log(data);
    const nav = navbarComponent(data);

    this.container.innerHTML = nav + signupTemplate;
  }
}

export default new SignUpView();
