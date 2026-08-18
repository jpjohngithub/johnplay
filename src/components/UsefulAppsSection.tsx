import React, { useState } from 'react';
import { 
  Boxes, 
  Download, 
  ExternalLink, 
  Zap, 
  Flame, 
  LayoutGrid, 
  Gauge, 
  Gamepad2, 
  Radio, 
  Archive, 
  Sparkles, 
  Video, 
  PackageCheck, 
  Cpu, 
  Trash2 
} from 'lucide-react';
import { USEFUL_APPS } from '../data/usefulAppsData';

export const UsefulAppsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos os Apps' },
    { id: 'performance', label: '⚡ Desempenho & FPS' },
    { id: 'runtimes', label: '🚀 Runtimes & DLLs (0xc00007b)' },
    { id: 'launchers', label: '🎮 Launchers & Bibliotecas' },
    { id: 'controllers', label: '🕹️ Controles (PS4/PS5/Xbox)' },
    { id: 'utilities', label: '🗜️ Compactadores & Torrents' },
    { id: 'streaming', label: '📡 Streaming & Gravação' },
  ];

  const filteredApps = USEFUL_APPS.filter((app) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'streaming') return app.category === 'streaming' || app.category === 'audio-rec';
    return app.category === selectedCategory;
  });

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-6 h-6 text-purple-400" />;
      case 'LayoutGrid': return <LayoutGrid className="w-6 h-6 text-indigo-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'Gauge': return <Gauge className="w-6 h-6 text-rose-400" />;
      case 'Gamepad2': return <Gamepad2 className="w-6 h-6 text-cyan-400" />;
      case 'Radio': return <Radio className="w-6 h-6 text-emerald-400" />;
      case 'Archive': return <Archive className="w-6 h-6 text-blue-400" />;
      case 'PackageCheck': return <PackageCheck className="w-6 h-6 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Trash2': case 'Trash': return <Trash2 className="w-6 h-6 text-red-400" />;
      case 'Sparkle': return <Sparkles className="w-6 h-6 text-pink-400" />;
      case 'Video': return <Video className="w-6 h-6 text-violet-400" />;
      default: return <Boxes className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b122c] via-[#101424] to-[#0c0f17] border border-purple-800/40 p-6 sm:p-8 shadow-xl shadow-purple-950/30">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-600/40 text-purple-300 text-xs font-semibold">
            <Boxes className="w-3.5 h-3.5 text-purple-400" />
            Arsenal de Softwares Gamer
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Apps para PC <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Essenciais e Otimizadores</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Programas indispensáveis para o setup do seu PC: geradores de quadros universais (Lossless Scaling), pacotes de DLLs e runtimes Visual C++, mapeadores de controles de PS4/PS5 e utilitários limpos.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950 scale-[1.02]'
                : 'bg-[#131826] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className="rounded-2xl bg-[#121727] border border-slate-800 hover:border-purple-500/50 transition-all p-5 flex flex-col justify-between shadow-lg hover:-translate-y-1 space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    {getAppIcon(app.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white">{app.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-purple-300">
                        {app.version}
                      </span>
                      {app.isEssential && (
                        <span className="text-[9px] font-black uppercase px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                          Essencial
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {app.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {app.tags.map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <a
                href={app.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors"
              >
                <span>Site Oficial</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={app.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-950 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Baixar</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
