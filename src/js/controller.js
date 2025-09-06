import router from "./router";
import homeView from "./views/homeView/homeView.js";
import signupView from "./views/signupView/signupView.js";
import continueView from "./views/continueView/continueView.js";

import "core-js";
import "regenerator-runtime/runtime";

import * as model from "./model.js";

const testData = {
  name: "jeffrey",
  avatar: "boy3",
  difficulty: "hard",
  id: 637759389,
  caught: [],

  pokeballs: 17,
  answers: 0,
};

//Renders the Home Page
export async function showHome() {
  // console.log(model.gameModel);
  try {
    document.body.className = "home-page";
    await homeView.render();
    model._loadPokemonAndAllPlayersFromLS();
    console.log("Local Storage Compiled & Loaded into gameModel: ");
    console.log(model.gameModel);

    // console.log("-------------");
    // model._updateAllPlayersData(testData);
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

//Renders the Signup Page & Sets eventListeners
export async function showSignup() {
  console.log("showSignup -> Current gameModel:");
  console.log(model.gameModel);
  try {
    document.body.className = "signup";

    await signupView.render(model.gameModel.player);
    signupView._initSignUpBehavior();
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

export async function showContinue() {
  console.log("showContinue -> Current gameModel:");
  console.log(model.gameModel);
  try {
    document.body.className = "continue";

    await continueView.render(model.gameModel);
    // signupView._initSignUpBehavior();
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

//Gets new Player Data from Signup, updates gameModel player (Active), adds player to All Players, & updates local storage with all gameModel, then redirects to /main
export function handleNewSignUp(playerData) {
  console.log("New Signup Passed to Controller");
  model._updateActivePlayer(playerData);
  model._updateAllPlayersData(playerData);

  console.log("Current Game Model:");
  console.log(model.gameModel);

  localStorage.setItem("gameModel", JSON.stringify(model.gameModel));

  router.navigateTo("/main");
}

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
