import type { EmulatorItem } from '../types';

export const EMULATORS_LIST: EmulatorItem[] = [
  {
    id: 'rpcs3',
    name: 'RPCS3',
    platform: 'PlayStation 3 (PS3)',
    consoleIcon: 'Gamepad2',
    description: 'O melhor e mais avançado emulador de Sony PlayStation 3 para PC de código aberto. Compatível com mais de 70% da biblioteca de PS3 em 4K 60FPS.',
    status: 'Excelente',
    officialUrl: 'https://rpcs3.net',
    downloadUrl: 'https://rpcs3.net/download',
    githubUrl: 'https://github.com/RPCS3/rpcs3',
    requirements: {
      cpu: 'Intel i7 8-core (ou Ryzen 3700X+) com suporte a AVX-512 recomendado',
      gpu: 'NVIDIA GTX 1060+ / AMD RX 580+ com suporte a Vulkan',
      ram: '16 GB RAM Dual Channel',
      os: 'Windows 10 / 11 64-bit'
    },
    keyFeatures: [
      'Resolução interna escalável até 8K',
      'Desbloqueio de FPS (Patches para 60FPS / 120FPS em The Last of Us, Demon’s Souls, etc.)',
      'Suporte a saves de múltiplos usuários e controle DualSense com vibração tátil'
    ],
    setupGuide: [
      'Baixe o instalador oficial do RPCS3',
      'Baixe o firmware oficial da Sony (PS3UPDAT.PUP) no site do PlayStation',
      'No RPCS3, vá em File > Install Firmware e selecione o arquivo PS3UPDAT.PUP',
      'Adicione a pasta dos seus jogos em File > Add Games'
    ],
    biosRequired: true,
    biosNotes: 'Requer o firmware oficial gratuito da Sony (PS3UPDAT.PUP) que pode ser baixado direto do site da PlayStation.'
  },
  {
    id: 'pcsx2',
    name: 'PCSX2',
    platform: 'PlayStation 2 (PS2)',
    consoleIcon: 'Disc',
    description: 'Emulador definitivo de PlayStation 2. Possui suporte a Vulkan, renderização em widescreen nativo, texturas HD e interface gráfica moderna estilo Big Picture.',
    status: 'Essencial',
    officialUrl: 'https://pcsx2.net',
    downloadUrl: 'https://pcsx2.net/downloads',
    githubUrl: 'https://github.com/PCSX2/pcsx2',
    requirements: {
      cpu: 'Processador Quad-core 3.0GHz (Core i3 moderno ou Ryzen 3000+)',
      gpu: 'DirectX 11/12 ou GPU compatível com Vulkan (GTX 1050 / Radeon RX 560)',
      ram: '8 GB RAM',
      os: 'Windows 10 / 11 64-bit'
    },
    keyFeatures: [
      'Interface estilo console (DuckStation/PCSX2 modern UI)',
      'Substituição de texturas HD em tempo real (Texture Replacement)',
      'Suporte a RetroAchievements e save states automáticos'
    ],
    setupGuide: [
      'Baixe a versão estável ou nightly do PCSX2',
      'Coloque o arquivo de BIOS do PS2 (scph-XXXX.bin) na pasta "bios"',
      'Aponte a pasta de imagens ISO em "Game Directory"',
      'Configure o renderizador de vídeo para Vulkan para obter o melhor desempenho'
    ],
    biosRequired: true,
    biosNotes: 'Requer arquivo BIOS de PS2 (ex: SCPH-70012, SCPH-90001).'
  },
  {
    id: 'duckstation',
    name: 'DuckStation',
    platform: 'PlayStation 1 (PS1)',
    consoleIcon: 'Disc3',
    description: 'O melhor emulador de PS1 de todos os tempos. Oferece correção de distorção de polígonos (PGXP), suporte a 4K, 60FPS suave e filtros CRT retro autênticos.',
    status: 'Excelente',
    officialUrl: 'https://www.duckstation.org',
    downloadUrl: 'https://github.com/stenzek/duckstation/releases',
    githubUrl: 'https://github.com/stenzek/duckstation',
    requirements: {
      cpu: 'Qualquer processador x86/x64 dual-core moderno',
      gpu: 'Qualquer GPU com suporte a OpenGL 3.0 ou Vulkan',
      ram: '4 GB RAM',
      os: 'Windows 10 / 11'
    },
    keyFeatures: [
      'PGXP (Precision Geometry Transform Pipeline) - Acaba com a tremulação de texturas do PS1!',
      'Suporte a 60 FPS hacks e resolução nativa até 16x (4K)',
      'Save states ultrarrápidos e RetroAchievements'
    ],
    setupGuide: [
      'Extraia a pasta do DuckStation',
      'Adicione a BIOS do PS1 (scph1001.bin ou scph5501.bin) na pasta bios',
      'Selecione a pasta onde estão suas ROMs (.chd, .iso, .cue/bin)'
    ],
    biosRequired: true,
    biosNotes: 'Requer BIOS SCPH-1001 / SCPH-5501 para inicialização e compatibilidade 100%.'
  },
  {
    id: 'ryujinx',
    name: 'Ryujinx / Sudachi',
    platform: 'Nintendo Switch',
    consoleIcon: 'Tv',
    description: 'Emuladores de ponta para rodar jogos de Nintendo Switch no PC em até 4K 60FPS/120FPS com suporte completo a mods, cheats e áudio surround.',
    status: 'Muito Bom',
    officialUrl: 'https://ryujinx.org',
    downloadUrl: 'https://github.com/Ryujinx/Ryujinx/releases',
    githubUrl: 'https://github.com/Ryujinx/Ryujinx',
    requirements: {
      cpu: 'Intel i5-10400 / Ryzen 5 3600 ou superior',
      gpu: 'NVIDIA GTX 1660 / RTX 2060 / AMD RX 6600 (Suporte a Vulkan)',
      ram: '16 GB RAM',
      os: 'Windows 10 / 11 64-bit'
    },
    keyFeatures: [
      'Excelente precisão gráfica e física',
      'Suporte a controles Joy-Con, Pro Controller e Motion Control (Giroscópio)',
      'Compatibilidade com mods de resolução e 60 FPS'
    ],
    setupGuide: [
      'Instale o emulador e abra a pasta "system"',
      'Insira as chaves "prod.keys" e "title.keys"',
      'Instale o Firmware do Switch mais recente através de Tools > Install Firmware',
      'Adicione o diretório das suas ROMs (.nsp / .xci)'
    ],
    biosRequired: true,
    biosNotes: 'Requer chaves "prod.keys" e firmware oficial do Switch.'
  },
  {
    id: 'dolphin',
    name: 'Dolphin Emulator',
    platform: 'GameCube / Nintendo Wii',
    consoleIcon: 'Joystick',
    description: 'Emulador lendário para Nintendo GameCube e Wii. Permite jogar clássicos como Super Smash Bros. Melee e Mario Galaxy em 4K com shaders pós-processamento.',
    status: 'Excelente',
    officialUrl: 'https://dolphin-emu.org',
    downloadUrl: 'https://dolphin-emu.org/download',
    githubUrl: 'https://github.com/dolphin-emu/dolphin',
    requirements: {
      cpu: 'Processador dual-core moderno com boa velocidade single-thread',
      gpu: 'GPU compatível com DirectX 11.1 / Vulkan',
      ram: '4 GB RAM',
      os: 'Windows 10 / 11'
    },
    keyFeatures: [
      'Netplay Integrado (Jogue Mario Party e Smash online com amigos sem lag)',
      'Suporte a Wiimotes reais via Bluetooth ou emulação no teclado/controle de Xbox',
      'Upgrades visuais com antialiasing e filtros anisotrópicos'
    ],
    setupGuide: [
      'Baixe a versão Beta ou Dev do Dolphin',
      'Dê dois cliques na tela principal para selecionar a pasta dos jogos ISO/RVZ',
      'Configure seu controle em "Controllers" e inicie o jogo'
    ],
    biosRequired: false,
    biosNotes: 'Não requer BIOS externa para funcionar.'
  },
  {
    id: 'cemu',
    name: 'Cemu',
    platform: 'Nintendo Wii U',
    consoleIcon: 'MonitorPlay',
    description: 'Emulador altamente otimizado para Nintendo Wii U. Famoso por rodar The Legend of Zelda: Breath of the Wild em 4K a 120 FPS com gráficos ultra.',
    status: 'Excelente',
    officialUrl: 'https://cemu.info',
    downloadUrl: 'https://cemu.info/#download',
    githubUrl: 'https://github.com/cemu-project/Cemu',
    requirements: {
      cpu: 'Processador Quad-core moderno (Intel i5 ou Ryzen 5)',
      gpu: 'GPU com suporte a Vulkan 1.1+ (NVIDIA GTX 1060 / AMD RX 580)',
      ram: '8 GB RAM',
      os: 'Windows 10 / 11 64-bit'
    },
    keyFeatures: [
      'Menu de Graphic Packs integrado para baixar mods e melhorias em 1 clique',
      'Desempenho super leve e estável em PCs modestos',
      'Suporte à tela dupla (GamePad separado)'
    ],
    setupGuide: [
      'Abra o Cemu e complete o assistente inicial',
      'Abra Options > Graphic Packs e ative os mods de resolução e 60 FPS desejados',
      'Configure seu controle em Options > Input Settings'
    ],
    biosRequired: false,
    biosNotes: 'Não necessita de BIOS complexa; basta apontar os jogos no formato WUX, WUD ou pasta RPX.'
  },
  {
    id: 'citra-azahar',
    name: 'Citra / PabloMK7 (3DS)',
    platform: 'Nintendo 3DS',
    consoleIcon: 'Smartphone',
    description: 'Emulador de Nintendo 3DS de alto desempenho com suporte a upscaling para 4K, texturas HD customizadas e multiplayer local via rede virtual.',
    status: 'Muito Bom',
    officialUrl: 'https://github.com/PabloMK7/citra',
    downloadUrl: 'https://github.com/PabloMK7/citra/releases',
    githubUrl: 'https://github.com/PabloMK7/citra',
    requirements: {
      cpu: 'Dual-core 2.5GHz ou superior',
      gpu: 'GPU com suporte a OpenGL 3.3 ou Vulkan',
      ram: '4 GB RAM',
      os: 'Windows 10 / 11'
    },
    keyFeatures: [
      'Multiplayer online integrado através de salas públicas e privadas',
      'Suporte a tela sensível ao toque com o mouse ou atalhos de controle',
      'Pacotes de textura HD para Pokémon e Zelda'
    ],
    setupGuide: [
      'Baixe o executável do Citra PabloMK7',
      'Adicione a pasta contendo suas ROMs (.3ds ou .cia descriptografadas)',
      'Ajuste a resolução interna em Emulation > Configure > Graphics'
    ],
    biosRequired: false,
    biosNotes: 'Não requer BIOS externa se os arquivos de jogo estiverem descriptografados (Decrypted).'
  },
  {
    id: 'ppsspp',
    name: 'PPSSPP',
    platform: 'PlayStation Portable (PSP)',
    consoleIcon: 'Gamepad',
    description: 'O melhor e mais leve emulador de PSP do planeta. Roda qualquer jogo de PSP em 4K e 60FPS até mesmo em computadores e notebooks antigos.',
    status: 'Essencial',
    officialUrl: 'https://www.ppsspp.org',
    downloadUrl: 'https://www.ppsspp.org/downloads.html',
    githubUrl: 'https://github.com/hrydgard/ppsspp',
    requirements: {
      cpu: 'Qualquer processador moderno (roda até em PCs de 15 anos atrás)',
      gpu: 'Qualquer GPU com OpenGL 2.0 ou DirectX 9+',
      ram: '2 GB RAM',
      os: 'Windows XP / 7 / 8 / 10 / 11'
    },
    keyFeatures: [
      'Ultra leve e otimizado',
      'Filtros de pós-processamento e shaders estilo anime/retro',
      'Netplay ad-hoc para jogar Monster Hunter e outros com amigos'
    ],
    setupGuide: [
      'Baixe e extraia o PPSSPP',
      'Abra o emulador e navegue até a pasta com seus arquivos .ISO ou .CSO',
      'Configure os controles e jogue instantaneamente'
    ],
    biosRequired: false,
    biosNotes: 'BIOS 100% emulada internamente de fábrica.'
  },
  {
    id: 'xenia',
    name: 'Xenia Canary',
    platform: 'Xbox 360',
    consoleIcon: 'Cpu',
    description: 'Emulador de ponta para Xbox 360 no PC. Permite reviver clássicos exclusivos como Red Dead Redemption 1, Gears of War 2/3 e Forza Horizon 1 em 60 FPS.',
    status: 'Muito Bom',
    officialUrl: 'https://xenia.jp',
    downloadUrl: 'https://github.com/xenia-canary/xenia-canary/releases',
    githubUrl: 'https://github.com/xenia-canary/xenia-canary',
    requirements: {
      cpu: 'Processador 6-core moderno (Intel Core i5 10ª gen / Ryzen 5 3600+)',
      gpu: 'NVIDIA GTX 1070+ / AMD RX 5600 XT+ com suporte a Vulkan ou DirectX 12',
      ram: '16 GB RAM',
      os: 'Windows 10 / 11 64-bit'
    },
    keyFeatures: [
      'Suporte a patches de 60FPS e desbloqueio de resolução',
      'Execução direta de imagens .ISO e arquivos GOD/XEX extraídos',
      'Suporte nativo ao controle oficial de Xbox'
    ],
    setupGuide: [
      'Baixe o Xenia Canary (versão recomendada com mais patches)',
      'Crie um arquivo de configuração "xenia-canary.config.toml"',
      'Ative os patches de FPS na pasta "patches"',
      'Arraste a ISO do jogo para dentro do Xenia'
    ],
    biosRequired: false,
    biosNotes: 'Não necessita de BIOS proprietária.'
  },
  {
    id: 'retroarch',
    name: 'RetroArch (Tudo-Em-Um)',
    platform: 'Multi-Consoles (Mega Drive, SNES, GBA, N64, Arcade, PS1)',
    consoleIcon: 'Sparkles',
    description: 'A central definitiva de emulação retro. Reúne dezenas de consoles em uma única interface elegante com shaders retrô CRT, rebobinamento em tempo real e conquistas.',
    status: 'Essencial',
    officialUrl: 'https://www.retroarch.com',
    downloadUrl: 'https://www.retroarch.com/?page=platforms',
    githubUrl: 'https://github.com/libretro/RetroArch',
    requirements: {
      cpu: 'Qualquer processador',
      gpu: 'Qualquer placa de vídeo',
      ram: '2 GB RAM',
      os: 'Windows XP / 7 / 8 / 10 / 11'
    },
    keyFeatures: [
      'Mais de 80 consoles em um só programa através de Cores (núcleos)',
      'Shaders CRT de alta fidelidade (Mega Bezel, CRT-Royale)',
      'RetroAchievements (Conquistas clássicas online)'
    ],
    setupGuide: [
      'Instale o RetroArch e abra o programa',
      'Vá em "Carregar Núcleo" > "Baixar Núcleo" e escolha o console desejado (ex: SNES - Snes9x, GBA - mGBA)',
      'Selecione "Carregar Conteúdo" e escolha sua ROM'
    ],
    biosRequired: false,
    biosNotes: 'A maioria dos cores não precisa de BIOS; sistemas de CD (Sega CD, PS1) podem requerer BIOS na pasta "system".'
  }
];
