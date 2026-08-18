import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  Play, 
  RotateCcw, 
  X, 
  Info
} from 'lucide-react';
import { BROWSER_GAMES } from '../data/browserGamesData';
import type { BrowserGame } from '../types';

export const BrowserGamesSection: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<BrowserGame | null>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b1033] via-[#121626] to-[#0c0f17] border border-purple-800/40 p-6 sm:p-8 shadow-xl shadow-purple-950/30">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
            <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
            Arcade Web Instantâneo
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Jogos no Navegador <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Sem Instalação</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Jogue clássicos do arcade, puzzle e ação diretamente no seu browser com suporte a teclado, mouse e controles na tela.
          </p>
        </div>
      </div>

      {/* Games List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {BROWSER_GAMES.map((game) => (
          <div
            key={game.id}
            className="group relative rounded-2xl bg-[#121727] border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-cyan-950/40 hover:-translate-y-1"
          >
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-85 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121727] via-transparent to-black/40"></div>
              
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                {game.genre}
              </span>

              <button
                onClick={() => setSelectedGame(game)}
                className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-purple-600/90 group-hover:bg-cyan-500 text-white flex items-center justify-center shadow-lg transition-all scale-90 group-hover:scale-110"
              >
                <Play className="w-6 h-6 ml-0.5 fill-white" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-100 group-hover:text-cyan-300 transition-colors text-base">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {game.description}
                </p>
                <div className="flex flex-wrap gap-1 mt-2.5">
                  {game.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1 truncate max-w-[200px]">
                  🎮 {game.controls}
                </span>
                <button
                  onClick={() => setSelectedGame(game)}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md transition-all"
                >
                  Jogar Agora
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active Game Modal */}
      {selectedGame && (
        <GamePlayerModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
    </div>
  );
};

/* Interactive Game Player Modal supporting Canvas Games */
const GamePlayerModal: React.FC<{ game: BrowserGame; onClose: () => void }> = ({ game, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameKey, setGameKey] = useState(0); // restart trigger

  // Canvas Game Engine Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;

    // Reset game state
    setScore(0);
    setGameOver(false);

    // ==========================================
    // 1. SNAKE GAME ENGINE
    // ==========================================
    if (game.type === 'canvas-snake') {
      const gridSize = 20;
      const tileCount = canvas.width / gridSize;
      let snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
      let dx = 1;
      let dy = 0;
      let food = { x: 15, y: 15 };
      let localScore = 0;
      let speed = 100;
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

        // Move head
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Wall collision / wrap
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
          setGameOver(true);
          isRunning = false;
          return;
        }

        // Body collision
        for (let segment of snake) {
          if (segment.x === head.x && segment.y === head.y) {
            setGameOver(true);
            isRunning = false;
            return;
          }
        }

        snake.unshift(head);

        // Check food
        if (head.x === food.x && head.y === food.y) {
          localScore += 10;
          setScore(localScore);
          setHighScore(prev => Math.max(prev, localScore));
          food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
          };
          if (speed > 50) speed -= 1;
        } else {
          snake.pop();
        }

        // Draw
        ctx.fillStyle = '#0a0d14';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Grid
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

        // Draw Food
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw Snake
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
    // 2. FLAPPY CYBER BIRD
    // ==========================================
    if (game.type === 'canvas-flappy') {
      let bird = { x: 60, y: 150, vy: 0, radius: 12 };
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

        // Spawn pipes
        if (frame % 100 === 0) {
          const gap = 120;
          const top = Math.random() * (canvas.height - gap - 80) + 40;
          pipes.push({ x: canvas.width, top, bottom: canvas.height - top - gap, passed: false });
        }

        // Update pipes
        pipes.forEach(p => {
          p.x -= 2.2;
          if (!p.passed && p.x + 40 < bird.x) {
            p.passed = true;
            localScore += 1;
            setScore(localScore);
            setHighScore(prev => Math.max(prev, localScore));
          }
        });
        pipes = pipes.filter(p => p.x > -50);

        // Collisions
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

        // Draw
        ctx.fillStyle = '#080c16';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Pipes
        pipes.forEach(p => {
          ctx.fillStyle = '#a855f7';
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 10;
          ctx.fillRect(p.x, 0, 40, p.top);
          ctx.fillRect(p.x, canvas.height - p.bottom, 40, p.bottom);
        });

        // Draw Bird
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

    // ==========================================
    // 3. CYBER PONG VS AI
    // ==========================================
    if (game.type === 'canvas-pong') {
      let player = { y: 150, height: 80, width: 10 };
      let ai = { y: 150, height: 80, width: 10, speed: 3.2 };
      let ball = { x: 250, y: 180, vx: 4, vy: 3, radius: 8 };
      let localScore = 0;

      const handleMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        player.y = e.clientY - rect.top - player.height / 2;
      };
      canvas.addEventListener('mousemove', handleMove);

      const loop = () => {
        if (!isRunning) return;
        animationFrameId = requestAnimationFrame(loop);

        // Ball move
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Top/Bottom bounce
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
          ball.vy = -ball.vy;
        }

        // AI movement
        if (ai.y + ai.height / 2 < ball.y - 10) ai.y += ai.speed;
        else if (ai.y + ai.height / 2 > ball.y + 10) ai.y -= ai.speed;

        // Player paddle bounce
        if (
          ball.x - ball.radius <= 25 &&
          ball.y >= player.y &&
          ball.y <= player.y + player.height
        ) {
          ball.vx = Math.abs(ball.vx) * 1.05;
          localScore += 10;
          setScore(localScore);
          setHighScore(prev => Math.max(prev, localScore));
        }

        // AI paddle bounce
        if (
          ball.x + ball.radius >= canvas.width - 25 &&
          ball.y >= ai.y &&
          ball.y <= ai.y + ai.height
        ) {
          ball.vx = -Math.abs(ball.vx);
        }

        // Miss ball
        if (ball.x < 0) {
          setGameOver(true);
          isRunning = false;
        } else if (ball.x > canvas.width) {
          // AI missed, reset ball with extra score
          localScore += 50;
          setScore(localScore);
          ball.x = 250;
          ball.y = 180;
          ball.vx = 4;
        }

        // Draw
        ctx.fillStyle = '#0b0f19';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Center line
        ctx.strokeStyle = '#1e293b';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw Player Paddle
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.fillRect(15, player.y, player.width, player.height);

        // Draw AI Paddle
        ctx.fillStyle = '#f43f5e';
        ctx.shadowColor = '#f43f5e';
        ctx.fillRect(canvas.width - 25, ai.y, ai.width, ai.height);

        // Draw Ball
        ctx.fillStyle = '#e2e8f0';
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      };

      animationFrameId = requestAnimationFrame(loop);
      return () => {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
        canvas.removeEventListener('mousemove', handleMove);
      };
    }

    // Default Fallback / Space Invaders
    let shipX = canvas.width / 2;
    let bullets: { x: number; y: number }[] = [];
    let invaders: { x: number; y: number; alive: boolean }[] = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 8; c++) {
        invaders.push({ x: 50 + c * 55, y: 30 + r * 35, alive: true });
      }
    }
    let localScore = 0;

    const handleKey = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) shipX = Math.max(20, shipX - 25);
      if (['ArrowRight', 'KeyD'].includes(e.code)) shipX = Math.min(canvas.width - 20, shipX + 25);
      if (e.code === 'Space') {
        bullets.push({ x: shipX, y: canvas.height - 35 });
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKey);

    const loop = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(loop);

      bullets.forEach(b => b.y -= 7);
      bullets = bullets.filter(b => b.y > 0);

      // Hit test
      bullets.forEach(b => {
        invaders.forEach(inv => {
          if (inv.alive && Math.abs(b.x - inv.x) < 20 && Math.abs(b.y - inv.y) < 15) {
            inv.alive = false;
            b.y = -10;
            localScore += 25;
            setScore(localScore);
            setHighScore(prev => Math.max(prev, localScore));
          }
        });
      });

      if (invaders.every(inv => !inv.alive)) {
        // Victory respawn
        invaders.forEach(inv => inv.alive = true);
        localScore += 100;
      }

      // Draw
      ctx.fillStyle = '#060911';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Ship
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(shipX, canvas.height - 40);
      ctx.lineTo(shipX - 15, canvas.height - 15);
      ctx.lineTo(shipX + 15, canvas.height - 15);
      ctx.closePath();
      ctx.fill();

      // Bullets
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#fbbf24';
      bullets.forEach(b => {
        ctx.fillRect(b.x - 2, b.y, 4, 10);
      });

      // Invaders
      ctx.fillStyle = '#a855f7';
      ctx.shadowColor = '#a855f7';
      invaders.forEach(inv => {
        if (inv.alive) {
          ctx.fillRect(inv.x - 12, inv.y - 8, 24, 16);
        }
      });
      ctx.shadowBlur = 0;
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKey);
    };
  }, [game, gameKey, gameOver]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0f1422] border border-cyan-800/40 rounded-2xl shadow-2xl shadow-cyan-950/60 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#141b2c] border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-white text-base">{game.title}</h3>
              <p className="text-xs text-slate-400">{game.genre}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-black/40 px-3 py-1 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400">Score: <strong className="text-cyan-300 font-mono text-sm">{score}</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Recorde: <strong className="text-amber-300 font-mono text-sm">{highScore}</strong></span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Canvas Game Area */}
        <div className="relative flex items-center justify-center p-4 bg-[#070a12] min-h-[380px]">
          <canvas
            ref={canvasRef}
            width={520}
            height={360}
            className="w-full max-w-[520px] h-[360px] rounded-xl border border-cyan-900/40 shadow-2xl bg-[#0a0d14]"
          />

          {gameOver && (
            <div className="absolute inset-0 m-auto flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-red-500/40 max-w-sm h-56 space-y-3">
              <h4 className="text-2xl font-black text-red-400">GAME OVER</h4>
              <p className="text-xs text-slate-300">Pontuação final: <strong className="text-cyan-300">{score}</strong> pontos</p>
              <button
                onClick={() => setGameKey(k => k + 1)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                Tentar Novamente
              </button>
            </div>
          )}
        </div>

        {/* Controls Info Footer */}
        <div className="px-6 py-3 bg-[#111726] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>{game.controls}</span>
          </div>

          <button
            onClick={() => setGameKey(k => k + 1)}
            className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-100 font-semibold px-3 py-1 rounded bg-purple-900/40 border border-purple-700/40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );
};
