import { icons } from "../../../assets/game-assets.js";

export const difficultyRadioComponent = (level = "normal") => {
  if (!["easy", "normal", "hard"].includes(level)) level = "error";
  const config = {
    easy: {
      text: "easy",
      id: "easy",
      pokeballs: 5,
      numbers: "0 - 20 Numbers",
    },
    normal: {
      text: "normal",
      id: "normal",
      pokeballs: 3,
      numbers: "2 Digit Numbers",
    },
    hard: {
      text: "hard",
      id: "hard",
      pokeballs: 1,
      numbers: "3 Digit Numbers",
    },
    error: {
      text: "Component Error!",
      id: "error",
      pokeballs: 0,
      numbers: "Something went wrong.",
    },
  };

  return `
    <!-- Difficulty Card-->
    <div class="difficulty-selection">
          <input type="radio" id="${config[level].id}" value="${config[level].id}" name="difficulty" />
          <label for="${config[level].id}">
              <div class="difficulty-selection--${config[level].id}">${config[level].text}</div>
          </label>
          <div class="difficulty-selection__description">
                <p class="play-label">
                 <span
                    ><img
                        src="${icons.pixelPokeball}"
                        alt="Pokeball"
                        class="difficulty-selection__description--pokeball"
                    />
                 </span>
                      X ${config[level].pokeballs}
                </p>
                <p class="play-label">${config[level].numbers}</p>
                <p class="play-label">+/-</p>
          </div>
    </div>
    
    `;
};
