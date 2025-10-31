import router from "./router";
import homeView from "./views/homeView/homeView.js";
import signupView from "./views/signupView/signupView.js";
import continueView from "./views/continueView/continueView.js";
import mainView from "./views/mainView/mainView.js";
import learnView from "./views/learnView/learnView.js";
import exploreView from "./views/exploreView/exploreView.js";
import pokedexView from "./views/pokedexView/pokedexView.js";
import loadingView from "./views/loadingView/loadingView.js";

import { generateMathQuestion } from "../services/MathProblemGenerator.js";

import "core-js";
import "regenerator-runtime/runtime";

import * as model from "./model.js";

// #########################
// #### ROUTER / PAGE ######
// #########################

//Renders the Home Page
export async function showHome() {
  // console.log(model.gameModel);
  try {
    document.body.className = "home-page";
    await homeView.render();
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

//Renders the Signup Page & Sets eventListeners
export async function showSignup() {
  // console.log("showSignup -> Current gameModel:");
  // console.log(model.gameModel);
  try {
    document.body.className = "signup";

    //Renders Signuyp View
    await signupView.render(model.gameModel);

    //After DOM Loaded, assigns elements and event listeners
    signupView._initSignUpBehavior();
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

//Renders the continue Page
export async function showContinue() {
  loadingView.render();
  model._loadPokemonAndAllPlayersFromLS();

  //Check if any saved players, if not direct to /signup.
  const hasPlayers = model.gameModel.allPlayers.length > 0;
  if (!hasPlayers) router.navigateTo("/signup");

  // Render continue
  try {
    document.body.className = "continue";

    await continueView.render(model.gameModel);

    //After DOM Loaded initiate elements & event listeners
    continueView._initContinueBehavior();
  } catch (error) {
    console.log(error);
    console.error(`Failed to load page: ${error}`);
  }
}

// Renders the main poage
export async function showMain() {
  loadingView.render();
  // If no player route to /continue path.
  if (!model.gameModel.player.name) {
    router.navigateTo("/continue");
  }
  try {
    document.body.className = "main";

    await model._setPokedexListInfo();
    setTimeout(await mainView.render(model.gameModel), 5000);
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

//Renders the learn page
export async function showLearn() {
  // If no player route to /continue path.
  if (!model.gameModel.player.name) {
    router.navigateTo("/continue");
    return;
  }

  try {
    document.body.className = "math-game";
    //Generates initial questions for the learn Page
    const mathQuestions = generateMathQuestion(model.gameModel.player);

    await learnView.render(model.gameModel, mathQuestions);

    //After DOM Load iniate elements & event listeners
    learnView._initiateElements();
  } catch (error) {
    console.log(error);
    console.error(`Failed to load page: ${error}`);
  }
}

export async function showExplore() {
  // If no player route to /continue path.
  if (!model.gameModel.player.name) {
    router.navigateTo("/continue");
    return;
  }

  try {
    document.body.className = "explore-game";
    const pokemon = await model.getRandomPokemon();
    // console.log(pokemon);
    await exploreView.render(model.gameModel, pokemon);
    exploreView._initiateElements();
  } catch (error) {
    console.log(error);
    console.error(`Failed to load page: ${error}`);
  }
}

export async function showPokedex() {
  // If no player route to /continue path.
  if (!model.gameModel.player.name) {
    router.navigateTo("/continue");
    return;
  }
  loadingView.render();
  try {
    document.body.className = "pokedex-view";

    await model._updatePokedexList();
    await pokedexView.render(model.gameModel);
    pokedexView._initiateElements();
  } catch (error) {
    console.log(error);
    console.error(`Failed to load page: ${error}`);
  }
}

// #########################
// #### INTERACTIONS ######
// #########################

//Gets new Player Data from Signup, updates gameModel player (Active), adds player to All Players, & updates local storage with all gameModel, then redirects to /main
export function handleNewSignUp(playerData) {
  console.log("New Signup Passed to Controller");
  model._updateActivePlayer(playerData);
  model._updateAllPlayersData(playerData);

  // console.log("Current Game Model:");
  // console.log(model.gameModel);

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

export async function getNewPokemon() {
  const pokemon = await model.getRandomPokemon();
  return pokemon;
}

export async function fetchPokemonDetails(id) {
  const details = await model._getPokemonFullDetails(id);

  return details;
}

// Strictly for navigation from controller. Should not be used anywhere else.
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

function checkScreenSize() {
  const min_width = 1240;
  let resizeTimer;
  const warningDialog = document.querySelector(".width-warning");
  const viewWidth = document.querySelector(".width-warning__width");

  function showWarning() {
    const screen_size = window.innerWidth;
    if (screen_size < min_width) {
      viewWidth.textContent = `${screen_size}px`;
      warningDialog.showModal();
    } else warningDialog.close();
  }

  document.addEventListener("DOMContentLoaded", showWarning);

  window.addEventListener("resize", () => {
    //Basic Debounce method
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(showWarning, 250);
  });
}

function init() {
  router.init();
  setupGlobalNavigation();
  checkScreenSize();
}

init();
