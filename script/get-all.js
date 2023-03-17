const viewCardsContainer = document.querySelector('.view-cards');
const loader = document.querySelector('.loader');

let names = [];

//########## Grab & Store Pokemon Info ##########
async function loadPokeInfo() {

    try {
        const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=250');
    
        if (response.ok) {
          const jsonResponse = await response.json();
        //   console.log(jsonResponse)
            for (const poke of jsonResponse.results){
                let pokeInfo = await fetch (poke.url);
                if (pokeInfo.ok) {
                    let pokeInfoJSON = await pokeInfo.json();
                    names.push({'name': pokeInfoJSON.name, 'image': pokeInfoJSON.sprites.other['official-artwork']['front_default'], 'hp': pokeInfoJSON["stats"][0]["base_stat"]})
                }
            }

            let string = JSON.stringify(names);
            localStorage.setItem('allnames', string);

            createPreviewCards(names);

        }
        // throw new Error('Request Failed!')
    
    } catch(error){
            console.log(error);
        }
}

function createPreviewCards(arr) {

    arr.forEach(pokemon => {
        const miniCard = document.createElement('div');
        miniCard.classList.add('mini-card');
    
        const pokeName = document.createElement('div');
        pokeName.classList.add('row');
        pokeName.setAttribute('id', 'poke-name');
    
        const poke = document.createElement('p');
        poke.textContent = pokemon['name'];

        const pokeHP = document.createElement('p');
        pokeHP.setAttribute('id', 'hp');
        pokeHP.textContent = `${pokemon['hp']} HP`;
    
        const pokeImage = document.createElement('div');
        pokeImage.classList.add('row');
        pokeImage.setAttribute('id', 'poke-image');

        const image = document.createElement('img');
        image.setAttribute('src', `${pokemon['image']}`);

        pokeName.appendChild(poke);
        pokeName.appendChild(pokeHP);
        pokeImage.appendChild(image);

        miniCard.appendChild(pokeName);
        miniCard.appendChild(pokeImage);
         
        viewCardsContainer.appendChild(miniCard);

        console.log(`${pokemon['name']} Card Created!`)
    })

}

function hideLoader() {
    loader.hidden = true;
    viewCardsContainer.hidden = false;
}

if (localStorage.allnames){
    let pokeJSON = JSON.parse(localStorage.getItem('allnames'));;
    createPreviewCards(pokeJSON);
} else {
    loadPokeInfo();
}

setTimeout(hideLoader, 3500);
