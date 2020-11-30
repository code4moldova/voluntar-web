import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeneficiariesFacade } from '../beneficiaries.facade';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Beneficiary } from '@shared/models';
import { PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './beneficiary-details.component.html',
  styleUrls: ['./beneficiary-details.component.scss'],
})
export class BeneficiaryDetailsComponent implements OnInit, OnDestroy {
  recordId: string;
  componentDestroyed$ = new Subject();
  // user: Beneficiary;

  user$ = this.serviceFacade.beneficiaryDetails$.pipe(
    filter((record) => !!record),
    map((record) => (this.recordId ? record : ({} as Beneficiary))),
    takeUntil(this.componentDestroyed$)
  );

  error$ = this.serviceFacade.error$;
  requestsError$ = this.serviceFacade.requestsError$;
  requestsData$ = this.serviceFacade.requestsData$;
  requestsCount$ = this.serviceFacade.requestsCount$;
  pageIndex = 1;
  pageSize = 20;

  constructor(
    private route: ActivatedRoute,
    private serviceFacade: BeneficiariesFacade
  ) {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => (this.recordId = id)),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((id) => {
        this.recordId = id;
        if (id) {
          this.serviceFacade.getBeneficiaryById(id);
          this.loadRequests(id);
        }
      });
  }

  private loadRequests(id: string) {
    this.serviceFacade.getBeneficiaryRequests(
      { pageIndex: this.pageIndex, pageSize: this.pageSize },
      id
    );
  }

  ngOnInit(): void {
    this.serviceFacade.beneficiaryDetails$
      .pipe(
        filter((record) => !!record),
        map((record) => (this.recordId ? record : ({} as Beneficiary))),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((record) => {
        // this.user = record;
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadRequests(this.recordId);
  }

  userAddress(user: Beneficiary): string {
    if (!user) {
      return '';
    }

    const result = [user.address];

    if (user.entrance) {
      result.push(`Sc. ${user.entrance}`);
    }

    if (user.floor) {
      result.push(`Et. ${user.floor}`);
    }

    if (user.apartment) {
      result.push(`Ap. ${user.apartment}`);
    }

    return result.join(', ');
  }
}
