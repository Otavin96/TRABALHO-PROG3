import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonInfo from "./pages/PokemonInfo";
import Header from "./components/header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-info/:id" element={<PokemonInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
