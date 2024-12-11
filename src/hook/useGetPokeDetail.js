import { useState } from "react";

const useGetPokeDetail = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer les détails d’un Pokémon
  const fetchPokemonDetails = (id) => {
    setLoading(true);
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedPokemon(data);
        setLoading(false);
      })
  };

  return {
    selectedPokemon,
    loading,
    setSelectedPokemon,
    fetchPokemonDetails,
  };
};

export default useGetPokeDetail;
