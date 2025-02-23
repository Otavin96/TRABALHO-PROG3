import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../service/api";

const CuriosityPokemon = ({ id }) => {
  const [curiosity, setCuriosity] = useState([]);

  const getCuriosity = async (id) => {
    const response = await api.get(`/pokemon-species/${id}`);
    const data = response.data;
    setCuriosity(data["flavor_text_entries"][0]);
  };

  useEffect(() => {
    getCuriosity(id);
  }, [id]);

  return (
    <div>
      <p>{curiosity.flavor_text}</p>
    </div>
  );
};

CuriosityPokemon.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CuriosityPokemon;
