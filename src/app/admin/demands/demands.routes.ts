import { Routes } from '@angular/router';
import { DemandsListComponent } from './demands-list/demands-list.component';

export const demandsRoutes: Routes = [
  {
    path: '',
    component: DemandsListComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
