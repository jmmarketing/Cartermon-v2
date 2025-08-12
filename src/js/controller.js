import router from "./router";

import "core-js";
import "regenerator-runtime/runtime";

export async function showHome() {
  // Example
  try {
    countdownView._destoryTimer();
    document.body.className = "home-page";
    await homeView.render();
    countdownView._startTimer();
  } catch (error) {
    console.error(`Failed to load page: ${error}`);
  }
}

export async function showSignup() {
  //   try {
  //     countdownView._destoryTimer();
  //     document.body.className = "signup";
  //     await signupView.render();
  //     countdownView._startTimer();
  //     formView._initFormBehavior();
  //   } catch (error) {
  //     console.error(`Failed to load page: ${error}`);
  //   }
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
