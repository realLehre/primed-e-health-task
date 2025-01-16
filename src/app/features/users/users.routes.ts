import { Routes } from '@angular/router';

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users.component').then((c) => c.UsersComponent),
  },
];
