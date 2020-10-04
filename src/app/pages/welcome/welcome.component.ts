import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  KEY_STORAGE_LANG = 'lang';

  formularUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeOMOaAwXeMyWA6RC6yZtSSIAblaE1yhHz0rsDrTRsruXLXHg/viewform?fbclid=IwAR2Q-AYsGP7_IX_LGKX9nHNOzPqnM9NFNp8dKhIhUrTpwSeLqS_8vcqdfug';

  whoNeedsHelpSectionId = 'who-needs-help';
  whoCanHelpSectionId = 'who-can-help';

  /**
   * TODO: to be removed after implementing "Get help" contact form
   * `whoNeedsHelpSectionId` part is needed for correct in-page navigation
   */
  hotLineSectionId = `${this.whoNeedsHelpSectionId}-hot-line`;

  constructor(public translate: TranslateService) {
    translate.addLangs(['ru', 'ro']);
    translate.setDefaultLang('ro');
    const browserLang = translate.getBrowserLang();
    const storageLang = localStorage.getItem(this.KEY_STORAGE_LANG);
    if (storageLang) {
      translate.use(storageLang);
    } else {
      translate.use(browserLang.match(/ro|ru/) ? browserLang : 'ro');
    }
  }

  changeLang(): void {
    const newLang = this.translate.currentLang === 'ru' ? 'ro' : 'ru';
    this.translate.use(newLang);
    localStorage.setItem(this.KEY_STORAGE_LANG, newLang);
  }
}
