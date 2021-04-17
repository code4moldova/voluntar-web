import { Component, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { BeneficiariesFacade } from '../beneficiaries.facade';
import { zones } from '@shared/zone';
import { specialConditions } from '@beneficiaries/shared/special-condition';
import { EsriMapComponent } from '@shared/esri-map/esri-map.component';

export const COMMON_FIELDS = {
  first_name: [null, Validators.required],
  last_name: [null, Validators.required],
  age: [null],
  zone: [null, Validators.required],
  address: [null, Validators.required],
  latitude: [null, Validators.required],
  longitude: [null, Validators.required],
  apartment: [null],
  entrance: [null],
  floor: [null],
  phone: ['', [Validators.required, Validators.pattern(/^[^0]([0-9]){7}$/)]],
  landline: ['', [Validators.required, Validators.pattern(/^[^0]([0-9]){7}$/)]],
  special_condition: [null],
};

@Component({
  templateUrl: './beneficiary-new.component.html',
  styleUrls: ['./beneficiary-new.component.scss'],
})
export class BeneficiaryNewComponent {
  zones = zones;
  specialConditions = specialConditions;
  form = this.fb.group(COMMON_FIELDS);

  constructor(
    private fb: FormBuilder,
    private serviceFacade: BeneficiariesFacade,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
    public dialogRef: MatDialogRef<BeneficiaryNewComponent>,
    private matDialog: MatDialog,
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.serviceFacade.saveBeneficiary({
      ...this.form.value,
      special_condition:
        this.form.value.special_condition === 'none'
          ? null
          : this.form.value.special_condition,
    });

    combineLatest([this.serviceFacade.isLoading$, this.serviceFacade.error$])
      .pipe(
        filter(([status, error]) => !status && !error),
        first(),
      )
      .subscribe(() => {
        this.snackBar.open('Beneficiarul a fost salvat cu success.', '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.closeDialog();
      });
  }

  selectAddress() {
    this.matDialog
      .open(EsriMapComponent, {
        panelClass: 'cdk-overlay-pane-no-padding',
        width: '80%',
        height: '80%',
        maxWidth: '100%',
        maxHeight: '100%',
      })
      .afterClosed()
      .subscribe((data) => data && this.form.patchValue(data));
  }
}
