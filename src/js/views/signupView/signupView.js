import { signupTemplate } from "./signupTemplate.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";

class SignUpView {
  _startButton;
  _form;

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
  }

  _applyEventListener() {
    this._startButton.addEventListener("click", this._getPlayerData);
  }

  _getPlayerData(e) {
    e.preventDefault();
    console.log("START!");
  }

  render(data) {
    console.log(data);
    console.log(this._form);
    const nav = navbarComponent(data);

    this.container.innerHTML = nav + signupTemplate;
  }
}

export default new SignUpView();
