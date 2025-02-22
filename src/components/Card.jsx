/* eslint-disable react/prop-types */
import { data, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../service/api'
import ButtonLoading from "./event/buttonLoading";

const Card = () => {

  const [pokemon, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [next, setNext] = useState(1);


  const handleNext = () => {
    setNext(next + 1)
  }


  const getPokemons = async () => {

    try {
      const response = await api.get(`/pokemon/${next}`);

      const data = response.data
      console.log(data)
      setPokemons(data)
      setIsLoading(true)
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getPokemons()
  }, []);

  return (
    <>
        <div className="card rounded-md h-64 ml-2 mr-2 bg-red-400 shadow-xl relative">
          <div className="header-card rounded-t-md bg-white h-8">
            <h2 className="font-bold text-center uppercase">{pokemon.name}</h2>
          </div>

          <img
            className="absolute bottom-2 left-30 "
            width={200}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${next}.gif`}
            alt={`Pokemon ${pokemon.name}`}
          />

          <div className="info">
          <Link to={`/pokemon-info/${next}`}>Detalhes</Link>
          </div>
          <button onClick={ handleNext}>Proximo</button>
        </div>

      {!isLoading && <ButtonLoading/>}
    </>
  );
};

export default Card;
