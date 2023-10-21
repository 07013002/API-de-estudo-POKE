import React, {useEffect, useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Pokedex from "./components/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavoriteProvider } from "./contexts/favoritesContext";

const favoritesKey = "fav"


function App() {

  const [favorites, setFavorites] = useState([]);

  const [loading, setLoding] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const itensPerPage = 40;

  const fetchPokemons = async () => {
    try {
      setLoding(true);
      setNotFound(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url)
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setTotalPages(Math.ceil(data.count / itensPerPage));
      setLoding(false);
    } catch (error) {
      console.log("fecthPokemons error: ", error)
    }
    
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  }

  useEffect(() =>{
    loadFavoritePokemons();
  }, []);

  useEffect(() =>{
    fetchPokemons();
  }, [page]);
  

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);
    if(favoriteIndex >= 0){
      updatedFavorites.splice(favoriteIndex, 1);
      console.log(updatedFavorites)
      console.log(favoriteIndex)
      
    }else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  }

  const onSearchHandler = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoding(true);
    setNotFound(false);
    const result = await searchPokemon(pokemon);
    if(!result) {
      setNotFound(true);
    }else{
      setPokemons([result]);
      setPage(0);
      setTotalPages(1);
    }
    setLoding(false);
  }

  return (
    <>
      <FavoriteProvider value={{favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons}} >
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        {notFound ? (
          <div class-name="not-found-text"> Nenhum pokemon! </div>
        ) : (
          <Pokedex 
            pokemons={pokemons} loading={loading} page={page} totalPages={totalPages} setPage={setPage}
          />
        )}
      </FavoriteProvider>
    </>
  );
}

export default App;
