import { imgAssets } from "../../../assets/game-assets.js";

export class widthWarning {
  _html;
  constructor() {
    this._container = document.querySelector("body");
  }
  remove() {
    console.log("GOOD TO GO!");
  }
  show() {
    console.log("Screen is too small!");
  }
}

export default new widthWarning();
