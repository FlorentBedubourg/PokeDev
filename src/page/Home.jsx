import { useState, useEffect } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import useGetPokeDetail from "../hook/useGetPokeDetail";
import { Link } from "react-router-dom";

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
      });
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
      });
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-lg font-medium text-gray-500">Chargement des données...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="text-center w-full px-6">
          {/* Titre en haut */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Bienvenue dans le monde des Pokémons
          </h2>

          {/* Affichage de l'équipe et détails */}
          {selectedPokemon ? (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
              <button onClick={() => setSelectedPokemon(null)} className="text-sm font-medium underline"
              >
                Retour à la liste
              </button>
              <div className="flex justify-center">
                <img src={selectedPokemon.image} alt={selectedPokemon.name} className="w-64 h-64 object-contain"/>
              </div>
              <h1 className="text-2xl font-bold text-center mt-4">{selectedPokemon.name}</h1>
              <p className="text-center text-gray-500 mb-4">
                Type(s):{" "}
                {selectedPokemon.apiTypes.map((type) => (
                  <span key={type.name} className="inline-block mr-2">
                    <img src={type.image} alt={type.name} className="h-8 w-8 inline-block"/>
                    {type.name}
                  </span>
                ))}
              </p>

              <ul className="space-y-2">
                <li><strong>HP:</strong> {selectedPokemon.stats.HP}</li>
                <li><strong>Attaque:</strong> {selectedPokemon.stats.attack}</li>
                <li><strong>Défense:</strong> {selectedPokemon.stats.defense}</li>
                <li><strong>Attaque spéciale:</strong> {selectedPokemon.stats.special_attack}</li>
                <li><strong>Défense spéciale:</strong> {selectedPokemon.stats.special_defense}</li>
                <li><strong>Vitesse:</strong> {selectedPokemon.stats.speed}</li>
              </ul>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {randomPokemons.map((poke) => (
                <li
                  key={poke.id}
                  className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => fetchPokemonDetails(poke.id)}
                >
                  <img src={poke.image} alt={poke.name} className="w-full h-48 object-contain mb-4"/>
                  <p className="text-lg font-bold text-center">{poke.name}</p>
                </li>
              ))}
            </ul>
          )}
        <button onClick={() => {
          fetchAllPokemons();
          fetchAllTypes();
           }} className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300" >
          Obtenir une nouvelle configuraton
        </button>

          {/* Affichage des 3 types au hasard */}
          <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Types au hasard</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {randomTypes.map((type) => (
                    <div
                      key={type.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6 text-center"
                    >
                      <Link to={`/types/${type.name}`} state={{ from: 'home' }} className="flex flex-col items-center justify-between">
                      <img src={type.image} alt={type.name} className="w-32 h-32 object-contain mb-4"/>
                      <h3 className="text-xl font-bold text-gray-800">{type.name}</h3>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
