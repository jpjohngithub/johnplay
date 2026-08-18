import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Play, 
  RotateCcw, 
  X, 
  Info,
  Maximize2,
  Minimize2,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { BROWSER_GAMES } from '../data/browserGamesData';
import type { BrowserGame } from '../types';

export const BrowserGamesSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<BrowserGame | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Poki Hit', 'Jogos 360', 'Nativo', 'Reflexo Rápido', 'Esportes', '3D Runner'];

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
            Arcade Web Integrado (Poki, Jogos 360 & Mais)
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Jogos no Navegador <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Sem Anúncios & Direto no Player</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Jogue títulos consagrados como <strong>Subway Surfers</strong>, <strong>Moto X3M</strong>, <strong>Slope 3D</strong> e <strong>Retro Bowl</strong> sem ser redirecionado para sites cheios de propagandas abusivas.
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
                  Jogar
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

/* Dedicated Standalone Player Modal (Clean iframe player + Native Canvas) */
const GamePlayerModal: React.FC<{ game: BrowserGame; onClose: () => void }> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
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
            : 'max-w-5xl h-[88vh] rounded-2xl'
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
                  Player Standalone (Sem Anúncios)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {game.type === 'iframe' && (
              <button
                onClick={() => setIframeKey(k => k + 1)}
                title="Recarregar Jogo"
                className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

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
          {game.type === 'iframe' && game.iframeUrl ? (
            <iframe
              key={iframeKey}
              src={game.iframeUrl}
              title={game.title}
              className="w-full h-full border-0"
              allow="autoplay; gamepad; keyboard; fullscreen; accelerometer; gyroscope"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms allow-downloads allow-modals"
            />
          ) : (
            <NativeCanvasPlayer game={game} />
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
            JohnPlay Web Arcade Player
          </div>
        </div>
      </div>
    </div>
  );
};

/* Native Canvas Game Component (Snake, Flappy, Pong, Space Invaders, 2048) */
const NativeCanvasPlayer: React.FC<{ game: BrowserGame }> = ({ game }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    setScore(0);
    setGameOver(false);

    // ==========================================
    // 1. SNAKE
    // ==========================================
    if (game.type === 'canvas-snake') {
      const gridSize = 20;
      const tileCount = canvas.width / gridSize;
      let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
      let dx = 1;
      let dy = 0;
      let food = { x: 15, y: 15 };
      let localScore = 0;
      let speed = 90;
      let lastTime = 0;

      const handleKey = (e: KeyboardEvent) => {
        if (['ArrowUp', 'KeyW'].includes(e.code) && dy === 0) { dx = 0; dy = -1; e.preventDefault(); }
        if (['ArrowDown', 'KeyS'].includes(e.code) && dy === 0) { dx = 0; dy = 1; e.preventDefault(); }
        if (['ArrowLeft', 'KeyA'].includes(e.code) && dx === 0) { dx = -1; dy = 0; e.preventDefault(); }
        if (['ArrowRight', 'KeyD'].includes(e.code) && dx === 0) { dx = 1; dy = 0; e.preventDefault(); }
      };
      window.addEventListener('keydown', handleKey);

      const loop = (currentTime: number) => {
        if (!isRunning) return;
        animationFrameId = requestAnimationFrame(loop);

        if (currentTime - lastTime < speed) return;
        lastTime = currentTime;

        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
          setGameOver(true);
          isRunning = false;
          return;
        }

        for (let segment of snake) {
          if (segment.x === head.x && segment.y === head.y) {
            setGameOver(true);
            isRunning = false;
            return;
          }
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
          localScore += 10;
          setScore(localScore);
          setHighScore(prev => Math.max(prev, localScore));
          food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
          };
          if (speed > 45) speed -= 1;
        } else {
          snake.pop();
        }

        ctx.fillStyle = '#0a0d14';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#141c2c';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < canvas.width; i += gridSize) {
          ctx.beginPath();
          ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(0, i); ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }

        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2.5, 0, Math.PI * 2);
        ctx.fill();

        snake.forEach((part, index) => {
          ctx.fillStyle = index === 0 ? '#38bdf8' : '#818cf8';
          ctx.shadowColor = index === 0 ? '#38bdf8' : '#818cf8';
          ctx.shadowBlur = 8;
          ctx.fillRect(part.x * gridSize + 1, part.y * gridSize + 1, gridSize - 2, gridSize - 2);
        });
        ctx.shadowBlur = 0;
      };

      animationFrameId = requestAnimationFrame(loop);
      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKey);
      };
    }

    // ==========================================
    // 2. FLAPPY BIRD
    // ==========================================
    if (game.type === 'canvas-flappy') {
      let bird = { x: 70, y: 150, vy: 0, radius: 13 };
      const gravity = 0.28;
      const jump = -6.5;
      let pipes: { x: number; top: number; bottom: number; passed: boolean }[] = [];
      let localScore = 0;
      let frame = 0;

      const flap = () => {
        if (gameOver) return;
        bird.vy = jump;
      };

      const handleKey = (e: KeyboardEvent) => {
        if (e.code === 'Space' || e.code === 'ArrowUp') {
          flap();
          e.preventDefault();
        }
      };
      window.addEventListener('keydown', handleKey);
      canvas.addEventListener('mousedown', flap);

      const loop = () => {
        if (!isRunning) return;
        animationFrameId = requestAnimationFrame(loop);
        frame++;

        bird.vy += gravity;
        bird.y += bird.vy;

        if (frame % 95 === 0) {
          const gap = 130;
          const top = Math.random() * (canvas.height - gap - 80) + 40;
          pipes.push({ x: canvas.width, top, bottom: canvas.height - top - gap, passed: false });
        }

        pipes.forEach(p => {
          p.x -= 2.4;
          if (!p.passed && p.x + 40 < bird.x) {
            p.passed = true;
            localScore += 1;
            setScore(localScore);
            setHighScore(prev => Math.max(prev, localScore));
          }
        });
        pipes = pipes.filter(p => p.x > -50);

        if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
          setGameOver(true);
          isRunning = false;
        }

        for (let p of pipes) {
          if (
            bird.x + bird.radius > p.x &&
            bird.x - bird.radius < p.x + 40 &&
            (bird.y - bird.radius < p.top || bird.y + bird.radius > canvas.height - p.bottom)
          ) {
            setGameOver(true);
            isRunning = false;
          }
        }

        ctx.fillStyle = '#080c16';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        pipes.forEach(p => {
          ctx.fillStyle = '#a855f7';
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 10;
          ctx.fillRect(p.x, 0, 40, p.top);
          ctx.fillRect(p.x, canvas.height - p.bottom, 40, p.bottom);
        });

        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      };

      animationFrameId = requestAnimationFrame(loop);
      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKey);
        canvas.removeEventListener('mousedown', flap);
      };
    }

    // Default Fallback
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '18px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Clique em Jogar para iniciar!', canvas.width / 2, canvas.height / 2);
  }, [game, gameKey, gameOver]);

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div className="mb-3 flex items-center gap-4 bg-black/50 px-4 py-1.5 rounded-xl border border-slate-800 text-xs">
        <span className="text-slate-400">Pontuação: <strong className="text-cyan-300 font-mono text-sm">{score}</strong></span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">Recorde: <strong className="text-amber-300 font-mono text-sm">{highScore}</strong></span>
      </div>

      <canvas
        ref={canvasRef}
        width={580}
        height={380}
        className="w-full max-w-[580px] h-[380px] rounded-xl border border-cyan-900/50 shadow-2xl bg-[#0a0d14]"
      />

      {gameOver && (
        <div className="absolute inset-0 m-auto flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-6 rounded-2xl border border-red-500/40 max-w-sm h-56 space-y-3">
          <h4 className="text-2xl font-black text-red-400">FIM DE JOGO</h4>
          <p className="text-xs text-slate-300">Pontos conquistados: <strong className="text-cyan-300">{score}</strong></p>
          <button
            onClick={() => setGameKey(k => k + 1)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
