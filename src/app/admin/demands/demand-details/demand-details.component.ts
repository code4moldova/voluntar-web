import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemandsFacade } from '../demands.facade';
import { BeneficiariesService } from '@beneficiaries/beneficiaries.service';
import { coordinates } from './demand-address-field/demand-address-field.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Beneficiary } from '@beneficiaries/shared/beneficiary';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Demand } from '@demands/shared/demand';
import { BeneficiariesFacade } from '@app/admin/beneficiaries/beneficiaries.facade';
import { DemandsService } from '../demands.service';
import { demandTypes } from '@demands/shared/demand-type';
import { DemandStatus } from '@demands/shared/demand-status';
import { zones } from '@shared/zone';
import { specialConditions } from '@beneficiaries/shared/special-condition';

export interface ReceivedData {
  element: Demand;
}

@Component({
  templateUrl: './demand-details.component.html',
  styleUrls: ['./demand-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemandDetailsComponent implements OnInit {
  form: FormGroup;
  DemandStatus = DemandStatus;
  zones = zones;
  needs: string[] = demandTypes;
  specialConditions = specialConditions;
  firstBeneficiary: Beneficiary | null = null;
  selectedBeneficiary: Beneficiary | null = null;
  validAddress = true;
  demandAddress: string;
  beneficiaryName = '';

  constructor(
    private demandsFacade: DemandsFacade,
    private demandsService: DemandsService,
    private snackBar: MatSnackBar,
    private beneficiariesService: BeneficiariesService,
    private beneficiariesFacade: BeneficiariesFacade,
    public dialogRef: MatDialogRef<DemandDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceivedData,
  ) {}

  onSubmit() {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      status: DemandStatus.new,
    };

    if (this.selectedBeneficiary) {
      payload.beneficiary = this.selectedBeneficiary._id;
    } else {
      payload.beneficiary.landline = `22${payload.beneficiary.landline}`;

      // TODO: Get the coordinates from the address
      payload.beneficiary.latitude = 47.01820503506154 + Math.random() * 0.01;
      payload.beneficiary.longitude = 28.812844986831664 + Math.random() * 0.01;

      if (payload.beneficiary.special_condition === 'None')
        delete payload.beneficiary.special_condition;

      this.beneficiariesFacade.saveBeneficiary(payload.beneficiary);
    }

    if (this.selectedBeneficiary) {
      this.demandsFacade.saveDemand(payload);
    } else {
      this.beneficiariesFacade.beneficiaryDetails$
        .pipe(filter((ben) => !!ben))
        .subscribe((ben) => {
          payload.beneficiary = ben._id;
          this.demandsFacade.saveDemand(payload);
        });
    }

    combineLatest([this.demandsFacade.isLoading$, this.demandsFacade.error$])
      .pipe(
        filter(([status, error]) => !status && !error),
        first(),
      )
      .subscribe(() => {
        this.snackBar.open('Cererea a fost salvată cu success.', '', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.closeDialog();
      });
  }

  ngOnInit(): void {
    const el = this.isEmpty(this.data.element) ? null : this.data.element;

    this.form = new FormGroup({
      beneficiary: new FormGroup({
        first_name: new FormControl(el ? el.beneficiary.first_name : '', [
          Validators.required,
        ]),
        last_name: new FormControl(el ? el.beneficiary.last_name : '', [
          Validators.required,
        ]),
        age: new FormControl(el ? el.beneficiary.age : null),
        zone: new FormControl(el ? el.beneficiary.zone : null, [
          Validators.required,
        ]),
        address: new FormControl(el ? el.beneficiary.address : null, [
          Validators.required,
        ]),
        apartment: new FormControl(el ? el.beneficiary.apartment : null),
        entrance: new FormControl(el ? el.beneficiary.entrance : null),
        floor: new FormControl(el ? el.beneficiary.floor : null),
        phone: new FormControl(el ? el.beneficiary.phone : null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^([0-9]){8}$/),
        ]),
        landline: new FormControl(
          el
            ? el.beneficiary.landline.substring(
                2,
                el.beneficiary.landline.length,
              )
            : null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
            Validators.pattern(/^([0-9]){6}$/),
          ],
        ),
        special_condition: new FormControl(
          el ? el.beneficiary.special_condition : null,
          [Validators.required],
        ),
      }),
      has_symptoms: new FormControl(el ? el.has_symptoms : null, [
        Validators.required,
      ]),
      type: new FormControl(el ? el.type : '', [Validators.required]),
      comments: new FormControl(el ? el.comments : null),
      secret: new FormControl(this.getSecret(), [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      urgent: new FormControl(el ? el.urgent : false),
    });
    if (el) this.demandAddress = el.beneficiary.address;
    else this.demandAddress = '';
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onEditDemand(status: DemandStatus) {
    this.demandsService
      .updateDemand({
        _id: this.data.element._id,
        type: this.data.element.type,
        status,
        number: this.data.element.number,
        secret: this.data.element.secret,
        urgent: this.data.element.urgent,
        comments: this.data.element.comments,
        has_symptoms: this.data.element.has_symptoms,
      } as Demand)
      .subscribe({
        error: () => console.log('ERROR submitting demand status update!'),
      });
  }

  checkForExistentBeneficiary($event: Event) {
    const phone = ($event.target as HTMLInputElement).value;
    if (phone.length === 8) {
      this.beneficiariesService.getBeneficiariesByFilter({ phone }).subscribe(
        (success) => {
          if (success.count !== 0) {
            this.firstBeneficiary = success.list[0];
            this.beneficiaryName = `${this.firstBeneficiary.last_name} ${this.firstBeneficiary.first_name}`;
          }
          // this.cdr.detectChanges();
        },
        (error) => {
          console.error('ERROR: ' + error);
        },
      );
    }
  }

  updateDataFromBeneficiary() {
    this.selectedBeneficiary = this.firstBeneficiary;
    this.form
      .get('beneficiary.last_name')
      .patchValue(this.selectedBeneficiary.last_name);
    this.form
      .get('beneficiary.first_name')
      .patchValue(this.selectedBeneficiary.first_name);
    this.form
      .get('beneficiary.landline')
      .patchValue(
        this.selectedBeneficiary.landline.substring(
          2,
          this.selectedBeneficiary.landline.length,
        ),
      );
    this.form.get('beneficiary.age').patchValue(this.selectedBeneficiary.age);
    this.form.get('beneficiary.zone').patchValue(this.selectedBeneficiary.zone);
    this.form
      .get('beneficiary.address')
      .patchValue(this.selectedBeneficiary.address);
    this.form
      .get('beneficiary.entrance')
      .patchValue(this.selectedBeneficiary.entrance);
    this.form
      .get('beneficiary.floor')
      .patchValue(this.selectedBeneficiary.floor);
    this.form
      .get('beneficiary.apartment')
      .patchValue(this.selectedBeneficiary.apartment);
    this.form
      .get('beneficiary.special_condition')
      .patchValue(this.selectedBeneficiary.special_condition);
    this.demandAddress = this.selectedBeneficiary.address;
  }

  getUrgentStyleObject() {
    //TODO - probably need to use centralised styles ???
    if (this.form.get('urgent').value === false) {
      return { backgroundColor: 'white', color: '#ed5555' };
    } else return { backgroundColor: '#ed5555', color: 'white' };
  }

  updateAddress(event: coordinates) {
    this.form.get('beneficiary.address').patchValue(event.address);
    this.validAddress = event.valid;
  }

  isEmpty(obj: Beneficiary | Demand) {
    return !!obj && Object.keys(obj).length < 1;
  }

  getSecret() {
    const randomNumber = (max: number) => Math.floor(Math.random() * max);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alpha = alphabet[randomNumber(alphabet.length)];
    const digits = Array.from({ length: 4 }, () => randomNumber(10));
    return `${alpha}${digits.join('')}`;
  }

  // TODO: Implement delete in services
  onDeleteRecord() {
    this.onEditDemand(DemandStatus.archived);
  }
}
