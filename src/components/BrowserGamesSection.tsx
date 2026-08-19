import React from 'react';
import { 
  Gamepad2, 
  Play, 
  ExternalLink, 
  Star,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { BROWSER_GAMES } from '../data/browserGamesData';

export const BrowserGamesSection: React.FC = () => {
  const subwaySurfers = BROWSER_GAMES[0];

  if (!subwaySurfers) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 mb-1">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            Jogo no Navegador Selecionado
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Jogar no Navegador (Poki)
          </h2>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-[#0e1424] px-4 py-2 rounded-2xl border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Direcionamento Direto para o Poki Oficial</span>
        </div>
      </div>

      {/* SUBWAY SURFERS AAA EPIC STORE STYLE HERO CARD */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0c101c] border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 group">
        
        {/* Background Image Banner */}
        <div className="relative h-[420px] sm:h-[480px] w-full overflow-hidden">
          <img
            src={subwaySurfers.thumbnail}
            alt={subwaySurfers.title}
            className="w-full h-full object-cover object-center filter brightness-[0.5] contrast-110 scale-105 group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070a12] via-[#070a12]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-black/30"></div>

          {/* Badges */}
          <div className="absolute top-6 left-6 sm:left-10 flex flex-wrap items-center gap-2.5 z-10">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/40 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              Poki Exclusivo
            </span>
            <span className="px-3 py-1 rounded-full bg-black/70 text-amber-300 text-xs font-bold border border-amber-500/30 backdrop-blur-md flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {subwaySurfers.rating} / 5.0 (Milhões de Jogadores)
            </span>
          </div>

          {/* Card Main Info */}
          <div className="absolute bottom-8 left-6 sm:left-10 right-6 max-w-2xl z-10 space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                {subwaySurfers.genre} • Desenvolvido por {subwaySurfers.developer}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-md">
                {subwaySurfers.title}
              </h1>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {subwaySurfers.description}
            </p>

            {/* Controls Guide */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-slate-800 text-xs text-slate-300 backdrop-blur-md">
              <span className="font-bold text-cyan-300 block mb-1">🎮 Controles do Jogo:</span>
              <span>{subwaySurfers.controls}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {subwaySurfers.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 font-semibold border border-slate-700/50">
                  {tag}
                </span>
              ))}
            </div>

            {/* ACTION BUTTON TO OPEN POKI OFFICIAL LINK */}
            <div className="pt-2">
              <a
                href={subwaySurfers.gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base shadow-2xl shadow-cyan-500/40 transition-all hover:scale-105 cursor-pointer uppercase tracking-wider"
              >
                <Play className="w-5 h-5 fill-slate-950" />
                <span>Jogar Subway Surfers Agora (Poki Oficial)</span>
                <ExternalLink className="w-5 h-5 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#080b14] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Redirecionando diretamente para: <code className="text-cyan-300 font-mono">{subwaySurfers.gameUrl}</code>
          </span>
          <span className="text-emerald-400 font-bold">100% Verificado</span>
        </div>
      </div>
    </div>
  );
};
