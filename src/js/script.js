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
    operand: "+",
    top: 117,
    bottom: 117,
    answer: 234,
    choices: [234, 7, 25, 24],
  },
  q2: {
    operand: "+",
    top: 17,
    bottom: 10,
    answer: 27,
    choices: [7, 27, 11, 22],
  },
  q3: {
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

submitBtn.addEventListener("click", function () {
  allRadioAnswers.forEach((input) => {
    let isCorrect;

    input.classList.remove("wrong");

    if (input.checked) {
      isCorrect = mathQuestionObj[input.name].answer === +input.value;
      console.log(`Correct: ${isCorrect}`);
      input.checked = false;

      if (isCorrect) {
        input.classList.add("correct");
        userAnswers.correct++;
        document.querySelector(`#${input.name}`).disabled = true;
      } else {
        input.classList.add("wrong");
      }

      console.log(userAnswers);
    }
  });
});

function updateMessage() {}
function clearChecked() {}
function showSuccess() {}
