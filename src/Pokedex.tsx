import { useState } from "react";
import PokeCard from "./components/PokeCard.js"; // Importando o novo componente
import "./Pokedex.css";

type Pokemon = {
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

export default function Pokedex() {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [erro, setErro] = useState("");

  const buscarPokemon = async () => {
    if (!nome.trim()) return;

    setCarregando(true);
    setErro("");
    setPokemon(null);

    try {
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
      );
      if (!resposta.ok) throw new Error("Pokémon não encontrado");

      const dados: Pokemon = await resposta.json();
      setPokemon(dados);
    } catch {
      setErro("Pokémon não encontrado 😢");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="pokedex-app">
      <div className="pokedex-container">
        <h2 className="pokedex-title">🔎 Pokédex</h2>

        <div className="pokedex-search-box">
          <input
            className="pokedex-input"
            type="text"
            placeholder="Digite o nome do Pokémon"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarPokemon()} // Atalho de buscar ao apertar Enter
          />
          <button className="pokedex-button" onClick={buscarPokemon}>
            Buscar
          </button>
        </div>

        {carregando && <p className="pokedex-loading">Carregando...</p>}
        {erro && <p className="pokedex-error">{erro}</p>}

        {/* REFACTOR: Passando os dados do Pokémon para o componente PokeCard via props */}
        {pokemon && <PokeCard pokemon={pokemon} />}
      </div>
    </div>
  );
}