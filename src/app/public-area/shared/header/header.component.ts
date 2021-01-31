import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() inverted: boolean;

  currentLang = this._translate.currentLang;

  constructor(
    private _translate: TranslateService,
    public navSvc: NavigationService,
  ) {}

  changeLang(lang: string): void {
    this._translate.use(lang);
    this.currentLang = this._translate.currentLang;
  }
}
