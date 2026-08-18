import React, { useState } from 'react';
import { 
  Gamepad2, 
  Play, 
  ExternalLink, 
  Search, 
  Sparkles, 
  Star
} from 'lucide-react';
import { BROWSER_GAMES } from '../data/browserGamesData';

export const BrowserGamesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Todos', 
    'Mais Jogados', 
    '3D', 
    'Carros', 
    'Motos', 
    'Esportes', 
    '2 Jogadores', 
    'Tiro', 
    'Quebra-Cabeça'
  ];

  const filteredGames = BROWSER_GAMES.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;
    if (activeCategory === 'Todos') return true;
    return g.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase());
  });

  const openPokiGame = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Hero Banner with Poki Branding */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c132c] via-[#101b3b] to-[#080d1e] border border-cyan-800/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
              Catálogo Oficial do Poki (poki.com)
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Jogos Oficiais do <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Poki</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Acesse diretamente os sucessos mundiais do <strong>Poki</strong> (Subway Surfers, Monkey Mart, Moto X3M, Drive Mad, Retro Bowl, 1v1.LOL, Paper.io 2, Level Devil e mais). Clique em qualquer jogo para <strong>jogar a versão oficial completa</strong>!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <a
              href="https://poki.com/pt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 cursor-pointer transition-all hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir Poki.com Completo</span>
            </a>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 bg-[#090e1c]/80 px-3.5 py-2 rounded-xl border border-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              <span>{BROWSER_GAMES.length}+ Jogos Originais Catalogados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar jogo no Poki..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121727] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950 scale-[1.02]'
                  : 'bg-[#131826] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-2xl bg-[#121727] border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-1"
          >
            {/* Thumbnail Header */}
            <div 
              onClick={() => openPokiGame(game.pokiUrl)}
              className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer"
            >
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121727] via-transparent to-black/40"></div>
              
              {/* Badge Genre */}
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                {game.genre}
              </span>

              {/* Rating Star */}
              {game.rating && (
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {game.rating}
                </span>
              )}

              {/* Center Play Button Overlay */}
              <div
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-500/90 group-hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transition-all scale-90 group-hover:scale-110"
              >
                <Play className="w-6 h-6 ml-0.5 fill-slate-950" />
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 
                    onClick={() => openPokiGame(game.pokiUrl)}
                    className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-base line-clamp-1 cursor-pointer"
                    title={game.title}
                  >
                    {game.title}
                  </h3>
                </div>

                {game.developer && (
                  <p className="text-[11px] text-cyan-400/80 font-medium mt-0.5">
                    Por: {game.developer}
                  </p>
                )}

                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {game.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {game.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 truncate max-w-[160px]">
                  🎮 {game.controls}
                </span>
                
                <button
                  onClick={() => openPokiGame(game.pokiUrl)}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                >
                  <span>Jogar no Poki</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12 bg-[#121727] rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">Nenhum jogo encontrado para "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('Todos'); }}
            className="mt-3 text-xs text-cyan-400 hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
};
