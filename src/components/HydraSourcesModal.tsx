import React, { useState } from 'react';
import { 
  Database, 
  X, 
  Copy, 
  Check, 
  ExternalLink, 
  DownloadCloud, 
  UploadCloud, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Flame,
  Crown,
  Zap,
  Info
} from 'lucide-react';
import type { HydraSourceInfo, GameDownloadItem } from '../types';

interface HydraSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  sources: HydraSourceInfo[];
  onImportCustomJson: (customGames: GameDownloadItem[], sourceName: string) => void;
}

export const HydraSourcesModal: React.FC<HydraSourcesModalProps> = ({
  isOpen,
  onClose,
  sources,
  onImportCustomJson
}) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [allCopied, setAllCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'sources' | 'import'>('sources');

  if (!isOpen) return null;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleCopyAll = () => {
    const allUrls = sources.map(s => s.url).join('\n');
    navigator.clipboard.writeText(allUrls);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 3000);
  };

  const getSourceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'DownloadCloud': return <DownloadCloud className="w-5 h-5 text-blue-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-purple-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Crown': return <Crown className="w-5 h-5 text-fuchsia-400" />;
      default: return <Database className="w-5 h-5 text-indigo-400" />;
    }
  };

  const handleProcessCustomJson = () => {
    if (!jsonInput.trim()) {
      setImportStatus('Por favor, cole o conteúdo JSON antes de importar.');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      let downloadsList: any[] = [];
      let sourceName = parsed.name || 'Fonte Personalizada';

      if (Array.isArray(parsed)) {
        downloadsList = parsed;
      } else if (parsed.downloads && Array.isArray(parsed.downloads)) {
        downloadsList = parsed.downloads;
      } else {
        throw new Error('Estrutura não reconhecida. Esperado { name, downloads: [] } ou array de downloads.');
      }

      const formattedGames: GameDownloadItem[] = downloadsList.slice(0, 100).map((item, index) => {
        const uris = Array.isArray(item.uris) 
          ? item.uris.map((u: string, idx: number) => ({
              type: u.startsWith('magnet:') ? 'magnet' as const : 'ddl' as const,
              label: u.startsWith('magnet:') ? `Magnet Link #${idx + 1}` : `Download Direto #${idx + 1}`,
              url: u
            }))
          : [{ type: 'ddl' as const, label: 'Link de Download', url: item.uris || '#' }];

        return {
          id: `custom-${Date.now()}-${index}`,
          title: item.title || item.name || `Jogo Sem Título ${index + 1}`,
          source: 'custom',
          sourceName: sourceName,
          fileSize: item.fileSize || item.size || 'N/A',
          uploadDate: item.uploadDate || new Date().toISOString().split('T')[0],
          category: ['Importado', 'Custom'],
          coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60',
          description: `Download importado via Hydra Source JSON da fonte ${sourceName}.`,
          uris: uris
        };
      });

      onImportCustomJson(formattedGames, sourceName);
      setImportStatus(`Sucesso! ${formattedGames.length} jogos importados para o JohnPlay!`);
      setTimeout(() => {
        setImportStatus(null);
        setJsonInput('');
        onClose();
      }, 1500);
    } catch (err: any) {
      setImportStatus(`Erro ao ler JSON: ${err.message}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonInput(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0f1422] border border-purple-800/40 rounded-2xl shadow-2xl shadow-purple-950/60 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#141b2d]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Fontes Oficiais HydraLinks
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-medium">
                  {sources.length} Fontes Ativas
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Links diretos para usar no JohnPlay, Hydra Launcher ou qualquer agregador
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 bg-[#0d111a] px-6">
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'sources'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Lista de Fontes Hydra ({sources.length})
          </button>
          <button
            onClick={() => setActiveTab('import')}
            className={`py-3 px-4 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'import'
                ? 'border-purple-500 text-purple-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            Importar JSON Personalizado
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'sources' ? (
            <>
              {/* Quick Info Box */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/40 text-xs text-purple-200/90 flex items-start gap-3">
                <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-purple-100 mb-1">
                    Como usar com o Hydra Launcher Oficial:
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Copie as URLs abaixo e cole nas configurações do seu <strong>Hydra Launcher</strong> em <code className="bg-purple-900/60 px-1 py-0.5 rounded text-purple-200">Configurações &gt; Fontes de Download &gt; Adicionar Fonte</code>. O JohnPlay já sincroniza e indexa estas fontes para acesso direto pelo navegador.
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-medium text-slate-300">
                  Fontes pré-configuradas:
                </span>
                <button
                  onClick={handleCopyAll}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-900/40 transition-all"
                >
                  {allCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      Todas as 7 URLs Copiadas!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copiar Todas as URLs (7 Fontes)
                    </>
                  )}
                </button>
              </div>

              {/* Sources Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {sources.map((source) => {
                  const isCopied = copiedUrl === source.url;
                  return (
                    <div
                      key={source.id}
                      className="p-4 rounded-xl bg-[#131826] border border-slate-800/80 hover:border-purple-600/50 transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/50">
                              {getSourceIcon(source.icon)}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-100 text-sm group-hover:text-purple-300 transition-colors">
                                {source.name}
                              </h3>
                              <span className="text-[10px] text-slate-400">
                                {source.type} • {source.gameCountEstimated}
                              </span>
                            </div>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold bg-gradient-to-r ${source.badgeColor} text-white`}>
                            {source.id.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                          {source.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={source.url}
                          className="flex-1 bg-black/40 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-purple-300/80 font-mono select-all focus:outline-none"
                        />
                        <button
                          onClick={() => handleCopy(source.url)}
                          title="Copiar URL"
                          className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                            isCopied
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                              : 'bg-purple-900/30 border-purple-700/40 text-purple-300 hover:bg-purple-800/40'
                          }`}
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Abrir JSON no navegador"
                          className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <h3 className="font-semibold text-white text-sm mb-1">
                  Importar Fonte JSON Personalizada
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  Cole o código JSON no formato padrão HydraLinks (com <code className="text-purple-300">name</code> e <code className="text-purple-300">downloads: []</code>) ou envie um arquivo <code className="text-purple-300">.json</code> do seu computador.
                </p>

                <div className="flex items-center gap-3 mb-3">
                  <label className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-900/40 border border-purple-700/50 hover:bg-purple-800/40 text-purple-200 text-xs font-semibold cursor-pointer transition-colors">
                    <UploadCloud className="w-4 h-4" />
                    Carregar arquivo .json
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-xs text-slate-500">ou cole o texto abaixo</span>
                </div>

                <textarea
                  rows={8}
                  placeholder='{\n  "name": "Minha Fonte Custom",\n  "downloads": [\n    {\n      "title": "Jogo Exemplo",\n      "uris": ["magnet:?xt=urn:..."],\n      "fileSize": "12.5 GB",\n      "uploadDate": "2024-08-01"\n    }\n  ]\n}'
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full bg-[#0b0d13] border border-slate-800 rounded-xl p-3 font-mono text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500"
                />

                {importStatus && (
                  <div className={`mt-3 p-3 rounded-lg text-xs font-medium ${
                    importStatus.startsWith('Sucesso')
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-600/40'
                      : 'bg-red-950/80 text-red-300 border border-red-600/40'
                  }`}>
                    {importStatus}
                  </div>
                )}

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => setJsonInput('')}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={handleProcessCustomJson}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-900/50"
                  >
                    Processar e Adicionar ao JohnPlay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#121624] flex items-center justify-between text-xs text-slate-400">
          <span>JohnPlay Hydra Integration Engine v2.5</span>
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
