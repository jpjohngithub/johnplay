import type { HydraSourceInfo, GameDownloadItem } from '../types';

export const HYDRA_SOURCES: HydraSourceInfo[] = [
  {
    id: 'fitgirl',
    name: 'FitGirl Repacks',
    url: 'https://hydralinks.cloud/sources/fitgirl.json',
    description: 'A repackeira mais famosa do mundo. Altíssima compressão de dados e instaladores otimizados com suporte a múltiplos idiomas.',
    badgeColor: 'from-pink-500 to-rose-600',
    type: 'Repack',
    icon: 'Sparkles',
    gameCountEstimated: '4.500+ Jogos'
  },
  {
    id: 'steamrip',
    name: 'SteamRIP',
    url: 'https://hydralinks.cloud/sources/steamrip.json',
    description: 'Jogos pré-instalados com downloads diretos (Direct Play). Basta extrair o arquivo .zip e jogar sem precisar instalar.',
    badgeColor: 'from-blue-500 to-indigo-600',
    type: 'Direct Play / DDL',
    icon: 'DownloadCloud',
    gameCountEstimated: '6.200+ Jogos'
  },
  {
    id: 'dodi',
    name: 'DODI Repacks',
    url: 'https://hydralinks.cloud/sources/dodi.json',
    description: 'Repacks rápidos de instalar com ótima compressão e lançamentos quase diários dos jogos mais recentes e atualizados.',
    badgeColor: 'from-emerald-500 to-teal-600',
    type: 'Repack',
    icon: 'Zap',
    gameCountEstimated: '3.800+ Jogos'
  },
  {
    id: 'gog',
    name: 'Free GOG Games',
    url: 'https://hydralinks.cloud/sources/gog.json',
    description: 'Instaladores oficiais GOG 100% livres de DRM (DRM-Free). Sem cracks, sem modificações e com suporte total a updates limpos.',
    badgeColor: 'from-purple-500 to-violet-600',
    type: 'GOG DRM-Free',
    icon: 'ShieldCheck',
    gameCountEstimated: '2.900+ Jogos'
  },
  {
    id: 'xatab',
    name: 'Xatab Repacks',
    url: 'https://hydralinks.cloud/sources/xatab.json',
    description: 'Lendário repack russo clássico conhecido pela estabilidade, compatibilidade com PCs variados e patches pré-aplicados.',
    badgeColor: 'from-amber-500 to-orange-600',
    type: 'Repack',
    icon: 'Flame',
    gameCountEstimated: '2.100+ Jogos'
  },
  {
    id: 'atop',
    name: 'Atop-Games',
    url: 'https://hydralinks.cloud/sources/atop-games.json',
    description: 'Downloads diretos velozes com servidores em nuvem (Mega, Qiwi, Google Drive) e jogos em versões portáteis ou empacotadas.',
    badgeColor: 'from-cyan-500 to-blue-600',
    type: 'Direct Play / DDL',
    icon: 'Layers',
    gameCountEstimated: '1.800+ Jogos'
  },
  {
    id: 'empress',
    name: 'Empress Releases',
    url: 'https://hydralinks.cloud/sources/empress.json',
    description: 'Releases históricos de títulos protegidos com Denuvo (Hogwarts Legacy, Resident Evil Village, Assassin’s Creed Valhalla, etc.).',
    badgeColor: 'from-fuchsia-600 to-purple-800',
    type: 'Scene / Crack',
    icon: 'Crown',
    gameCountEstimated: '350+ Jogos AAA'
  }
];

export const INITIAL_GAMES_CATALOG: GameDownloadItem[] = [
  {
    id: 'elden-ring-shadow',
    title: 'ELDEN RING: Shadow of the Erdtree Edition',
    source: 'fitgirl',
    sourceName: 'FitGirl Repacks',
    fileSize: '49.8 GB',
    uploadDate: '2024-06-21',
    category: ['RPG', 'Mundo Aberto', 'Souls-like', 'Ação'],
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60',
    description: 'Vencedor de mais de 300 prêmios de Jogo do Ano, agora com a colossal expansão Shadow of the Erdtree completa e atualizada.',
    features: ['v1.12.2 + DLC Inclusa', 'Multiplayer Co-op Mod Opcional', 'Compressão Ultra Alta (de 65GB para 49GB)'],
    rating: 9.8,
    steamUrl: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    systemRequirements: {
      os: 'Windows 10/11 64-bit',
      cpu: 'Intel Core i5-8400 ou AMD Ryzen 3 3300X',
      ram: '12 GB RAM',
      gpu: 'NVIDIA GeForce GTX 1060 3GB / AMD Radeon RX 580 4GB',
      storage: '60 GB livres (SSD recomendado)'
    },
    uris: [
      { type: 'magnet', label: 'Magnet Link (Torrent Rápido)', url: 'magnet:?xt=urn:btih:e1d3n71ng5h4d0w0fth33rdtr33f1tg1r1' },
      { type: 'datanodes', label: 'Datanodes (Download Direto)', url: 'https://steamrip.com' },
      { type: '1fichier', label: '1Fichier Mirror', url: 'https://fitgirl-repacks.site' }
    ]
  },
  {
    id: 'cyberpunk-2077-phantom',
    title: 'Cyberpunk 2077: Phantom Liberty (v2.13)',
    source: 'gog',
    sourceName: 'Free GOG Games',
    fileSize: '68.2 GB',
    uploadDate: '2024-09-12',
    category: ['RPG', 'Cyberpunk', 'Mundo Aberto', 'FPS'],
    coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&auto=format&fit=crop&q=60',
    description: 'Explore Night City e o perigoso distrito de Dogtown com Keanu Reeves e Idris Elba. 100% DRM-Free sem necessidade de crack.',
    features: ['Versão 2.13 Completa', 'Sem DRM (GOG Original)', 'Ray Tracing Overdrive & DLSS 3.7 / FSR 3.1'],
    rating: 9.6,
    steamUrl: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
    systemRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Core i7-6700 ou Ryzen 5 1600',
      ram: '16 GB RAM',
      gpu: 'GeForce GTX 1060 6GB ou Radeon RX 580 8GB',
      storage: '70 GB SSD'
    },
    uris: [
      { type: 'ddl', label: 'Instalador GOG (Direct DDL)', url: 'https://gog-games.to' },
      { type: 'magnet', label: 'Magnet Torrent (GOG Clean)', url: 'magnet:?xt=urn:btih:c7b3rpunk2077ph4nt0ml1b3rtyg0g' },
      { type: 'qiwi', label: 'Qiwi Cloud Direct', url: 'https://qiwi.gg' }
    ]
  },
  {
    id: 'black-myth-wukong',
    title: 'Black Myth: Wukong (Full Game & Shaders Cache)',
    source: 'steamrip',
    sourceName: 'SteamRIP',
    fileSize: '118.5 GB',
    uploadDate: '2024-08-20',
    category: ['Ação', 'Mitologia', 'Souls-like', 'Aventura'],
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60',
    description: 'Entre no papel do Predestinado nesta jornada épica inspirada na lenda de Jornada ao Oeste feita na Unreal Engine 5.',
    features: ['Direct Play (Extrair e Jogar)', 'Shaders pré-compilados inclusos', 'Suporte total a Controle DualSense e Xbox'],
    rating: 9.7,
    steamUrl: 'https://store.steampowered.com/app/2358720/Black_Myth_Wukong/',
    systemRequirements: {
      os: 'Windows 10/11 64-bit',
      cpu: 'Core i5-8400 / Ryzen 5 1600',
      ram: '16 GB RAM',
      gpu: 'GeForce GTX 1060 6GB / AMD RX 580 8GB',
      storage: '130 GB SSD'
    },
    uris: [
      { type: 'mega', label: 'Mega.nz SuperFast DDL', url: 'https://mega.nz' },
      { type: 'datanodes', label: 'Datanodes Ultra Mirror', url: 'https://steamrip.com' },
      { type: 'magnet', label: 'Magnet P2P Direct', url: 'magnet:?xt=urn:btih:b14ckmythwuk0ngst34mr1pfulld1r3ct' }
    ]
  },
  {
    id: 'hogwarts-legacy-empress',
    title: 'Hogwarts Legacy: Digital Deluxe Edition',
    source: 'empress',
    sourceName: 'Empress Releases',
    fileSize: '54.2 GB',
    uploadDate: '2023-02-23',
    category: ['Mundo Aberto', 'Magia', 'RPG', 'Fantasia'],
    coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=60',
    description: 'Viva o não escrito em Hogwarts no século XIX. Explore o castelo, Hogsmeade e a Floresta Proibida sem Denuvo.',
    features: ['Denuvo Bypass Crack', 'Todos os cosméticos Deluxe e Montaria Thestral', 'Dublagem em Português-BR inclusa'],
    rating: 9.3,
    systemRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i5-6600 ou AMD Ryzen 5 1400',
      ram: '16 GB RAM',
      gpu: 'NVIDIA GeForce GTX 960 4GB ou AMD Radeon RX 470 4GB',
      storage: '85 GB HDD/SSD'
    },
    uris: [
      { type: 'magnet', label: 'Magnet Link Empress Original', url: 'magnet:?xt=urn:btih:h0gw4rtsl3g4cy3mpr3sscr4ckd3lux3' },
      { type: 'torrent', label: 'Torrent File Mirror (1337x)', url: 'https://1337x.to' }
    ]
  },
  {
    id: 'gta-v-enhanced',
    title: 'Grand Theft Auto V: Premium Enhanced Edition',
    source: 'dodi',
    sourceName: 'DODI Repacks',
    fileSize: '59.4 GB',
    uploadDate: '2024-03-10',
    category: ['Mundo Aberto', 'Ação', 'Crime', 'Clássico'],
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
    description: 'Quando um jovem malandro de rua, um ladrão de bancos aposentado e um psicopata aterrorizante entram na mira do submundo.',
    features: ['v1.0.3095 / v1.68 Online Content Offline', 'Mod FiveM Ready', 'Instalação rápida de 25 minutos'],
    rating: 9.9,
    steamUrl: 'https://store.steampowered.com/app/271590/Grand_Theft_Auto_V/',
    systemRequirements: {
      os: 'Windows 10 / 8.1 / 7 64-bit',
      cpu: 'Intel Core 2 Quad CPU Q6600 @ 2.40GHz',
      ram: '4 GB RAM (8GB recomendado)',
      gpu: 'NVIDIA 9800 GT 1GB / AMD HD 4870 1GB',
      storage: '72 GB'
    },
    uris: [
      { type: 'magnet', label: 'Magnet Link DODI Ultra', url: 'magnet:?xt=urn:btih:gt4vpr3m1umd0d1r3p4ckv168' },
      { type: 'qiwi', label: 'Qiwi DDL Direto', url: 'https://dodi-repacks.site' }
    ]
  },
  {
    id: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2: Ultimate Edition',
    source: 'fitgirl',
    sourceName: 'FitGirl Repacks',
    fileSize: '66.3 GB',
    uploadDate: '2023-11-05',
    category: ['Mundo Aberto', 'História', 'Faroeste', 'Ação'],
    coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60',
    description: 'Arthur Morgan e a gangue Van der Linde são forçados a fugir pelos Estados Unidos na virada para o século XX.',
    features: ['v1491.50 Atualizado', 'Vulkan & DirectX 12 Otimizados', 'Todos os bônus da Ultimate Edition'],
    rating: 9.9,
    steamUrl: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/',
    systemRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i5-2500K / AMD FX-6300',
      ram: '8 GB RAM (12 GB recomendado)',
      gpu: 'Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB',
      storage: '120 GB livres'
    },
    uris: [
      { type: 'magnet', label: 'Magnet Link FitGirl', url: 'magnet:?xt=urn:btih:r3dd34dr3d3mpt10n2f1tg1r1ult1m4t3' },
      { type: '1fichier', label: '1Fichier Fast Mirrors', url: 'https://fitgirl-repacks.site' }
    ]
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'God of War Ragnarök: Valhalla Included',
    source: 'steamrip',
    sourceName: 'SteamRIP',
    fileSize: '102.0 GB',
    uploadDate: '2024-09-19',
    category: ['Ação', 'Mitologia Nórdica', 'História', 'Aventura'],
    coverImage: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=60',
    description: 'Kratos e Atreus devem viajar pelos Nove Reinos em busca de respostas enquanto as forças de Asgard se preparam para a guerra profetizada.',
    features: ['DLC Valhalla inclusa', 'Bypass de 6GB VRAM integrado', 'Direct Play sem instalador'],
    rating: 9.8,
    systemRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel i5-4670k ou AMD Ryzen 3 1200',
      ram: '8 GB RAM (16 GB recomendado)',
      gpu: 'NVIDIA GTX 1060 6GB ou AMD RX 5500 XT 8GB',
      storage: '110 GB SSD'
    },
    uris: [
      { type: 'datanodes', label: 'Datanodes High Speed', url: 'https://steamrip.com' },
      { type: 'magnet', label: 'Magnet Torrent StreamRIP', url: 'magnet:?xt=urn:btih:g0d0fw4rr4gn4r0kst34mr1pfullddl' }
    ]
  },
  {
    id: 'baldur-gate-3',
    title: "Baldur's Gate 3: Digital Deluxe (Patch 7)",
    source: 'gog',
    sourceName: 'Free GOG Games',
    fileSize: '98.5 GB',
    uploadDate: '2024-09-15',
    category: ['RPG', 'Turnos', 'D&D', 'Mundo Aberto'],
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    description: 'Reúna seu grupo e retorne aos Reinos Esquecidos em uma história de companheirismo, traição, sacrifício e a atração do poder absoluto.',
    features: ['Patch 7 com Suporte Oficial a Mods', '100% DRM-Free GOG', 'Novos Finais do Mal & Cinematics'],
    rating: 9.9,
    steamUrl: 'https://store.steampowered.com/app/1086940/Baldurs_Gate_3/',
    systemRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel i5-4690 / AMD FX 8350',
      ram: '8 GB RAM (16 GB recomendado)',
      gpu: 'Nvidia GTX 970 / RX 480 (4GB+ VRAM)',
      storage: '150 GB SSD'
    },
    uris: [
      { type: 'ddl', label: 'GOG Official Installer (Partes DDL)', url: 'https://gog-games.to' },
      { type: 'magnet', label: 'Magnet P2P Clean GOG', url: 'magnet:?xt=urn:btih:b4ldursg4t33p4tch7g0gcl34n' }
    ]
  },
  {
    id: 'silent-hill-2-remake',
    title: 'Silent Hill 2 Remake: Deluxe Edition',
    source: 'dodi',
    sourceName: 'DODI Repacks',
    fileSize: '34.6 GB',
    uploadDate: '2024-10-08',
    category: ['Terror', 'Sobrevivência', 'Suspense', 'Remake'],
    coverImage: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=800&auto=format&fit=crop&q=60',
    description: 'Tendo recebido uma carta de sua falecida esposa, James ruma para o lugar onde compartilharam tantas memórias: Silent Hill.',
    features: ['Unreal Engine 5 Remake', 'FSR 3.1 & DLSS 3.7 Ativados', 'Trilha Sonora e Artbook Deluxe Inclusos'],
    rating: 9.4,
    systemRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i7-6700K ou AMD Ryzen 5 3600',
      ram: '16 GB RAM',
      gpu: 'NVIDIA GeForce RTX 2060 ou AMD Radeon RX 5700 XT',
      storage: '50 GB SSD'
    },
    uris: [
      { type: 'magnet', label: 'Magnet Link DODI', url: 'magnet:?xt=urn:btih:s1l3nth1ll2r3m4k3d0d1r3p4ck' },
      { type: 'qiwi', label: 'Qiwi Fast Download', url: 'https://dodi-repacks.site' }
    ]
  },
  {
    id: 'forza-horizon-5',
    title: 'Forza Horizon 5: Premium Edition (v1.656)',
    source: 'atop',
    sourceName: 'Atop-Games',
    fileSize: '110.2 GB',
    uploadDate: '2024-05-18',
    category: ['Corrida', 'Mundo Aberto', 'Carros', 'Simulação'],
    coverImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=60',
    description: 'Sua Maior Aventura Horizon o espera! Lidere expedições de tirar o fôlego pelas vibrantes paisagens de mundo aberto em constante evolução no México.',
    features: ['Rally Adventure + Hot Wheels DLCs', 'Mais de 800 carros desbloqueados', 'Online Fix Opcional'],
    rating: 9.5,
    systemRequirements: {
      os: 'Windows 10 versão 18362.0 ou superior',
      cpu: 'Intel i5-4460 ou AMD Ryzen 3 1200',
      ram: '8 GB RAM',
      gpu: 'NVidia GTX 970 OU AMD RX 470',
      storage: '120 GB livres'
    },
    uris: [
      { type: 'mega', label: 'Mega Cloud Direct Play', url: 'https://atop-games.com' },
      { type: 'magnet', label: 'Magnet P2P Atop Ultra', url: 'magnet:?xt=urn:btih:f0rz4h0r1z0n5pr3m1um4t0pg4m3s' }
    ]
  },
  {
    id: 'hollow-knight-silksong-ready',
    title: 'Hollow Knight: Godmaster Edition (PC Fraco 60FPS)',
    source: 'gog',
    sourceName: 'Free GOG Games',
    fileSize: '1.4 GB',
    uploadDate: '2024-01-10',
    category: ['Metroidvania', 'PC Fraco', 'Indie', 'Ação'],
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60',
    description: 'Forje seu próprio caminho em Hollow Knight! Uma aventura épica em um vasto reino em ruínas de insetos e heróis.',
    features: ['Roda em Qualquer PC ou Notebook Fraco', 'Todas as 4 expansões (Godmaster, Lifeblood, etc.)', 'Sem DRM'],
    rating: 9.9,
    systemRequirements: {
      os: 'Windows 7 / 8 / 10 / 11',
      cpu: 'Intel Core 2 Duo E5200',
      ram: '4 GB RAM',
      gpu: 'GeForce 9800GTX+ (512MB) ou Intel HD Graphics',
      storage: '9 GB'
    },
    uris: [
      { type: 'ddl', label: 'GOG DRM-Free Direct Link (1.4 GB)', url: 'https://gog-games.to' },
      { type: 'magnet', label: 'Magnet Instant Torrent', url: 'magnet:?xt=urn:btih:h0ll0wkn1ghtg0dm4st3rg0gdrmfr33' }
    ]
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley (v1.6.8 Latest Update)',
    source: 'steamrip',
    sourceName: 'SteamRIP',
    fileSize: '650 MB',
    uploadDate: '2024-06-02',
    category: ['PC Fraco', 'Simulação', 'RPG', 'Relaxante'],
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60',
    description: 'Você herdou a antiga fazenda do seu avô em Stardew Valley. Transforme campos cobertos de mato em uma casa próspera!',
    features: ['Update 1.6 Completo com Novos Festivais', 'Multiplayer Online Funcional', 'Tamanho minúsculo (650MB)'],
    rating: 9.9,
    systemRequirements: {
      os: 'Windows Vista / 7 / 8 / 10 / 11',
      cpu: '2 Ghz',
      ram: '2 GB RAM',
      gpu: '256 mb video memory, shader model 3.0+',
      storage: '1 GB'
    },
    uris: [
      { type: 'datanodes', label: 'Download Direto Rápido', url: 'https://steamrip.com' },
      { type: 'magnet', label: 'Magnet Instant', url: 'magnet:?xt=urn:btih:st4rd3wv4ll3yv168st34mr1p' }
    ]
  },
  {
    id: 'the-witcher-3-next-gen',
    title: 'The Witcher 3: Wild Hunt (Next-Gen Complete Edition)',
    source: 'xatab',
    sourceName: 'Xatab Repacks',
    fileSize: '48.1 GB',
    uploadDate: '2023-08-14',
    category: ['RPG', 'Mundo Aberto', 'História', 'Fantasia'],
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60',
    description: 'Você é Geralt de Rívia, mercenário matador de monstros. Embarque em busca da Criança da Profecia em um mundo aberto devastado pela guerra.',
    features: ['Hearts of Stone + Blood and Wine DLCs', 'Ray Tracing e Câmera Dinâmica de Ombro', 'Dublagem Clássica BR'],
    rating: 9.9,
    systemRequirements: {
      os: 'Windows 10 64-bit',
      cpu: 'Intel Core i5-2500K ou AMD FX-8350',
      ram: '8 GB RAM (16 GB para Next-Gen)',
      gpu: 'Nvidia GeForce GTX 970 / Radeon RX 480',
      storage: '60 GB SSD'
    },
    uris: [
      { type: 'magnet', label: 'Magnet Link Xatab Repack', url: 'magnet:?xt=urn:btih:th3w1tch3r3n3xtg3nx4t4br3p4ck' },
      { type: 'torrent', label: 'Arquivo .torrent Xatab', url: 'https://xatab-repack.com' }
    ]
  }
];
