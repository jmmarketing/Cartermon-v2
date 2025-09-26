/**
 *
 * @param {*} config - name, page (explore || learn), caught(boolean), pokeballCount
 * @returns
 */
export const infoBarComponent = (config) => {
  const { name, page, caught = false, pokeballs } = config;

  let message;
  const state = caught ? "caught" : pokeballs ? "" : "no-balls";
  const stateMessage = caught ? "caught" : pokeballs ? "catch" : "No Balls";
  let buttonHTML;

  if (page === "explore") {
    message = `A wild <span class="stat-blue">${name.toUpperCase()}</span> appeared!`;
    buttonHTML = `
    <button class="info-bar__button--catch play-information ${state}" id="catch">
        ${stateMessage}
    </button>
    <button class="info-bar__button--search play-information" id="search-pokemon">
        search
    </button>
    `;
  } else {
    message = `Get all 3 correct to earn a Pokeball.`;
    buttonHTML = `
    <button class="info-bar__button--yellow play-information" id="check-answers">Check Answers</button>`;
  }

  return `
 <!--Info bar-->
    <div class="info-bar">
        <div class="info-bar__title">
            <p class="rowdie-title">${message}</p>
        </div>
        <div class="info-bar__button-group">
       ${buttonHTML}
        </div>
    </div>
<!--END Info bar-->
`;
};

// <!-- INFO BAR -->
//           <div class="info-bar">
//             <div class="info-bar__title">
//               <p class="rowdie-title">
//                 A wild <span class="stat-blue">${name}</span> appeared!
//               </p>
//             </div>

//             <!-- Add CAUGHT class to change-->
//             <!--Add no-balls class to change-->
//             <button class="info-bar__button--catch play-information" id="catch">
//               catch
//             </button>
//             <button
//               class="info-bar__button--search play-information"
//               id="catch"
//             >
//               search
//             </button>
//           </div>
// <!-- END INFO BAR -->
