import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  Layers, 
  HardDrive, 
  Star, 
  Database,
  ArrowUpDown,
  Sparkles,
  Check,
  CheckCircle2,
  Copy,
  Zap,
  Info
} from 'lucide-react';
import type { GameDownloadItem, RepackSourceId, HydraSourceInfo } from '../types';

interface DownloadsSectionProps {
  games: GameDownloadItem[];
  sources: HydraSourceInfo[];
  searchQuery: string;
  onOpenSourcesModal: () => void;
  onSelectGame: (game: GameDownloadItem) => void;
}

export const DownloadsSection: React.FC<DownloadsSectionProps> = ({
  games,
  sources,
  searchQuery,
  onOpenSourcesModal,
  onSelectGame
}) => {
  const [selectedSource, setSelectedSource] = useState<RepackSourceId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'size-asc' | 'size-desc' | 'name'>('recent');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    'Todos',
    'RPG',
    'Ação',
    'Mundo Aberto',
    'PC Fraco',
    'Souls-like',
    'Terror',
    'Corrida',
    'FPS',
    'Indie'
  ];

  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        if (selectedSource !== 'all' && game.source !== selectedSource) {
          return false;
        }
        if (selectedCategory !== 'Todos' && !game.category.includes(selectedCategory)) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = game.title.toLowerCase().includes(q);
          const matchesSource = game.sourceName.toLowerCase().includes(q);
          const matchesCategory = game.category.some(c => c.toLowerCase().includes(q));
          return matchesTitle || matchesSource || matchesCategory;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === 'name') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'size-asc') {
          return parseFloat(a.fileSize) - parseFloat(b.fileSize);
        }
        if (sortBy === 'size-desc') {
          return parseFloat(b.fileSize) - parseFloat(a.fileSize);
        }
        return b.uploadDate.localeCompare(a.uploadDate);
      });
  }, [games, selectedSource, selectedCategory, searchQuery, sortBy]);

  const getSourceBadgeColor = (source: RepackSourceId) => {
    switch (source) {
      case 'fitgirl': return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      case 'steamrip': return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'dodi': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'gog': return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'xatab': return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'atop': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'empress': return 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40';
      default: return 'bg-slate-700 text-slate-200 border-slate-600';
    }
  };

  const handleCopyMagnet = (game: GameDownloadItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const magnetUri = game.uris.find(u => u.type === 'magnet') || game.uris[0];
    if (magnetUri) {
      navigator.clipboard.writeText(magnetUri.url);
      setCopiedId(game.id);
      setToastMessage(`Magnet Link de "${game.title}" copiado para a área de transferência!`);
      setTimeout(() => setToastMessage(null), 3500);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#111a2e] border border-emerald-500 shadow-2xl shadow-emerald-950 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white">Download / Magnet Ativado</h4>
            <p className="text-xs text-emerald-300">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Top Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#18112d] via-[#101524] to-[#0c0f17] border border-purple-800/40 p-6 sm:p-8 shadow-xl shadow-purple-950/30">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-600/40 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Central de Downloads de Jogos (Direct & Magnet)
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Baixe seus Jogos Favoritos <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Sem Erros & Sem Bloqueios</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Todos os jogos das maiores fontes da cena gamer (FitGirl, DODI, SteamRIP, GOG, Xatab, Atop, Empress) com <strong>links Magnet diretos</strong> e <strong>servidores DDL de alta velocidade</strong>!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSourcesModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-900/50 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Database className="w-4 h-4" />
              Gerenciar Fontes Hydra JSON ({sources.length})
            </button>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Links Magnet & DDL 100% Testados
            </span>
          </div>
        </div>
      </div>

      {/* Source Filters Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Filtrar por Fonte:
          </span>
          <span className="text-xs text-purple-300 font-medium">
            {filteredGames.length} jogos disponíveis
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedSource === 'all'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                : 'bg-[#131826] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todas as Fontes ({games.length})
          </button>

          {sources.map((src) => {
            const count = games.filter(g => g.source === src.id).length;
            const isSelected = selectedSource === src.id;
            return (
              <button
                key={src.id}
                onClick={() => setSelectedSource(src.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40 scale-[1.02]'
                    : 'bg-[#131826] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{src.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills and Sort Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#111624] border border-slate-800">
        
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-900/60 text-purple-200 border border-purple-600/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#182033] border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-purple-500 cursor-pointer"
          >
            <option value="recent">Mais Recentes</option>
            <option value="rating">Melhor Avaliação ⭐</option>
            <option value="size-asc">Menor Tamanho (GB)</option>
            <option value="size-desc">Maior Tamanho (GB)</option>
            <option value="name">Nome (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredGames.map((game) => {
            const magnetUri = game.uris.find(u => u.type === 'magnet') || game.uris[0];
            const ddlUri = game.uris.find(u => u.type !== 'magnet') || game.uris[0];
            const downloadTargetUrl = magnetUri ? magnetUri.url : ddlUri.url;

            return (
              <div
                key={game.id}
                className="group relative rounded-2xl bg-[#121727] border border-slate-800/90 hover:border-purple-600/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-950/40 hover:-translate-y-1"
              >
                {/* Top Image Banner */}
                <div 
                  onClick={() => onSelectGame(game)}
                  className="relative h-44 w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121727] via-transparent to-black/30"></div>
                  
                  {/* Source Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md border ${getSourceBadgeColor(game.source)} backdrop-blur-md`}>
                    {game.sourceName}
                  </span>

                  {/* Size Badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/70 border border-slate-700 text-purple-300 flex items-center gap-1 backdrop-blur-md">
                    <HardDrive className="w-3 h-3" />
                    {game.fileSize}
                  </span>

                  {/* Rating */}
                  {game.rating && (
                    <div className="absolute bottom-2 left-3 flex items-center gap-1 text-xs font-bold text-amber-300 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm border border-amber-500/20">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{game.rating}</span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 
                      onClick={() => onSelectGame(game)}
                      className="font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1 cursor-pointer"
                      title={game.title}
                    >
                      {game.title}
                    </h3>
                    
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {game.category.slice(0, 2).map((cat, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* DOWNLOAD ACTIONS */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {/* Button 1: Native Direct Magnet Link (Opens qBittorrent/Torrent Client) */}
                      <a
                        href={downloadTargetUrl}
                        target="_self"
                        onClick={() => {
                          setToastMessage(`Disparando download de "${game.title}" no seu cliente torrent/navegador!`);
                          setTimeout(() => setToastMessage(null), 3500);
                        }}
                        className="py-2 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/50 hover:scale-[1.02] transition-all cursor-pointer"
                        title="Iniciar download no seu cliente torrent ou navegador"
                      >
                        <Download className="w-3.5 h-3.5 text-white" />
                        <span>Download</span>
                      </a>

                      {/* Button 2: Open Full Game Details & Links Modal */}
                      <button
                        onClick={() => onSelectGame(game)}
                        className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                        title="Ver requisitos, detalhes e espelhos de download"
                      >
                        <Info className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Detalhes</span>
                      </button>
                    </div>

                    {/* Copy Magnet Quick Button */}
                    <button
                      onClick={(e) => handleCopyMagnet(game, e)}
                      className="w-full py-1 px-2 rounded-lg bg-black/40 hover:bg-black/70 text-[11px] text-purple-300 font-mono flex items-center justify-center gap-1 border border-purple-900/40 transition-colors cursor-pointer"
                    >
                      {copiedId === game.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Magnet Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-purple-400" />
                          <span>Copiar Magnet Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#111624] border border-slate-800 space-y-3">
          <Search className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">Nenhum jogo encontrado</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Tente buscar com outros termos ou altere os filtros de fonte e categoria.
          </p>
        </div>
      )}
    </div>
  );
};
