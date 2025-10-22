import { homeTemplate } from "./homeTemplate.js";

class HomeView {
  constructor() {
    this.container = document.querySelector("#game-container");
  }

  render() {
    const template = homeTemplate;

    this.container.innerHTML = template;

    // this._updateNavigationLinks();
  }

  //   _updateNavigationLinks() {
  //     const signupLinks = document.querySelectorAll('a[href*="signup"]');
  //     signupLinks.forEach((link) => {
  //       link.setAttribute("data-nav", "/signup");
  //       link.removeAttribute("href");
  //     });
  //   }
}

export default new HomeView();
