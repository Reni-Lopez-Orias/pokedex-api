

export async function getPokemons(limit) {

    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${limit}`);

        // se validan las posible excepciones 
        if (response !== 200) {
        }

        const data = await response.json();  // Convertir la respuesta en formato JSON
        return data;

    } catch (error) {
        console.log(error);

    }

}

export async function searchPokemon(name) {

    try {

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        // se validan las posible excepciones 
        if (response !== 200) {
        }
        
        const data = await response.json();  // Convertir la respuesta en formato JSON
        return data;

    } catch (error) {
        console.log(error);

    }

}