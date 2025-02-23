import api from "../../service/api";
import { useEffect, useState } from "react";
import style from './EvolutionPokemon.module.css'

const EvolutionPokemon = ({ id, color }) => {
  const [nameEvolutionPrev, setNameEvolutionPrev] = useState(null);
  const [nameEvolution, setNameEvolution] = useState(null);
  const [nameEvolutionFinnaly, setNameEvolutionFinnaly] = useState(null);
  const [idPokemonPrev, setIdPokemonPrev] = useState(null);
  const [idPokemonActual, setIdPokemonActual] = useState(null);
  const [idPokemonNext, setIdPokemonNext] = useState(null);
  const [url, setUrl] = useState([]);

  const getUrl = async (url = []) => {
    const getUrl = url.slice(26, url.length - 1);

    const response = await api.get(`${getUrl}`);

    console.log(response.data)

    setNameEvolutionFinnaly(
      response.data["chain"]["evolves_to"][0]["evolves_to"][0]["species"].name
    );

    setNameEvolution(response.data["chain"]["evolves_to"][0]["species"].name);
    setNameEvolutionPrev(response.data["chain"]["species"].name);
  };

  const fetch = async (id) => {
    const response = await api.get(`/pokemon-species/${id}`);

    const data = response.data;

    setUrl(data["evolution_chain"].url);
  };

  const getImagePrev = async (name) => {
    const response = await api.get(`/pokemon-species/${name}`);

    const data = response.data;

    setIdPokemonPrev(data.id);
  };

  const getImageActual = async (name) => {
    const response = await api.get(`/pokemon-species/${name}`);

    const data = response.data;

    setIdPokemonActual(data.id);
  };

  const getImageNext = async (name) => {
    const response = await api.get(`/pokemon-species/${name}`);

    const data = response.data;

    setIdPokemonNext(data.id);
  };

  useEffect(() => {
    fetch(id);
    getUrl(url);
    getImagePrev(nameEvolutionPrev);
    getImageActual(nameEvolution);
    getImageNext(nameEvolutionFinnaly);
  }, [id, url, nameEvolutionPrev, nameEvolution, nameEvolutionFinnaly]);

  return (
    <section>
      <h1>Linha Evolutiva</h1>
        <ul className={style.containerEvolution}>
          <li>
            <h2>{nameEvolutionPrev}</h2>
            <img
              style={{ backgroundColor: color }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemonPrev}.png`}
              alt=""
            />
          </li>

          <li>
            <h2>{nameEvolution}</h2>
            <img
              style={{ backgroundColor: color }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemonActual}.png`}
              alt=""
            />
          </li>

          <li>
            <h2>{nameEvolutionFinnaly}</h2>
            <img
              style={{ backgroundColor: color }}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemonNext}.png`}
              alt=""
            />
          </li>
        </ul>
      </section>
  );
};

export default EvolutionPokemon;
