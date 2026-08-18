import React, { useState } from 'react';
import { 
  Disc, 
  Download, 
  Code2, 
  Cpu, 
  HelpCircle, 
  ShieldCheck, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Gamepad2
} from 'lucide-react';
import { EMULATORS_LIST } from '../data/emulatorsData';

export const EmulatorsSection: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('Todos');
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>(null);

  const platforms = ['Todos', 'PlayStation', 'Nintendo', 'Xbox', 'Multi'];

  const filteredEmulators = EMULATORS_LIST.filter((emu) => {
    if (selectedPlatform === 'Todos') return true;
    if (selectedPlatform === 'PlayStation') return emu.platform.includes('PlayStation') || emu.platform.includes('PS');
    if (selectedPlatform === 'Nintendo') return emu.platform.includes('Nintendo') || emu.platform.includes('Switch') || emu.platform.includes('3DS') || emu.platform.includes('Wii');
    if (selectedPlatform === 'Xbox') return emu.platform.includes('Xbox');
    if (selectedPlatform === 'Multi') return emu.platform.includes('Multi');
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Essencial':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Excelente':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      default:
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#12162d] via-[#101422] to-[#0c0f17] border border-purple-800/40 p-6 sm:p-8 shadow-xl shadow-purple-950/30">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-600/40 text-purple-300 text-xs font-semibold">
            <Disc className="w-3.5 h-3.5 text-purple-400" />
            Central de Emulação PC
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Emuladores de PC <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Oficiais e Guias</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Reviva clássicos e lançamentos do PS3, PS2, PS1, Nintendo Switch, Wii U, 3DS, Xbox 360 e retrô com os emuladores mais atualizados e otimizados do mundo.
          </p>
        </div>
      </div>

      {/* Platform Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {platforms.map((plat) => (
          <button
            key={plat}
            onClick={() => setSelectedPlatform(plat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedPlatform === plat
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-900/40'
                : 'bg-[#131826] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {plat}
          </button>
        ))}
      </div>

      {/* Emulators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEmulators.map((emu) => {
          const isExpanded = expandedGuideId === emu.id;

          return (
            <div
              key={emu.id}
              className="rounded-2xl bg-[#121727] border border-slate-800 hover:border-purple-600/50 transition-all p-5 flex flex-col justify-between shadow-lg space-y-4"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/50 text-purple-400">
                      <Gamepad2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-white">{emu.name}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(emu.status)}`}>
                          {emu.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-purple-300/90">{emu.platform}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {emu.description}
                </p>

                {/* Key Features List */}
                <div className="p-3 rounded-xl bg-[#0e121d] border border-slate-800/80 mb-3 space-y-1.5">
                  <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider block">
                    Destaques & Recursos:
                  </span>
                  {emu.keyFeatures.map((feat, i) => (
                    <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                      <span className="text-purple-400 font-bold">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Requirements Box */}
                <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 text-xs space-y-1">
                  <div className="flex items-center gap-1 text-slate-400 font-medium">
                    <Cpu className="w-3.5 h-3.5 text-purple-400" />
                    <span>Requisitos Recomendados:</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    <strong>CPU:</strong> {emu.requirements.cpu} | <strong>GPU:</strong> {emu.requirements.gpu} | <strong>RAM:</strong> {emu.requirements.ram}
                  </p>
                </div>

                {/* BIOS status indicator */}
                <div className="mt-2.5 flex items-center gap-2 text-xs">
                  {emu.biosRequired ? (
                    <span className="inline-flex items-center gap-1 text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 text-[11px]">
                      <AlertTriangle className="w-3 h-3" />
                      Requer BIOS / Firmware
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30 text-[11px]">
                      <ShieldCheck className="w-3 h-3" />
                      Sem necessidade de BIOS externa
                    </span>
                  )}
                </div>

                {/* Expandable Setup Guide */}
                {isExpanded && (
                  <div className="mt-3 p-3.5 rounded-xl bg-[#141b2c] border border-purple-700/40 space-y-2 animate-in fade-in duration-200">
                    <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                      Guia de Configuração Rápida:
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-slate-300">
                      {emu.setupGuide.map((step, sIdx) => (
                        <li key={sIdx} className="leading-relaxed">{step}</li>
                      ))}
                    </ol>
                    {emu.biosNotes && (
                      <p className="text-[11px] text-amber-300/90 pt-1 border-t border-slate-700/60">
                        ⚠️ <em>{emu.biosNotes}</em>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setExpandedGuideId(isExpanded ? null : emu.id)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
                  <span>{isExpanded ? 'Ocultar Guia' : 'Como Configurar'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-2">
                  {emu.githubUrl && (
                    <a
                      href={emu.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Código Aberto no GitHub"
                    >
                      <Code2 className="w-4 h-4" />
                    </a>
                  )}

                  <a
                    href={emu.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-950 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar Oficial</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
