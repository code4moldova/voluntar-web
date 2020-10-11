import { Component, ElementRef, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { KIV_ZONES, SPECIAL_CONDITIONS } from '../../../../constants';
import { BeneficiariesFacadeService } from '@services/beneficiaries/beneficiaries-facade.service';

export const COMMON_FIELDS = {
  first_name: [null, Validators.required],
  last_name: [null, Validators.required],
  age: [null],
  zone: [null, Validators.required],
  address: [null, Validators.required],
  apartment: [null],
  entrance: [null],
  floor: [null],
  special_condition: [null],
};

@Component({
  selector: 'app-beneficiary-new',
  templateUrl: './beneficiary-new.component.html',
  styleUrls: ['./beneficiary-new.component.scss'],
})
export class BeneficiaryNewComponent implements OnInit {
  zones = KIV_ZONES;
  specialConditions = SPECIAL_CONDITIONS;
  form = this.fb.group({
    ...COMMON_FIELDS,
    phone_prefix: [null, Validators.required],
    phone_number: [null, Validators.required],
    landline_prefix: [null, Validators.required],
    landline_number: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private serviceFacade: BeneficiariesFacadeService,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef,
    public dialogRef: MatDialogRef<BeneficiaryNewComponent>
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      const payload = this.form.getRawValue();
      const {
        phone_prefix,
        phone_number,
        landline_prefix,
        landline_number,
      } = payload;
      delete payload.phone_prefix;
      delete payload.phone_number;
      delete payload.landline_prefix;
      delete payload.landline_number;
      payload.phone = `${phone_prefix} ${phone_number}`;
      payload.landline = `${landline_prefix} ${landline_number}`;
      console.log('Form is valid', payload);

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
          this.closeDialog();
        });
    } else {
      console.log('Form is invalid');
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
}
