import { useLocation } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import useGetSearchResult from "../hook/useGetSearchResult";
import useGetPokeDetail from "../hook/useGetPokeDetail";

const SearchResult = () => {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  const { filteredPokemon, loading } = useGetSearchResult(searchQuery);
  const { selectedPokemon, setSelectedPokemon, fetchPokemonDetails } = useGetPokeDetail();

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
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Résultats de recherche pour "{searchQuery}"
        </h1>

        {selectedPokemon ? (
          /* Affichage des détails du Pokémon sélectionné */
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <button onClick={() => setSelectedPokemon(null)} className="text-sm font-medium underline">
              Retour à la liste
            </button>
            <div className="flex justify-center">
              <img src={selectedPokemon.image} alt={selectedPokemon.name} className="w-64 h-64 object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-center mt-4">{selectedPokemon.name}</h1>
            <p className="text-center text-gray-500 mb-4">
              Type(s):{" "}
              {selectedPokemon.apiTypes.map((type) => (
                <span key={type.name} className="inline-block mr-2">
                  <img src={type.image} alt={type.name} className="h-8 w-8 inline-block" />
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
          /* Affichage des résultats */
          <div className="max-w-4xl mx-auto">
            {filteredPokemon.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPokemon.map((pokemon) => (
                  <li
                    key={pokemon.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => fetchPokemonDetails(pokemon.id)} // Affiche les détails du Pokémon sélectionné
                  >
                    <img src={pokemon.image} alt={pokemon.name} className="w-full h-48 object-contain mb-4" />
                    <p className="text-lg font-bold text-center">{pokemon.name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg text-gray-500">
                Aucun Pokémon trouvé pour "{searchQuery}".
                <img src="/psicocanard.png" alt="raté" className="h-20 w-20 object-contain ml-2 inline-block" />
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
