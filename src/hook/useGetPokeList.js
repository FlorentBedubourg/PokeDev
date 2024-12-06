import { useState, useEffect } from "react";

const useGetPokeList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generation, setGeneration] = useState(1);

  // Fonction pour récupérer les Pokémon par génération
  const fetchPokemon = (gen) => {
    setLoading(true);
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/generation/${gen}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
  };

  useEffect(() => {
    fetchPokemon(generation);
  }, [generation]);

  return {
    pokemon,
    loading,
    generation,
    setGeneration,
    fetchPokemon,
  };
};

export default useGetPokeList;
