import React, { useState } from 'react';
import { Search, Loader2, Zap, Heart, Shield, Hash, Swords, Hand, Info } from 'lucide-react';

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface TypeSlot {
  type: {
    name: string;
  };
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: Stat[];
  types: TypeSlot[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}

const typeColors: { [key: string]: string } = {
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  bug: 'bg-lime-500',
  normal: 'bg-gray-400',
  poison: 'bg-purple-500',
  ground: 'bg-amber-700',
  fairy: 'bg-pink-400',
  fighting: 'bg-orange-700',
  psychic: 'bg-fuchsia-500',
  rock: 'bg-stone-500',
  ghost: 'bg-indigo-700',
  ice: 'bg-sky-400',
  dragon: 'bg-violet-700',
  dark: 'bg-gray-700',
  steel: 'bg-slate-500',
  flying: 'bg-cyan-400',
};

const statIcons: { [key: string]: React.ReactNode } = {
  hp: <Heart className="w-4 h-4 text-red-600" />,
  attack: <Swords className="w-4 h-4 text-orange-600" />,
  defense: <Shield className="w-4 h-4 text-blue-600" />,
  'special-attack': <Zap className="w-4 h-4 text-purple-600" />,
  'special-defense': <Hand className="w-4 h-4 text-green-600" />,
  speed: <Zap className="w-4 h-4 text-cyan-600" />,
};


const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = async (query: string) => {
    if (!query) {
      setError("Por favor, digite o nome ou ID do Pokémon.");
      setPokemon(null);
      return;
    }

    setLoading(true);
    setError(null);
    setPokemon(null);

    const normalizedQuery = query.toLowerCase().trim();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${normalizedQuery}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Pokémon "${query}" não encontrado.`);
        }
        throw new Error(`Erro ao buscar dados: ${response.status}`);
      }

      const data: Pokemon = await response.json();
      setPokemon(data);

    } catch (err: any) {
      setError(err.message || "Ocorreu um erro desconhecido durante a busca.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchPokemon(searchQuery);
  };
  
  const formatStatName = (name: string): string => {
    switch (name) {
      case 'hp': return 'HP';
      case 'attack': return 'Ataque';
      case 'defense': return 'Defesa';
      case 'special-attack': return 'Ataque Esp.';
      case 'special-defense': return 'Defesa Esp.';
      case 'speed': return 'Velocidade';
      default: return name;
    }
  };
  
  const formatPokemonName = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  const getImageUrl = (poke: Pokemon): string => {
      return poke.sprites.other?.['official-artwork']?.front_default || poke.sprites.front_default;
  };


  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 font-sans text-gray-800">
      
      <header className="w-full max-w-lg bg-blue-600 p-4 rounded-b-xl shadow-xl mb-6 flex flex-col items-center border-b-4 border-yellow-400">
        <h1 className="text-3xl font-black tracking-wider uppercase text-white">
          Qual é esse Pokémon?
        </h1>
        <p className="text-sm mt-1 text-blue-200">Pesquise sobre o seu Pokémon favorito</p>
      </header>
      
      <div className="w-full max-w-lg mb-8 flex space-x-2">
        <input
          type="text"
          placeholder="Escreva o nome do Pokémon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          className="flex-grow p-3 rounded-xl border-2 border-blue-500 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-all shadow-md"
          disabled={loading}
        />
        <button
          onClick={handleSearch}
          className="p-3 bg-yellow-400 rounded-xl hover:bg-yellow-500 active:bg-yellow-600 transition-colors shadow-lg disabled:bg-yellow-600 disabled:opacity-75 flex items-center justify-center border border-yellow-500"
          disabled={loading}
        >
          <Search className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      <div className="w-full max-w-lg min-h-64 flex items-center justify-center">

        {loading && (
          <div className="flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-blue-700">Buscando Pokémon...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-100 p-4 rounded-xl text-center border border-red-400 shadow-xl text-red-800">
            <p className="font-bold">Falha na Busca:</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {pokemon && !loading && !error && (
          <div className={`w-full bg-white p-6 rounded-3xl shadow-2xl border-2 border-blue-500`}>
            
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-3">
              <h2 className="text-4xl font-black text-blue-600">
                {formatPokemonName(pokemon.name)}
              </h2>
              <span className="text-2xl font-extrabold flex items-center bg-yellow-400 p-2 rounded-lg text-gray-800">
                <Hash className="w-5 h-5 mr-1 text-blue-600" />
                {pokemon.id}
              </span>
            </div>
            
            <div className="flex flex-col items-center">
                <img
                    src={getImageUrl(pokemon)}
                    alt={pokemon.name}
                    className="w-48 h-48 object-contain mb-4 filter drop-shadow-lg"
                    onError={(e) => {
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = pokemon.sprites.front_default || "https://placehold.co/192x192/4F46E5/FFF?text=IMG+ERR";
                    }}
                />
                
                <div className="flex space-x-2 mb-6">
                  {pokemon.types.map((typeSlot) => {
                    const typeName = typeSlot.type.name;
                    return (
                      <span
                        key={typeName}
                        className={`text-sm font-bold text-white uppercase px-4 py-1 rounded-full shadow-md ${typeColors[typeName] || 'bg-gray-600'}`}
                      >
                        {typeName}
                      </span>
                    );
                  })}
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-200 text-gray-800">
                    <h3 className="text-lg font-bold mb-2 text-blue-600 flex items-center"><Info className="w-4 h-4 mr-2" /> Informações</h3>
                    <div className="flex justify-between text-sm">
                        <p><span className="font-semibold text-gray-700">Altura:</span> {(pokemon.height / 10).toFixed(1)} m</p>
                        <p><span className="font-semibold text-gray-700">Peso:</span> {(pokemon.weight / 10).toFixed(1)} kg</p>
                    </div>
                </div>

                <div className="col-span-2 space-y-2">
                    <h3 className="text-lg font-bold mb-2 text-blue-600 flex items-center"><Shield className="w-4 h-4 mr-2" /> Estatísticas Base</h3>
                    {pokemon.stats.map((statSlot) => (
                      <div key={statSlot.stat.name} className="flex items-center space-x-2">
                        {statIcons[statSlot.stat.name] || <Info className="w-4 h-4" />}
                        <span className="w-24 text-sm font-semibold text-gray-600">{formatStatName(statSlot.stat.name)}:</span>
                        <div className="flex-grow h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${statSlot.base_stat > 100 ? 'bg-yellow-500' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(statSlot.base_stat, 100)}%` }}
                          ></div>
                        </div>
                        <span className="w-8 text-right font-bold text-sm text-gray-800">{statSlot.base_stat}</span>
                      </div>
                    ))}
                </div>
            </div>

          </div>
        )}
      </div>
      
      {!pokemon && !loading && !error && (
         <div className="bg-white p-6 rounded-xl text-center border border-blue-500 shadow-xl">
            <p className="font-bold text-blue-600">Inicie a Busca!</p>
            <p className="text-sm mt-1 text-gray-600">Digite um nome ou ID para ver os detalhes do Pokémon.</p>
        </div>
      )}

    </div>
  );
};

export default App;