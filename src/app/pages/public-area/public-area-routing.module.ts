import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicAreaComponent } from './public-area.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicAreaRoutingModule {}
