export const searchPokemon = async (pokemon) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        const response = await fetch(url)
        return await response.json();
    } catch (error) {
        console.log("erro: ", error);
    }
}

export const getPokemons = async (limit = 50, offset = 0) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        const response = await fetch(url)
        const results = await response.json();
        return results; // consigo fazer melhro
    } catch (error) {
        console.log("erro: ", error);
    }
}
export const getPokemonData = async (url) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log("erro: ", error);
    }
}