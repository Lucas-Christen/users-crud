import { Routes } from '@angular/router';
import { UsersListComponent } from './features/users/users-list/users-list.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users' },
  { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'users' }
];
