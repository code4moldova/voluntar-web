import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LandingComponent } from './landing.component';
import { HeroComponent } from './hero/hero.component';
import { HelpGuideComponent } from './help-guide/help-guide.component';
import { MakeDonationComponent } from './make-donation/make-donation.component';
import { FooterModule } from '../shared/footer/footer.module';
import { HeaderModule } from '../shared/header/header.module';

@NgModule({
  declarations: [
    LandingComponent,
    HeroComponent,
    HelpGuideComponent,
    MakeDonationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingComponent,
      },
    ]),
    TranslateModule,
    FooterModule,
    HeaderModule,
  ],
})
export class LandingModule {}
