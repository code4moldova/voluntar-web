import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeneficiariesFacadeService } from '@services/beneficiaries/beneficiaries-facade.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Beneficiary } from '@models/beneficiary';

@Component({
  selector: 'app-beneficiary-details',
  templateUrl: './beneficiary-details.component.html',
  styleUrls: ['./beneficiary-details.component.scss'],
})
export class BeneficiaryDetailsComponent implements OnInit, OnDestroy {
  recordId: string;
  componentDestroyed$ = new Subject();
  user: Beneficiary;

  constructor(
    private route: ActivatedRoute,
    private serviceFacade: BeneficiariesFacadeService
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
        }
      });
  }

  ngOnInit(): void {
    this.serviceFacade.beneficiaryDetails$
      .pipe(
        filter((record) => !!record),
        // Fix issue switching between 'new' and 'details' page
        map((record) => (this.recordId ? record : ({} as Beneficiary))),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((record) => {
        this.user = record;
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  userAddress(): string {
    if (!this.user) {
      return '';
    }

    const result = [this.user.address];

    if (this.user.scara) {
      result.push(`Sc. ${this.user.scara}`);
    }

    if (this.user.floor) {
      result.push(`Et. ${this.user.floor}`);
    }

    if (this.user.apartament) {
      result.push(`Ap. ${this.user.apartament}`);
    }

    return result.join(', ');
  }
}
