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

  /** URL donde corre el juego levantado con `wollok run`. */
  gameLocalUrl: 'http://localhost:4200',

  /** Dimensiones nativas del juego embebido en /demo. */
  gameWidth: 1650,
  gameHeight: 900,
} as const;

/** URL al perfil de GitHub del autor. */
export const GITHUB_PROFILE_URL = `https://github.com/${SITE_CONFIG.githubUser}`;

/** Nombre de la carpeta que crea `git clone` (derivado de la URL del repo). */
export const REPO_DIR_NAME = SITE_CONFIG.repoUrl.split('/').pop() ?? 'repo';
