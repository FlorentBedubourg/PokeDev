// RandomPoke.jsx
import Footer from "../component/Footer";
import Header from "../component/Header";
import useGetRandomPoke from "../hook/useGetRandomPoke";

const RandomPoke = () => {
  const { pokemon, loading, getRandomPokemon } = useGetRandomPoke();

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <p className="text-xl font-semibold text-gray-700">Chargement du Pokémon...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Pokémon aléatoire</h1>
        {pokemon && (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 mx-auto object-contain mb-4" />
            <p className="text-lg font-bold text-gray-700">Type(s):</p>
            <ul className="flex justify-center space-x-4 my-3">
              {pokemon.apiTypes.map((type) => (
                <li key={type.name} className="flex items-center space-x-2">
                  <img src={type.image} alt={type.name} className="w-6 h-6" />
                  <span className="text-gray-600">{type.name}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold text-gray-700">Statistiques :</p>
            <ul className="grid grid-cols-2 gap-4 mt-3 text-gray-600">
              <li>HP: {pokemon.stats.HP}</li>
              <li>Attaque: {pokemon.stats.attack}</li>
              <li>Défense: {pokemon.stats.defense}</li>
              <li>Attaque spéciale: {pokemon.stats.special_attack}</li>
              <li>Défense spéciale: {pokemon.stats.special_defense}</li>
              <li>Vitesse: {pokemon.stats.speed}</li>
            </ul>
          </div>
        )}
        <button onClick={getRandomPokemon} className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300" >
          Obtenir un Pokémon aléatoire
        </button>
      </div>
      <Footer />
    </>
  );
};

export default RandomPoke;
