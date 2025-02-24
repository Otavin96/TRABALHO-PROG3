import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../service/api";

const CuriosityPokemon = ({ id }) => {
  const [curiosity, setCuriosity] = useState("");

  useEffect(() => {
    const getCuriosity = async (id) => {
      try {
        const response = await api.get(`/pokemon-species/${id}`);
        const data = response.data;
        // Filtrar flavor_text_entries para obter o texto em português

        console.log(data);
        const flavorEntry = data.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );
        // Se não encontrar em português, pode ser interessante exibir uma mensagem padrão ou o primeiro disponível
        setCuriosity(
          flavorEntry ? flavorEntry.flavor_text : "Informação não disponível."
        );
      } catch (error) {
        console.error("Erro ao obter informações sobre o Pokémon: ", error);
      }
    };

    if (id) {
      getCuriosity(id);
    }
  }, [id]);

  return (
    <div>
      <p>{curiosity}</p>
    </div>
  );
};

CuriosityPokemon.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CuriosityPokemon;
