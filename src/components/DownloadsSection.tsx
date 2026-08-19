import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Search, 
  Filter, 
  HardDrive, 
  Star, 
  Database,
  ArrowUpDown,
  Sparkles,
  Check,
  CheckCircle2,
  Copy,
  Zap,
  ChevronLeft,
  ChevronRight,
  Flame,
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
  const [heroIndex, setHeroIndex] = useState(0);

  const categories = [
    'Todos',
    'AAA Hits',
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

  // Epic Games style featured games list for hero banner
  const featuredGames = useMemo(() => {
    return games.slice(0, 5);
  }, [games]);

  const currentHero = featuredGames[heroIndex] || games[0];

  const filteredGames = useMemo(() => {
    return games
      .filter((game) => {
        if (selectedSource !== 'all' && game.source !== selectedSource) {
          return false;
        }
        if (selectedCategory === 'AAA Hits' && (game.rating || 0) < 9.5) {
          return false;
        }
        if (selectedCategory !== 'Todos' && selectedCategory !== 'AAA Hits' && !game.category.includes(selectedCategory)) {
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
      setToastMessage(`Magnet Link de "${game.title}" copiado com sucesso!`);
      setTimeout(() => setToastMessage(null), 3500);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleStartDownload = (game: GameDownloadItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const magnetUri = game.uris.find(u => u.type === 'magnet') || game.uris[0];
    if (magnetUri) {
      const link = document.createElement('a');
      link.href = magnetUri.url;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setToastMessage(`Iniciando download do addon de "${game.title}" igual no Hydra!`);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#0f172a] border border-emerald-500/60 shadow-2xl shadow-emerald-950/80 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 animate-bounce" />
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hydra Download Engine</h4>
            <p className="text-xs text-emerald-300">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* EPIC GAMES STORE FEATURED SPOTLIGHT CAROUSEL */}
      {currentHero && (
        <div className="relative rounded-3xl overflow-hidden bg-[#0e121e] border border-purple-900/40 shadow-2xl shadow-purple-950/40 transition-all">
          {/* Background Hero Image with Backdrop Gradient */}
          <div className="relative h-[380px] sm:h-[440px] w-full overflow-hidden">
            <img
              src={currentHero.coverImage}
              alt={currentHero.title}
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-125 scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0e17] via-[#0b0e17]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e17] via-transparent to-black/30"></div>

            {/* Top Badge Overlay */}
            <div className="absolute top-6 left-6 sm:left-10 flex flex-wrap items-center gap-2.5 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-purple-900/50 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-yellow-300" />
                Destaque da Semana
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md ${getSourceBadgeColor(currentHero.source)}`}>
                {currentHero.sourceName}
              </span>
              {currentHero.rating && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {currentHero.rating} / 10
                </span>
              )}
            </div>

            {/* Left Content Area */}
            <div className="absolute bottom-8 left-6 sm:left-10 right-6 sm:right-auto max-w-2xl z-10 space-y-4">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-lg leading-tight">
                {currentHero.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-xl">
                {currentHero.description}
              </p>

              {/* Tags & Storage */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800/40 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                  {currentHero.fileSize}
                </span>
                {currentHero.category.map((cat, i) => (
                  <span key={i} className="text-xs font-medium text-slate-300 bg-slate-800/70 px-2.5 py-1 rounded-lg border border-slate-700/50">
                    {cat}
                  </span>
                ))}
              </div>

              {/* Primary Call-to-Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={(e) => handleStartDownload(currentHero, e)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-950/60 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer uppercase tracking-wider"
                >
                  <Download className="w-4 h-4 stroke-[3]" />
                  <span>Download do Addon (Hydra Engine)</span>
                </button>

                <button
                  onClick={() => onSelectGame(currentHero)}
                  className="px-5 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 shadow-md flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-cyan-400" />
                  <span>Detalhes & Specs</span>
                </button>
              </div>
            </div>

            {/* Carousel Navigation Arrows */}
            <div className="absolute bottom-6 right-6 z-20 hidden sm:flex items-center gap-2">
              <button
                onClick={() => setHeroIndex((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1))}
                className="p-3 rounded-2xl bg-black/60 hover:bg-black/90 text-white border border-slate-700/60 transition-all cursor-pointer hover:scale-110"
                title="Anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-slate-400 font-mono px-2">
                {heroIndex + 1} / {featuredGames.length}
              </span>
              <button
                onClick={() => setHeroIndex((prev) => (prev === featuredGames.length - 1 ? 0 : prev + 1))}
                className="p-3 rounded-2xl bg-black/60 hover:bg-black/90 text-white border border-slate-700/60 transition-all cursor-pointer hover:scale-110"
                title="Próximo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEAM & EPIC STORE HEADER CONTROL BAR */}
      <div className="space-y-4">
        {/* Source Filter Tabs */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-300">
              Fontes Hydra Addon ({sources.length}):
            </span>
          </div>
          <button
            onClick={onOpenSourcesModal}
            className="text-xs text-purple-300 hover:text-purple-100 font-semibold flex items-center gap-1.5 hover:underline cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-purple-400" />
            Gerenciar Fontes JSON
          </button>
        </div>

        {/* Source Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedSource('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSource === 'all'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50 scale-[1.02]'
                : 'bg-[#121727] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Todas as Fontes Addon ({games.length})
          </button>

          {sources.map((src) => {
            const count = games.filter(g => g.source === src.id).length;
            const isSelected = selectedSource === src.id;
            return (
              <button
                key={src.id}
                onClick={() => setSelectedSource(src.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/50 scale-[1.02]'
                    : 'bg-[#121727] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <span>{src.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Categories & Sort Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#101424] border border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <Filter className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 ml-1 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-900/70 text-purple-200 border border-purple-600/60 shadow-md'
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
              className="bg-[#182033] border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-purple-500 cursor-pointer font-medium"
            >
              <option value="recent">Mais Recentes</option>
              <option value="rating">Melhor Avaliação ⭐</option>
              <option value="size-asc">Menor Tamanho (GB)</option>
              <option value="size-desc">Maior Tamanho (GB)</option>
              <option value="name">Nome (A - Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* STEAM / EPIC GAMES STORE GRID */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredGames.map((game) => {
            return (
              <div
                key={game.id}
                className="group relative rounded-2xl bg-[#101423] border border-slate-800/90 hover:border-purple-500/70 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-950/50 hover:-translate-y-1.5"
              >
                {/* Poster Cover Header */}
                <div 
                  onClick={() => onSelectGame(game)}
                  className="relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101423] via-transparent to-black/40"></div>
                  
                  {/* Source Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md ${getSourceBadgeColor(game.source)}`}>
                    {game.sourceName}
                  </span>

                  {/* Size Badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/80 border border-slate-700 text-purple-300 flex items-center gap-1 backdrop-blur-md">
                    <HardDrive className="w-3 h-3" />
                    {game.fileSize}
                  </span>

                  {/* Rating Badge */}
                  {game.rating && (
                    <div className="absolute bottom-2 left-3 flex items-center gap-1 text-xs font-bold text-amber-300 bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm border border-amber-500/30">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{game.rating}</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 
                      onClick={() => onSelectGame(game)}
                      className="font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1 cursor-pointer"
                      title={game.title}
                    >
                      {game.title}
                    </h3>
                    
                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {game.category.slice(0, 2).map((cat, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-medium">
                          {cat}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {game.description}
                    </p>
                  </div>

                  {/* ACTION BUTTONS: HYDRA ADDON DOWNLOAD & DETAILS */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {/* Button 1: Download Direct (Hydra Engine Magnet Launcher) */}
                      <button
                        onClick={(e) => handleStartDownload(game, e)}
                        className="py-2.5 px-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/60 hover:scale-[1.02] transition-all cursor-pointer"
                        title="Baixar jogo diretamente via Addon (Hydra Engine)"
                      >
                        <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                        <span>Download</span>
                      </button>

                      {/* Button 2: Details & Specs Modal */}
                      <button
                        onClick={() => onSelectGame(game)}
                        className="py-2.5 px-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                        title="Ver requisitos de sistema e detalhes"
                      >
                        <Info className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Detalhes</span>
                      </button>
                    </div>

                    {/* Copy Magnet Link Quick Button */}
                    <button
                      onClick={(e) => handleCopyMagnet(game, e)}
                      className="w-full py-1.5 px-2 rounded-xl bg-black/40 hover:bg-black/70 text-[11px] text-purple-300/90 font-mono flex items-center justify-center gap-1 border border-purple-900/40 transition-colors cursor-pointer"
                    >
                      {copiedId === game.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Magnet Link Copiado!</span>
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
        <div className="p-12 text-center rounded-2xl bg-[#101423] border border-slate-800 space-y-3">
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
