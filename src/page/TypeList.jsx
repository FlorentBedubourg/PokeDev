import { useParams, Link } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import useGetType from "../hook/useGetType";

const TypeList = () => {
  const { type } = useParams();
  const { types, pokemonList, loading } = useGetType(type);

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <p className="text-gray-500 text-lg font-medium">Chargement...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 relative">
        {type ? (
          <>
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Pokémon de type {type}
            </h1>
            {/* Bouton retour en haut à gauche */}
            <Link to="/typelist" className="absolute top-4 left-4 text-sm font-medium hover:underline" >
              ← Retour à la liste des types
            </Link>
            {pokemonList.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pokemonList.map((pokemon) => (
                  <li
                    key={pokemon.id}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition hover:bg-blue-50 p-4 flex items-center space-x-4">
                    <img src={pokemon.image} alt={pokemon.name} className="h-16 w-16 object-contain" />
                    <p className="text-lg font-medium text-gray-800">{pokemon.name}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                Aucun Pokémon trouvé pour ce type.
              </p>
            )}
          </>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Liste des types de Pokémon
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {types.map((typeItem) => (
                <li
                  key={typeItem.id}
                  className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl transition hover:bg-blue-50 p-4 flex items-center justify-center space-x-4" >
                  <Link to={`/types/${typeItem.name}`} className="flex items-center space-x-4">
                    <img src={typeItem.image} alt={typeItem.name} className="h-16 w-16 object-contain" />
                    <p className="text-lg font-medium text-gray-800">{typeItem.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TypeList;
