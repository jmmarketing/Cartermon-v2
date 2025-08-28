import { signupTemplate } from "./signupTemplate.js";
import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";

class SignUpView {
  constructor() {
    this.container = document.querySelector("body");
  }

  render() {
    const nav = navbarComponent({ avatar: "girl1" });

    this.container.innerHTML = nav + signupTemplate;
  }
}

export default new SignUpView();
