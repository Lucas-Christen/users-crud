import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },

  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/users/users-list/users-list.component')
        .then(m => m.UsersListComponent)
  },

  { path: '**', redirectTo: 'users' }
];
