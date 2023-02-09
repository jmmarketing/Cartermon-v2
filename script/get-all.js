let names = [];

//########## Grab & Store Pokemon Info ##########
async function loadPokeInfo() {

    try {
        const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=151');
    
        if (response.ok) {
          const jsonResponse = await response.json();
        //   console.log(jsonResponse)
            for (const poke of jsonResponse.results){
                let pokeInfo = await fetch (poke.url);
                if (pokeInfo.ok) {
                    let pokeInfoJSON = await pokeInfo.json();
                    names.push({'name': pokeInfoJSON.name, 'image': pokeInfoJSON.sprites.other['official-artwork']['front_default']})
                }
            }
        }
        // throw new Error('Request Failed!')
    
    } catch(error){
            console.log(error);
        }
}