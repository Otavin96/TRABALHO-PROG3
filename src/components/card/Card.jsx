import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../service/api";
import ButtonLoading from "../event/buttonLoading";
import style from "../card/card.module.css";

const Card = () => {
  const [pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [imagesPokemon, setImagesPokemon] = useState(null);

  const handleNext = () => {
    setCount(count + 1);
  };

  const handlePrev = () => {
    setCount(count - 1);
  };

  const getPokemons = async (count) => {
    try {
      const response = await api.get(`/pokemon/${count}`);

      const data = response.data;
      setImagesPokemon(
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]
          .front_default
      );
      setPokemon(data);
      setCount(data.id);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const changetSearch = (e) => {
    getPokemons(e.target.value);
  };

  useEffect(() => {
    getPokemons(count);
  }, [count]);

  return (
    <>
      <div className={style.pokedex}>
        {count <= 0 && <h3> Pokemon não encontrado!! </h3>}

        <img
          className={style.pokemonImage}
          src={imagesPokemon}
          alt={`Pokemon ${pokemon.name}`}
        />

        <div className={style.pokemonName}>
          <h2>
            <Link to={`/pokemon-info/${count}`}>{pokemon.name}</Link>
          </h2>
        </div>

        <input
          onChange={changetSearch}
          className={style.search}
          type="text"
          placeholder="Pesquisar"
        />

        <div className={style.btnGroup}>
          <button className={style.btnPrev} onClick={handlePrev}>
            Anterior
          </button>
          <button className={style.btnNext} onClick={handleNext}>
            Proximo
          </button>
        </div>
      </div>

      {!isLoading && <ButtonLoading />}
    </>
  );
};

export default Card;
