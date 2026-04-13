import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'notas', pathMatch: 'full' },
  {
    path: 'notas',
    loadComponent: () =>
      import('./pages/lista-notas/lista-notas.component')
        .then(m => m.ListaNotasComponent)
  },
  {
    path: 'crear',
    loadComponent: () =>
      import('./pages/crear-nota/crear-nota.component')
        .then(m => m.CrearNotaComponent)
  },
  {
    path: 'editar/:id',
    loadComponent: () =>
      import('./pages/editar-nota/editar-nota.component')
        .then(m => m.EditarNotaComponent)
  }
];
