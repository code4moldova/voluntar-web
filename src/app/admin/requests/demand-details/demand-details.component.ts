import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { specialConditions, zones } from '@app/shared/constants';
import { RequestsFacade } from '../requests.facade';
import { BeneficiariesService } from '@beneficiaries/beneficiaries.service';
import { coordinates } from './demand-address-field/demand-address-field.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Beneficiary } from '@app/shared/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import {
  Demand,
  DemandBackEnd,
  DemandStatus,
  demandTypes,
} from '@app/shared/models/demand';
import { BeneficiariesFacade } from '@app/admin/beneficiaries/beneficiaries.facade';
import { RequestsService } from '../requests.service';

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
  zones = zones;
  needs = demandTypes;
  specialConditions = specialConditions;
  existentBeneficiary: Beneficiary = {} as Beneficiary;
  validAddress = true;
  requestAddress: string;
  beneficiaryName = '';

  constructor(
    private requestsFacade: RequestsFacade,
    private requestsService: RequestsService,
    private snackBar: MatSnackBar,
    private beneficiariesService: BeneficiariesService,
    private beneficiariesFacade: BeneficiariesFacade,
    public dialogRef: MatDialogRef<DemandDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReceivedData
  ) {}

  onSubmit() {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
    };

    if (this.existentBeneficiary)
      payload.beneficiary = this.existentBeneficiary;
    else {
      payload.beneficiary.landline = `22${payload.beneficiary.landline}`;

      // TODO: Get the coordinates from the address
      payload.beneficiary.latitude = 47.01820503506154 + Math.random() * 0.01;
      payload.beneficiary.longitude = 28.812844986831664 + Math.random() * 0.01;

      if (payload.beneficiary.special_condition === 'None')
        delete payload.beneficiary.special_condition;

      this.beneficiariesFacade.saveBeneficiary(payload.beneficiary);
    }

    // TODO: Refactor requests facade to demand facade
    this.requestsFacade.saveRequest(payload);
    combineLatest([this.requestsFacade.isLoading$, this.requestsFacade.error$])
      .pipe(
        filter(([status, error]) => !status && !error),
        first()
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
                el.beneficiary.landline.length
              )
            : null,
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
            Validators.pattern(/^([0-9]){6}$/),
          ]
        ),
        special_condition: new FormControl(
          el ? el.beneficiary.special_condition : null,
          [Validators.required]
        ),
      }),
      has_symptoms: new FormControl(el ? el.has_symptoms : null, [
        Validators.required,
      ]),
      type: new FormControl(el ? el.type : '', [Validators.required]),
      comments: new FormControl(el ? el.comments : null),
      secret: new FormControl(this.getSecret(), [
        (Validators.required, Validators.minLength(5), Validators.maxLength(5)),
      ]),
      urgent: new FormControl(el ? el.urgent : false),
    });
    if (el) this.requestAddress = el.beneficiary.address;
    else this.requestAddress = '';
  }

  closeDialog() {
    this.dialogRef.close();
  }

  enumUnsorted() {}

  onEditDemand(edit?: boolean) {
    const updateDemand: DemandBackEnd = {
      _id: this.data.element._id,
      type: this.data.element.type,
      status: edit ? DemandStatus.confirmed : DemandStatus.archived,
      number: this.data.element.number,
      secret: this.data.element.secret,
      urgent: this.data.element.urgent,
      comments: this.data.element.comments,
      has_symptoms: this.data.element.has_symptoms,
    };

    this.requestsService.updateDemand(updateDemand).subscribe(
      () => {},
      () => console.log('ERROR submitting demand status update!')
    );
  }

  checkForExistentBeneficiary(phone: any) {
    if (phone.length === 8) {
      this.beneficiariesService.getBeneficiariesByFilter({ phone }).subscribe(
        (success) => {
          if (success.count !== 0) {
            this.existentBeneficiary = success.list[0];
            this.beneficiaryName = `${this.existentBeneficiary.last_name} ${this.existentBeneficiary.first_name}`;
          }
          // this.cdr.detectChanges();
        },
        (error) => {
          console.error('ERROR: ' + error);
        }
      );
    }
  }

  updateDataFromBeneficiary() {
    this.form
      .get('beneficiary.last_name')
      .patchValue(this.existentBeneficiary.last_name);
    this.form
      .get('beneficiary.first_name')
      .patchValue(this.existentBeneficiary.first_name);
    this.form
      .get('beneficiary.landline')
      .patchValue(
        this.existentBeneficiary.landline.substring(
          2,
          this.existentBeneficiary.landline.length
        )
      );
    this.form.get('beneficiary.age').patchValue(this.existentBeneficiary.age);
    this.form.get('beneficiary.zone').patchValue(this.existentBeneficiary.zone);
    this.form
      .get('beneficiary.address')
      .patchValue(this.existentBeneficiary.address);
    this.form
      .get('beneficiary.entrance')
      .patchValue(this.existentBeneficiary.entrance);
    this.form
      .get('beneficiary.floor')
      .patchValue(this.existentBeneficiary.floor);
    this.form
      .get('beneficiary.apartment')
      .patchValue(this.existentBeneficiary.apartment);
    this.form
      .get('beneficiary.special_condition')
      .patchValue(this.existentBeneficiary.special_condition);
    this.requestAddress = this.existentBeneficiary.address;
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
    return Object.keys(obj).length < 1;
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
    this.onEditDemand(false);
  }
}
