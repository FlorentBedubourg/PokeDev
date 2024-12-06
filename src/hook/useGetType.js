import { useState, useEffect } from "react";
import useGetLoading from "./useGetLoading";

const useGetType = (type) => {
  const { loading, startLoading, stopLoading } = useGetLoading();
  const [types, setTypes] = useState([]); 
  const [pokemonList, setPokemonList] = useState([]);

  // Charger les types de Pokémon
  useEffect(() => {
    startLoading();
    fetch("https://pokebuildapi.fr/api/v1/types")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data);
        stopLoading();
      })
      .catch(() => {
        stopLoading();
      });
  }, []);

  // Charger les Pokémon d'un type spécifique
  useEffect(() => {
    if (!type) return;

    startLoading();
    setPokemonList([]);
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/type/${encodeURIComponent(type)}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data);
        stopLoading();
      })
      .catch(() => {
        stopLoading();
      });
  }, [type]); 
  
  return {
    types,
    pokemonList,
    loading,
  };
};

export default useGetType;
