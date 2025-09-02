import router from "./router";
import homeView from "./views/homeView/homeView.js";
import signupView from "./views/signupView/signupView.js";

import "core-js";
import "regenerator-runtime/runtime";

import { gameModel } from "./model.js";

//Renders the Home Page
export async function showHome() {
  // Example
  try {
    document.body.className = "home-page";
    await homeView.render();
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

//Renders the Signup Page & Sets eventListeners
export async function showSignup() {
  try {
    document.body.className = "signup";

    await signupView.render(gameModel.player);
    signupView._initSignUpBehavior();
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

export function handleNewSignUp(data) {
  console.log("New Signup Passed to Controller");
  console.log(data);
}

export async function showContinue() {}
export async function showMain() {}
export async function showPokedex() {}
export async function showLearn() {}
export async function showExplore() {}

function setupGlobalNavigation() {
  document.addEventListener("click", (e) => {
    if (
      e.target.matches("[data-nav]") ||
      e.target.parentElement.matches("[data-nav]")
    ) {
      e.preventDefault();
      const path =
        e.target.getAttribute("data-nav") ??
        e.target.parentElement.getAttribute("data-nav");
      router.navigateTo(path);
    }
  });
}

function init() {
  router.init();
  setupGlobalNavigation();
}

init();
