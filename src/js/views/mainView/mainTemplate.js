import { navbarComponent } from "../../../components/navbarComponent/navbarComponent";
import { playerCardComponent } from "../../../components/playerCardComponent/playerCardComponent";
import { gamePlayCardComponent } from "../../../components/gamePlayCardComponent/gamePlayCardComponent";

export const mainTemplate = (gameModel) => {
  const { player } = gameModel;
  return `
  ${navbarComponent(player)}
  <main>
      <section class="main-screen">
      ${playerCardComponent(player, { cardSize: "main" })}

        <div class="main-screen__game-paths">
         ${gamePlayCardComponent("pokedex")}
         ${gamePlayCardComponent("learn")}
         ${gamePlayCardComponent("explore")}
          
        </div>
      </section>
    </main>
  `;
};
