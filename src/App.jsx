import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import Navbar from "./components/navbar/Navbar";
import PokemonInfo from "./pages/PokemonInfo";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon-info/:id" element={<PokemonInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
