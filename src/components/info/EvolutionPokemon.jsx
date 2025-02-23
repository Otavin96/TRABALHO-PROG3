import { useParams } from "react-router-dom";
import api from "../../service/api";
import { useEffect, useState } from "react";

const EvolutionPokemon = ({ id }) => {
  const [evolutionPrev, setEvolutionPrev] = useState(null);
  const [evolution, setEvolution] = useState(null);
  const [evolutionFinnaly, setEvolutionFinnaly] = useState(null);
  const [idPokemon, setIdPokemon] = useState(null);
  const [url, setUrl] = useState([]);

  const getUrl = async (url = []) => {
    const getUrl = url.slice(26, url.length - 1);

    const response = await api.get(`${getUrl}`);

    setEvolutionFinnaly(
      response.data["chain"]["evolves_to"][0]["evolves_to"][0]["species"].name
    );

    setEvolution(response.data["chain"]["evolves_to"][0]["species"].name);
    setEvolutionPrev(response.data["chain"]["species"].name);
  };

  const fetch = async (id) => {
    const response = await api.get(`/pokemon-species/${id}`);

    const data = response.data;

    setUrl(data["evolution_chain"].url);
  };

  const getImage = async (name) => {
    const response = await api.get(`/pokemon-species/${name}`);

    const data = response.data;

    setIdPokemon(data.id);
  };

  useEffect(() => {
    fetch(id);
    getUrl(url);
    getImage(evolutionFinnaly);
  }, [id, url, evolutionFinnaly]);

  return (
    <div>
      <ul>
        <li>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`}
            alt=""
          />
        </li>
      </ul>
    </div>
  );
};

export default EvolutionPokemon;
