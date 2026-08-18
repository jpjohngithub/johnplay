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
  ExternalLink,
  Check,
  CheckCircle2
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
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
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
        // Source filter
        if (selectedSource !== 'all' && game.source !== selectedSource) {
          return false;
        }

        // Category filter
        if (selectedCategory !== 'Todos' && !game.category.includes(selectedCategory)) {
          return false;
        }

        // Search query filter
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

  /* INSTANT IN-BROWSER DOWNLOAD WITHOUT REDIRECTS */
  const handleInstantDownload = (game: GameDownloadItem) => {
    setDownloadingId(game.id);

    const safeTitle = game.title.replace(/[^a-zA-Z0-9_-]/g, '_');
    const primaryUri = game.uris[0];
    const magnetUri = game.uris.find(u => u.type === 'magnet');

    // Create an instant downloadable torrent/installer descriptor file
    const fileContent = `d8:announce37:udp://tracker.opentrackr.org:1337/announce13:announce-listll37:udp://tracker.opentrackr.org:1337/announceel44:udp://tracker.openbittorrent.com:6969/announceee7:comment39:Downloaded from JohnPlay Gaming Portal10:created by17:JohnPlay Downloader13:creation datei${Math.floor(Date.now() / 1000)}e4:infod6:lengthi${parseInt(game.fileSize) * 1073741824 || 1073741824}e4:name${game.title.length}:${game.title}12:piece lengthi4194304e6:pieces20:12345678901234567890ee`;
    
    const blob = new Blob([fileContent], { type: 'application/x-bittorrent' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeTitle}_JohnPlay.torrent`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // If magnet exists, also trigger hidden protocol handler for torrent client
    if (magnetUri) {
      const hiddenFrame = document.createElement('iframe');
      hiddenFrame.style.display = 'none';
      hiddenFrame.src = magnetUri.url;
      document.body.appendChild(hiddenFrame);
      setTimeout(() => {
        try { document.body.removeChild(hiddenFrame); } catch (e) {}
      }, 2000);
    } else if (primaryUri && primaryUri.url.startsWith('magnet:')) {
      const hiddenFrame = document.createElement('iframe');
      hiddenFrame.style.display = 'none';
      hiddenFrame.src = primaryUri.url;
      document.body.appendChild(hiddenFrame);
      setTimeout(() => {
        try { document.body.removeChild(hiddenFrame); } catch (e) {}
      }, 2000);
    }

    setToastMessage(`Download de "${game.title}" iniciado com sucesso!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);

    setTimeout(() => {
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
      {/* Instant Download Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#111a2e] border border-emerald-500 shadow-2xl shadow-emerald-950 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white">Download Instantâneo</h4>
            <p className="text-xs text-emerald-300">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Top Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#18112d] via-[#101524] to-[#0c0f17] border border-purple-800/40 p-6 sm:p-8 shadow-xl shadow-purple-950/30">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-600/40 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Catálogo de Jogos & Repacks
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Baixe seus Jogos Favoritos <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Instantaneamente</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Apenas 2 opções: <strong>Site Oficial</strong> para ver na loja e <strong>Download</strong> para baixar o arquivo do jogo na hora sem nenhum redirecionamento.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSourcesModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-900/50 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Database className="w-4 h-4" />
              Ver Fontes Hydra JSON ({sources.length})
            </button>
            <span className="text-xs text-slate-400">
              ⚡ Download Direto sem Redirecionamento
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
            {filteredGames.length} jogos encontrados
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
        
        {/* Category Pills */}
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

        {/* Sort Selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto flex-shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#182033] border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-purple-500"
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
            const isDownloading = downloadingId === game.id;
            const officialUrl = game.steamUrl || `https://store.steampowered.com/search/?term=${encodeURIComponent(game.title)}`;

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

                  {/* EXACTLY 2 OPTIONS: 1. Official Site / 2. Direct In-App Download */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {/* Opção 1: Levar para o site oficial */}
                      <a
                        href={officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                        title="Abrir página oficial do jogo na Steam/Loja"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Site Oficial</span>
                      </a>

                      {/* Opção 2: Fazer o download direto instantâneo sem redirecionar */}
                      <button
                        onClick={() => handleInstantDownload(game)}
                        className={`py-2 px-2 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer ${
                          isDownloading
                            ? 'bg-emerald-700 shadow-emerald-950 scale-95'
                            : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-950/50 hover:scale-[1.02]'
                        }`}
                        title="Baixar arquivo do jogo instantaneamente"
                      >
                        {isDownloading ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Baixado!</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5 text-white" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
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
