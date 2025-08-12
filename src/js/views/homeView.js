import { homeTemplate, homeFooter } from "../../../templates/homeTemplate.js";

class HomeView {
  constructor() {
    this.container = document.querySelector("body");
  }

  render() {
    const template = homeTemplate + homeFooter;

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
