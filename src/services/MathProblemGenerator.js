//Psuedo Code
/*
- Math questions array [{mathQPropertiess}]
- Check difficulty level (sets max number - ex: 'hard = 500)
- Generate number 1, generate number 2, generate operator (+/-)
- If addition (order does not matter)
- If subtraction (largest first)
- Generate answer, with 3 close but incorrect (+10, +1, -2)
- Put info into question obj, push to MathQuestion Array. 
- Loop 3x


- User clicks "check answers"
- Compile answers from selection (each own radio button?) w/ data-identifier.
- Sends to controller to handleAnswerSubmission or check locally in view?
- Checks against mathQuestionsArray. 
- Determine # correct. 
- If less than all (3) correct, update view messaging, add correct/error classes for visual. 
- If all correct, update view messaging, show play-again UI. Update player stats, update local storage. 
- If click "play again?" Regenerate new math questions, update view UI. 

*/

export function generateMathQuestion(userObj) {
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
      const numDif = Math.ceil(Math.random() * 9);
      let choice = eval(`${qReference.answer} ${operation} ${numDif}`);

      choice < 0 ? (choice *= -1) : "";

      choices.push(choice);
    }
    qReference.choices = choices.sort(); //Converting to strings?
    questionNumber++;
  } while (questionNumber <= 3);

  return mathQuestions;
}
