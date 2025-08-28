//Import necessary components as needed (logoBar, priceCard, etc..)
import { buttonComponent } from "../../../components/buttonComponent/buttonComponent.js";
import {
  sprites,
  imgAssets,
  backgrounds,
} from "../../../../assets/game-assets.js";

export const homeTemplate = `
 <main>
      <div class="plain-logo">
        <img src="${imgAssets.logo}" alt="Cartermon Logo" />
      </div>
      <section class="hero">
        <div class="hero__left">
          <div class="hero__title">
            <h1 class="bilboard">
              Catch
              <span
                ><img
                  class="hero__sprite"
                  src="${sprites.bulbasaur}"
                  alt="Bulbasaur"
              /></span>
              Pokemon.
            </h1>
            <h2 class="bilboard-sm">Learn stuff.</h2>
          </div>
          <div class="hero__description">
            <p class="general-text">
              Pika-pi Marshtomp Nosepass Aipom Celebi Kyogre Magmar. Consectetur
              adipisicing elit Chansey Bronzong Nosepass Zangoose Azumarill
              Meditite Strength Kirlia Glaceon Spoink Zekrom Tangela grumpy old
              man who needs coffee.
            </p>
          </div>

          ${buttonComponent({
            type: "nav",
            path: "/signup",
            color: "yellow",
            text: "New Game",
          })}

          ${buttonComponent({
            type: "nav",
            path: "/continue",
            color: "blue",
            text: "Continue",
          })}
        
        </div>
        <div class="hero__right">
          <img
            src="${sprites.pikachu}"
            alt="Pikachu"
            class="hero__right--pikachu"
          />
          <img
            src="${sprites.eevee}"
            alt="Eeevee"
            class="hero__right--eevee"
          />
          <img
            src="${imgAssets.pokeball}"
            alt="Pokeball"
            class="hero__right--pokeball"
          />
        </div>
      </section>
    </main>
`;
