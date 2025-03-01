import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import api from "../../service/api";
import ButtonLoading from "../event/buttonLoading";
import style from "../card/card.module.css";

const Card = () => {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [imagesPokemon, setImagesPokemon] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [namesPokemon, setNamesPokemon] = useState([]);

  const searchTimeout = useRef(null);

  const handleNext = () => setCount((prev) => prev + 1);
  const handlePrev = () => setCount((prev) => (prev > 1 ? prev - 1 : prev));

  const getPokemons = async (count) => {
    if (count <= 0) return;

    setIsLoading(true);
    try {
      const response = await api.get(`/pokemon/${count}`);
      const data = response.data;
      setPokemon(data);
      setImagesPokemon(
        data.sprites.versions["generation-v"]["black-white"].animated.front_default
      );
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await api.get(`region/`);
        setRegions(response.data.results);
      } catch (error) {
        console.error("Erro ao buscar regiões!", error);
      }
    };
    fetchRegions();
  }, []);

  useEffect(() => {
    if (!selectedRegion) return;

    const fetchRegionPokemons = async () => {
      try {
        const response = await api.get(`/region/${selectedRegion}`);
        const generation = response.data.main_generation.name;
        const res = await api.get(`/generation/${generation}`);
        setNamesPokemon(res.data.pokemon_species);
        console.log(namesPokemon)
      } catch (error) {
        console.error("Erro ao buscar Pokémon da região:", error);
      }
    };

    fetchRegionPokemons();
  }, [selectedRegion]);

  useEffect(() => {
    getPokemons(count);
  }, [count]);

  const handleSearch = (e) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      getPokemons(e.target.value.toLowerCase());
    }, 500);
  };

  return (
    <>
      <div>
        <label>
          Escolha uma região{" "}
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
            <option value="">Selecione</option>
            {regions.map((region, index) => (
              <option key={index} value={region.name}>
                {region.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={style.pokedex}>
        {count <= 0 && <h3>Pokémon não encontrado!</h3>}

        {isLoading ? (
          <ButtonLoading />
        ) : (
          <>
            <img className={style.pokemonImage} src={imagesPokemon} alt={`Pokemon ${pokemon.name}`} />
            <div className={style.pokemonName}>
              <h2>
                <Link to={`/pokemon-info/${count}`}>{pokemon.name}</Link>
              </h2>
            </div>
          </>
        )}

        <input
          onChange={handleSearch}
          className={style.search}
          type="text"
          placeholder="Pesquisar"
        />

        <div className={style.btnGroup}>
          <button className={style.btnPrev} onClick={handlePrev}>
            Anterior
          </button>
          <button className={style.btnNext} onClick={handleNext}>
            Próximo
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
