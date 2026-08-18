import type { BrowserGame } from '../types';

export const BROWSER_GAMES: BrowserGame[] = [
  {
    id: 'subway-surfers-web',
    title: 'Subway Surfers (Poki / Web Edition)',
    genre: 'Corrida Infinita / Parkour',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=60',
    description: 'O clássico supremo do Poki e mobile! Corra pelos trilhos de trem, desvie de vagões em alta velocidade, use o hoverboard e fuja do inspetor.',
    controls: 'Use as Setas [⬅️ ➡️ ⬆️ ⬇️] ou [A, D, W, S] para esquivar, pular e rolar. [Espaço] para prancha.',
    type: 'iframe',
    iframeUrl: 'https://y8game.github.io/subway-surfers/',
    tags: ['Poki Hit', '3D Runner', 'Popular', 'Sem Anúncios']
  },
  {
    id: 'moto-x3m-web',
    title: 'Moto X3M: Bike Race',
    genre: 'Acrobacias / Motocross',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&auto=format&fit=crop&q=60',
    description: 'Pilote sua moto através de loops gigantescos, esteiras de serras e explosões épicas em dezenas de níveis desafiadores.',
    controls: '[Seta ⬆️ ou W] Acelerar, [⬇️ ou S] Frear, [⬅️ ➡️ ou A/D] Inclinar a moto e fazer mortais no ar.',
    type: 'iframe',
    iframeUrl: 'https://google-pacman.github.io/moto-x3m/',
    tags: ['Jogos 360', 'Física', 'Motos', 'Acrobacia']
  },
  {
    id: 'slope-3d-web',
    title: 'Slope 3D (Cyber Ball Runner)',
    genre: 'WebGL 3D / Reflexo',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60',
    description: 'Controle a esfera que desliza em uma pista futurista que desce sem parar. Evite os blocos vermelhos e não caia no abismo.',
    controls: 'Use [Setas ⬅️ ➡️] ou [A/D] para direcionar a bola com precisão milimétrica.',
    type: 'iframe',
    iframeUrl: 'https://slopeonlinegame.github.io/',
    tags: ['WebGL 3D', 'Reflexo Rápido', 'Frenético', 'Hit']
  },
  {
    id: 'retro-bowl-web',
    title: 'Retro Bowl Arcade',
    genre: 'Esportes / Pixel 8-Bit',
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=700&auto=format&fit=crop&q=60',
    description: 'O jogo de esporte retrô mais premiado da internet! Gerencie seu time da liga de futebol americano, faça passes perfeitos e vença o campeonato.',
    controls: '[Mouse] Mira e passe da bola, [Setas] Desviar dos defensores e correr para o Touchdown.',
    type: 'iframe',
    iframeUrl: 'https://google-pacman.github.io/retro-bowl/',
    tags: ['Poki Clássico', 'Pixel Art', 'Estratégia', 'Esportes']
  },
  {
    id: '1v1-lol-web',
    title: '1v1.LOL (Battle & Building Arena)',
    genre: 'Tiro 3D / Construção',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=60',
    description: 'Simulador de combate e construção rápida estilo Battle Royale. Treine miras, paredes e edições em duelos 1 contra 1.',
    controls: '[W, A, S, D] Mover, [Mouse] Mirar e atirar, [Z, X, C, V] Construir paredes, rampas e pisos.',
    type: 'iframe',
    iframeUrl: 'https://google-pacman.github.io/1v1-lol/',
    tags: ['Tiro 3D', 'Battle Royale', 'Construção', 'Multijogador']
  },
  {
    id: 'paper-io-2',
    title: 'Paper.io 2: Territorial Battle',
    genre: 'Estratégia / IO Battle',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=60',
    description: 'Pinte o mapa com a sua cor e conquiste 100% do território antes dos outros jogadores cortarem o seu rastro de papel.',
    controls: '[Mouse] ou [Setas do Teclado] para mudar a direção e desenhar as fronteiras do seu território.',
    type: 'iframe',
    iframeUrl: 'https://google-pacman.github.io/paperio2/',
    tags: ['Jogos 360', 'IO Game', 'Competitivo', 'Viciante']
  },
  {
    id: 'crossy-road-web',
    title: 'Crossy Road 3D',
    genre: 'Arcade / Desafio',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=60',
    description: 'Por que a galinha atravessou a rua? Atravesse rodovias movimentadas, rios cheios de troncos e trilhos de trem sem ser atropelado.',
    controls: '[Seta ⬆️ ou W] Avançar, [⬅️ ➡️ ou A/D] Andar para os lados, [⬇️] Recuar.',
    type: 'iframe',
    iframeUrl: 'https://google-pacman.github.io/crossy-road/',
    tags: ['Poki Hit', 'Casual', '3D Voxel', 'Família']
  },
  {
    id: 'flappy-cyber',
    title: 'Cyber Bird: Neon Flight (Canvas Nativo)',
    genre: 'Arcade / Habilidade',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60',
    description: 'Guie o pássaro cibernético através de colunas de laser sem bater. Teste seus reflexos em 60 FPS ultra suaves!',
    controls: 'Pressione [ESPAÇO] ou [CLIQUE / TOQUE] para bater as asas e subir.',
    type: 'canvas-flappy',
    tags: ['Nativo', 'Reflexo', 'Desafio', '1-Click']
  },
  {
    id: 'snake-retro',
    title: 'Retro Snake 3000 (Cobrinha Neon)',
    genre: 'Clássico / Arcade',
    thumbnail: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=700&auto=format&fit=crop&q=60',
    description: 'O clássico supremo dos celulares antigos reimaginado com iluminação neon, power-ups de velocidade e pontuação máxima.',
    controls: 'Use [W, A, S, D] ou [Setas do Teclado] para mudar a direção.',
    type: 'canvas-snake',
    tags: ['Nostalgia', 'Clássico', 'Nativo', 'Score']
  },
  {
    id: 'space-invaders',
    title: 'Space Defenders: Alien Invasion',
    genre: 'Shooter / Espaço',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=60',
    description: 'Defenda a galáxia contra hordas intermináveis de naves alienígenas. Desvie dos tiros e destrua as naves-mãe.',
    controls: '[Setas ⬅️ ➡️ ou A/D] para mover e [ESPAÇO] para disparar os lasers.',
    type: 'canvas-spaceinvaders',
    tags: ['Tiro', 'Nave', 'Retro', 'Ação']
  },
  {
    id: 'pong-championship',
    title: 'Cyber Pong VS AI',
    genre: 'Esportes / Retro',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=60',
    description: 'O primeiro jogo eletrônico da história com física dinâmica de bola, 3 níveis de inteligência artificial e rebote sônico.',
    controls: 'Mova o [Mouse] ou use as [Setas ⬆️ ⬇️] para controlar a sua raquete.',
    type: 'canvas-pong',
    tags: ['1 vs 1', 'Inteligência Artificial', 'Nativo', 'Reflexo']
  },
  {
    id: '2048-cyber',
    title: '2048 Cyberpunk Edition',
    genre: 'Quebra-cabeça / Lógica',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=60',
    description: 'Junte os blocos numerados até alcançar a lendária peça 2048! Jogo viciante e relaxante com efeitos sonoros e visual neon.',
    controls: 'Use as Setas do Teclado (⬆️ ⬇️ ⬅️ ➡️) ou deslize o dedo na tela.',
    type: 'canvas-2048',
    tags: ['Lógica', 'Viciante', 'Casual', 'Nativo']
  }
];
