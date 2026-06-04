import { useState, useEffect } from "react";
import "./PokeCard.css";

// Reutilizamos a estrutura do Pokémon para tipar as Props
type PokemonData = {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: Array<{
    type: { name: string };
  }>;
};

interface PokeCardProps {
  pokemon: PokemonData;
}

export default function PokeCard({ pokemon }: PokeCardProps) {
  // Estado local para controlar se este Pokémon é favorito
  const [isFavorito, setIsFavorito] = useState(false);

  // useEffect que monitora quando o Pokémon muda para disparar a mensagem no console
  useEffect(() => {
    if (pokemon) {
      // Deixa a primeira letra maiúscula para ficar bonito no log
      const nomeFormatado = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      console.log(`Pokémon ${nomeFormatado} carregado com sucesso!`);
    }
  }, [pokemon]); // Dependência: roda toda vez que um novo pokemon for carregado

  return (
    <div className="pokecard">
      <div className="pokecard-header">
        <h3 className="pokecard-name">
          {pokemon.name} {isFavorito && "⭐"}
        </h3>
        <button 
          className={`btn-favorito ${isFavorito ? "ativo" : ""}`}
          onClick={() => setIsFavorito(!isFavorito)}
        >
          {isFavorito ? "Remover dos Favoritos" : "Favoritar ❤️"}
        </button>
      </div>

      {pokemon.sprites.front_default && (
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokecard-image"
        />
      )}

      <div className="pokecard-details">
        <p><strong>Altura:</strong> {pokemon.height * 10} cm</p>
        <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p>
          <strong>Tipos:</strong>{" "}
          <span className="pokecard-types">
            {pokemon.types.map((t) => t.type.name).join(" / ")}
          </span>
        </p>
      </div>
    </div>
  );
}