import { useState, useEffect } from "react";

const useGetSearchResult = (searchQuery) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/pokemon");
        const data = await response.json();
        setPokemonList(data);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { filteredPokemon, loading };
};

export default useGetSearchResult;
