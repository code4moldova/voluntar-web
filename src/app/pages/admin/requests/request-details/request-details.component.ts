import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap, switchMap, takeUntil } from 'rxjs/operators';
import { Subject, of } from 'rxjs';

import { IRequestDetails } from '@models/requests';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestDetailsComponent implements OnDestroy {
  private componentDestroyed$ = new Subject();

  currentRequestId$ = this.route.paramMap.pipe(
    map((params) => params.get('id'))
  );
  currentRequest$ = this.currentRequestId$.pipe(
    tap((id) => id && this.requestsFacade.getRequestById(id)),
    switchMap((id) =>
      id ? this.requestsFacade.requestDetails$ : of(null as IRequestDetails)
    ),
    takeUntil(this.componentDestroyed$)
  );
  // .subscribe((request) => {
  //   this.form.patchValue(request);
  //   // Reset volunteer
  //   if (!request.volunteer) {
  //     this.form.get('volunteer').reset();
  //   }
  //   if (request.address) {
  //     this.fakeAddressControl.patchValue({ address: request.address });
  //   }
  //   // Autofill secret field
  //   if (!request.secret) {
  //     this.tagsFacade.getRandomWord().pipe(first()).subscribe(secret => {
  //       this.form.get('secret').patchValue(secret);
  //     });
  //   }
  // });

  constructor(
    private requestsFacade: RequestsFacadeService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  back(e) {
    e.preventDefault();
    this.location.back();
  }
}
