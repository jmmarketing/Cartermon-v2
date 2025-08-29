import { signupTemplate } from "./signupTemplate.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";

class SignUpView {
  _startButton;
  _form;
  _avatarContainer;
  _difficultyContainer;
  _nameInput;

  userDetails = {
    name: "",
    avatar: "",
    difficulty: "",
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
  }

  _applyEventListener() {
    this._startButton.addEventListener("click", this._getPlayerData.bind(this));
  }

  _getPlayerData(e) {
    e.preventDefault();

    const userData = new FormData(this._form);

    const name = userData.get("username");
    const avatar = userData.get("avatar");
    const difficulty = userData.get("difficulty");

    // for (const [key, value] of userData) {
    //   console.log(key, value);
    // }

    console.log(name);
    console.log(avatar);
    console.log(difficulty);
    this._validatePlayerData(name, avatar, difficulty);
  }

  _validatePlayerData(name, avatar, difficulty) {
    console.log("Validate!");
    console.log(this._nameInput);
    if (!name) this._nameInput.classList.add("error");
    if (!avatar) this._avatarContainer.classList.add("error");
    if (!difficulty) this._difficultyContainer.classList.add("error");
  }

  render(data) {
    console.log(data);
    const nav = navbarComponent(data);

    this.container.innerHTML = nav + signupTemplate;
  }
}

export default new SignUpView();
