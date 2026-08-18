import type { BrowserGame } from '../types';

export const BROWSER_GAMES: BrowserGame[] = [
  {
    id: '2048-cyber',
    title: '2048 Cyberpunk Edition',
    genre: 'Quebra-cabeça / Lógica',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60',
    description: 'Junte os blocos numerados até alcançar a lendária peça 2048! Jogo viciante e relaxante com efeitos sonoros e visual neon.',
    controls: 'Use as Setas do Teclado (⬆️ ⬇️ ⬅️ ➡️) ou deslize o dedo na tela.',
    type: 'canvas-2048',
    tags: ['Lógica', 'Viciante', 'Casual', 'Teclado/Touch']
  },
  {
    id: 'flappy-cyber',
    title: 'Cyber Bird: Neon Flight',
    genre: 'Arcade / Habilidade',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=60',
    description: 'Guie o pássaro cibernético através de colunas de laser sem bater. Teste seus reflexos em alta velocidade!',
    controls: 'Pressione [ESPAÇO] ou [CLIQUE / TOQUE] para bater as asas e subir.',
    type: 'canvas-flappy',
    tags: ['Arcade', 'Reflexo', 'Desafio', '1-Click']
  },
  {
    id: 'snake-retro',
    title: 'Retro Snake 3000 (Cobrinha Neon)',
    genre: 'Clássico / Arcade',
    thumbnail: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=60',
    description: 'O clássico supremo dos celulares antigos reimaginado com iluminação neon, power-ups de velocidade e pontuação máxima.',
    controls: 'Use [W, A, S, D] ou [Setas do Teclado] para mudar a direção.',
    type: 'canvas-snake',
    tags: ['Nostalgia', 'Clássico', 'Arcade', 'Score']
  },
  {
    id: 'space-invaders',
    title: 'Space Defenders: Alien Invasion',
    genre: 'Shooter / Espaço',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=60',
    description: 'Defenda a galáxia contra hordas intermináveis de naves alienígenas. Desvie dos tiros e destrua as naves-mãe.',
    controls: '[Setas ⬅️ ➡️ ou A/D] para mover e [ESPAÇO] para disparar os lasers.',
    type: 'canvas-spaceinvaders',
    tags: ['Tiro', 'Nave', 'Retro', 'Ação']
  },
  {
    id: 'pong-championship',
    title: 'Cyber Pong VS AI',
    genre: 'Esportes / Retro',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=60',
    description: 'O primeiro jogo eletrônico da história com física dinâmica de bola, 3 níveis de inteligência artificial e rebote sônico.',
    controls: 'Mova o [Mouse] ou use as [Setas ⬆️ ⬇️] para controlar a sua raquete.',
    type: 'canvas-pong',
    tags: ['1 vs 1', 'Inteligência Artificial', 'Clássico', 'Reflexo']
  },
  {
    id: 'tetris-block',
    title: 'Neon Block Fall (Tetris Arcade)',
    genre: 'Quebra-cabeça / Estratégia',
    thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=60',
    description: 'Encaixe os tetraminós que caem para limpar linhas completas e acumular pontos antes que o topo da tela seja atingido.',
    controls: '[Setas ⬅️ ➡️] para mover, [⬆️] para girar a peça, [⬇️] para acelerar queda.',
    type: 'canvas-tetris',
    tags: ['Tetris', 'Estratégia', 'Clássico', 'Puzzle']
  }
];
