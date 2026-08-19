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
  Zap,
  Radio
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
    { id: 'downloads' as TabType, label: 'Loja & Addons (Downloads)', icon: Download, count: `${gamesCount}` },
    { id: 'browser-games' as TabType, label: 'Jogos no Navegador', icon: Gamepad2, badge: 'Subway Surfers' },
    { id: 'emulators' as TabType, label: 'Emuladores', icon: Disc, count: '10' },
    { id: 'deals' as TabType, label: 'Promoções & Grátis', icon: Tag, badge: 'Epic & Steam' },
    { id: 'apps' as TabType, label: 'Softwares para PC', icon: Boxes, badge: 'Essenciais' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#070a14]/95 backdrop-blur-2xl transition-all shadow-2xl shadow-black/60">
      
      {/* Top Desktop Window Bar (Steam / Epic Games Launcher Style) */}
      <div className="w-full bg-[#05070e] border-b border-slate-800/60 px-4 sm:px-6 py-1.5 text-xs flex items-center justify-between">
        
        {/* Left Window Status */}
        <div className="flex items-center gap-3">
          {/* Window control dots */}
          <div className="hidden sm:flex items-center gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
              HYDRA ENGINE 100% ONLINE
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden md:inline">
              | 7 Fontes: FitGirl, DODI, SteamRIP, GOG, Xatab, Atop, Empress
            </span>
          </div>
        </div>

        {/* Right Addons Manager Trigger */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenSourcesModal}
            className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300 hover:text-white px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-600/40 hover:border-purple-400 hover:bg-purple-900/60 transition-all cursor-pointer shadow-sm"
          >
            <Database className="w-3.5 h-3.5 text-purple-400" />
            <span>Gerenciar Fontes Addons JSON</span>
          </button>
        </div>
      </div>

      {/* Main Launcher Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Brand Logo with Glowing Cyber Accent */}
          <div 
            onClick={() => setActiveTab('downloads')} 
            className="flex items-center gap-3.5 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-cyan-400 p-0.5 shadow-xl shadow-purple-600/30 group-hover:shadow-purple-500/60 transition-all duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#070a13] rounded-[14px] flex items-center justify-center">
                <Flame className="w-6 h-6 text-purple-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black tracking-wider bg-gradient-to-r from-purple-300 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                  JOHNPLAY
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/40 tracking-widest uppercase shadow-sm">
                  STORE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold -mt-1 hidden sm:block">
                O Portal Gamer Supremo • Estilo Steam & Epic Games
              </p>
            </div>
          </div>

          {/* Steam-Style Global Search Bar */}
          <div className="flex-1 max-w-lg hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar jogos, repacks, addons, emuladores, promoções..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1222] border border-slate-700/70 rounded-2xl pl-10 pr-14 py-2.5 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all shadow-inner"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              ) : (
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 bg-slate-800/90 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                  Ctrl+K
                </span>
              )}
            </div>
          </div>

          {/* Quick Addon Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSourcesModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-slate-950 font-black text-xs shadow-lg shadow-purple-900/40 flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>Addons</span>
            </button>
          </div>
        </div>

        {/* Launcher Tab Bar (Steam Shelf Style) */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar border-t border-slate-800/60">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 select-none cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white shadow-xl shadow-purple-900/50 scale-[1.02]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
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

      {/* Mobile Search input */}
      <div className="px-4 pb-2.5 sm:hidden bg-[#070a14]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar no JohnPlay..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0d1222] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>
    </header>
  );
};
