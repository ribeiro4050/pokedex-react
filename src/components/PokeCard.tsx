import { useState, useEffect } from "react";
import "./PokeCard.css";

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
  const [isFavorito, setIsFavorito] = useState(() => {
    const salvo = localStorage.getItem(`fav-${pokemon.name}`);
    return salvo === "true";
  });

  useEffect(() => {
    if (pokemon) {
      const nomeFormatado = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      console.log(`Pokémon ${nomeFormatado} carregado com sucesso!`);
    }
  }, [pokemon]);

  useEffect(() => {
    localStorage.setItem(`fav-${pokemon.name}`, String(isFavorito));
  }, [isFavorito, pokemon.name]);

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
          {isFavorito ? "Remover" : "Favoritar ❤️"}
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