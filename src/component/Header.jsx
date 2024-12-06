import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    const query = event.target.query.value;
    navigate("/search-results?query=" + query);
    setIsMenuOpen(false); 
  };

  return (
    <header className="bg-gradient-to-r from-teal-500 via-cyan-400 to-blue-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img src="image/ball.png" alt="Pokemon Logo" className="h-10 w-10 object-contain mr-3"/>
          <h1 className="text-3xl font-extrabold text-gray-100 tracking-wide hover:text-yellow-300 transition-colors duration-300 cursor-pointer">
            <Link to={"/"}>PokeDev</Link>
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Navigation Links */}
          <Link to="/" className="hover:text-yellow-300 transition-colors duration-300">Accueil</Link>
          <Link to="/pokelist" className="hover:text-yellow-300 transition-colors duration-300">Liste Pokemon</Link>
          <Link to="/typelist" className="hover:text-yellow-300 transition-colors duration-300" >Liste Type</Link>
          <Link to="/randompoke" className="hover:text-yellow-300 transition-colors duration-300">Pokemon aléatoire</Link>

          {/* Desktop Search Form */}
          <form onSubmit={handleSubmitSearch} className="hidden md:flex items-center space-x-3 bg-white p-2 rounded-full shadow-md ml-5" >
            <input type="search" name="query" placeholder="Rechercher un Pokemon" className="px-4 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-72"/>
            <button type="submit"className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors duration-300 focus:outline-none">
              🔍
            </button>
          </form>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl focus:outline-none"onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? "✖️" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-600 md:hidden">
          <nav className="flex flex-col items-center space-y-5 py-5">
            <Link to="/" className="text-lg hover:text-yellow-300 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
            <Link to="/pokelist" className="text-lg hover:text-yellow-300 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Liste Pokemon</Link>
            <Link to="/typelist" className="text-lg hover:text-yellow-300 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Liste Type</Link>
            <Link to="/randompoke" className="text-lg hover:text-yellow-300 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>Pokemon aléatoire</Link>

            {/* Mobile Search Form */}
            <form onSubmit={handleSubmitSearch} className="flex items-center bg-white px-4 py-2 rounded-full mx-5 shadow-md"
            >
              <input type="search" name="query" placeholder="Rechercher un Pokemon" className="flex-grow px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-full" />
              <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 focus:outline-none">
                🔍
              </button>
            </form>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
