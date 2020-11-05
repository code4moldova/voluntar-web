import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith } from 'rxjs/operators';
import { NavigationService } from '../../shared/navigation.service';

@Component({
  selector: 'app-help-guide',
  templateUrl: './help-guide.component.html',
  styleUrls: ['./help-guide.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0.5 }),
        animate('.3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ position: 'absolute', top: '0', left: '0' }),
        animate('.3s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class HelpGuideComponent implements OnInit {
  activeTab$: Observable<number>;

  constructor(
    private _route: ActivatedRoute,
    public navSvc: NavigationService
  ) {}

  ngOnInit() {
    this.activeTab$ = this._route.fragment.pipe(
      startWith(this.navSvc.whoNeedsHelpSectionId),
      filter<string>(Boolean),
      distinctUntilChanged(),
      map((fragment) => {
        if (fragment.includes(this.navSvc.whoNeedsHelpSectionId)) {
          return 1;
        }
        if (fragment.includes(this.navSvc.whoCanHelpSectionId)) {
          return 2;
        }
      })
    );
  }
}
