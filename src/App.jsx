import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import PokeList from "./page/PokeList";
import RandomPoke from "./page/RandomPoke";
import SearchResult from "./page/SearchResult";
import TypeList from "./page/TypeList";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokelist" element={<PokeList />} />
        <Route path="/types/:type" element={<TypeList />} />
        <Route path="/typelist" element={<TypeList />} />
        <Route path="/randompoke" element={<RandomPoke />} />
        <Route path="/search-results" element={<SearchResult />} />
      </Routes>
  );
}

export default App;