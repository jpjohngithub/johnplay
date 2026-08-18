import React, { useState } from 'react';
import { 
  Gift, 
  ExternalLink, 
  Clock
} from 'lucide-react';
import { PROMOTIONS_LIST } from '../data/dealsData';

export const DealsSection: React.FC = () => {
  const [filterStore, setFilterStore] = useState<'all' | 'free' | 'steam' | 'epic'>('all');

  const freeGames = PROMOTIONS_LIST.filter(d => d.isFree);
  const steamDeals = PROMOTIONS_LIST.filter(d => d.store === 'Steam');

  const filteredDeals = PROMOTIONS_LIST.filter((deal) => {
    if (filterStore === 'free') return deal.isFree;
    if (filterStore === 'steam') return deal.store === 'Steam';
    if (filterStore === 'epic') return deal.store === 'Epic Games';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#24131e] via-[#151124] to-[#0c0f17] border border-amber-800/40 p-6 sm:p-8 shadow-xl shadow-amber-950/20">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-semibold">
            <Gift className="w-3.5 h-3.5 text-amber-400" />
            Rastreador de Promoções & Jogos Grátis
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Jogos Grátis e <span className="bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">Super Promoções</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Fique por dentro de todos os jogos grátis semanais da <strong>Epic Games Store</strong> para resgatar para sempre e as maiores promoções com até 80% de desconto na <strong>Steam</strong>.
          </p>
        </div>
      </div>

      {/* Free Games of the Week Spotlight (Epic Games) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-rose-400" />
            Jogos Grátis Desta Semana na Epic Games
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 uppercase font-bold">
              100% Grátis
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {freeGames.map((deal) => (
            <div
              key={deal.id}
              className="relative rounded-2xl bg-gradient-to-r from-[#171329] to-[#121626] border border-rose-600/40 p-5 flex flex-col sm:flex-row gap-4 items-center shadow-xl shadow-rose-950/30 overflow-hidden group"
            >
              {/* Image */}
              <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden flex-shrink-0 bg-slate-900">
                <img
                  src={deal.coverImage}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white shadow">
                  GRÁTIS
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2 text-[11px] text-amber-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{deal.freeUntil}</span>
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg group-hover:text-rose-300 transition-colors">
                  {deal.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs">
                  <span className="line-through text-slate-500">{deal.originalPrice}</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    {deal.discountedPrice}
                  </span>
                </div>

                <div className="pt-2">
                  <a
                    href={deal.dealUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-900/40 transition-all"
                  >
                    <Gift className="w-4 h-4" />
                    Resgatar na Epic Store
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setFilterStore('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterStore === 'all'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-[#121626] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Todas as Ofertas ({PROMOTIONS_LIST.length})
        </button>
        <button
          onClick={() => setFilterStore('free')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterStore === 'free'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-[#121626] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Apenas Grátis ({freeGames.length})
        </button>
        <button
          onClick={() => setFilterStore('steam')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filterStore === 'steam'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-[#121626] text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Promoções Steam ({steamDeals.length})
        </button>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDeals.map((deal) => (
          <div
            key={deal.id}
            className="group rounded-2xl bg-[#121727] border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between overflow-hidden shadow-lg hover:-translate-y-1"
          >
            <div className="relative h-40 w-full overflow-hidden bg-slate-900">
              <img
                src={deal.coverImage}
                alt={deal.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121727] via-transparent to-black/30"></div>
              
              <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-slate-200 border border-slate-700 backdrop-blur-md">
                {deal.store}
              </span>

              <span className="absolute top-3 right-3 text-xs font-black px-2 py-0.5 rounded bg-emerald-600 text-white shadow">
                -{deal.discountPercentage}%
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1">
                  {deal.title}
                </h3>
                
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {deal.tags.slice(0, 2).map((t, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 line-through block">
                    {deal.originalPrice}
                  </span>
                  <span className="text-sm font-black text-emerald-400">
                    {deal.discountedPrice}
                  </span>
                </div>

                <a
                  href={deal.dealUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Ver Oferta</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
