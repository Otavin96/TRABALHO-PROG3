import style from "./Pokemoninfo.module.css";
import PropTypes from "prop-types";

const InfoPokemon = ({ infoPokemon, pokemonImage, color, typePokemon }) => {
  return (
    <div className={style.containerInfo}>
      <div className={style.pokemonName}>
        <h2>{infoPokemon.name}</h2>
      </div>

      <img
        style={{ backgroundColor: color }}
        className={style.pokemonImage}
        src={pokemonImage}
        alt={`Pokemon ${infoPokemon.name}`}
      />

      <div className={style.info}>
        <p>
          <strong>Experiência Básica:</strong> {infoPokemon.base_experience}
        </p>
        <p>
          <strong>Altura:</strong> {infoPokemon.height}
        </p>
        <p>
          <strong>Peso:</strong> {infoPokemon.weight}
        </p>
        {typePokemon.length <= 1 ? (
          <p>
            <strong>Tipo:</strong> {typePokemon.slice(0)}
          </p>
        ) : (
          <p>
            <strong>Tipo:</strong> {typePokemon.slice(0, 1)}
            {typePokemon.slice(1, 2)}
          </p>
        )}
      </div>
    </div>
  );
};

InfoPokemon.propTypes = {
  infoPokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    base_experience: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
  }).isRequired,
  pokemonImage: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  typePokemon: PropTypes.string.isRequired,
};

export default InfoPokemon;
