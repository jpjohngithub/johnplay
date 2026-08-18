export type TabType = 
  | 'downloads' 
  | 'browser-games' 
  | 'emulators' 
  | 'deals' 
  | 'apps';

export type RepackSourceId = 
  | 'fitgirl' 
  | 'steamrip' 
  | 'dodi' 
  | 'gog' 
  | 'xatab' 
  | 'atop' 
  | 'empress'
  | 'custom';

export interface HydraSourceInfo {
  id: RepackSourceId;
  name: string;
  url: string;
  description: string;
  badgeColor: string;
  type: 'Repack' | 'Direct Play / DDL' | 'GOG DRM-Free' | 'Scene / Crack';
  icon: string;
  gameCountEstimated: string;
}

export interface GameDownloadItem {
  id: string;
  title: string;
  source: RepackSourceId;
  sourceName: string;
  fileSize: string;
  uploadDate: string;
  category: string[];
  coverImage: string;
  bannerImage?: string;
  description: string;
  uris: {
    type: 'magnet' | 'torrent' | 'ddl' | 'gdrive' | 'mega' | 'qiwi' | 'datanodes' | '1fichier';
    label: string;
    url: string;
  }[];
  systemRequirements?: {
    os: string;
    cpu: string;
    ram: string;
    gpu: string;
    storage: string;
  };
  features?: string[];
  rating?: number;
  steamUrl?: string;
}

export interface BrowserGame {
  id: string;
  title: string;
  genre: string;
  thumbnail: string;
  description: string;
  controls: string;
  type: 'canvas-2048' | 'canvas-flappy' | 'canvas-snake' | 'canvas-pong' | 'canvas-spaceinvaders' | 'canvas-tetris' | 'iframe';
  iframeUrl?: string;
  author?: string;
  tags: string[];
}

export interface EmulatorItem {
  id: string;
  name: string;
  platform: string;
  consoleIcon: string;
  description: string;
  status: 'Excelente' | 'Muito Bom' | 'Em Desenvolvimento' | 'Essencial';
  officialUrl: string;
  downloadUrl: string;
  githubUrl?: string;
  requirements: {
    cpu: string;
    gpu: string;
    ram: string;
    os: string;
  };
  keyFeatures: string[];
  setupGuide: string[];
  biosRequired: boolean;
  biosNotes?: string;
}

export interface GameDealItem {
  id: string;
  title: string;
  store: 'Epic Games' | 'Steam' | 'GOG';
  storeLogo: string;
  originalPrice: string;
  discountedPrice: string;
  discountPercentage: number;
  isFree: boolean;
  freeUntil?: string;
  coverImage: string;
  dealUrl: string;
  tags: string[];
  expiryTime?: string;
}

export interface UsefulApp {
  id: string;
  name: string;
  category: 'launchers' | 'performance' | 'runtimes' | 'audio-rec' | 'controllers' | 'utilities' | 'streaming';
  description: string;
  icon: string;
  version: string;
  downloadUrl: string;
  officialSite: string;
  tags: string[];
  isEssential: boolean;
}
