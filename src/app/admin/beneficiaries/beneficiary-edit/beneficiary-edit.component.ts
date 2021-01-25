import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BeneficiariesFacade } from '../beneficiaries.facade';
import { Beneficiary } from '@shared/models';
import { specialConditions, zones } from '@shared/constants';
import { COMMON_FIELDS } from '../beneficiary-new/beneficiary-new.component';

@Component({
  templateUrl: './beneficiary-edit.component.html',
  styleUrls: ['./beneficiary-edit.component.scss'],
})
export class BeneficiaryEditComponent implements OnInit, OnDestroy {
  recordId: string;
  componentDestroyed$ = new Subject();
  zones = zones;
  specialConditions = specialConditions;
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
}
