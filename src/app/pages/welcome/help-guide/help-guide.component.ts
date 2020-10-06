import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { fromEvent, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-help-guide',
  templateUrl: './help-guide.component.html',
  styleUrls: ['./help-guide.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ position: 'absolute', top: '0', left: '0' }),
        animate('.3s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HelpGuideComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  private _activeTabSubj = new ReplaySubject(1);

  activeTab$ = this._activeTabSubj.pipe(distinctUntilChanged());
  @Input() hotLineSectionId: string;
  @Input() whoNeedsHelpSectionId: string;
  @Input() whoCanHelpSectionId: string;
  @Input() formularUrl: string;

  ngOnInit() {
    this._initActiveTabFromUrlHash();
    this._updateActiveTabOnHashChange();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  activateTab(tab: number) {
    this._activeTabSubj.next(tab);
    history?.pushState(
      null,
      null,
      `#${tab === 1 ? this.whoNeedsHelpSectionId : this.whoCanHelpSectionId}`
    );
  }

  private _initActiveTabFromUrlHash() {
    if (location.href.includes(`#${this.whoCanHelpSectionId}`)) {
      this._activeTabSubj.next(2);
    } else {
      this._activeTabSubj.next(1);
    }
  }

  private _updateActiveTabOnHashChange() {
    this._subscription.add(
      fromEvent(window, 'hashchange').subscribe((event: HashChangeEvent) => {
        if (event.newURL.includes(`#${this.whoNeedsHelpSectionId}`)) {
          this._activeTabSubj.next(1);
        }
        if (event.newURL.includes(`#${this.whoCanHelpSectionId}`)) {
          this._activeTabSubj.next(2);
        }
      })
    );
  }
}
