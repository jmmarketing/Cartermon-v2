import { buttonComponent } from "../../../components/buttonComponent/buttonComponent.js";
import { icons, avatars } from "../../../../assets/game-assets.js";
import { avatarCardComponent } from "../../../components/avatarRadioCardComponent/avatarCardComponent.js";
import { difficultyRadioComponent } from "../../../components/difficultyRadioComponent/difficultyRadioComponent.js";

export const signupTemplate = `

      <form class="signup-form">
        <div class="signup-form__left">
          <div>
            <legend class="rowdie-title signup-form__label">Name</legend>
            <input
              type="text"
              name="name"
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
            ${difficultyRadioComponent("easy")}
            ${difficultyRadioComponent("normal")}
            ${difficultyRadioComponent("hard")}

          </fieldset>
        </div>

        ${buttonComponent({
          use: "nav",
          color: "yellow",
          text: "Start >>>",
          type: "submit",
        })}
        
      </form>
    
`;
