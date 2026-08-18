import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Play, 
  X, 
  Info,
  Maximize2,
  Minimize2,
  Sparkles,
  ShieldCheck,
  Upload,
  FolderOpen
} from 'lucide-react';
import { BROWSER_GAMES } from '../data/browserGamesData';
import type { BrowserGame } from '../types';

export const BrowserGamesSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<BrowserGame | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Poki Hit', 'Jogos 360', 'Emulador Web', '3D Runner', 'Reflexo Rápido', 'Esportes'];

  const filteredGames = BROWSER_GAMES.filter(g => {
    if (activeCategory === 'Todos') return true;
    return g.tags.some(t => t.toLowerCase() === activeCategory.toLowerCase());
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b1033] via-[#121626] to-[#0c0f17] border border-purple-800/40 p-6 sm:p-8 shadow-xl shadow-purple-950/30">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
            <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
            Jogos Poki, Jogos 360 & Emuladores de Console Web
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Jogos de Navegador <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Originais do Poki & Emuladores</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Jogue os grandes sucessos do <strong>Poki</strong> e <strong>Jogos 360</strong> (Subway Surfers 3D, Moto X3M Stunts, Slope 3D, Retro Bowl, 1v1.LOL, Paper.io 2) e use <strong>Emuladores Web (GBA, SNES, Sega)</strong> hospedados diretamente no site com zero propagandas e 100% livres de 404!
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white shadow-md shadow-cyan-950 scale-[1.02]'
                : 'bg-[#131826] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Games List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-2xl bg-[#121727] border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-1"
          >
            <div 
              onClick={() => setSelectedGame(game)}
              className="relative h-44 w-full overflow-hidden bg-slate-900 cursor-pointer"
            >
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-85 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121727] via-transparent to-black/40"></div>
              
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                {game.genre}
              </span>

              <button
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-purple-600/90 group-hover:bg-cyan-500 text-white flex items-center justify-center shadow-lg transition-all scale-90 group-hover:scale-110"
              >
                <Play className="w-6 h-6 ml-0.5 fill-white" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 
                  onClick={() => setSelectedGame(game)}
                  className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-base line-clamp-1 cursor-pointer"
                  title={game.title}
                >
                  {game.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {game.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {game.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 truncate max-w-[170px]">
                  🎮 {game.controls}
                </span>
                <button
                  onClick={() => setSelectedGame(game)}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Jogar Agora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Game Player Modal */}
      {selectedGame && (
        <GamePlayerModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

/* Dedicated Standalone Player Modal */
const GamePlayerModal: React.FC<{ game: BrowserGame; onClose: () => void }> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(err => console.error(err));
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div 
        ref={containerRef}
        className={`relative w-full ${
          isFullscreen 
            ? 'h-full max-w-none max-h-none rounded-none' 
            : 'max-w-5xl h-[92vh] rounded-2xl'
        } bg-[#0b0f19] border border-cyan-800/40 shadow-2xl shadow-cyan-950/80 flex flex-col overflow-hidden transition-all`}
      >
        
        {/* Player Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#121827] border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/40 text-cyan-300">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h3 className="font-bold text-white text-sm sm:text-base truncate">{game.title}</h3>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="text-cyan-300 font-medium">{game.genre}</span>
                <span>•</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {game.type === 'web-emulator' ? 'Emulador WebAssembly (Save/Load States)' : 'Poki / Jogos 360 Original (Sem Anúncios)'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              title="Fechar Player"
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-red-950/60 hover:text-red-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Game Stage Area */}
        <div className="relative flex-1 w-full h-full bg-[#05070d] flex items-center justify-center overflow-hidden">
          {game.type === 'web-emulator' ? (
            <WebRetroEmulatorPlayer core={game.emulatorCore || 'gba'} title={game.title} />
          ) : (
            <iframe
              src={game.gameUrl}
              title={game.title}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; keyboard; gamepad"
            />
          )}
        </div>

        {/* Player Controls Guide Footer */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0f1422] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-shrink-0">
          <div className="flex items-center gap-2 truncate">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="truncate"><strong>Controles:</strong> {game.controls}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-purple-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            JohnPlay Poki Web Player
          </div>
        </div>
      </div>
    </div>
  );
};

/* WebAssembly Retro Emulator Component */
const WebRetroEmulatorPlayer: React.FC<{ core: string; title: string }> = ({ core, title }) => {
  const [loadedRomName, setLoadedRomName] = useState<string | null>(null);
  const [isEmulatorActive, setIsEmulatorActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [emulatorHtml, setEmulatorHtml] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoadedRomName(file.name);
    const romBlobUrl = URL.createObjectURL(file);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#05070d; display:flex; align-items:center; justify-content:center; }
            #game { width:100%; height:100%; }
          </style>
        </head>
        <body>
          <div id="game"></div>
          <script>
            window.EJS_player = '#game';
            window.EJS_core = '${core}';
            window.EJS_gameUrl = '${romBlobUrl}';
            window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
            window.EJS_startOnLoaded = true;
          </script>
          <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
        </body>
      </html>
    `;
    setEmulatorHtml(html);
    setIsEmulatorActive(true);
  };

  const startDemoGame = () => {
    setLoadedRomName(`Emulador ${core.toUpperCase()} Ativado`);
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body, html { margin:0; padding:0; width:100%; height:100%; overflow:hidden; background:#05070d; display:flex; align-items:center; justify-content:center; }
            #game { width:100%; height:100%; }
          </style>
        </head>
        <body>
          <div id="game"></div>
          <script>
            window.EJS_player = '#game';
            window.EJS_core = '${core}';
            window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
            window.EJS_startOnLoaded = true;
          </script>
          <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
        </body>
      </html>
    `;
    setEmulatorHtml(html);
    setIsEmulatorActive(true);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      {isEmulatorActive ? (
        <iframe
          srcDoc={emulatorHtml}
          title={title}
          className="w-full h-full border-0 rounded-xl"
          allow="autoplay; gamepad; keyboard; fullscreen"
        />
      ) : (
        <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-[#0e1424] border border-cyan-700/40 shadow-2xl text-center space-y-5 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-300">
            <Gamepad2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Carregue qualquer arquivo de ROM (<strong>.{core}</strong>, <strong>.zip</strong>, <strong>.bin</strong>) para jogar com aceleração WebAssembly e suporte a controles!
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".gba,.snes,.sfc,.smc,.nes,.gen,.md,.bin,.zip,.iso,.n64"
          />

          <div className="space-y-3 pt-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-950 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Upload className="w-4 h-4" />
              <span>Carregar ROM do Computador ({core.toUpperCase()})</span>
            </button>

            <button
              onClick={startDemoGame}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 cursor-pointer transition-all"
            >
              <FolderOpen className="w-4 h-4 text-purple-400" />
              <span>Iniciar Emulador em Branco</span>
            </button>
          </div>

          {loadedRomName && (
            <p className="text-xs text-emerald-400 font-mono">
              Status: {loadedRomName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
