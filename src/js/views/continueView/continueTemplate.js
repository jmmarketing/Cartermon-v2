import { playerCardComponent } from "../../../components/playerCardComponent/playerCardComponent.js";

export const continueTemplate = (playersArray) => {
  return `

 
      <section class="continue">
        <div class="continue__title">
          <p class="rowdie-title">Select Your Player</p>
        </div>

        <div class="continue__player-container">
        ${playersArray.map((player) => playerCardComponent(player)).join("")}
          
        </div>
      </section>
    


`;
};
