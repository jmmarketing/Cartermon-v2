const searchButton = document.querySelector(".search-pokemon");
const errorMessage = document.querySelector(".error");
const viewCardsContainer = document.querySelector(".view-cards");
const loader = document.querySelector(".loader");

class App {
  #pokeJSON;
  constructor() {
    this._initFav();
  }

  _initFav() {
    this.#pokeJSON = JSON.parse(localStorage.getItem("fav"));

    if (this.#pokeJSON) {
      this._createPreviewCards(this.#pokeJSON);
      setTimeout(function () {
        viewCardsContainer.hidden = false;
      }, 3500);
    } else {
      setTimeout(function () {
        errorMessage.hidden = false;
        searchButton.hidden = false;
      }, 3500);
    }

    setTimeout(this._hideLoader, 3500);

    viewCardsContainer.addEventListener("click", this._removeSaved.bind(this));
  }

  _removeSaved(e) {
    // Event Delegation for Dynamically Added Cards
    if (e.target.id === "remove-fave") {
      const removeName = e.target.getAttribute("trash-name");

      // Updates Saved Favorites Array
      this.#pokeJSON.splice(
        this.#pokeJSON.findIndex((poke) => poke.name == removeName),
        1
      );

      // // Resets Local Storage
      localStorage.setItem("fav", JSON.stringify(this.#pokeJSON));

      // Remove from DOM
      e.target.closest(`[name=${removeName}]`).remove();
      // Working Here - Reload on last removed?
      if (this.#pokeJSON.length === 0) location.reload();
    }
  }

  _hideLoader() {
    loader.hidden = true;
  }

  _createPreviewCards(arr) {
    arr.forEach((pokemon) => {
      const html = `
        <div class="mini-card" name="${pokemon.name}">
          <div class="row" id="poke-name">
            <p>${pokemon.name}</p>
            <p id="hp">${pokemon.hp} HP</p>
            <i class="fa fa-trash-o" aria-hidden="true" id="remove-fave" trash-name="${pokemon.name}"></i>
          </div>
          <div class="row" id="poke-image">
            <img src="${pokemon.img}">
          </div>
        </div>`;

      // const miniCard = document.createElement("div");
      // miniCard.classList.add("mini-card");
      // miniCard.setAttribute("name", `${pokemon.name}`);

      // const pokeName = document.createElement("div");
      // pokeName.classList.add("row");
      // pokeName.setAttribute("id", "poke-name");

      // const poke = document.createElement("p");
      // poke.textContent = pokemon["name"];

      // const pokeHP = document.createElement("p");
      // pokeHP.setAttribute("id", "hp");
      // pokeHP.textContent = `${pokemon["hp"]} HP`;

      // const trashCan = document.createElement("i");
      // trashCan.classList.add("fa");
      // trashCan.classList.add("fa-trash-o");
      // trashCan.setAttribute("aria-hidden", "true");
      // trashCan.setAttribute("id", "remove-fave");
      // trashCan.setAttribute("trash-name", `${pokemon.name}`);

      // const pokeImage = document.createElement("div");
      // pokeImage.classList.add("row");
      // pokeImage.setAttribute("id", "poke-image");

      // const image = document.createElement("img");
      // image.setAttribute("src", `${pokemon["img"]}`);

      // pokeName.appendChild(poke);
      // pokeName.appendChild(pokeHP);
      // pokeName.appendChild(trashCan);
      // pokeImage.appendChild(image);

      // miniCard.appendChild(pokeName);
      // miniCard.appendChild(pokeImage);

      viewCardsContainer.insertAdjacentHTML("beforeend", html);

      console.log(`🃏 ${pokemon.name.toUpperCase()} Card Created!`);
    });
  }
}

const app = new App();
