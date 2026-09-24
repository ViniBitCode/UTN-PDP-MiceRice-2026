# Mice Rice — Sitio

Landing page de **Mice Rice**, un juego hecho con [Wollok Game](https://www.wollok.org/) para
Paradigmas de Programación (UTN FRBA). Hecha con Angular 21 (standalone, sin SSR), pensada para
hostearse como sitio estático en Netlify.

## Correr en local

```bash
npm install
npm start
```

Abre en `http://localhost:4200`.

## Configuración

Todos los datos editables (URL del repo, usuario de GitHub, nombre del autor, ruta y tamaño del
juego) están en [`src/app/site.config.ts`](src/app/site.config.ts).

## Página `/demo`

Corre el juego **en el navegador**, sin servidor, con el mismo mecanismo que usa el
[sitio oficial de Wollok](https://www.wollok.org/concurso/TPGameIntegrador-thecoders/) para los
juegos del concurso: el bundle `game-index.js` de `wollok-web-tools` (interpreter de
`wollok-ts` + p5) se copia desde `node_modules` a `/game/lib` en el build, y el componente
`Demo` baja los `.wlk`/`.wpgm` y los assets listados en `public/game/files.txt` y arranca
el único `.wpgm` del proyecto con `LocalGame`.

Los fuentes y assets del juego viven en `public/game/` (misma estructura que el repo del juego,
respetando el `resourceFolder` de su `package.json`). Para actualizarlos desde un clon del
repo del juego:

```bash
npm run sync-game            # toma ./mice-rice-game
npm run sync-game -- ../ruta/al/repo-del-juego
```

Versiones: `wollok-web-tools` 2.1.1 y `wollok-ts` 4.3.0 (el sitio oficial usa 1.1.10 / 4.2.3,
pero esas no soportan `game.onClickDo`, que el menú del juego necesita).
