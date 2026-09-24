/**
 * Datos configurables del sitio. Cambiá todo desde acá.
 */
export const SITE_CONFIG = {
  /** Nombre del autor, se muestra en el footer. */
  authorName: 'ViniBitCode',

  /** Usuario de GitHub del autor (para el link del footer). */
  githubUser: 'ViniBitCode',

  /** URL del repositorio del juego (sin el .git final). */
  repoUrl: 'https://github.com/ViniBitCode/UTN-PDP-MiceRice-2026',

  /** URL donde corre el juego si lo levantás con `wollok run` (solo se muestra en el showcase). */
  gameLocalUrl: 'http://localhost:4200',

  /**
   * Ruta pública (sin barra final) donde viven los fuentes y assets del juego que corre /demo.
   * Se llena con `npm run sync-game` a partir del repo del juego.
   */
  gamePublicPath: '/game',

  /** Dimensiones nativas del juego (11x6 celdas de 150px), usadas para el aspect-ratio en /demo. */
  gameWidth: 1650,
  gameHeight: 900,
} as const;

/** URL al perfil de GitHub del autor. */
export const GITHUB_PROFILE_URL = `https://github.com/${SITE_CONFIG.githubUser}`;

/** Nombre de la carpeta que crea `git clone` (derivado de la URL del repo). */
export const REPO_DIR_NAME = SITE_CONFIG.repoUrl.split('/').pop() ?? 'repo';
