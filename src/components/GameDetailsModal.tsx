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
  Layers,
  Flame
} from 'lucide-react';
import type { GameDownloadItem } from '../types';

interface GameDetailsModalProps {
  game: GameDownloadItem | null;
  onClose: () => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mainCopied, setMainCopied] = useState(false);

  if (!game) return null;

  const officialUrl = game.steamUrl || `https://store.steampowered.com/search/?term=${encodeURIComponent(game.title)}`;
  const primaryMagnetUri = game.uris.find(u => u.type === 'magnet') || game.uris[0];

  const handleCopyLink = (url: string, index?: number) => {
    navigator.clipboard.writeText(url);
    if (typeof index === 'number') {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } else {
      setMainCopied(true);
      setTimeout(() => setMainCopied(false), 2500);
    }
  };

  const handleDirectMagnetDownload = () => {
    if (primaryMagnetUri) {
      const link = document.createElement('a');
      link.href = primaryMagnetUri.url;
      link.target = '_self';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getSourceBadgeClass = (source: string) => {
    switch (source) {
      case 'fitgirl': return 'bg-gradient-to-r from-pink-500 to-rose-600';
      case 'steamrip': return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      case 'dodi': return 'bg-gradient-to-r from-emerald-500 to-teal-600';
      case 'gog': return 'bg-gradient-to-r from-purple-500 to-violet-600';
      case 'xatab': return 'bg-gradient-to-r from-amber-500 to-orange-600';
      case 'atop': return 'bg-gradient-to-r from-cyan-500 to-blue-600';
      case 'empress': return 'bg-fuchsia-600 to-purple-800';
      default: return 'bg-slate-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#090d18] border border-purple-800/40 rounded-3xl shadow-2xl shadow-purple-950/80 flex flex-col overflow-hidden">
        
        {/* Banner Header (Epic Games Store Product Hero) */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 flex-shrink-0">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-[#090d18]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#090d18] via-transparent to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors z-10 cursor-pointer border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[11px] font-black px-3 py-0.5 rounded-full text-white shadow-md ${getSourceBadgeClass(game.source)}`}>
                  {game.sourceName}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800/90 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <HardDrive className="w-3.5 h-3.5" />
                  {game.fileSize}
                </span>
                {game.rating && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {game.rating} / 10
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-lg">
                {game.title}
              </h2>
            </div>

            <a
              href={officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer self-start sm:self-auto shadow-md"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Ver na Loja Oficial</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* PRIMARY DOWNLOAD CALLOUT BOX */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-[#101526] to-emerald-950/80 border border-purple-600/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  Download do Jogo (Addon Direto)
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Dispara instantaneamente o download no seu cliente torrent (qBittorrent / uTorrent / Hydra Launcher).
                </p>
              </div>

              <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider self-start sm:self-auto">
                Hydra Engine 100% Funcional
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDirectMagnetDownload}
                className="py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 text-sm font-black flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition-all cursor-pointer hover:scale-[1.02] uppercase tracking-wider"
              >
                <Download className="w-4 h-4 stroke-[3]" />
                <span>Baixar Jogo (Magnet Direto)</span>
              </button>

              <button
                onClick={() => handleCopyLink(primaryMagnetUri ? primaryMagnetUri.url : '')}
                className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
              >
                {mainCopied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Magnet Link Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-purple-400" />
                    <span>Copiar Magnet Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ALL MIRRORS / URIS */}
          {game.uris.length > 1 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                Espelhos & Servidores Disponíveis ({game.uris.length})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {game.uris.map((uri, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-[#0c101c] border border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-200 truncate">{uri.label}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyLink(uri.url, idx)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                        title="Copiar Link"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <a
                        href={uri.url}
                        target={uri.type === 'magnet' ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-bold cursor-pointer"
                      >
                        Baixar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {game.category.map((cat, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-800/40 text-purple-300 font-semibold"
              >
                {cat}
              </span>
            ))}
            <span className="text-xs px-3 py-1 rounded-lg bg-slate-800 text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Atualizado em: {game.uploadDate}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Sobre o Jogo
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Key Features */}
          {game.features && game.features.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#0e1322] border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-purple-400" />
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
            <div className="p-4 rounded-2xl bg-[#0a0e1a] border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Requisitos de Sistema Recomendados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5 font-medium">Sistema Operacional:</span>
                  <span className="text-slate-200 font-bold">{game.systemRequirements.os}</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5 font-medium">Processador (CPU):</span>
                  <span className="text-slate-200 font-bold">{game.systemRequirements.cpu}</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5 font-medium">Memória RAM:</span>
                  <span className="text-slate-200 font-bold">{game.systemRequirements.ram}</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5 font-medium">Placa de Vídeo (GPU):</span>
                  <span className="text-slate-200 font-bold">{game.systemRequirements.gpu}</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-slate-800 sm:col-span-2">
                  <span className="text-slate-400 block mb-0.5 font-medium">Armazenamento:</span>
                  <span className="text-slate-200 font-bold">{game.systemRequirements.storage}</span>
                </div>
              </div>
            </div>
          )}

          {/* Safety Disclaimer */}
          <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2.5 text-xs text-amber-200/90">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Dica de Segurança JohnPlay:</strong> Adicione a pasta de instalação dos seus jogos às exclusões do Windows Defender antes de descompactar para evitar falsos positivos do antivírus.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-[#060912] flex items-center justify-between text-xs text-slate-400">
          <span>Fonte: {game.sourceName}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold cursor-pointer transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
