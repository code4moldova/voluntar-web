import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { FooterModule } from '../shared/footer/footer.module';
import { HeaderModule } from '../shared/header/header.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [TermsAndConditionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: TermsAndConditionsComponent,
      },
    ]),
    FooterModule,
    HeaderModule,
    TranslateModule,
  ],
})
export class TermsAndConditionsModule {}
