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
    this._messageBar = document.querySelector(".learn__title p");
    this._submitBtn = document.querySelector(".learn__button--check");
    this._playAgainBtn = document.querySelector(".learn__button--play-again");
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
    this._allRadioAnswers.forEach((input) => {
      let isCorrect;
      input.classList.remove("wrong");

      if (input.checked) {
        isCorrect = this._mathQuestionObj[input.name].answer === +input.value;
        input.checked = false;

        if (isCorrect) {
          input.classList.add("correct");
          this._userAnswers.correct++;
          this._currentPlayer.answers++;
          this._answerCount.innerText = `${this._currentPlayer.answers}`;
          document.querySelector(`#${input.name}`).disabled = true;

          controller.updatePlayerDetails(this._currentPlayer);
        } else {
          input.classList.add("wrong");
        }

        console.log(this._userAnswers);
        this._updateMessage();
        this._showSuccess();
      }
    });
  }

  _updateMessage(message) {
    if (!message)
      this._messageBar.innerText = `You have ${this._userAnswers.correct} correct. Try Again.`;
    else this._messageBar.innerText = message;
  }

  _showSuccess() {
    if (this._userAnswers.correct === 3) {
      this._submitBtn.classList.add("inactive");
      this._questionsContainer.classList.add("hide");
      this._successContainer.classList.remove("hide");
      this._currentPlayer.pokeballs++;

      this._pokeCount.innerText = `X ${this._currentPlayer.pokeballs}`;

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

    this._mathQuestionObj = controller.getNewMathQuestions();
    const html = mathCardComponent(this._mathQuestionObj);
    this._mathForm.innerHTML = html;

    this._initiateElements();

    this._successContainer.classList.add("hide");
    this._questionsContainer.classList.remove("hide");
    this._submitBtn.classList.remove("inactive");

    this._updateMessage("Get all 3 correct to earn a Pokeball.");
  }

  render(gameModel, mathObj) {
    console.log("Rendering LEARN.. gameModel passed =");
    console.log(gameModel);
    this._mathQuestionObj = mathObj;
    this._currentPlayer = gameModel.player;
    this._container.innerHTML = learnTemplate(gameModel, mathObj);
    this._resetAnswerCount();
  }
}

export default new LearnView();
