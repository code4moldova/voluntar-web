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
    let storage_lang = localStorage.getItem(this.KEY_STORAGE_LANG);
    if (storage_lang) {
      translate.use(storage_lang);
    } else {
      translate.use(browserLang.match(/ro|ru/) ? browserLang : 'ro');
    }
  }

  changeLang(): void {
    let new_lang = this.translate.currentLang === 'ru' ? 'ro' : 'ru';
    this.translate.use(new_lang);
    localStorage.setItem(this.KEY_STORAGE_LANG, new_lang);
  }

  ngOnInit(): void {
  }
}
