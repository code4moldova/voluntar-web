import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { IRequestDetails } from '@shared/models';
import { RequestsFacade } from '../requests.facade';
import { Location } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { TagsFacade } from '@shared/tags/tags.facade';

@Component({
  templateUrl: './request-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestDetailsComponent implements OnDestroy {
  private componentDestroyed$ = new Subject();

  currentRequestId$ = this.route.paramMap.pipe(
    map((params) => params.get('id'))
  );
  currentRequest$ = this.currentRequestId$.pipe(
    switchMap((id) =>
      id ? this.requestsFacade.requestDetails$ : of(null as IRequestDetails)
    ),
    takeUntil(this.componentDestroyed$)
  );

  offers$ = this.tagsFacade.offersTags$.pipe(
    // Don't like this option, but it's good for now
    map((offers) =>
      offers.filter((offer) => ['Livrarea', 'Transport'].includes(offer.ro))
    )
  );

  constructor(
    private requestsFacade: RequestsFacade,
    private route: ActivatedRoute,
    private location: Location,
    private clipboard: Clipboard,
    private tagsFacade: TagsFacade
  ) {
    this.currentRequestId$.subscribe((id) => {
      if (id) {
        this.requestsFacade.getRequestById(id);
      }
    });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  back(e) {
    e.preventDefault();
    this.location.back();
  }

  onCopy() {
    this.currentRequest$
      .pipe(withLatestFrom(this.offers$))
      .subscribe(([request, offers]) => {
        const requestText = `Nume: ${request.first_name} ${
          request.last_name
        }\nTel: ${request.phone}\nAge: ${request.age}\nAddress: ${
          request.address
        }\nOffer: ${offers.find((o) => request.offer === o._id).ro}\nComment: ${
          request.fixer_comment
        }`;
        this.clipboard.copy(requestText);
      });
  }
}
