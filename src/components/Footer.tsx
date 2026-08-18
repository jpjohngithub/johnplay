import React from 'react';
import { Flame, ShieldCheck, Heart, Database, Sparkles } from 'lucide-react';
import type { TabType } from '../types';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenSourcesModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenSourcesModal }) => {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-[#090c14] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0b0d13] rounded-[6px] flex items-center justify-center">
                  <Flame className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="text-lg font-black tracking-wider bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                JOHNPLAY
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              O portal gamer tudo-em-um: downloads de repacks e lançamentos limpos, jogos de navegador, emuladores, promoções da Epic e Steam e apps essenciais para PC.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Sincronizado com Fontes Oficiais Hydra</span>
            </div>
          </div>

          {/* Col 2: Seções */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Navegação Rápida
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('downloads')} className="hover:text-purple-300 transition-colors cursor-pointer">
                  Download de Jogos (Repacks)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('browser-games')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Jogos no Navegador (Arcade)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('emulators')} className="hover:text-purple-300 transition-colors cursor-pointer">
                  Emuladores de PC
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('deals')} className="hover:text-amber-300 transition-colors cursor-pointer">
                  Promoções & Jogos Grátis
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('apps')} className="hover:text-purple-300 transition-colors cursor-pointer">
                  Apps para PC
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Softwares em Destaque */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Softwares em Destaque
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('apps')} className="hover:text-purple-300 transition-colors cursor-pointer">
                  Lossless Scaling (Frame Gen)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('apps')} className="hover:text-purple-300 transition-colors cursor-pointer">
                  Visual C++ & DirectX All-In-One
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('apps')} className="hover:text-purple-300 transition-colors cursor-pointer">
                  Hydra Launcher & Playnite
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('apps')} className="hover:text-purple-300 transition-colors cursor-pointer">
                  DS4Windows & Mem Reduct
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Hydra Ecosystem */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-purple-400" />
              Fontes HydraLinks
            </h4>
            <p className="text-[11px] text-slate-400">
              Fontes integradas: FitGirl, SteamRIP, DODI, GOG, Xatab, Atop-Games e Empress.
            </p>
            <button
              onClick={onOpenSourcesModal}
              className="px-3 py-1.5 rounded-lg bg-purple-950/80 border border-purple-700/50 hover:bg-purple-900/60 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Abrir Gerenciador de Fontes
            </button>
          </div>

        </div>

        {/* Copyright Notice */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} JohnPlay Ultimate Gaming Portal. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            Feito para a comunidade gamer com <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
