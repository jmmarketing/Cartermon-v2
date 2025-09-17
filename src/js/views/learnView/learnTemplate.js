import { mathCardComponent } from "../../../components/mathCardComponent/mathCardComponent.js";

import { playerCardComponent } from "../../../components/playerCardComponent/playerCardComponent.js";

import { navbarComponent } from "../../../components/navbarComponent/navbarComponent.js";
import { imgAssets } from "../../../../assets/game-assets.js";
/**
 *
 * @param {object} gameModel - Takes gameModel Object.
 * @param {object} mathObj - Takes Math Question Object
 * @returns
 */
export const learnTemplate = (gameModel, mathObj) => {
  return `
  ${navbarComponent(gameModel)}
<main>
      <section class="learn">
      ${playerCardComponent(gameModel.player, { cardSize: "main" })}

        <div class="learn__math-container">
          <!--Info bar-->
          <div class="learn__math-container--info-bar">
            <div class="learn__title">
              <p class="rowdie-title">Get all 3 correct to earn a Pokeball.</p>
            </div>
            <button class="learn__button learn__button--check play-information">
              Check Answers
            </button>
          </div>
          <!--END Info bar-->

          <div class="learn__math-container--questions">
            <form class="learn__math-quiz">
             ${mathCardComponent(mathObj)}
            </form>
          </div>
          <div class="learn__success-container hide">
            <img
              src="${imgAssets.pokeball}"
              alt="Pokeball"
              class="learn__success-container--pokeball"
            />
            <button
              class="learn__button play-information learn__button--play-again"
            >
              Play Again?
            </button>
          </div>
        </div>
      </section>
    </main>

`;
};
