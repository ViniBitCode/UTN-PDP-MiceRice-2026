# Mice Rice — Sitio

Landing page de **Mice Rice**, un juego hecho con [Wollok Game](https://www.wollok.org/) para
Paradigmas de Programación (UTN FRBA). Hecha con Angular 21 (standalone, sin SSR), pensada para
hostearse como sitio estático en Netlify.

## Correr en local

```bash
npm install
npm start
```

Abre en `http://localhost:4200`. Ojo: el juego embebido en `/demo` también usa ese puerto por
defecto — si vas a probar la demo con el juego levantado, serví el sitio en otro puerto
(`ng serve --port 4300`).

## Configuración

Todos los datos editables (URL del repo, usuario de GitHub, nombre del autor, URL y tamaño del
juego) están en [`src/app/site.config.ts`](src/app/site.config.ts).

## Página `/demo`

Embebe el juego vía iframe apuntando al servidor local de Wollok. Para que se vea, hay que tener
el juego corriendo en tu máquina:

```bash
git clone https://github.com/ViniBitCode/UTN-PDP-MiceRice-2026.git
cd UTN-PDP-MiceRice-2026
npm i -g wollok-ts-cli
wollok run
```

El sitio publicado **no** puede servir el juego por sí solo.
