import { Routes } from '@angular/router';
import { PublicAreaComponent } from './public-area.component';

export const publicAreaRoutes: Routes = [
  {
    path: '',
    component: PublicAreaComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./landing/landing.module').then((m) => m.LandingModule),
      },
      {
        path: 'terms-and-conditions',
        loadChildren: () =>
          import('./terms/terms-and-conditions.module').then(
            (m) => m.TermsAndConditionsModule
          ),
      },
    ],
  },
];
