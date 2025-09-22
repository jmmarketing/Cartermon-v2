import router from "./router";
import homeView from "./views/homeView/homeView.js";
import signupView from "./views/signupView/signupView.js";
import continueView from "./views/continueView/continueView.js";
import mainView from "./views/mainView/mainView.js";
import learnView from "./views/learnView/learnView.js";

import { generateMathQuestion } from "../services/MathProblemGenerator.js";

import "core-js";
import "regenerator-runtime/runtime";

import * as model from "./model.js";

// const testData = {
//   name: "jeffrey",
//   avatar: "boy3",
//   difficulty: "hard",
//   id: 637759389,
//   caught: [],

//   pokeballs: 17,
//   answers: 34,
// };
// #########################
// #### ROUTER / PAGE ######
// #########################

//Renders the Home Page
export async function showHome() {
  // console.log(model.gameModel);
  try {
    document.body.className = "home-page";
    await homeView.render();

    //Pulls LS players
    // model._loadPokemonAndAllPlayersFromLS();
    // console.log("Local Storage Compiled & Loaded into gameModel: ");
    // console.log(model.gameModel);

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

    await signupView.render(model.gameModel);
    signupView._initSignUpBehavior();
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

export async function showContinue() {
  console.log("showContinue -> Current gameModel:");
  console.log(model.gameModel);
  console.log("Getting allPlayers from LocalStorage:");
  model._loadPokemonAndAllPlayersFromLS();

  //Check if any saved players, if not direct to /signup.
  const hasPlayers = model.gameModel.allPlayers.length > 0;
  if (!hasPlayers) router.navigateTo("/signup");

  // Render continue
  try {
    document.body.className = "continue";

    await continueView.render(model.gameModel);
    continueView._initContinueBehavior();
    // signupView._initSignUpBehavior();
  } catch (error) {
    console.log(error);
    console.error(`Failed to load page: ${error}`);
  }
}

export async function showMain() {
  console.log("showMain -> Current gameModel:");
  console.log(model.gameModel);
  try {
    document.body.className = "main";

    await mainView.render(model.gameModel);
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

export async function showLearn() {
  const mathQuestions = generateMathQuestion(model.gameModel.player);
  console.log("showLearn -> Current gameModel:");
  console.log(model.gameModel);
  try {
    document.body.className = "math-game";
    console.log(model.gameModel);
    await learnView.render(model.gameModel, mathQuestions);
    learnView._initiateElements();
  } catch (error) {
    console.log(error);
    console.error(`Failed to load page: ${error}`);
  }
}

export async function showPokedex() {}

export async function showExplore() {}

// #########################
// #### INTERACTIONS ######
// #########################

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

export function handleContinuePlay(id) {
  model._setActivePlayer(id);
  router.navigateTo("/main");
}

export function getGameModel() {
  return model.gameModel;
}

export function updatePlayerDetails(playerObj) {
  model._updateActivePlayer(playerObj);
  model._updateAllPlayersData(playerObj);
}

export function getNewMathQuestions() {
  // This probably could be handled in the learView, but since it requires passing in the gameModel I want to keep it in the controller & avoid storing/mutating the gameModel in the view.
  const newQuestions = generateMathQuestion(model.gameModel.player);
  return newQuestions;
}

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
