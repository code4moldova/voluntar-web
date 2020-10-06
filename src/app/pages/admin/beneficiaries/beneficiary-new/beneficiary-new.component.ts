import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { KIV_ZONES } from '../../../../constants';

@Component({
  selector: 'app-beneficiary-new',
  templateUrl: './beneficiary-new.component.html',
  styleUrls: ['./beneficiary-new.component.scss'],
})
export class BeneficiaryNewComponent implements OnInit {
  zones = KIV_ZONES;
  form = this.fb.group({
    first_name: [null, Validators.required],
    last_name: [null, Validators.required],
    age: [null /*Validators.required*/],
    // phone_prefix: [
    //   null,
    //   [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    // ],
    // phone_number: [
    //   null,
    //   [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    // ],
  });

  constructor(
    private fb: FormBuilder,

    public dialogRef: MatDialogRef<BeneficiaryNewComponent>
  ) {}

  ngOnInit(): void {}

  save() {
    // TODO
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    // TODO
  }
}
