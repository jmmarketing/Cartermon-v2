import { learnTemplate } from "./views/learnView/learnTemplate.js";
import * as model from "./model.js";

let mathQuestionObj = generateMathQuestion({
  name: "jeffrey",
  avatar: "boy3",
  difficulty: "normal",
  id: 637759389,
  caught: [],

  pokeballs: 17,
  answers: 34,
});

let userAnswers = {
  correct: 0,
};
/*
-Generate Math Questions = 
{
q1:{
    operand: '+ -',
    top: number,
    bottom: number,
    answer: number,
    choices: [answer, wrong, wrong, wrong]
},
q2:{},
q3:{}
}


Creates Math Question Cards-
- Loops through questions Object. Creates math card for each question.
- Randomize answer display. 
- Add appropriate attributes to input (name, id, value)

On Submit-
- Loop through selected answers. 
- If correct add (correct class & disable fieldset?), if wrong add (wrong class) 
- Record/store correct number of questions. (view State?)
- Update Message element to reflect number correct. 

- If all 3 correct, show pokeball screen & update player stat of pokeball & questions.
- Disable Check answers button. 
- Play-again button regenerates math questions. 

- If any incorrect. 

*/
const container = document.querySelector("body");

render(model.gameModel, mathQuestionObj);

const questionsContainer = document.querySelector(
  ".learn__math-container--questions"
);
const messageBar = document.querySelector(".learn__title p");
const submitBtn = document.querySelector(".learn__button--check");
const playAgainBtn = document.querySelector(".learn__button--play-again");
const allQuestionContainers = document.querySelectorAll(".math-question");
const mathForm = document.querySelector(".learn__math-quiz");
const allRadioAnswers = document.querySelectorAll("input");

const successContainer = document.querySelector(".learn__success-container");

submitBtn.addEventListener("click", checkAnswers);

function checkAnswers() {
  allRadioAnswers.forEach((input) => {
    let isCorrect;
    input.classList.remove("wrong");

    if (input.checked) {
      isCorrect = mathQuestionObj[input.name].answer === +input.value;
      input.checked = false;

      if (isCorrect) {
        input.classList.add("correct");
        userAnswers.correct++;
        document.querySelector(`#${input.name}`).disabled = true;
      } else {
        input.classList.add("wrong");
      }

      console.log(userAnswers);
      updateMessage();
      showSuccess();
    }
  });
}

function updateMessage() {
  messageBar.innerText = `You have ${userAnswers.correct} correct. Try Again.`;
}
// function clearChecked() {}
function showSuccess() {
  if (userAnswers.correct === 3) {
    submitBtn.classList.add("inactive");
    questionsContainer.classList.add("hide");
    successContainer.classList.remove("hide");

    messageBar.innerText = `You earned a Pokeball!`;

    //Going to need logic fo handling upading user state passed back to controller.
  }
}
function resetMath() {}

function generateMathQuestion(userObj) {
  //Check difficulty and set parameters
  //Loop 3 times (for loop / do..while)
  // Generate operand (+/-)
  // Generate number 1
  // Generate number 2
  // If addition: set numbers to object
  // If subtraction: set bigger number to obj1 and other to obj2
  // Set answer in obj & push to choices array
  // If chocies array.length < 4 -> generate other choice and push to array

  // Easy -> Max = 20. Second number max -> Max - first number
  // Medium -> max = 99. Second number max -> max - first number
  // Hard -> max = 999. Second number max -> max - first number

  const mathQuestions = {
    q1: {},
    q2: {},
    q3: {},
  };

  let maxNumber;
  switch (userObj.difficulty) {
    case "easy":
      maxNumber = 20;
      break;
    case "normal":
      maxNumber = 99;
      break;
    case "hard":
      maxNumber = 999;
      break;
    default:
      maxNumber = 99;
  }

  let questionNumber = 1;
  do {
    const qReference = mathQuestions[`q${questionNumber}`];

    const operand = ["+", "-"][Math.round(Math.random())];
    const numberOne = Math.floor(Math.random() * maxNumber);
    const numberTwo = Math.floor(Math.random() * (maxNumber - numberOne));
    const choices = [];

    qReference.qnumber = questionNumber;
    qReference.operand = operand;

    if (operand == "+") {
      qReference.top = numberOne;
      qReference.bottom = numberTwo;
      qReference.answer = eval(`${numberOne} + ${numberTwo}`);
      choices.push(qReference.answer);
    }

    if (operand == "-") {
      qReference.top = Math.max(numberOne, numberTwo);
      qReference.bottom = Math.min(numberOne, numberTwo);
      qReference.answer = eval(`${qReference.top} - ${qReference.bottom}`);
      choices.push(qReference.answer);
    }

    for (let i = 0; i < 3; i++) {
      const operation = ["+", "-"][Math.round(Math.random())];
      const numDif = Math.round(Math.random() * 10);
      const choice = eval(`${qReference.answer} ${operation} ${numDif}`);

      choices.push(choice);
    }
    qReference.choices = choices.sort(); //Converting to strings?
    questionNumber++;
  } while (questionNumber <= 3);

  return mathQuestions;
}

function render(gameModel, mathObj) {
  container.innerHTML = learnTemplate(gameModel, mathObj);
}
