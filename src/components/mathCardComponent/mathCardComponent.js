/**
 *
 * @param {*} mathObj - Matth Question Object with 3 questions
 * @returns - A compiled set of Math Question Cards
 */
export const mathCardComponent = (mathObj) => {
  const questionsArray = [];

  for (const key of Object.keys(mathObj)) {
    // console.log(`${key}:`);
    // console.log(mathObj[key]);

    const { qnumber, operand, top, bottom, choices } = mathObj[key];

    const html = `
    <fieldset class="math-question" id="${key}">
        <p class="play-information">Question #${qnumber}</p>

        <!--Equation-->
        <div class="math-question__equation">
            <p class="math-question--operator math-equation">${operand}</p>
            <div class="math-question__numbers">
                <p class="math-equation math-question__numbers--top">${top}</p>
                <p class="math-equation math-question__numbers--bottom">
                      ${bottom}
                </p>
            </div>
        </div>

                <!-- Answers-->
                <div class="math-question__answers-block">

                ${choices
                  .map(
                    (choice, index) => ` <!--input-->
                  <label for="${key}a${
                      index + 1
                    }" class="math-question__answer">
                    <input type="radio" name="${key}" id="${key}a${
                      index + 1
                    }" value="${choice}" />
                    <p class="math-answer">${choice}</p>
                  </label>
                  <!--end input -->`
                  )
                  .join("")}
                 
                  
                </div>
     </fieldset>
    
    `;

    questionsArray.push(html);
  }

  const compiledHTML = questionsArray.join("");
  return compiledHTML;
};
