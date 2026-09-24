/**
 * Copia los fuentes y assets del juego Wollok a `public/game/` y genera
 * `public/game/files.txt` con la lista de archivos (mismo formato que usa el
 * sitio oficial de Wollok para correr los juegos del concurso en el navegador).
 *
 * Uso: node scripts/sync-game.mjs [ruta-al-repo-del-juego]
 * Por defecto toma `./mice-rice-game`.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] ?? join(siteRoot, 'mice-rice-game'));
const target = join(siteRoot, 'public', 'game');

const IGNORED_DIRS = new Set(['.git', '.github', '.history', 'node_modules', 'log']);
const SOURCE_EXTENSIONS = ['.wlk', '.wpgm'];
const EXTRA_FILES = ['package.json', 'README.md'];

if (!existsSync(join(source, 'package.json'))) {
  console.error(`No encuentro un package.json de Wollok en ${source}`);
  process.exit(1);
}

const pkg = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'));
const resourceFolder = pkg.resourceFolder ?? 'assets';

/** Recorre `dir` y devuelve las rutas relativas (con `/`) de los archivos que cumplan `keep`. */
function walk(dir, keep, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!IGNORED_DIRS.has(entry)) walk(full, keep, acc);
    } else {
      const rel = relative(source, full).split(sep).join('/');
      if (keep(rel)) acc.push(rel);
    }
  }
  return acc;
}

const files = walk(source, (rel) => {
  const isSource = SOURCE_EXTENSIONS.some((ext) => rel.endsWith(ext));
  const isAsset = rel.startsWith(`${resourceFolder}/`);
  return isSource || isAsset || EXTRA_FILES.includes(rel);
}).sort();

rmSync(target, { recursive: true, force: true });
for (const rel of files) {
  const dest = join(target, rel);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(join(source, rel), dest);
}
writeFileSync(join(target, 'files.txt'), files.join('\n') + '\n');

const programs = files.filter((f) => f.endsWith('.wpgm'));
console.log(`Copiados ${files.length} archivos a public/game (resourceFolder: ${resourceFolder}).`);
console.log(`Programas: ${programs.join(', ') || 'ninguno'}`);
