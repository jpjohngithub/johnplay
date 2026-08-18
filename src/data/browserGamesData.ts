import type { BrowserGame } from '../types';

export const BROWSER_GAMES: BrowserGame[] = [
  {
    id: 'subway-surfers-3d',
    title: 'Subway Surfers 3D (Poki WebGL)',
    genre: 'Corrida 3D / Parkour',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=60',
    description: 'Corra pelos 3 trilhos de metrô, desvie de trens velozes e barreiras, pule, role e pegue moedas com gráficos 3D WebGL em tempo real!',
    controls: 'Use as Setas [⬅️ ➡️ ou A/D] para trocar de trilho, [⬆️ ou W/Espaço] para PULAR e [⬇️ ou S] para ROLAR.',
    type: 'native-game',
    gameUrl: './games/subway-surfers/index.html',
    tags: ['Poki Hit', '3D Runner', 'WebGL 3D', 'Popular']
  },
  {
    id: 'moto-x3m-stunts',
    title: 'Moto X3M: Stunt Biker (Jogos 360)',
    genre: 'Acrobacias / Física 2D',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&auto=format&fit=crop&q=60',
    description: 'Pilote sua moto em pistas com rampas gigantescas, faça mortais de 360 graus no ar para diminuir o tempo e chegue à bandeira quadriculada.',
    controls: '[⬆️ ou W] Acelerar, [⬇️ ou S] Frear/Ré, [⬅️ ➡️ ou A/D] Inclinar a moto e fazer acrobacias no ar.',
    type: 'native-game',
    gameUrl: './games/moto-x3m/index.html',
    tags: ['Jogos 360', 'Física', 'Motos', 'Acrobacia']
  },
  {
    id: 'slope-3d-runner',
    title: 'Slope 3D: Neon Sphere Runner',
    genre: 'WebGL 3D / Reflexo Rápido',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60',
    description: 'Desça em velocidade insana com a esfera que rola pelas plataformas inclinadas no abismo. Desvie dos blocos vermelhos!',
    controls: 'Use as [Setas ⬅️ ➡️] ou [A/D] para direcionar a bola com precisão.',
    type: 'native-game',
    gameUrl: './games/slope-3d/index.html',
    tags: ['WebGL 3D', 'Reflexo Rápido', 'Frenético', 'Hit']
  },
  {
    id: 'retro-bowl-arcade',
    title: 'Retro Bowl: Pixel Football (Poki)',
    genre: 'Esportes / Pixel 8-Bit',
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=700&auto=format&fit=crop&q=60',
    description: 'Comande seu quarterback, mire passes longos para os recebedores e faça touchdowns desviando da defesa adversária.',
    controls: 'Use o [Mouse ou Setas] para mirar a trajetória da bola e clique ou aperte [ESPAÇO] para lançar o passe.',
    type: 'native-game',
    gameUrl: './games/retro-bowl/index.html',
    tags: ['Poki Clássico', 'Pixel Art', 'Estratégia', 'Esportes']
  },
  {
    id: '1v1-arena-battle',
    title: '1v1 Arena: Shoot & Build (1v1.LOL)',
    genre: 'Tiro / Construção Rápida',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=60',
    description: 'Duelo de arena 1 contra 1! Construa paredes de defesa instantâneas, desvie de tiros e elimine o bot adversário.',
    controls: '[W, A, S, D] Mover, [Mouse] Mirar e atirar, [Q] ou [E] Construir Paredes de proteção.',
    type: 'native-game',
    gameUrl: './games/1v1-lol/index.html',
    tags: ['Tiro 3D', 'Battle Royale', 'Construção', 'Nativo']
  },
  {
    id: 'paper-territory-io',
    title: 'Paper Territory Battle (Paper.io 2)',
    genre: 'Estratégia / Territorial IO',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=60',
    description: 'Trace linhas pelo mapa e feche o circuito para pintar e conquistar território. Corte o rastro dos oponentes para eliminá-los!',
    controls: '[Setas do Teclado] ou [W, A, S, D] para mudar de direção e conquistar mais de 50% do mapa.',
    type: 'native-game',
    gameUrl: './games/paper-io/index.html',
    tags: ['Jogos 360', 'IO Game', 'Competitivo', 'Viciante']
  },
  {
    id: 'crossy-road-voxel',
    title: 'Crossy Road 3D (Poki Hit)',
    genre: 'Arcade / Travessia',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=60',
    description: 'Atravesse avenidas cheias de carros em alta velocidade, trilhos de trem e rios com troncos flutuantes sem ser esmagado.',
    controls: '[Seta ⬆️ ou W] Avançar, [⬅️ ➡️ ou A/D] Andar para os lados, [⬇️ ou S] Recuar.',
    type: 'native-game',
    gameUrl: './games/crossy-road/index.html',
    tags: ['Poki Hit', 'Casual', '3D Voxel', 'Família']
  },
  {
    id: 'emulator-gba-web',
    title: 'Emulador GBA no Navegador (Game Boy Advance)',
    genre: 'Emulador Web / GBA',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60',
    description: 'Jogue qualquer jogo de Game Boy Advance direto no navegador com áudio estéreo, save/load states e suporte a controle USB.',
    controls: '[Z] = Botão A, [X] = Botão B, [A] = Botão L, [S] = Botão R, [Enter] = Start, [Shift] = Select.',
    type: 'web-emulator',
    emulatorCore: 'gba',
    tags: ['Emulador Web', 'GBA', 'Retro', 'Poki Emulador']
  },
  {
    id: 'emulator-snes-web',
    title: 'Emulador SNES no Navegador (Super Nintendo)',
    genre: 'Emulador Web / SNES',
    thumbnail: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=700&auto=format&fit=crop&q=60',
    description: 'Emulador completo de Super Nintendo de 16-bits para reviver clássicos lendários direto no navegador sem instalar nada.',
    controls: '[Z] = B, [X] = A, [A] = Y, [S] = X, [Q] = L, [W] = R, [Enter] = Start, [Shift] = Select.',
    type: 'web-emulator',
    emulatorCore: 'snes',
    tags: ['Emulador Web', 'SNES', '16-Bit', 'Poki Emulador']
  },
  {
    id: 'emulator-genesis-web',
    title: 'Emulador Mega Drive / Genesis no Navegador',
    genre: 'Emulador Web / Sega',
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=700&auto=format&fit=crop&q=60',
    description: 'Emulador clássico do console da Sega Mega Drive / Genesis para jogar Sonic e clássicos da era de ouro dos 16 bits.',
    controls: '[Z] = Botão A, [X] = Botão B, [C] = Botão C, [Enter] = Start.',
    type: 'web-emulator',
    emulatorCore: 'segaMD',
    tags: ['Emulador Web', 'Sega', 'Mega Drive', 'Poki Emulador']
  }
];
