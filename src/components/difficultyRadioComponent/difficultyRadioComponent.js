export const difficultyRadioComponent = () => {
  return `
    <!-- Difficulty Card-->
    <div class="difficulty-selection">
          <input type="radio" id="easy" value="easy" name="difficulty" />
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
                    />
                 </span>
                      X 5
                </p>
                <p class="play-label">0 - 10 Numbers</p>
                <p class="play-label">+/-</p>
          </div>
    </div>
    
    `;
};
