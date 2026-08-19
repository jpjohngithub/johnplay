import React from 'react';
import { 
  Download, 
  Gamepad2, 
  Disc, 
  Tag, 
  Boxes, 
  Search,
  Database,
  Flame,
  Zap
} from 'lucide-react';
import type { TabType } from '../types';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenSourcesModal: () => void;
  gamesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenSourcesModal,
  gamesCount
}) => {
  const tabs = [
    { id: 'downloads' as TabType, label: 'Biblioteca de Addons', icon: Download, count: `${gamesCount}` },
    { id: 'browser-games' as TabType, label: 'Jogar no Navegador', icon: Gamepad2, badge: 'Subway Surfers' },
    { id: 'emulators' as TabType, label: 'Emuladores', icon: Disc },
    { id: 'deals' as TabType, label: 'Promoções & Grátis', icon: Tag, badge: 'Epic & Steam' },
    { id: 'apps' as TabType, label: 'Apps para PC', icon: Boxes, badge: 'Essenciais' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-[#07090e]/95 backdrop-blur-2xl transition-all shadow-2xl shadow-purple-950/30">
      
      {/* Top Status Bar Ticker */}
      <div className="w-full bg-gradient-to-r from-[#0c0f1d] via-[#121029] to-[#0c0f1d] border-b border-purple-900/30 px-4 py-1 text-xs flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold px-2.5 py-0.5 bg-emerald-950/70 rounded-full border border-emerald-500/40 shadow-sm shadow-emerald-950">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Hydra Addons Engine v3.0
          </span>
          <span className="text-slate-300 font-medium text-[11px] hidden sm:inline">
            7 Fontes ativas: FitGirl, SteamRIP, DODI, GOG, Xatab, Atop-Games, Empress
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenSourcesModal}
            className="flex items-center gap-1.5 text-[11px] text-purple-300 hover:text-white font-bold px-2.5 py-0.5 rounded-lg bg-purple-900/40 border border-purple-700/40 hover:border-purple-500 transition-all cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span>Fontes Addons ({gamesCount})</span>
          </button>
        </div>
      </div>

      {/* Main Launcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('downloads')} 
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-xl shadow-purple-600/40 group-hover:shadow-purple-500/60 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#080a10] rounded-[14px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-purple-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
                  JOHNPLAY
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 tracking-widest uppercase">
                  LAUNCHER
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold -mt-1 hidden sm:block">
                O Seu Portal de Games Supremo
              </p>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar jogos, repacks, emuladores, promoções..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#101424] border border-slate-700/60 rounded-2xl pl-10 pr-12 py-2 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              ) : (
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                  Ctrl+K
                </kbd>
              )}
            </div>
          </div>

          {/* Quick Addon Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSourcesModal}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-900/40 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>Addons</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar border-t border-slate-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 select-none cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white shadow-xl shadow-purple-900/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-black/40 text-white' : 'bg-slate-800 text-purple-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-cyan-950/90 text-cyan-300 border border-cyan-700/40'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
