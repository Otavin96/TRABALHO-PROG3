import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";
import CuriosityPokemon from "../components/info/CuriosityPokemon";
import InfoPokemon from "../components/info/InfoPokemon";
import EvolutionPokemon from "../components/info/EvolutionPokemon";

const PokemonInfo = () => {
  const { id } = useParams();
  const [infoPokemon, setInfoPokemon] = useState([]);
  const [pokemonImage, setPokemonImage] = useState(null);
  const [typePokemon] = useState([]);
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);

  const getType = (type = []) => {
    type.map((item) => {
      typePokemon.push(item.type.name);
    });
  };

  const getInfoPokemon = async (id) => {
    try {
      const response = await api.get(`/pokemon/${id}`);
      const getMoreInfo = await api.get(`/pokemon-species/${id}`);

      const data = response.data;

      setColor(getMoreInfo.data.color.name);

      getType(data.types);
      setPokemonImage(
        data["sprites"]["other"]["official-artwork"].front_default
      );
      setInfoPokemon(data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInfoPokemon(id);
  }, [id]);

  return (
    <>
      <InfoPokemon
        infoPokemon={infoPokemon}
        pokemonImage={pokemonImage}
        typePokemon={typePokemon}
        color={color}
      />
      {!loading && <p>Carregando!!</p>}
      <CuriosityPokemon id={id} />
      <EvolutionPokemon id={id} color={color}/>
    </>
  );
};

export default PokemonInfo;
