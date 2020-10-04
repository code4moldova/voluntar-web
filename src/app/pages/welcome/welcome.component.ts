import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  KEY_STORAGE_LANG = 'lang';
  hotLineSection = 'hot-line';

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
