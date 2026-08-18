import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldAlert, 
  Sparkles, 
  HardDrive, 
  Cpu, 
  Clock, 
  Star, 
  CheckCircle2 
} from 'lucide-react';
import type { GameDownloadItem } from '../types';

interface GameDetailsModalProps {
  game: GameDownloadItem | null;
  onClose: () => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!game) return null;

  const handleCopyUri = (url: string, index: number) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
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
            className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-10"
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

            {game.steamUrl && (
              <a
                href={game.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors self-start sm:self-end"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Página na Steam
              </a>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
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

          {/* Download Mirrors / URIs */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-400" />
              Links de Download & Mirrors Disponíveis
            </h3>
            
            <div className="space-y-2">
              {game.uris.map((uri, index) => {
                const isCopied = copiedIndex === index;
                const isMagnet = uri.url.startsWith('magnet:');
                return (
                  <div
                    key={index}
                    className="p-3 rounded-xl bg-[#141b2e] border border-slate-800 hover:border-emerald-600/50 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        isMagnet ? 'bg-purple-900 text-purple-200 border border-purple-600' : 'bg-blue-900 text-blue-200 border border-blue-600'
                      }`}>
                        {isMagnet ? 'TORRENT P2P' : 'DDL DIRETO'}
                      </span>
                      <span className="text-xs font-semibold text-slate-200 truncate">
                        {uri.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleCopyUri(uri.url, index)}
                        className={`p-2 rounded-lg text-xs flex items-center gap-1 border transition-all ${
                          isCopied
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                        title="Copiar Link / Magnet"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{isCopied ? 'Copiado!' : 'Copiar'}</span>
                      </button>

                      <a
                        href={uri.url}
                        target={isMagnet ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950 flex items-center gap-1.5 transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>{isMagnet ? 'Abrir Torrent' : 'Baixar Agora'}</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safety Disclaimer */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-200/90">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Dica de Segurança JohnPlay:</strong> Adicione a pasta de instalação dos seus jogos às exclusões do Windows Defender antes de descompactar para evitar que arquivos de bypass ou dlls sejam deletados por falsos positivos.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0d101a] flex items-center justify-between text-xs text-slate-400">
          <span>Fonte: {game.sourceName}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-medium"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
