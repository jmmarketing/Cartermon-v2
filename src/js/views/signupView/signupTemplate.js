import { buttonComponent } from "../../../components/buttonComponent/buttonComponent.js";
import { icons, avatars } from "../../../../assets/game-assets.js";
import { avatarCardComponent } from "../../../components/avatarRadioCardComponent/avatarCardComponent.js";

export const signupTemplate = `
<main>
      <form class="signup-form">
        <div class="signup-form__left">
          <div>
            <legend class="rowdie-title signup-form__label">Name</legend>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your name"
              class="signup-form--username"
            />
          </div>
          <div>
            <legend class="rowdie-title signup-form__label">Picture</legend>
            <fieldset class="signup-form--avatar">
              ${Object.entries(avatars)
                .map((id) => avatarCardComponent(id))
                .join("")}

            </fieldset>
          </div>
        </div>
        <div class="signup-form__right">
          <legend class="rowdie-title signup-form__label">Difficulty</legend>
          <fieldset class="signup-form--difficulty">
            <!-- Difficulty Card-->
            <div class="difficulty-selection">
              <input type="radio" id="easy" value="easy" name="Difficulty" />
              <label for="easy">
                <div class="difficulty-selection--easy">EASY</div>
              </label>
              <div class="difficulty-selection__description">
                <p class="play-label">
                  <span
                    ><img
                      src="${icons.pixelPokeball}"
                      alt="Pokeball"
                      class="difficulty-selection__description--pokeball"
                  /></span>
                  X 5
                </p>
                <p class="play-label">0 - 10 Numbers</p>
                <p class="play-label">+/-</p>
              </div>
            </div>
            <!-- Difficulty Card-->
            <div class="difficulty-selection">
              <input
                type="radio"
                id="normal"
                value="normal"
                name="Difficulty"
              />
              <label for="normal">
                <div class="difficulty-selection--normal">normal</div>
              </label>
              <div class="difficulty-selection__description">
                <p class="play-label">
                  <span
                    ><img
                      src="${icons.pixelPokeball}"
                      alt="Pokeball"
                      class="difficulty-selection__description--pokeball"
                  /></span>
                  X 3
                </p>
                <p class="play-label">2 Digit Numbers</p>
                <p class="play-label">+/-</p>
              </div>
            </div>
            <!-- Difficulty Card-->
            <div class="difficulty-selection">
              <input type="radio" id="hard" value="hard" name="Difficulty" />
              <label for="hard">
                <div class="difficulty-selection--hard">hard</div>
              </label>
              <div class="difficulty-selection__description">
                <p class="play-label">
                  <span
                    ><img
                      src="${icons.pixelPokeball}"
                      alt="Pokeball"
                      class="difficulty-selection__description--pokeball"
                  /></span>
                  X 1
                </p>
                <p class="play-label">3 Digit Numbers</p>
                <p class="play-label">+/-</p>
              </div>
            </div>
          </fieldset>
        </div>

        ${buttonComponent({
          use: "nav",
          color: "yellow",
          text: "Start >>>",
          type: "submit",
        })}
        
      </form>
    </main>
`;
