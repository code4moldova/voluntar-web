import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BeneficiariesFacade } from '../beneficiaries.facade';
import { Beneficiary } from '../shared/beneficiary';
import { COMMON_FIELDS } from '../beneficiary-new/beneficiary-new.component';
import { zones } from '@shared/zone';
import { specialConditions } from '@beneficiaries/shared/special-condition';
import { isRecord } from '@shared/is-record';
import { EsriMapComponent } from '@shared/esri-map/esri-map.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './beneficiary-edit.component.html',
})
export class BeneficiaryEditComponent implements OnInit, OnDestroy {
  recordId: string;
  componentDestroyed$ = new Subject();
  zones = zones;
  specialConditions = specialConditions;
  formGroup = this.fb.group({
    ...COMMON_FIELDS,
    _id: [null],
    black_list: [],
  });

  beneficiary: Beneficiary;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
    private serviceFacade: BeneficiariesFacade,
    private matDialog: MatDialog,
  ) {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id') as string),
        tap((id) => (this.recordId = id)),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((id) => {
        this.recordId = id;
        if (id) {
          this.serviceFacade.getBeneficiaryById(id);
        }
      });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const payload = this.formGroup.getRawValue();
      this.serviceFacade.saveBeneficiary({
        ...payload,
        special_condition:
          payload.special_condition === 'none'
            ? null
            : payload.special_condition,
      });
      combineLatest([this.serviceFacade.isLoading$, this.serviceFacade.error$])
        .pipe(
          filter(([status, error]) => !status && !error),
          first(),
        )
        .subscribe(() => this.goBack());
    } else {
      this.snackBar.open('Introduceți cîmpurile obligatorii', '', {
        duration: 5000,
        panelClass: 'info',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      const element = this.elementRef.nativeElement.querySelector(
        '.ng-invalid:not(form)',
      );

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  ngOnInit(): void {
    this.serviceFacade.beneficiaryDetails$
      .pipe(
        filter(isRecord),
        map((record) => (this.recordId ? record : ({} as Beneficiary))),
        takeUntil(this.componentDestroyed$),
      )
      .subscribe((record) => {
        this.beneficiary = record;
        this.formGroup.patchValue({
          ...record,
          special_condition: record.special_condition ?? 'none',
        });
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  goBack() {
    void this.router.navigateByUrl(
      `/admin/beneficiaries/details/${this.recordId}`,
    );
  }

  selectAddress() {
    this.matDialog
      .open(EsriMapComponent, {
        data: {
          address: this.beneficiary.address,
          coords: [this.beneficiary.latitude, this.beneficiary.longitude],
        },
        panelClass: 'cdk-overlay-pane-no-padding',
        width: '80%',
        height: '80%',
        maxWidth: '100%',
        maxHeight: '100%',
      })
      .afterClosed()
      .subscribe((data) => data && this.formGroup.patchValue(data));
  }
}
