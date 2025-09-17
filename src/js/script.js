import { mathCardComponent } from "../components/mathCardComponent/mathCardComponent.js";

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

let mathQuestionObj = {
  q1: {
    qnumber: 1,
    operand: "+",
    top: 117,
    bottom: 117,
    answer: 234,
    choices: [234, 7, 25, 24],
  },
  q2: {
    qnumber: 2,
    operand: "+",
    top: 17,
    bottom: 10,
    answer: 27,
    choices: [7, 27, 11, 22],
  },
  q3: {
    qnumber: 3,
    operand: "-",
    top: 117,
    bottom: 100,
    answer: 17,
    choices: [17, 183, 447, 517],
  },
};

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

  let questionNumber = 1;
  while (questionNumber <= 3) {
    questionNumber++;

    /* Code */
  }
}

function render() {}
