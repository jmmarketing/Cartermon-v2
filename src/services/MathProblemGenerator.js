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

class MathProblemsServices {}

export default new MathProblemsServices();
