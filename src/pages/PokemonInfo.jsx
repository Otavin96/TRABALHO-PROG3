import { useState, useEffect } from "react";
import { data, useParams } from "react-router-dom";
import api from "../service/api";
import ButtonLoading from "../components/event/buttonLoading";

// eslint-disable-next-line react/prop-types
const PokemonInfo = () => {

  const { id } = useParams();
  const [infoPokemon, setInfoPokemon] = useState([]);
  const [loading, setLoading] = useState(false)

  const getInfoPokemon = async (id) => {

    try {
      const response = await api.get(`/pokemon/${id}`);

      const data = response.data
      setInfoPokemon(data)
      setLoading(true)
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getInfoPokemon(id)
  }, [])

  console.log(infoPokemon)

  return (
    <>
    {!loading && <ButtonLoading />}
    <div>
        <h2>{infoPokemon.name}</h2>
        <hr />
        <img
              width={250}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${infoPokemon.id}.png`}
              alt={`Pokemon ${infoPokemon.name}`}
        />
        <p>Experiência básica: {infoPokemon.base_experience}</p>
        <p>Altura: {infoPokemon.height}</p>
        <p>Peso: {infoPokemon.weight}</p>
    </div>
    
    </>
  );
};

export default PokemonInfo;
