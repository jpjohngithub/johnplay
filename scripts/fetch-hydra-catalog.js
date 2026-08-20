/**
 * fetch-hydra-catalog.js
 * Pre-build script: fetches game data from api.hydralibrary.com
 * and saves as static JSON to public/hydra-catalog.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'hydra-catalog.json');

const BASE_URL = 'https://api.hydralibrary.com';

const QUERIES = [
  'grand theft auto', 'gta', 'red dead', 'batman', 'spider-man',
  'call of duty', 'battlefield', 'halo', 'titanfall',
  'god of war', 'horizon', 'last of us', 'uncharted', 'ghost of tsushima',
  'assassin', 'far cry', 'watch dogs',
  'resident evil', 'silent hill', 'dead space',
  'elden ring', 'dark souls', 'sekiro', 'lies of p',
  'cyberpunk', 'witcher', 'baldur',
  'skyrim', 'fallout', 'starfield', 'doom', 'wolfenstein',
  'mortal kombat', 'tekken', 'street fighter', 'dragon ball', 'naruto',
  'fifa', 'ea sports', 'nba', 'efootball',
  'need for speed', 'forza', 'assetto corsa', 'beamng', 'euro truck',
  'minecraft', 'terraria', 'stardew', 'valheim', 'subnautica',
  'monster hunter', 'devil may cry', 'nioh',
  'hades', 'hollow knight', 'celeste', 'cuphead', 'dead cells', 'balatro',
  'palworld', 'lethal company', 'phasmophobia', 'sons of forest', 'rust', 'ark',
  'sonic', 'crash bandicoot', 'ratchet clank', 'lego',
  'final fantasy', 'persona', 'kingdom hearts',
  'borderlands', 'payday', 'bioshock', 'metro', 'stalker', 'half life', 'portal',
  'wukong', 'helldivers', 'space marine', 'chameleon', 'meccha'
];

async function fetchGamesForQuery(query, limit = 30) {
  const url = `${BASE_URL}/games?q=${encodeURIComponent(query)}&limit=${limit}`;
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { 'Accept': 'application/json', 'User-Agent': 'JohnPlay/1.0' }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.games || [];
  } catch (e) {
    return [];
  }
}

async function main() {
  if (fs.existsSync(OUTPUT_FILE) && fs.statSync(OUTPUT_FILE).size > 10000 && process.env.FORCE_FETCH !== '1') {
    console.log('🎮 JohnPlay - Hydra catalog already cached (' + (fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2) + ' MB). Skipping download.');
    return;
  }

  console.log('🎮 JohnPlay - Fetching Hydra Library catalog...');
  console.log(`📡 Source: ${BASE_URL} | Queries: ${QUERIES.length}`);
  
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const allGames = new Map();
  const BATCH_SIZE = 3;

  for (let i = 0; i < QUERIES.length; i += BATCH_SIZE) {
    const batch = QUERIES.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(batch.map(q => fetchGamesForQuery(q)));
    
    results.forEach(res => {
      if (res.status === 'fulfilled' && Array.isArray(res.value)) {
        for (const g of res.value) {
          if (!g || !g.name) continue;
          const key = (g.name + '|' + (g.source || '')).toLowerCase();
          if (!allGames.has(key)) {
            allGames.set(key, g);
          }
        }
      }
    });

    process.stdout.write(`\r  Progress: [${Math.min(i + BATCH_SIZE, QUERIES.length)}/${QUERIES.length}] | Unique games: ${allGames.size}`);
    await new Promise(r => setTimeout(r, 150));
  }

  const catalog = Array.from(allGames.values());
  
  catalog.sort((a, b) => {
    const da = a.uploadDate ? new Date(a.uploadDate).getTime() : 0;
    const db = b.uploadDate ? new Date(b.uploadDate).getTime() : 0;
    return db - da;
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(catalog));
  
  console.log('\n\n✅ Done!');
  console.log(`📊 Total unique games indexed: ${catalog.length}`);
  console.log(`📁 Saved to: ${OUTPUT_FILE}`);
  console.log(`💾 File size: ${(fs.statSync(OUTPUT_FILE).size / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(e => {
  console.error('Catalog build failed:', e.message);
  const p = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/hydra-catalog.json');
  if (!fs.existsSync(p)) fs.writeFileSync(p, '[]');
});
