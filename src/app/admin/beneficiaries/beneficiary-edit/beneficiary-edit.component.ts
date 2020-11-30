import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BeneficiariesFacade } from '../beneficiaries.facade';
import { Beneficiary } from '@shared/models';
import { KIV_ZONES, SPECIAL_CONDITIONS } from '@shared/constants';
import { COMMON_FIELDS } from '../beneficiary-new/beneficiary-new.component';
import { MatDialog } from '@angular/material/dialog';
import { EsriMapComponent } from '@app/shared/esri-map/esri-map.component';

@Component({
  templateUrl: './beneficiary-edit.component.html',
  styleUrls: ['./beneficiary-edit.component.scss'],
})
export class BeneficiaryEditComponent implements OnInit, OnDestroy {
  recordId: string;
  componentDestroyed$ = new Subject();
  zones = KIV_ZONES;
  specialConditions = SPECIAL_CONDITIONS;
  form = this.fb.group({
    ...COMMON_FIELDS,
    landline: [
      null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
    ],
    _id: [null],
    black_list: [],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
    private serviceFacade: BeneficiariesFacade,
    private matDialog: MatDialog
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

  onSubmit() {
    if (this.form.valid) {
      const payload = this.form.getRawValue();

      this.serviceFacade.saveBeneficiary(payload);
      combineLatest([this.serviceFacade.isLoading$, this.serviceFacade.error$])
        .pipe(
          filter(([status, error]) => !status && !error),
          first()
        )
        .subscribe(() => {
          this.snackBar.open('Beneficiarul a fost salvat cu success.', '', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.goBack();
        });
    } else {
      this.snackBar.open('Introduceți cîmpurile obligatorii', '', {
        duration: 5000,
        panelClass: 'info',
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      const element = this.elementRef.nativeElement.querySelector(
        '.ng-invalid:not(form)'
      );

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  ngOnInit(): void {
    this.serviceFacade.beneficiaryDetails$
      .pipe(
        filter((record) => !!record),
        map((record) => (this.recordId ? record : ({} as Beneficiary))),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe((record) => {
        this.form.patchValue(record);
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  goBack() {
    this.router.navigateByUrl(`/admin/beneficiaries/details/${this.recordId}`);
  }

  showMapDialog() {
    this.matDialog
      .open<
        EsriMapComponent,
        { coors: number[]; address: string },
        { latitude: number; longitude: number; address: string }
      >(EsriMapComponent, {
        data: {
          coors: [
            this.form.get('latitude').value,
            this.form.get('longitude').value,
          ],
          address: this.form.get('address').value,
        },
        panelClass: 'esri-map',
        width: '80%',
        height: '80%',
        maxWidth: '100%',
        maxHeight: '100%',
      })
      .afterClosed()
      .pipe(first())
      .subscribe((coors) => {
        if (coors) {
          this.form.get('latitude').patchValue(coors.latitude);
          this.form.get('longitude').patchValue(coors.longitude);
          this.form.get('address').patchValue(coors.address);
        }
      });
  }
}
