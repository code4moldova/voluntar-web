import { Routes } from '@angular/router';
import { DemandsListComponent } from './demands-list/demands-list.component';

export const demandsRoutes: Routes = [
  {
    path: 'list',
    component: DemandsListComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];
