import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SPECIAL_CONDITIONS, ZONES } from '@app/shared/constants';
import { RequestsFacade } from '../requests.facade';
import { coordinates } from './request-address-field/request-address-field.component';
import { RequestTypeUpdated } from '../../../shared/models/requests';
import { UsersFacade } from '@users/users.facade';

@Component({
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  zones: Array<string> = Object.keys(ZONES).filter((key) => isNaN(+key));
  needs = RequestTypeUpdated;
  specialConditions = SPECIAL_CONDITIONS;
  existentBeneficiary = false;
  validAddress = true;

  constructor(
    private requestsFacade: RequestsFacade,
    private usersFacade: UsersFacade
  ) {}

  onSubmit(ev: Event) {}

  ngOnInit(): void {
    this.usersFacade.getUsers();
    this.form = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      age: new FormControl(null),
      zone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      apartment: new FormControl(null),
      entrance: new FormControl(null),
      floor: new FormControl(null),
      phone: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern(/^([0-9]){8}$/),
      ]),
      landline: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^([0-9]){6}$/),
      ]),
      special_condition: new FormControl(null, [Validators.required]),
      ilness: new FormControl('', [Validators.required]),
      need: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      urgent: new FormControl(false),
    });
  }
  ngOnDestroy() {}

  getEnumKeyByEnumValue(myEnum, enumValue) {
    const keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  enumUnsorted() {}

  checkForExistentBeneficiary(phone: any) {
    // this function should display the hidden div if the beneficiary is found
    // check if the logic works
    if (phone.length === 8) this.existentBeneficiary = true;
    else this.existentBeneficiary = false;
  }

  getUrgentStyleObject() {
    if (this.form.get('urgent').value === false) {
      return { backgroundColor: 'white', color: '#ed5555' };
    } else return { backgroundColor: '#ed5555', color: 'white' };
  }

  updateAdress(event: coordinates) {
    this.form.get('address').patchValue(event.address);
    this.validAddress = event.valid;
  }
}
