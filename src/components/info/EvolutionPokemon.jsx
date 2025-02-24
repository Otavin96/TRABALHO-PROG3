import api from "../../service/api";
import { useEffect, useState } from "react";
import style from "./EvolutionPokemon.module.css";

const EvolutionPokemon = ({ id, color }) => {
  const [evolutionChainUrl, setEvolutionChainUrl] = useState(null);
  const [evolutionNames, setEvolutionNames] = useState({
    prev: null,
    actual: null,
    next: null,
  });
  const [pokemonIds, setPokemonIds] = useState({
    prev: null,
    actual: null,
    next: null,
  });

  // 1. Buscar a URL da cadeia evolutiva a partir do id do Pokémon.
  useEffect(() => {
    async function fetchSpecies() {
      try {
        const response = await api.get(`/pokemon-species/${id}`);
        setEvolutionChainUrl(response.data.evolution_chain.url);
      } catch (error) {
        console.error("Erro ao buscar espécie:", error);
      }
    }
    if (id) {
      fetchSpecies();
    }
  }, [id]);

  // 2. Buscar e extrair os nomes das evoluções usando a URL da cadeia evolutiva.
  useEffect(() => {
    async function fetchEvolutionChain(url) {
      try {
        const response = await api.get(url);
        const chain = response.data.chain;

        // Função recursiva para extrair os nomes em ordem
        const extractEvolutions = (chainNode, evolutions = []) => {
          evolutions.push(chainNode.species.name);
          if (chainNode.evolves_to && chainNode.evolves_to.length > 0) {
            chainNode.evolves_to.forEach((child) =>
              extractEvolutions(child, evolutions)
            );
          }
          return evolutions;
        };

        const evolutions = extractEvolutions(chain);
        // Considerando que você quer exibir apenas três estágios: inicial, intermediário e final.
        setEvolutionNames({
          prev: evolutions[0] || null,
          actual: evolutions[1] || null,
          next: evolutions[2] || null,
        });
      } catch (error) {
        console.error("Erro ao buscar cadeia evolutiva:", error);
      }
    }

    if (evolutionChainUrl) {
      fetchEvolutionChain(evolutionChainUrl);
    }
  }, [evolutionChainUrl]);

  // 3. Buscar os IDs dos Pokémon a partir dos nomes obtidos.
  useEffect(() => {
    async function fetchPokemonId(pokemonName, position) {
      try {
        // Se a PokéAPI espera nome ou id, estamos usando o nome obtido
        const response = await api.get(`/pokemon-species/${pokemonName}`);
        setPokemonIds((prevIds) => ({
          ...prevIds,
          [position]: response.data.id,
        }));
      } catch (error) {
        console.error(`Erro ao buscar ID do Pokémon ${pokemonName}:`, error);
      }
    }

    if (evolutionNames.prev) {
      fetchPokemonId(evolutionNames.prev, "prev");
    }
    if (evolutionNames.actual) {
      fetchPokemonId(evolutionNames.actual, "actual");
    }
    if (evolutionNames.next) {
      fetchPokemonId(evolutionNames.next, "next");
    }
  }, [evolutionNames]);

  return (
    <section>
      <h1>Linha Evolutiva</h1>
      <span className={style.divisor}>
        <hr />
      </span>
      <ul className={style.containerEvolution}>
        {evolutionNames.prev && (
          <li>
            <h2>{evolutionNames.prev}</h2>
            {pokemonIds.prev && (
              <a href={`/pokemon-info/${pokemonIds.prev}`}>
                <img
                  style={{ backgroundColor: color }}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIds.prev}.png`}
                  alt={evolutionNames.prev}
                />
              </a>
            )}
          </li>
        )}

        {evolutionNames.actual && (
          <li>
            <h2>{evolutionNames.actual}</h2>
            {pokemonIds.actual && (
              <a href={`/pokemon-info/${pokemonIds.actual}`}>
                <img
                  style={{ backgroundColor: color }}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIds.actual}.png`}
                  alt={evolutionNames.actual}
                />
              </a>
            )}
          </li>
        )}

        {evolutionNames.next && (
          <li>
            <h2>{evolutionNames.next}</h2>
            {pokemonIds.next && (
              <a href={`/pokemon-info/${pokemonIds.next}`}>
                <img
                  style={{ backgroundColor: color }}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIds.next}.png`}
                  alt={evolutionNames.next}
                />
              </a>
            )}
          </li>
        )}
      </ul>
    </section>
  );
};

export default EvolutionPokemon;
