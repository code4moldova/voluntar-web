import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  KEY_STORAGE_LANG = 'lang';

  constructor(public translate: TranslateService) {
    translate.addLangs(['ru', 'ro']);
    translate.setDefaultLang('ro');
    const browserLang = translate.getBrowserLang();
    let storageLang = localStorage.getItem(this.KEY_STORAGE_LANG);
    if (storageLang) {
      translate.use(storageLang);
    } else {
      translate.use(browserLang.match(/ro|ru/) ? browserLang : 'ro');
    }
  }

  changeLang(): void {
    let newLang = this.translate.currentLang === 'ru' ? 'ro' : 'ru';
    this.translate.use(newLang);
    localStorage.setItem(this.KEY_STORAGE_LANG, newLang);
  }

  ngOnInit(): void {}
}
