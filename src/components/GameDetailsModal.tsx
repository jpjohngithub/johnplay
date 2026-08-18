import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles, 
  HardDrive, 
  Cpu, 
  Clock, 
  Star, 
  CheckCircle2, 
  Check, 
  Globe,
  Copy,
  Zap,
  Layers
} from 'lucide-react';
import type { GameDownloadItem } from '../types';

interface GameDetailsModalProps {
  game: GameDownloadItem | null;
  onClose: () => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!game) return null;

  const officialUrl = game.steamUrl || `https://store.steampowered.com/search/?term=${encodeURIComponent(game.title)}`;

  const handleCopyLink = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const getSourceBadgeClass = (source: string) => {
    switch (source) {
      case 'fitgirl': return 'bg-gradient-to-r from-pink-500 to-rose-600';
      case 'steamrip': return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      case 'dodi': return 'bg-gradient-to-r from-emerald-500 to-teal-600';
      case 'gog': return 'bg-gradient-to-r from-purple-500 to-violet-600';
      case 'xatab': return 'bg-gradient-to-r from-amber-500 to-orange-600';
      case 'atop': return 'bg-gradient-to-r from-cyan-500 to-blue-600';
      case 'empress': return 'bg-gradient-to-r from-fuchsia-600 to-purple-800';
      default: return 'bg-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] bg-[#0e121d] border border-purple-800/40 rounded-2xl shadow-2xl shadow-purple-950/70 flex flex-col overflow-hidden">
        
        {/* Banner with Cover Header */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900 flex-shrink-0">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover object-center filter brightness-[0.45] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e121d] via-[#0e121d]/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full text-white ${getSourceBadgeClass(game.source)}`}>
                  {game.sourceName}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800/90 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <HardDrive className="w-3 h-3" />
                  {game.fileSize}
                </span>
                {game.rating && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {game.rating} / 10
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {game.title}
              </h2>
            </div>

            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer self-start sm:self-auto"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Ver na Loja Oficial (Steam)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* LINKS DE DOWNLOAD DISPONÍVEIS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#13182a] to-emerald-950/70 border border-purple-600/40 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  Links de Download Direto ({game.uris.length})
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Clique para iniciar o download no seu navegador/cliente torrent ou copie o link.
                </p>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                100% Funcional
              </span>
            </div>

            <div className="space-y-2.5">
              {game.uris.map((uri, index) => {
                const isMagnet = uri.type === 'magnet';
                const isCopied = copiedIndex === index;

                return (
                  <div 
                    key={index}
                    className="p-3 rounded-xl bg-[#0a0d16] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`p-2 rounded-lg ${isMagnet ? 'bg-purple-950 text-purple-400 border border-purple-700/40' : 'bg-cyan-950 text-cyan-400 border border-cyan-700/40'}`}>
                        {isMagnet ? <Zap className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-white block truncate">{uri.label}</span>
                        <span className="text-[10px] text-slate-400 font-mono truncate block max-w-sm">{uri.url}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={uri.url}
                        target={isMagnet ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial py-2 px-3.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950 cursor-pointer transition-all hover:scale-105"
                      >
                        <Download className="w-3.5 h-3.5 text-white" />
                        <span>Baixar Agora</span>
                      </a>

                      <button
                        onClick={() => handleCopyLink(uri.url, index)}
                        className={`py-2 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1 transition-all cursor-pointer ${
                          isCopied 
                            ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300'
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                        }`}
                        title="Copiar Link"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {game.category.map((cat, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-800/40 text-purple-300 font-medium"
              >
                {cat}
              </span>
            ))}
            <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Publicado em: {game.uploadDate}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Sobre o Jogo
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Key Features */}
          {game.features && game.features.length > 0 && (
            <div className="p-4 rounded-xl bg-[#131929] border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Recursos do Release & Conteúdo
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {game.features.map((feat, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* System Requirements */}
          {game.systemRequirements && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Requisitos Mínimos Recomendados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80">
                  <span className="text-slate-400 block mb-0.5">Sistema Operacional:</span>
                  <span className="text-slate-200 font-medium">{game.systemRequirements.os}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80">
                  <span className="text-slate-400 block mb-0.5">Processador (CPU):</span>
                  <span className="text-slate-200 font-medium">{game.systemRequirements.cpu}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80">
                  <span className="text-slate-400 block mb-0.5">Memória RAM:</span>
                  <span className="text-slate-200 font-medium">{game.systemRequirements.ram}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80">
                  <span className="text-slate-400 block mb-0.5">Placa de Vídeo (GPU):</span>
                  <span className="text-slate-200 font-medium">{game.systemRequirements.gpu}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80 sm:col-span-2">
                  <span className="text-slate-400 block mb-0.5">Armazenamento:</span>
                  <span className="text-slate-200 font-medium">{game.systemRequirements.storage}</span>
                </div>
              </div>
            </div>
          )}

          {/* Safety Disclaimer */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-200/90">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Dica de Segurança JohnPlay:</strong> Adicione a pasta de instalação dos seus jogos às exclusões do Windows Defender antes de descompactar para evitar falsos positivos.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0d101a] flex items-center justify-between text-xs text-slate-400">
          <span>Fonte: {game.sourceName}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-medium cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
