import React from 'react';
import { 
  Download, 
  Gamepad2, 
  Disc, 
  Tag, 
  Boxes, 
  Search,
  Database,
  Flame
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
    { id: 'downloads' as TabType, label: 'Download de Jogos', icon: Download, count: `${gamesCount}` },
    { id: 'browser-games' as TabType, label: 'Jogar no Navegador', icon: Gamepad2, badge: 'Arcade' },
    { id: 'emulators' as TabType, label: 'Emuladores', icon: Disc },
    { id: 'deals' as TabType, label: 'Promoções & Grátis', icon: Tag, badge: 'Epic & Steam' },
    { id: 'apps' as TabType, label: 'Apps para PC', icon: Boxes, badge: 'Essenciais' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/40 bg-[#0c0f17]/90 backdrop-blur-xl transition-all shadow-lg shadow-purple-950/20">
      {/* Top Banner / Ticker */}
      <div className="w-full bg-gradient-to-r from-purple-950/80 via-indigo-950/80 to-purple-950/80 border-b border-purple-800/30 px-4 py-1 text-xs text-purple-300/80 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold px-2 py-0.5 bg-emerald-950/60 rounded-full border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Hydra Links Ativos
          </span>
          <span className="text-slate-300">
            Fontes integradas: FitGirl, SteamRIP, DODI, GOG, Xatab, Atop-Games, Empress
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={onOpenSourcesModal}
            className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-100 font-medium px-2 py-0.5 rounded bg-purple-900/40 border border-purple-700/40 hover:border-purple-500 transition-colors cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-purple-400" />
            Gerenciar Fontes Hydra
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('downloads')} 
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-600/30 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0b0d13] rounded-[10px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-purple-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  JOHNPLAY
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 tracking-wider">
                  ULTIMATE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium -mt-1 hidden sm:block">
                O Portal Gamer Supremo
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
                className="w-full bg-[#131824]/90 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSourcesModal}
              className="flex sm:hidden items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-900/50 border border-purple-600/40 text-purple-200 text-xs font-semibold"
            >
              <Database className="w-4 h-4" />
              Fontes
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 no-scrollbar border-t border-slate-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 select-none cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/30 text-white' : 'bg-slate-800 text-purple-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/40'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Search input */}
      <div className="px-4 pb-2 sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar no JohnPlay..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#131824] border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>
    </header>
  );
};
