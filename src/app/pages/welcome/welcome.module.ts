import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeroComponent } from './hero/hero.component';
import { HelpGuideComponent } from './help-guide/help-guide.component';
import { MakeDonationComponent } from './make-donation/make-donation.component';

@NgModule({
  declarations: [
    WelcomeComponent,
    HeroComponent,
    HelpGuideComponent,
    MakeDonationComponent,
  ],
  imports: [CommonModule, WelcomeRoutingModule, TranslateModule],
})
export class WelcomeModule {}
