import { useState, useEffect } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import useGetPokeDetail from "../hook/useGetPokeDetail";

const Home = () => {
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [randomTypes, setRandomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedPokemon, setSelectedPokemon, fetchPokemonDetails } = useGetPokeDetail();


  // Fonction pour récupérer tous les Pokémon
  const fetchAllPokemons = () => {
    fetch("https://pokebuildapi.fr/api/v1/pokemon")
      .then((response) => response.json())
      .then((data) => {
        // Choisir 6 Pokémon au hasard dans la liste
        const randomPokemons = getRandomItems(data, 6);
        setRandomPokemons(randomPokemons);
      })
  };

  // Fonction pour récupérer tous les types de Pokémon
  const fetchAllTypes = () => {
    fetch("https://pokebuildapi.fr/api/v1/types")
      .then((response) => response.json())
      .then((data) => {
        // Choisir 3 types au hasard dans la liste
        const randomTypes = getRandomItems(data, 3);
        setRandomTypes(randomTypes);
        setLoading(false);
      })
  };

  // Fonction pour sélectionner un nombre n d'éléments au hasard dans un tableau
  const getRandomItems = (array, n) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  // Appeler les fonctions lors du chargement du composant
  useEffect(() => {
    fetchAllPokemons();
    fetchAllTypes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="text-center w-full px-6">
          {/* Titre bien en haut */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Bienvenue dans le monde des Pokémons
          </h2>
          
          {/* Affichage des Pokémon au hasard et des types */}
          {loading ? (
            <p className="text-lg text-gray-600">Chargement des données...</p>
          ) : (
            <>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Ton équipe de Pokémon</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {randomPokemons.map((pokemon) => (
                    <div
                      key={pokemon.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 text-center"
                    >
                      <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 object-contain mx-auto mb-4"/>
                      <h3 className="text-xl font-bold text-gray-800">{pokemon.name}</h3>
                      <p className="text-sm text-gray-600">
                        {pokemon.apiTypes.map((type) => (
                          <span
                            key={type.name} className="inline-block mr-2 text-sm text-gray-700"
                          >
                            <img src={type.image} alt={type.name} className="w-6 h-6 inline-block mr-1"/>
                            {type.name}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Types au hasard</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {randomTypes.map((type) => (
                    <div
                      key={type.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 text-center"
                    >
                      <img src={type.image} alt={type.name} className="w-32 h-32 object-contain mx-auto mb-4"/>
                      <h3 className="text-xl font-bold text-gray-800">{type.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
