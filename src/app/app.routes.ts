import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/showcase/showcase').then((m) => m.Showcase),
    title: 'Mice Rice — Wollok Game',
  },
  {
    path: 'demo',
    loadComponent: () => import('./pages/demo/demo').then((m) => m.Demo),
    title: 'Mice Rice — Demo',
  },
  { path: '**', redirectTo: '' },
];
