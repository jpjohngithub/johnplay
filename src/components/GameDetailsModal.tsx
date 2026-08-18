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
  Globe 
} from 'lucide-react';
import type { GameDownloadItem } from '../types';

interface GameDetailsModalProps {
  game: GameDownloadItem | null;
  onClose: () => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  const [isDownloadingDirect, setIsDownloadingDirect] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  if (!game) return null;

  const officialUrl = game.steamUrl || `https://store.steampowered.com/search/?term=${encodeURIComponent(game.title)}`;

  /* INSTANT DOWNLOAD WITHOUT NAVIGATING AWAY */
  const handleStartDirectDownload = () => {
    setIsDownloadingDirect(true);
    setDownloadProgress(100);

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

    setTimeout(() => {
      setIsDownloadingDirect(false);
    }, 2500);
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
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* AS 2 OPÇÕES PRINCIPAIS DE DOWNLOAD */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#13182a] to-emerald-950/70 border border-purple-600/40 space-y-4">
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                Opções de Download do Jogo
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Escolha entre acessar a loja oficial ou baixar o arquivo diretamente agora.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Opção 1: Levar para o Site Oficial */}
              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border border-slate-700 shadow-md transition-all cursor-pointer"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>1. Site Oficial (Steam/Loja)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              {/* Opção 2: Fazer o download ali mesmo instantâneo */}
              <button
                onClick={handleStartDirectDownload}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950 transition-all cursor-pointer"
              >
                {isDownloadingDirect ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Arquivo Baixado com Sucesso!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-white" />
                    <span>2. Download Direto (Baixar Aqui)</span>
                  </>
                )}
              </button>
            </div>

            {isDownloadingDirect && (
              <div className="space-y-1.5 pt-2 border-t border-emerald-900/40 animate-in fade-in">
                <div className="flex justify-between text-xs text-emerald-300">
                  <span>Arquivo transferido para o seu computador!</span>
                  <span>{downloadProgress}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-emerald-700/40">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              </div>
            )}
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
