import { learnTemplate } from "./learnTemplate.js";
import { mathCardComponent } from "../../../components/mathCardComponent/mathCardComponent.js";
import * as controller from "../../controller.js";

class LearnView {
  _mathQuestionObj;
  _userAnswers = {
    correct: 0,
  };
  _currentPlayer;

  _questionsContainer;
  _messageBar;
  _submitBtn;
  _playAgainBtn;
  _allQuestionContainers;
  _mathForm;
  _allRadioAnswers;
  _successContainer;

  constructor() {
    this._container = document.querySelector("body");
  }

  _initiateElements() {
    this._questionsContainer = document.querySelector(
      ".learn__math-container--questions"
    );
    this._messageBar = document.querySelector(".info-bar__title p");
    this._submitBtn = document.querySelector("#check-answers");
    this._playAgainBtn = document.querySelector("#play-again");
    this._allQuestionContainers = document.querySelectorAll(".math-question");
    this._mathForm = document.querySelector(".learn__math-quiz");
    this._allRadioAnswers = document.querySelectorAll("input");
    this._successContainer = document.querySelector(
      ".learn__success-container"
    );

    //Handles updating UI to show gameModel Stats without a full model call.
    this._pokeCount = document.querySelector("#pokeball-count");
    this._answerCount = document.querySelector("#math-answers");

    //Apply Event Listeners
    this._submitBtn.addEventListener("click", this._checkAnswers.bind(this));
    this._playAgainBtn.addEventListener("click", this._resetMath.bind(this));
  }

  _checkAnswers() {
    //Takes all input elements, loops through and checks if inpue value = answer.
    this._allRadioAnswers.forEach((input) => {
      let isCorrect;
      console.log(input);

      input.classList.remove("wrong");
      if (input.checked) {
        // input.classList.remove("wrong");
        isCorrect = this._mathQuestionObj[input.name].answer === +input.value;
        input.checked = false;

        if (isCorrect) {
          input.classList.add("correct");
          //Update correct answers in view answers object.
          this._userAnswers.correct++;

          //Updates player answers in view current player state.
          this._currentPlayer.answers++;

          //Updates DOM element
          this._answerCount.innerText = `${this._currentPlayer.answers}`;
          document.querySelector(`#${input.name}`).disabled = true;
        } else {
          console.log("WRONG FIRED!");
          console.log(input);
          input.classList.add("wrong");
        }

        console.log(this._userAnswers);
        this._updateMessage();
        this._showSuccess();
      }
    });

    //Sends view player State to controller to update whole gameModel
    controller.updatePlayerDetails(this._currentPlayer);
  }

  _updateMessage(message) {
    if (!message)
      this._messageBar.innerText = `You have ${this._userAnswers.correct} correct. Try Again.`;
    else this._messageBar.innerText = message;
  }

  _showSuccess() {
    if (this._userAnswers.correct === 3) {
      //Updates styling of view elements
      this._submitBtn.classList.add("inactive");
      this._questionsContainer.classList.add("hide");
      this._successContainer.classList.remove("hide");

      //Updates view player State pokeball count.
      this._currentPlayer.pokeballs++;

      this._pokeCount.innerText = `X ${this._currentPlayer.pokeballs}`;

      //Sends view player State to controller to update gameModel
      controller.updatePlayerDetails(this._currentPlayer);

      // console.log(this._currentPlayer);
      this._resetAnswerCount();
      this._updateMessage(`You earned a Pokeball!`);

      // #############################
      //Going to need logic fo handling upading user state passed back to controller.
      // #############################
    }
  }

  _resetAnswerCount() {
    this._userAnswers.correct = 0;
  }

  _resetMath() {
    this._mathForm.innerHTML = "";

    // Gets new questions for Math cards from controller
    this._mathQuestionObj = controller.getNewMathQuestions();

    //Creates html of new math cards.
    const html = mathCardComponent(this._mathQuestionObj);

    //Updates DOM element with cards.
    this._mathForm.innerHTML = html;

    //Re-iniate elements and event listeners since DOM was cleared.
    // I think this is adding a 2second event listenr to the button, so it fires twice.
    //This would cause the first round to work but then clear right away?
    // this._initiateElements();
    this._allRadioAnswers = document.querySelectorAll("input");

    this._successContainer.classList.add("hide");
    this._questionsContainer.classList.remove("hide");
    this._submitBtn.classList.remove("inactive");

    this._updateMessage("Get all 3 correct to earn a Pokeball.");
  }

  render(gameModel, mathObj) {
    // console.log("Rendering LEARN.. gameModel passed =");
    // console.log(gameModel);
    this._mathQuestionObj = mathObj;
    this._currentPlayer = gameModel.player;
    this._container.innerHTML = learnTemplate(gameModel, mathObj);
    this._resetAnswerCount();
  }
}

export default new LearnView();
