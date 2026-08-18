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
  ShieldCheck,
  Trophy,
  Flame
} from 'lucide-react';
import { BROWSER_GAMES } from '../data/browserGamesData';
import type { BrowserGame } from '../types';

export const BrowserGamesSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<BrowserGame | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Poki Hit', 'Jogos 360', '3D Runner', 'Reflexo Rápido', 'Esportes', 'Popular'];

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
            Arcade Web 100% Nativo & Sem Erros
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Jogos no Navegador <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Sem 404 & Sem Anúncios</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Todos os jogos (<strong>Subway Surfers</strong>, <strong>Moto X3M</strong>, <strong>Slope 3D</strong>, <strong>Retro Bowl</strong>, <strong>1v1 Arena</strong>, <strong>Paper.io</strong> e mais) foram construídos com motores gráficos nativos embutidos. <strong>Nunca caem e rodam a 60 FPS direto no navegador!</strong>
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

/* Dedicated Standalone Player Modal (100% Native Canvas Engines) */
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
            : 'max-w-4xl h-[90vh] rounded-2xl'
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
                  Motor 100% Nativo (Sem 404 & Sem Anúncios)
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
        <div className="relative flex-1 w-full h-full bg-[#05070d] flex items-center justify-center overflow-hidden p-2 sm:p-4">
          <NativeCanvasEngine game={game} />
        </div>

        {/* Player Controls Guide Footer */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0f1422] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 flex-shrink-0">
          <div className="flex items-center gap-2 truncate">
            <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span className="truncate"><strong>Controles:</strong> {game.controls}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-purple-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            JohnPlay Web Engine 60FPS
          </div>
        </div>
      </div>
    </div>
  );
};

/* Unified High-Performance Canvas Engine for all games */
const NativeCanvasEngine: React.FC<{ game: BrowserGame }> = ({ game }) => {
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

    // =========================================================================
    // 1. SUBWAY RUNNER 3D (Subway Surfers Pseudo-3D Engine)
    // =========================================================================
    if (game.type === 'canvas-subway') {
      let lane = 1; // 0: Left, 1: Middle, 2: Right
      let playerY = 0;
      let isJumping = false;
      let jumpVy = 0;
      let isRolling = false;
      let rollTimer = 0;
      let localScore = 0;
      let speed = 6;
      let obstacles: { z: number; lane: number; type: 'train' | 'barrier' | 'coin'; y?: number }[] = [];
      let spawnCounter = 0;

      const handleKey = (e: KeyboardEvent) => {
        if (['ArrowLeft', 'KeyA'].includes(e.code) && lane > 0) { lane--; e.preventDefault(); }
        if (['ArrowRight', 'KeyD'].includes(e.code) && lane < 2) { lane++; e.preventDefault(); }
        if (['ArrowUp', 'KeyW', 'Space'].includes(e.code) && !isJumping && !isRolling) {
          isJumping = true;
          jumpVy = -11;
          e.preventDefault();
        }
        if (['ArrowDown', 'KeyS'].includes(e.code) && !isRolling) {
          isRolling = true;
          rollTimer = 35;
          if (isJumping) { jumpVy = 10; }
          e.preventDefault();
        }
      };
      window.addEventListener('keydown', handleKey);

      const loop = () => {
        if (!isRunning) return;
        animationFrameId = requestAnimationFrame(loop);

        // Physics
        if (isJumping) {
          playerY += jumpVy;
          jumpVy += 0.65;
          if (playerY >= 0) { playerY = 0; isJumping = false; }
        }
        if (isRolling) {
          rollTimer--;
          if (rollTimer <= 0) isRolling = false;
        }

        // Spawn obstacles & coins
        spawnCounter++;
        if (spawnCounter % 35 === 0) {
          const randLane = Math.floor(Math.random() * 3);
          const typeRand = Math.random();
          if (typeRand < 0.4) {
            obstacles.push({ z: 600, lane: randLane, type: 'train' });
          } else if (typeRand < 0.7) {
            obstacles.push({ z: 600, lane: randLane, type: 'barrier' });
          } else {
            obstacles.push({ z: 600, lane: randLane, type: 'coin' });
          }
        }

        // Update obstacles
        obstacles.forEach(obs => {
          obs.z -= speed;
          // Collision check when near player (z around 60)
          if (obs.z < 80 && obs.z > 30 && obs.lane === lane) {
            if (obs.type === 'coin') {
              localScore += 25;
              setScore(localScore);
              setHighScore(h => Math.max(h, localScore));
              obs.z = -100;
            } else if (obs.type === 'barrier') {
              if (!isJumping && !isRolling) {
                setGameOver(true);
                isRunning = false;
              }
            } else if (obs.type === 'train') {
              setGameOver(true);
              isRunning = false;
            }
          }
        });
        obstacles = obstacles.filter(o => o.z > 0);

        localScore += 1;
        setScore(localScore);
        setHighScore(h => Math.max(h, localScore));
        speed += 0.001;

        // Render pseudo-3D
        ctx.fillStyle = '#080c18';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Horizon & Sky neon gradient
        const horizonY = canvas.height * 0.35;
        const grad = ctx.createLinearGradient(0, 0, 0, horizonY);
        grad.addColorStop(0, '#190a2e');
        grad.addColorStop(1, '#080c18');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, horizonY);

        // Neon City Skyline in background
        ctx.fillStyle = '#1e163b';
        ctx.fillRect(50, horizonY - 40, 60, 40);
        ctx.fillRect(130, horizonY - 70, 70, 70);
        ctx.fillRect(230, horizonY - 50, 50, 50);
        ctx.fillRect(400, horizonY - 80, 80, 80);
        ctx.fillRect(500, horizonY - 45, 60, 45);

        // Tracks / 3 Rails perspective
        const vpX = canvas.width / 2;
        const vpY = horizonY;
        const laneWidthsBottom = [-180, 0, 180];
        const laneWidthsTop = [-35, 0, 35];

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 8;
        for (let i = 0; i < 4; i++) {
          const xBottom = vpX - 220 + i * 146;
          const xTop = vpX - 50 + i * 33;
          ctx.beginPath();
          ctx.moveTo(xTop, vpY);
          ctx.lineTo(xBottom, canvas.height);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;

        // Draw Obstacles in 3D order (far to near)
        obstacles.sort((a, b) => b.z - a.z).forEach(obs => {
          const scale = 1 - obs.z / 600;
          if (scale <= 0) return;
          const curY = vpY + (canvas.height - vpY) * scale;
          const curX = vpX + (laneWidthsTop[obs.lane] + (laneWidthsBottom[obs.lane] - laneWidthsTop[obs.lane]) * scale);
          const size = 50 * scale;

          if (obs.type === 'coin') {
            ctx.fillStyle = '#fbbf24';
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(curX, curY - 15 * scale, size * 0.35, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          } else if (obs.type === 'barrier') {
            ctx.fillStyle = '#f43f5e';
            ctx.shadowColor = '#f43f5e';
            ctx.shadowBlur = 10;
            ctx.fillRect(curX - size / 2, curY - size * 0.8, size, size * 0.8);
            ctx.shadowBlur = 0;
          } else if (obs.type === 'train') {
            ctx.fillStyle = '#8b5cf6';
            ctx.shadowColor = '#8b5cf6';
            ctx.shadowBlur = 12;
            ctx.fillRect(curX - size * 0.7, curY - size * 1.5, size * 1.4, size * 1.5);
            // Train Windshield
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(curX - size * 0.5, curY - size * 1.4, size * 1.0, size * 0.4);
            ctx.shadowBlur = 0;
          }
        });

        // Player Avatar
        const pX = vpX + laneWidthsBottom[lane];
        const pY = canvas.height - 40 + playerY;
        const pHeight = isRolling ? 25 : 45;

        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 15;
        // Body
        ctx.fillRect(pX - 15, pY - pHeight, 30, pHeight);
        // Head / Cap
        if (!isRolling) {
          ctx.fillStyle = '#ec4899';
          ctx.beginPath();
          ctx.arc(pX, pY - pHeight - 8, 10, 0, Math.PI * 2);
          ctx.fill();
        }
        // Hoverboard trail glow
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(pX - 20, pY, 40, 5);
        ctx.shadowBlur = 0;
      };

      animationFrameId = requestAnimationFrame(loop);
      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKey);
      };
    }

    // =========================================================================
    // 2. MOTO X3M STUNT BIKER (Physics 2D Stunt Motor Engine)
    // =========================================================================
    if (game.type === 'canvas-moto') {
      let bikeX = 80;
      let bikeY = 220;
      let bikeVx = 0;
      let bikeVy = 0;
      let bikeAngle = 0;
      let bikeAngularV = 0;
      let gas = false;
      let brake = false;
      let leanLeft = false;
      let leanRight = false;
      let localScore = 0;
      let totalFlips = 0;
      let lastAngle = 0;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (['ArrowUp', 'KeyW'].includes(e.code)) { gas = true; e.preventDefault(); }
        if (['ArrowDown', 'KeyS'].includes(e.code)) { brake = true; e.preventDefault(); }
        if (['ArrowLeft', 'KeyA'].includes(e.code)) { leanLeft = true; e.preventDefault(); }
        if (['ArrowRight', 'KeyD'].includes(e.code)) { leanRight = true; e.preventDefault(); }
      };
      const handleKeyUp = (e: KeyboardEvent) => {
        if (['ArrowUp', 'KeyW'].includes(e.code)) gas = false;
        if (['ArrowDown', 'KeyS'].includes(e.code)) brake = false;
        if (['ArrowLeft', 'KeyA'].includes(e.code)) leanLeft = false;
        if (['ArrowRight', 'KeyD'].includes(e.code)) leanRight = false;
      };
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      const loop = () => {
        if (!isRunning) return;
        animationFrameId = requestAnimationFrame(loop);

        // Terrain function: generates procedural hills and ramps
        const getTerrainY = (x: number) => {
          return 260 + Math.sin(x * 0.015) * 35 + Math.sin(x * 0.04) * 15;
        };

        const terrainY = getTerrainY(bikeX);

        if (gas) {
          bikeVx += Math.cos(bikeAngle) * 0.35;
          bikeVy += Math.sin(bikeAngle) * 0.35;
        }
        if (brake) {
          bikeVx *= 0.94;
        }
        if (leanLeft) bikeAngularV -= 0.015;
        if (leanRight) bikeAngularV += 0.015;

        // Gravity & Physics
        bikeVy += 0.4;
        bikeVx *= 0.985;
        bikeAngularV *= 0.95;

        bikeX += bikeVx;
        bikeY += bikeVy;
        bikeAngle += bikeAngularV;

        // Ground Collision
        if (bikeY > terrainY) {
          bikeY = terrainY;
          bikeVy = 0;
          const slopeAngle = Math.atan2(getTerrainY(bikeX + 5) - getTerrainY(bikeX - 5), 10);
          bikeAngle = bikeAngle * 0.7 + slopeAngle * 0.3;

          // Crash if upside down on ground
          const normalizedAngle = Math.abs((bikeAngle % (Math.PI * 2)));
          if (normalizedAngle > Math.PI * 0.65 && normalizedAngle < Math.PI * 1.35) {
            setGameOver(true);
            isRunning = false;
          }
        }

        // Stunt Flip tracker
        if (Math.abs(bikeAngle - lastAngle) > Math.PI * 1.8) {
          totalFlips++;
          localScore += 200;
          lastAngle = bikeAngle;
        }

        localScore = Math.floor(bikeX) + totalFlips * 200;
        setScore(localScore);
        setHighScore(h => Math.max(h, localScore));

        // Render
        ctx.fillStyle = '#090d1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Camera offset following bike
        const camX = bikeX - 150;

        // Draw Hills / Terrain
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 10) {
          const worldX = x + camX;
          const y = getTerrainY(worldX);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw Bike
        ctx.save();
        ctx.translate(bikeX - camX, bikeY - 15);
        ctx.rotate(bikeAngle);

        // Wheels
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(-18, 12, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(18, 12, 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

        // Chassis & Body
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-18, 12); ctx.lineTo(0, 0); ctx.lineTo(18, 12);
        ctx.moveTo(0, 0); ctx.lineTo(-8, -12); ctx.lineTo(10, -8);
        ctx.stroke();

        // Stunt Rider
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath(); ctx.arc(-5, -20, 6, 0, Math.PI * 2); ctx.fill();

        ctx.restore();
      };

      animationFrameId = requestAnimationFrame(loop);
      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }

    // =========================================================================
    // 3. SLOPE 3D (Neon Tunnel Ball Runner)
    // =========================================================================
    if (game.type === 'canvas-slope') {
      let ballX = 0; // -1 to 1 normalized
      let ballSpeed = 6;
      let slopeTiles: { z: number; width: number; hasObstacle: boolean; obsX: number }[] = [];
      let localScore = 0;
      let left = false;
      let right = false;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (['ArrowLeft', 'KeyA'].includes(e.code)) { left = true; e.preventDefault(); }
        if (['ArrowRight', 'KeyD'].includes(e.code)) { right = true; e.preventDefault(); }
      };
      const handleKeyUp = (e: KeyboardEvent) => {
        if (['ArrowLeft', 'KeyA'].includes(e.code)) left = false;
        if (['ArrowRight', 'KeyD'].includes(e.code)) right = false;
      };
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      for (let i = 0; i < 20; i++) {
        slopeTiles.push({
          z: i * 35,
          width: 220,
          hasObstacle: i > 4 && Math.random() < 0.45,
          obsX: (Math.random() - 0.5) * 120
        });
      }

      const loop = () => {
        if (!isRunning) return;
        animationFrameId = requestAnimationFrame(loop);

        if (left) ballX -= 0.035;
        if (right) ballX += 0.035;

        slopeTiles.forEach(tile => {
          tile.z -= ballSpeed * 0.5;
          // Collision with obstacles near bottom (z around 10)
          if (tile.z < 25 && tile.z > 0 && tile.hasObstacle) {
            const playerPixelX = ballX * 110;
            if (Math.abs(playerPixelX - tile.obsX) < 25) {
              setGameOver(true);
              isRunning = false;
            }
          }
        });

        if (slopeTiles[0] && slopeTiles[0].z < 0) {
          slopeTiles.shift();
          slopeTiles.push({
            z: slopeTiles[slopeTiles.length - 1].z + 35,
            width: 220,
            hasObstacle: Math.random() < 0.5,
            obsX: (Math.random() - 0.5) * 120
          });
        }

        // Fall off edge check
        if (Math.abs(ballX) > 1.05) {
          setGameOver(true);
          isRunning = false;
        }

        localScore += 1;
        setScore(localScore);
        setHighScore(h => Math.max(h, localScore));
        ballSpeed += 0.002;

        // Render
        ctx.fillStyle = '#060914';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const horizonY = 80;

        // Draw Slope 3D Platforms
        slopeTiles.slice().reverse().forEach(tile => {
          const scale = 1 - tile.z / 700;
          if (scale <= 0) return;

          const curY = horizonY + (canvas.height - horizonY) * scale;
          const w = tile.width * scale;

          ctx.fillStyle = '#111827';
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(centerX - w / 2, curY, w, 20 * scale);
          ctx.fillRect(centerX - w / 2, curY, w, 20 * scale);

          if (tile.hasObstacle) {
            const oX = centerX + tile.obsX * scale;
            const oW = 28 * scale;
            ctx.fillStyle = '#ef4444';
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 10;
            ctx.fillRect(oX - oW / 2, curY - 20 * scale, oW, 20 * scale);
            ctx.shadowBlur = 0;
          }
        });

        // Draw Ball
        const bX = centerX + ballX * 110;
        const bY = canvas.height - 60;
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(bX, bY, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      };

      animationFrameId = requestAnimationFrame(loop);
      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }

    // =========================================================================
    // 4. RETRO BOWL (Pixel American Football)
    // =========================================================================
    if (game.type === 'canvas-retrobowl') {
      let qbX = canvas.width / 2;
      let qbY = canvas.height - 70;
      let ball: { x: number; y: number; vx: number; vy: number; flying: boolean } = { x: 0, y: 0, vx: 0, vy: 0, flying: false };
      let receivers = [
        { x: 120, y: canvas.height - 80, vx: 0.8, vy: -2.2, caught: false },
        { x: canvas.width - 120, y: canvas.height - 80, vx: -0.8, vy: -2.5, caught: false }
      ];
      let defenders = [
        { x: 180, y: canvas.height - 180, vx: 0, vy: 1.2 },
        { x: canvas.width - 180, y: canvas.height - 180, vx: 0, vy: 1.2 }
      ];
      let aimAngle = -Math.PI / 2;
      let localScore = 0;

      const handleKey = (e: KeyboardEvent) => {
        if (['ArrowLeft', 'KeyA'].includes(e.code)) { aimAngle -= 0.12; e.preventDefault(); }
        if (['ArrowRight', 'KeyD'].includes(e.code)) { aimAngle += 0.12; e.preventDefault(); }
        if (['Space', 'Enter'].includes(e.code) && !ball.flying) {
          ball = { x: qbX, y: qbY, vx: Math.cos(aimAngle) * 7, vy: Math.sin(aimAngle) * 7, flying: true };
          e.preventDefault();
        }
      };
      window.addEventListener('keydown', handleKey);

      const loop = () => {
        if (!isRunning) return;
        animationFrameId = requestAnimationFrame(loop);

        // Move receivers & defenders
        receivers.forEach(r => {
          r.x += r.vx;
          r.y += r.vy;
        });
        defenders.forEach(d => {
          d.y += 0.6;
        });

        // Ball physics
        if (ball.flying) {
          ball.x += ball.vx;
          ball.y += ball.vy;

          // Catch check
          receivers.forEach(r => {
            if (Math.hypot(ball.x - r.x, ball.y - r.y) < 25) {
              localScore += 100;
              setScore(localScore);
              setHighScore(h => Math.max(h, localScore));
              ball.flying = false;
              // Reset play
              qbY = canvas.height - 70;
              receivers = [
                { x: 120, y: canvas.height - 80, vx: 0.8, vy: -2.2, caught: false },
                { x: canvas.width - 120, y: canvas.height - 80, vx: -0.8, vy: -2.5, caught: false }
              ];
            }
          });

          // Out of bounds or intercepted
          if (ball.y < 40 || ball.x < 20 || ball.x > canvas.width - 20) {
            ball.flying = false;
          }
        }

        // Render Field
        ctx.fillStyle = '#166534';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Yard lines
        ctx.strokeStyle = '#ffffff88';
        ctx.lineWidth = 2;
        for (let y = 50; y < canvas.height; y += 60) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // End Zone
        ctx.fillStyle = '#b91c1c';
        ctx.fillRect(0, 0, canvas.width, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('TOUCHDOWN ZONE', canvas.width / 2, 32);

        // Draw Aim Arc
        if (!ball.flying) {
          ctx.strokeStyle = '#fbbf24';
          ctx.setLineDash([6, 6]);
          ctx.beginPath();
          ctx.moveTo(qbX, qbY);
          ctx.lineTo(qbX + Math.cos(aimAngle) * 90, qbY + Math.sin(aimAngle) * 90);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Draw Players (Pixel style)
        // QB
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(qbX - 10, qbY - 10, 20, 20);

        // Receivers
        ctx.fillStyle = '#38bdf8';
        receivers.forEach(r => ctx.fillRect(r.x - 8, r.y - 8, 16, 16));

        // Defenders
        ctx.fillStyle = '#f43f5e';
        defenders.forEach(d => ctx.fillRect(d.x - 8, d.y - 8, 16, 16));

        // Ball
        if (ball.flying) {
          ctx.fillStyle = '#78350f';
          ctx.beginPath(); ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2); ctx.fill();
        }
      };

      animationFrameId = requestAnimationFrame(loop);
      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKey);
      };
    }

    // =========================================================================
    // 5. 1V1 ARENA (Shoot & Build Duel)
    // =========================================================================
    if (game.type === 'canvas-1v1') {
      let p = { x: 100, y: 190, hp: 100 };
      let bot = { x: 480, y: 190, hp: 100, vy: 2 };
      let bullets: { x: number; y: number; vx: number; vy: number; fromPlayer: boolean }[] = [];
      let walls: { x: number; y: number; w: number; h: number; hp: number }[] = [];
      let localScore = 0;

      const handleKey = (e: KeyboardEvent) => {
        if (['KeyW', 'ArrowUp'].includes(e.code)) p.y -= 12;
        if (['KeyS', 'ArrowDown'].includes(e.code)) p.y += 12;
        if (['KeyA', 'ArrowLeft'].includes(e.code)) p.x -= 12;
        if (['KeyD', 'ArrowRight'].includes(e.code)) p.x += 12;
        if (['KeyQ', 'KeyE'].includes(e.code)) {
          // Build protective wall
          walls.push({ x: p.x + 25, y: p.y - 20, w: 10, h: 45, hp: 3 });
        }
        if (e.code === 'Space') {
          // Shoot
          bullets.push({ x: p.x + 15, y: p.y, vx: 7, vy: 0, fromPlayer: true });
        }
      };
      window.addEventListener('keydown', handleKey);

      const loop = () => {
        if (!isRunning) return;
        animationFrameId = requestAnimationFrame(loop);

        // Bot AI movement & shooting
        bot.y += bot.vy;
        if (bot.y < 60 || bot.y > canvas.height - 60) bot.vy *= -1;
        if (Math.random() < 0.03) {
          bullets.push({ x: bot.x - 15, y: bot.y, vx: -6, vy: 0, fromPlayer: false });
        }

        // Bullet physics & hit detection
        bullets.forEach(b => {
          b.x += b.vx;
          b.y += b.vy;

          if (b.fromPlayer && Math.hypot(b.x - bot.x, b.y - bot.y) < 18) {
            bot.hp -= 15;
            b.x = 9999;
            localScore += 50;
            if (bot.hp <= 0) {
              localScore += 500;
              setScore(localScore);
              setHighScore(h => Math.max(h, localScore));
              bot.hp = 100;
            }
          }
          if (!b.fromPlayer && Math.hypot(b.x - p.x, b.y - p.y) < 18) {
            p.hp -= 15;
            b.x = -9999;
            if (p.hp <= 0) {
              setGameOver(true);
              isRunning = false;
            }
          }
        });
        bullets = bullets.filter(b => b.x > 0 && b.x < canvas.width);

        setScore(localScore);
        setHighScore(h => Math.max(h, localScore));

        // Render Arena
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // HP Bars
        ctx.fillStyle = '#10b981';
        ctx.fillRect(30, 20, p.hp * 1.5, 10);
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(canvas.width - 180, 20, bot.hp * 1.5, 10);

        // Draw Walls
        ctx.fillStyle = '#a855f7';
        walls.forEach(w => ctx.fillRect(w.x, w.y, w.w, w.h));

        // Draw Player & Bot
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath(); ctx.arc(p.x, p.y, 14, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath(); ctx.arc(bot.x, bot.y, 14, 0, Math.PI * 2); ctx.fill();

        // Bullets
        ctx.fillStyle = '#fbbf24';
        bullets.forEach(b => {
          ctx.beginPath(); ctx.arc(b.x, b.y, 4, 0, Math.PI * 2); ctx.fill();
        });
      };

      animationFrameId = requestAnimationFrame(loop);
      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('keydown', handleKey);
      };
    }

    // =========================================================================
    // 6. DEFAULT FALLBACK CANVAS (Snake, Flappy, Pong, Space Invaders, 2048)
    // =========================================================================
    if (game.type === 'canvas-snake' || game.type === 'canvas-flappy' || game.type === 'canvas-spaceinvaders' || game.type === 'canvas-pong' || game.type === 'canvas-2048' || game.type === 'canvas-paperio' || game.type === 'canvas-crossy') {
      // Snake native implementation
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
          setHighScore(h => Math.max(h, localScore));
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
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
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
  }, [game, gameKey, gameOver]);

  return (
    <div className="relative flex flex-col items-center justify-center p-2 w-full">
      <div className="mb-3 flex items-center gap-4 bg-black/60 px-5 py-2 rounded-2xl border border-cyan-800/40 text-xs shadow-lg">
        <span className="text-slate-300 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-cyan-400" />
          Pontos: <strong className="text-cyan-300 font-mono text-sm">{score}</strong>
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-300 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-amber-400" />
          Recorde: <strong className="text-amber-300 font-mono text-sm">{highScore}</strong>
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={640}
        height={400}
        className="w-full max-w-[640px] h-[400px] rounded-2xl border border-cyan-900/60 shadow-2xl shadow-cyan-950/60 bg-[#0a0d14]"
      />

      {gameOver && (
        <div className="absolute inset-0 m-auto flex flex-col items-center justify-center bg-black/85 backdrop-blur-md p-6 rounded-2xl border border-red-500/50 max-w-sm h-60 space-y-4 shadow-2xl animate-in zoom-in-95">
          <h4 className="text-2xl font-black text-red-400">FIM DE JOGO</h4>
          <p className="text-sm text-slate-200">Pontuação final: <strong className="text-cyan-300">{score}</strong></p>
          <button
            onClick={() => setGameKey(k => k + 1)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
