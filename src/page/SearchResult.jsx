import { useLocation } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";
import useGetSearchResult from "../hook/useGetSearchResult";

const SearchResult = () => {
  const location = useLocation();
  
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query") || "";
  const { filteredPokemon, loading } = useGetSearchResult(searchQuery);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Résultats de recherche pour "{searchQuery}"
        </h1>

        {/* Résultats */}
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <p className="text-center text-lg text-gray-500">Chargement des Pokémon...</p>
          ) : filteredPokemon.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPokemon.map((pokemon) => (
                <li
                  key={pokemon.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-xl transition-all"
                >
                  <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mx-auto object-contain mb-4" />
                  <p className="text-xl font-semibold text-center text-gray-800">{pokemon.name}</p>
                  <div className="mt-2 text-center text-gray-600">
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg text-gray-500">
              Aucun Pokémon trouvé pour "{searchQuery}".
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
