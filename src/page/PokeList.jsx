import Footer from "../component/Footer";
import Header from "../component/Header";
import useGetPokeDetail from "../hook/useGetPokeDetail";
import useGetPokeList from "../hook/useGetPokeList";

const PokeList = () => {
  const { pokemon, loading, generation, setGeneration } = useGetPokeList(); 
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
        {/* Sélecteur de génération */}
        <div className="mb-6">
          <label htmlFor="generation" className="block text-sm font-medium text-gray-700 mb-2">
            Sélectionner une génération :
          </label>
          <div className="flex space-x-4">
            {[...Array(8)].map((_, index) => (
              <button
                key={index}
                onClick={() => setGeneration(index + 1)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                  ${generation === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-300'}`}
              >
                Gen {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Affichage des détails du Pokémon sélectionné */}
        {selectedPokemon ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <button onClick={() => setSelectedPokemon(null)} className="text-sm font-medium underline">
              Retour à la liste
            </button>
            <div className="flex justify-center">
              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                className="w-64 h-64 object-contain"
              />
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
          /* Liste des Pokémon */
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pokemon.map((poke) => (
              <li
                key={poke.id}
                className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => fetchPokemonDetails(poke.id)} // On utilise la fonction pour récupérer les détails
              >
                <img src={poke.image} alt={poke.name} className="w-full h-48 object-contain mb-4" />
                <p className="text-lg font-bold text-center">{poke.name}</p>
                <p className="text-center text-gray-700 hover:text-blue-600 transition-all cursor-pointer mt-2">
                  <span className="text-sm font-medium">Voir les détails</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PokeList;
