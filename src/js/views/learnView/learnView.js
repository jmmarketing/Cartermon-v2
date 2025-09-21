import { learnTemplate } from "./learnTemplate.js";
import { mathCardComponent } from "../../../components/mathCardComponent/mathCardComponent.js";
import * as controller from "../../controller.js";

class LearnView {
  _mathQuestionObj;
  _userAnswers = {
    correct: 0,
  };
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

    //Apply Event Listeners
    this._submitBtn.addEventListener("click", this._checkAnswers.bind(this));
    this._playAgainBtn.addEventListener("click", this._resetMath.bind(this));
  }

  _checkAnswers() {
    console.log("BUTTON CLICK!");
    this._allRadioAnswers.forEach((input) => {
      let isCorrect;
      input.classList.remove("wrong");

      if (input.checked) {
        isCorrect = this._mathQuestionObj[input.name].answer === +input.value;
        input.checked = false;

        if (isCorrect) {
          input.classList.add("correct");
          this._userAnswers.correct++;
          document.querySelector(`#${input.name}`).disabled = true;
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

    const html = mathCardComponent({
      //Place holder object
      name: "jeffrey",
      avatar: "boy3",
      difficulty: "easy",
      id: 637759389,
      caught: [],

      pokeballs: 17,
      answers: 34,
    });
    this._mathForm.innerHTML = html;

    this._initiateElements();

    this._successContainer.classList.add("hide");
    this._questionsContainer.classList.remove("hide");
    this._submitBtn.classList.remove("inactive");

    this._resetAnswerCount();
    this._updateMessage("Get all 3 correct to earn a Pokeball.");
  }

  render(gameModel, mathObj) {
    console.log("Rendering LEARN.. gameModel passed =");
    console.log(gameModel);
    this._mathQuestionObj = mathObj;
    this._container.innerHTML = learnTemplate(gameModel, mathObj);
  }
}

export default new LearnView();
