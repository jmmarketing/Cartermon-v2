export const mathCardComponent = (mathObj) => {
  return;

  `
    <fieldset class="math-question" id="q1">
                <p class="play-information">Question #1</p>

                <!--Equation-->
                <div class="math-question__equation">
                  <p class="math-question--operator math-equation">+</p>
                  <div class="math-question__numbers">
                    <p class="math-equation math-question__numbers--top">117</p>
                    <p class="math-equation math-question__numbers--bottom">
                      117
                    </p>
                  </div>
                </div>

                <!-- Answers-->
                <div class="math-question__answers-block">
                  <!--input-->

                  <label for="q1a1" class="math-question__answer">
                    <input type="radio" name="q1" id="q1a1" value="234" />
                    <p class="math-answer">234</p>
                  </label>

                  <!--end input -->
                  <label for="q1a2" class="math-question__answer">
                    <input
                      type="radio"
                      name="q1"
                      id="q1a2"
                      value="34"
                      class=""
                    />
                    <p class="math-answer">34</p>
                  </label>

                  <!--end input -->
                  <label for="q1a3" class="math-question__answer">
                    <input
                      type="radio"
                      name="q1"
                      id="q1a3"
                      value="134"
                      class=""
                    />
                    <p class="math-answer">134</p>
                  </label>

                  <!--end input -->
                  <label for="q1a4" class="math-question__answer">
                    <input type="radio" name="q1" id="q1a4" value="33" />
                    <p class="math-answer">33</p>
                  </label>

                  <!--end input -->
                </div>
              </fieldset>
    
    `;
};
