import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DownloadsSection } from './components/DownloadsSection';
import { BrowserGamesSection } from './components/BrowserGamesSection';
import { EmulatorsSection } from './components/EmulatorsSection';
import { DealsSection } from './components/DealsSection';
import { UsefulAppsSection } from './components/UsefulAppsSection';
import { HydraSourcesModal } from './components/HydraSourcesModal';
import { GameDetailsModal } from './components/GameDetailsModal';
import { Footer } from './components/Footer';

import { HYDRA_SOURCES, INITIAL_GAMES_CATALOG } from './data/hydraSourcesData';
import type { TabType, GameDownloadItem, HydraSourceInfo } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('downloads');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameDownloadItem | null>(null);

  // Dynamic games catalog (allows user import)
  const [games, setGames] = useState<GameDownloadItem[]>(() => {
    try {
      const saved = localStorage.getItem('johnplay_custom_games');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...INITIAL_GAMES_CATALOG, ...parsed];
      }
    } catch (e) {
      console.error('Error loading saved games', e);
    }
    return INITIAL_GAMES_CATALOG;
  });

  const [sources] = useState<HydraSourceInfo[]>(HYDRA_SOURCES);

  const handleImportCustomJson = (customGames: GameDownloadItem[]) => {
    setGames(prev => {
      const updated = [...customGames, ...prev];
      try {
        localStorage.setItem('johnplay_custom_games', JSON.stringify(customGames));
      } catch (e) {
        console.error('Error saving custom games', e);
      }
      return updated;
    });
    setActiveTab('downloads');
  };

  return (
    <div className="min-h-screen bg-[#0b0d14] text-slate-100 flex flex-col selection:bg-purple-600 selection:text-white">
      {/* Background cyber grid & glow decorations */}
      <div className="fixed inset-0 gaming-grid-bg opacity-30 pointer-events-none"></div>
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed top-1/3 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
        gamesCount={games.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 z-10">
        {activeTab === 'downloads' && (
          <DownloadsSection
            games={games}
            sources={sources}
            searchQuery={searchQuery}
            onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
            onSelectGame={(game) => setSelectedGame(game)}
          />
        )}

        {activeTab === 'browser-games' && (
          <BrowserGamesSection />
        )}

        {activeTab === 'emulators' && (
          <EmulatorsSection />
        )}

        {activeTab === 'deals' && (
          <DealsSection />
        )}

        {activeTab === 'apps' && (
          <UsefulAppsSection />
        )}
      </main>

      {/* Modals */}
      <HydraSourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
        sources={sources}
        onImportCustomJson={handleImportCustomJson}
      />

      <GameDetailsModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
      />
    </div>
  );
}

export default App;
