import { useState } from "react";
import PokeCard from "./components/PokeCard"; 
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
  const [erro, setErro] = useState("");
  
  const [listaPokemons, setListaPokemons] = useState<Pokemon[]>([]);

  const buscarPokemon = async () => {
    const nomeLimpo = nome.trim().toLowerCase();
    if (!nomeLimpo) return;

    // Validação extra: Evita buscar o que já está renderizado na tela
    if (listaPokemons.some((p) => p.name.toLowerCase() === nomeLimpo)) {
      setErro("Esse Pokémon já foi listado abaixo");
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomeLimpo}`);
      if (!resposta.ok) throw new Error("Pokémon não encontrado");

      const dados: Pokemon = await resposta.json();
      
      // 🌟 DESAFIO EXTRA: Adiciona o novo Pokémon no início do array para aparecer primeiro na listagem
      setListaPokemons((listaAnterior) => [dados, ...listaAnterior]);
      setNome(""); // Limpa o campo de texto para a próxima busca
    } catch {
      setErro("Pokémon não encontrado 😢");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="pokedex-app">
      <div className="pokedex-container">
        <h2 className="pokedex-title">🔎 Pokédex Histórica</h2>

        <div className="pokedex-search-box">
          <input
            className="pokedex-input"
            type="text"
            placeholder="Digite o nome (Ex: pikachu)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscarPokemon()}
          />
          <button className="pokedex-button" onClick={buscarPokemon}>
            Buscar
          </button>
        </div>

        {carregando && <p className="pokedex-loading">Carregando...</p>}
        {erro && <p className="pokedex-error">{erro}</p>}

        {/* 🌟 DESAFIO EXTRA: Mapeia o array renderizando múltiplos PokeCards com chaves estáveis (id ou name) */}
        <div className="pokedex-grid">
          {listaPokemons.map((pokemonIndividual) => (
            <PokeCard key={pokemonIndividual.name} pokemon={pokemonIndividual} />
          ))}
        </div>
      </div>
    </div>
  );
}