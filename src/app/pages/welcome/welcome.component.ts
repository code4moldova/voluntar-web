import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(public translate: TranslateService) {
    translate.addLangs(['ru', 'ro']);
    translate.setDefaultLang('ro');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/ro|ru/) ? browserLang : 'ro');
  }
  ngOnInit(): void {
  }
}
