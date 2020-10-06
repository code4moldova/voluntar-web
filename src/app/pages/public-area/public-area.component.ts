import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { animationFrameScheduler, Subscription } from 'rxjs';
import { auditTime, filter } from 'rxjs/operators';

const KEY_STORAGE_LANG = 'lang';

@Component({
  selector: 'app-public-area',
  templateUrl: './public-area.component.html',
  styleUrls: ['./public-area.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PublicAreaComponent implements OnDestroy {
  private _subscription = new Subscription();

  constructor(
    translate: TranslateService,
    route: ActivatedRoute,
    router: Router,
    scroller: ViewportScroller
  ) {
    translate.addLangs(['ru', 'ro']);
    const storageLang = localStorage.getItem(KEY_STORAGE_LANG);
    if (storageLang) {
      translate.use(storageLang);
    } else {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/ro|ru/) ? browserLang : 'ro');
    }
    this._subscription.add(
      translate.onLangChange.subscribe((event: LangChangeEvent) =>
        localStorage.setItem(KEY_STORAGE_LANG, event.lang)
      )
    );

    /**
     * implement anchor scroll manually because
     * it's not working when navigating to a different page
     */
    this._subscription.add(
      route.fragment
        .pipe(
          // prevent auto scrolling for some links
          // see example in `help-guide.component.html`
          filter((f) => f && !history.state.preventAnchorScroll),
          auditTime(0, animationFrameScheduler)
        )
        .subscribe((fragment) => {
          console.log(history.state);
          scroller.scrollToAnchor(fragment);
        })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
