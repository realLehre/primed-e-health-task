import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (r) => r.dashboardRoutes,
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.routes').then((r) => r.userRoutes),
  },
];
