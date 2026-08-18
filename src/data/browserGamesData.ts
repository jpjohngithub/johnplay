import type { BrowserGame } from '../types';

export const BROWSER_GAMES: BrowserGame[] = [
  {
    id: 'subway-runner-3d',
    title: 'Subway Surfers: Cyber Tracks',
    genre: 'Corrida 3D / Parkour',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=60',
    description: 'Corra pelos 3 trilhos de metrô, desvie de trens velozes e barreiras elétricas, pule e pegue moedas no clássico supremo do Poki!',
    controls: 'Use as Setas [⬅️ ➡️ ou A/D] para trocar de trilho, [⬆️ ou W] para PULAR e [⬇️ ou S] para ROLAR.',
    type: 'canvas-subway',
    tags: ['Poki Hit', '3D Runner', 'Popular', 'Nativo']
  },
  {
    id: 'moto-x3m-stunt',
    title: 'Moto X3M: Stunt Biker',
    genre: 'Acrobacias / Física 2D',
    thumbnail: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&auto=format&fit=crop&q=60',
    description: 'Pilote sua moto em pistas com serras circulares, rampas gigantescas e faça mortais de 360 graus no ar para diminuir o tempo.',
    controls: '[⬆️ ou W] Acelerar, [⬇️ ou S] Frear/Ré, [⬅️ ➡️ ou A/D] Inclinar a moto e fazer acrobacias no ar.',
    type: 'canvas-moto',
    tags: ['Jogos 360', 'Física', 'Motos', 'Acrobacia']
  },
  {
    id: 'slope-3d-runner',
    title: 'Slope 3D: Neon Sphere Runner',
    genre: 'WebGL 3D / Reflexo Rápido',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=60',
    description: 'Desça em velocidade insana com a esfera que rola pelas plataformas inclinadas no abismo. Desvie dos blocos vermelhos!',
    controls: 'Use as [Setas ⬅️ ➡️] ou [A/D] para direcionar a bola com precisão.',
    type: 'canvas-slope',
    tags: ['WebGL 3D', 'Reflexo Rápido', 'Frenético', 'Hit']
  },
  {
    id: 'retro-bowl-arcade',
    title: 'Retro Bowl: Pixel Football',
    genre: 'Esportes / Pixel 8-Bit',
    thumbnail: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=700&auto=format&fit=crop&q=60',
    description: 'Comande seu quarterback, mire passes longos para os recebedores e faça touchdowns desviando da defesa adversária.',
    controls: 'Use o [Mouse ou Setas] para mirar a trajetória da bola e clique ou aperte [ESPAÇO] para lançar o passe.',
    type: 'canvas-retrobowl',
    tags: ['Poki Clássico', 'Pixel Art', 'Estratégia', 'Esportes']
  },
  {
    id: '1v1-arena-battle',
    title: '1v1 Arena: Shoot & Build',
    genre: 'Tiro / Construção Rápida',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=60',
    description: 'Duelo de arena 1 contra 1! Construa paredes de defesa instantâneas, desvie de tiros e elimine o bot adversário.',
    controls: '[W, A, S, D] Mover, [Mouse] Mirar e atirar, [Q] ou [E] Construir Paredes de proteção.',
    type: 'canvas-1v1',
    tags: ['Tiro 3D', 'Battle Royale', 'Construção', 'Nativo']
  },
  {
    id: 'paper-territory-io',
    title: 'Paper Territory Battle (Paper.io)',
    genre: 'Estratégia / Territorial IO',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&auto=format&fit=crop&q=60',
    description: 'Trace linhas pelo mapa e feche o circuito para pintar e conquistar território. Corte o rastro dos oponentes para eliminá-los!',
    controls: '[Setas do Teclado] ou [W, A, S, D] para mudar de direção e conquistar mais de 50% do mapa.',
    type: 'canvas-paperio',
    tags: ['Jogos 360', 'IO Game', 'Competitivo', 'Viciante']
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
  },
  {
    id: 'flappy-cyber',
    title: 'Cyber Bird: Neon Flight',
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
