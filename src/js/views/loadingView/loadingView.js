import { imgAssets } from "../../../../assets/game-assets.js";

export class loadingView {
  constructor() {
    this.container = document.querySelector("#game-container");
  }

  render() {
    const html = `
        <div class="loading">
            <img src="${imgAssets.loading}" alt="Loading Image">
            <p class="play-information">Loading...</p>
        </div>
        `;
    this.container.innerHTML = "";
    this.container.innerHTML = html;
  }
}

export default new loadingView();
