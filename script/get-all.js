const viewCardsContainer = document.querySelector(".view-cards");
const loader = document.querySelector(".loader");

class App {
  #names250;
  constructor() {
    this._initAll();
  }

  _initAll() {
    if (localStorage.allnames) {
      let pokeJSON = JSON.parse(localStorage.getItem("allnames"));
      this._createPreviewCards(pokeJSON);
    } else {
      this._loadPokeInfo();
    }

    setTimeout(this._hideLoader, 3500);
  }

  //########## Grab & Store Pokemon Info ##########
  _loadPokeInfo() {
    const request = fetch("https://pokeapi.co/api/v2/pokemon?limit=250");
    request
      .then((response) => response.json())
      .then((data) => {
        for (const poke of data.results) {
          this.#names250.push({
            name: poke.name,
            image: poke.sprites.other["official-artwork"]["front_default"],
            hp: poke["stats"][0]["base_stat"],
          });
        }
        localStorage.setItem("allnames", JSON.stringify(this.#names250));

        this._createPreviewCards(this.#names250);
      })
      .catch((error) => console.log(error));
  }

  _createPreviewCards(arr) {
    arr.forEach((pokemon) => {
      const html = `
      <div class="mini-card" name="${pokemon.name}">
        <div class="row" id="poke-name">
          <p>${pokemon.name}</p>
          <p id="hp">${pokemon.hp} HP</p>
        </div>
        <div class="row" id="poke-image">
          <img src="${pokemon.image}">
        </div>
      </div>`;

      // Using create Element example
      // const miniCard = document.createElement("div");
      // miniCard.classList.add("mini-card");

      // const pokeName = document.createElement("div");
      // pokeName.classList.add("row");
      // pokeName.setAttribute("id", "poke-name");

      // const poke = document.createElement("p");
      // poke.textContent = pokemon["name"];

      // const pokeHP = document.createElement("p");
      // pokeHP.setAttribute("id", "hp");
      // pokeHP.textContent = `${pokemon["hp"]} HP`;

      // const pokeImage = document.createElement("div");
      // pokeImage.classList.add("row");
      // pokeImage.setAttribute("id", "poke-image");

      // const image = document.createElement("img");
      // image.setAttribute("src", `${pokemon["image"]}`);

      // pokeName.appendChild(poke);
      // pokeName.appendChild(pokeHP);
      // pokeImage.appendChild(image);

      // miniCard.appendChild(pokeName);
      // miniCard.appendChild(pokeImage);

      viewCardsContainer.insertAdjacentHTML("beforeend", html);

      console.log(`${pokemon["name"]} Card Created!`);
    });
  }

  _hideLoader() {
    loader.hidden = true;
    viewCardsContainer.hidden = false;
  }
}

const app = new App();
