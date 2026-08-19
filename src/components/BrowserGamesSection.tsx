import React, { useState } from 'react';
import { 
  Gamepad2, 
  Play, 
  ExternalLink, 
  Search, 
  Star,
  Layers
} from 'lucide-react';
import { BROWSER_GAMES } from '../data/browserGamesData';

export const BrowserGamesSection: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<string>('all');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const platforms = [
    { id: 'all', label: 'Todas as Plataformas', count: BROWSER_GAMES.length },
    { id: 'Poki', label: 'Poki (poki.com)', count: BROWSER_GAMES.filter(g => g.platform === 'Poki').length },
    { id: 'Jogos 360', label: 'Jogos 360 (jogos360.com.br)', count: BROWSER_GAMES.filter(g => g.platform === 'Jogos 360').length },
    { id: 'Web IO', label: 'Web IO & Multiplayer', count: BROWSER_GAMES.filter(g => g.platform === 'Web IO').length }
  ];

  const categories = [
    'Todos', 
    'Mais Jogados', 
    '2 Jogadores', 
    'Motos & Carros', 
    'Esportes & Futebol', 
    '3D'
  ];

  const filteredGames = BROWSER_GAMES.filter(g => {
    if (activePlatform !== 'all' && g.platform !== activePlatform) {
      return false;
    }
    if (activeCategory !== 'Todos' && !g.tags.includes(activeCategory)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = g.title.toLowerCase().includes(q);
      const matchDesc = g.description.toLowerCase().includes(q);
      const matchTag = g.tags.some(t => t.toLowerCase().includes(q));
      const matchPlatform = g.platform.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchTag || matchPlatform;
    }
    return true;
  });

  const getPlatformBadgeColor = (platform: string) => {
    switch (platform) {
      case 'Poki': return 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40';
      case 'Jogos 360': return 'bg-amber-950/90 text-amber-300 border-amber-500/40';
      case 'Web IO': return 'bg-purple-950/90 text-purple-300 border-purple-500/40';
      default: return 'bg-blue-950/90 text-blue-300 border-blue-500/40';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0e1630] via-[#101b3b] to-[#080d1e] border border-cyan-800/40 p-6 sm:p-8 shadow-2xl shadow-cyan-950/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
              Portal de Jogos Web (Poki & Jogos 360)
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Jogos no Navegador <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Com Capa & Redirecionamento Direto</span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Jogue os sucessos oficiais como <strong>Subway Surfers</strong> no Poki com capas em alta resolução e direcionamento instantâneo para o site oficial!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
            <a
              href="https://poki.com/en/g/subway-surfers"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-cyan-950 cursor-pointer transition-all hover:scale-105"
            >
              <span>Subway Surfers Poki Oficial</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Platform Switcher Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Filtrar por Plataforma:
          </span>
          <span className="text-xs text-cyan-300 font-medium">
            {filteredGames.length} jogos disponíveis
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {platforms.map((p) => {
            const isSelected = activePlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePlatform(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-950 scale-[1.02]'
                    : 'bg-[#131826] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{p.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {p.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar jogo (Subway Surfers...)"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121727] border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                  : 'bg-[#131826] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games List Grid with Direct Redirect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredGames.map((game) => (
          <a
            key={game.id}
            href={game.gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl bg-[#121727] border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-1 cursor-pointer"
          >
            {/* Thumbnail Header */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121727] via-transparent to-black/40"></div>
              
              {/* Platform Badge */}
              <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${getPlatformBadgeColor(game.platform)}`}>
                {game.platform}
              </span>

              {/* Rating Star */}
              {game.rating && (
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {game.rating}
                </span>
              )}

              {/* Play Overlay */}
              <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-500/90 group-hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transition-all scale-90 group-hover:scale-110">
                <Play className="w-6 h-6 ml-0.5 fill-slate-950" />
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-base line-clamp-1">
                  {game.title}
                </h3>

                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-cyan-400/90 font-medium">
                    {game.genre}
                  </span>
                  {game.developer && (
                    <>
                      <span className="text-slate-600">•</span>
                      <span className="text-[10px] text-slate-400 truncate">
                        {game.developer}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                  {game.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-cyan-400 font-bold flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Abrir no Site Oficial
                </span>
                
                <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold shadow-md flex items-center gap-1">
                  <span>Jogar</span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12 bg-[#121727] rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">Nenhum jogo encontrado para "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('Todos'); setActivePlatform('all'); }}
            className="mt-3 text-xs text-cyan-400 hover:underline cursor-pointer"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}
    </div>
  );
};
