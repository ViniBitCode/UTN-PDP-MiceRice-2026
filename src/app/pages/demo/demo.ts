import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../site.config';

/*
 * Corre el juego en el navegador replicando el mecanismo del sitio oficial de Wollok
 * (website-wollok-ts, `public/game/concurso2024.js`): se carga el bundle `game-index.js`
 * de wollok-web-tools (define `window.LocalGame`), se leen los .wlk/.wpgm como texto,
 * se arman las URLs de los assets y se arranca el interpreter de wollok-ts con p5.
 */

interface SourceFile {
  name: string;
  content: string;
}

interface MediaFile {
  possiblePaths: string[];
  url: string;
}

/** Forma del proyecto que espera `LocalGame` (ver wollok-web-tools `gameProject.ts`). */
interface GameProject {
  main: string;
  sources: SourceFile[];
  images: MediaFile[];
  sounds: MediaFile[];
  description: string;
}

/** Instancia de p5 devuelta por `LocalGame.start()`; `remove()` frena el loop y libera sonidos. */
interface Sketch {
  remove(): void;
}

interface LocalGameConstructor {
  new (project: GameProject): { start(canvasParent: HTMLElement): Sketch };
}

const SOURCE_EXTENSIONS = /\.(wlk|wpgm)$/;
const PROGRAM_EXTENSION = /\.wpgm$/;
const SOUND_EXTENSIONS = /\.(mp3|wav|ogg)$/i;
const IMAGE_EXTENSIONS = /\.(png|jpe?g|gif)$/i;

/** Promesa compartida para no inyectar el bundle dos veces si se vuelve a /demo. */
let gameLibrary: Promise<LocalGameConstructor> | undefined;

function loadGameLibrary(src: string): Promise<LocalGameConstructor> {
  gameLibrary ??= new Promise<LocalGameConstructor>((resolve, reject) => {
    const globals = window as unknown as Record<string, unknown>;
    // El bundle de wollok-web-tools referencia `process` (herencia de Node); el sitio
    // oficial hace `var process = {}` antes de cargarlo.
    globals['process'] ??= {};
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      const ctor = globals['LocalGame'] as LocalGameConstructor | undefined;
      ctor ? resolve(ctor) : reject(new Error('El bundle cargó pero no expuso LocalGame'));
    };
    script.onerror = () => {
      gameLibrary = undefined;
      reject(new Error(`No se pudo cargar ${src}`));
    };
    document.head.appendChild(script);
  });
  return gameLibrary;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} respondió ${response.status}`);
  return response.text();
}

/** Lee `files.txt` y `package.json` del juego publicado y arma el proyecto para LocalGame. */
async function loadProject(baseUrl: string): Promise<GameProject> {
  const [listing, packageJson] = await Promise.all([
    fetchText(`${baseUrl}/files.txt`),
    fetchText(`${baseUrl}/package.json`),
  ]);
  const files = listing.split('\n').map((line) => line.trim()).filter(Boolean);
  const resourceFolder = `${(JSON.parse(packageJson).resourceFolder ?? 'assets') as string}/`;

  const sources = await Promise.all(
    files
      .filter((name) => SOURCE_EXTENSIONS.test(name))
      .map(async (name) => ({ name, content: await fetchText(`${baseUrl}/${name}`) })),
  );

  // Las imágenes/sonidos se referencian desde Wollok relativos al resourceFolder.
  const media = files
    .filter((name) => name.startsWith(resourceFolder))
    .map((name) => ({ possiblePaths: [name.slice(resourceFolder.length)], url: `${baseUrl}/${name}` }));

  const program = sources.find(({ name }) => PROGRAM_EXTENSION.test(name));
  if (!program) throw new Error('No hay ningún .wpgm en public/game');

  return {
    main: program.name.replace(PROGRAM_EXTENSION, '').replaceAll('/', '.'),
    sources,
    images: media.filter(({ url }) => IMAGE_EXTENSIONS.test(url)),
    sounds: media.filter(({ url }) => SOUND_EXTENSIONS.test(url)),
    description: '',
  };
}

@Component({
  selector: 'app-demo',
  imports: [RouterLink],
  templateUrl: './demo.html',
  styleUrl: './demo.css',
})
export class Demo {
  protected readonly config = SITE_CONFIG;

  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');

  protected readonly status = signal<'loading' | 'running' | 'error'>('loading');
  protected readonly error = signal('');

  private sketch?: Sketch;
  private destroyed = false;

  constructor() {
    afterNextRender(() => void this.launch());
    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.sketch?.remove();
    });
  }

  private async launch(): Promise<void> {
    const base = SITE_CONFIG.gamePublicPath;
    try {
      const [LocalGame, project] = await Promise.all([
        loadGameLibrary(`${base}/lib/game-index.js`),
        loadProject(base),
      ]);
      if (this.destroyed) return;
      this.sketch = new LocalGame(project).start(this.stage().nativeElement);
      this.status.set('running');
    } catch (err) {
      console.error('No se pudo arrancar el juego', err);
      this.error.set(err instanceof Error ? err.message : String(err));
      this.status.set('error');
    }
  }
}
