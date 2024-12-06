import { useEffect, useState } from "react";
import useGetLoading from "./useGetLoading"; 

const useGetRandomPoke = () => {
  const [pokemon, setPokemon] = useState(null);
  const { loading, startLoading, stopLoading } = useGetLoading(); 

  const getRandomPokemon = () => {
    startLoading();

    const randomId = Math.floor(Math.random() * 898) + 1;

    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${randomId}`)
      .then((response) => {

        return response.json();
      })
      .then((data) => {
        setPokemon(data); 
        stopLoading(); 
      })
  };

  useEffect(() => {
    getRandomPokemon();
  }, []); 

  return { pokemon, loading, getRandomPokemon };
};

export default useGetRandomPoke;
