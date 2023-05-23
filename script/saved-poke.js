const searchButton = document.querySelector(".search-pokemon");
const errorMessage = document.querySelector(".error");
const viewCardsContainer = document.querySelector(".view-cards");
const loader = document.querySelector(".loader");

function createPreviewCards(arr) {
  arr.forEach((pokemon) => {
    const miniCard = document.createElement("div");
    miniCard.classList.add("mini-card");

    const pokeName = document.createElement("div");
    pokeName.classList.add("row");
    pokeName.setAttribute("id", "poke-name");

    const poke = document.createElement("p");
    poke.textContent = pokemon["name"];

    const pokeHP = document.createElement("p");
    pokeHP.setAttribute("id", "hp");
    pokeHP.textContent = `${pokemon["hp"]} HP`;

    const trashCan = document.createElement("i");
    trashCan.classList.add("fa");
    trashCan.classList.add("fa-trash-o");
    trashCan.setAttribute("aria-hidden", "true");
    trashCan.setAttribute("id", "remove-fave");
    trashCan.setAttribute("name", `${pokemon.name}`);

    const pokeImage = document.createElement("div");
    pokeImage.classList.add("row");
    pokeImage.setAttribute("id", "poke-image");

    const image = document.createElement("img");
    image.setAttribute("src", `${pokemon["img"]}`);

    pokeName.appendChild(poke);
    pokeName.appendChild(pokeHP);
    pokeName.appendChild(trashCan);
    pokeImage.appendChild(image);

    miniCard.appendChild(pokeName);
    miniCard.appendChild(pokeImage);

    viewCardsContainer.appendChild(miniCard);
    trashCan.addEventListener("click", removeSaved);

    console.log(`${pokemon["name"]} Card Created!`);
  });
}

function hideLoader() {
  loader.hidden = true;
}

if (localStorage.fav) {
  let pokeJSON = JSON.parse(localStorage.getItem("fav"));
  createPreviewCards(pokeJSON);
  setTimeout(function () {
    viewCardsContainer.hidden = false;
  }, 3500);
} else {
  setTimeout(function () {
    errorMessage.hidden = false;
    searchButton.hidden = false;
  }, 3500);
}

function removeSaved() {
  console.log(this.getAttribute("name"));
}

setTimeout(hideLoader, 3500);
