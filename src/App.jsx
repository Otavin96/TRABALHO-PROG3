import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "./service/api";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import PokemonInfo from "./pages/PokemonInfo";

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    api
      .get("/pokemon?limit=50&offset=0")
      .then((res) => setPokemon(res.data.results));
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home pokemon={pokemon} />} />
        <Route path="/pokemon-info" element={<PokemonInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
