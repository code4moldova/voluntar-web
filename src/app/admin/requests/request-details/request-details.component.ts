import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { SPECIAL_CONDITIONS, ZONES } from '@app/shared/constants'
import { RequestsFacade } from '../requests.facade'

export enum ILNESS_OPTIONS {
  'None' = 'Nu are',
  'Has symptoms' = 'Are simptome'
}

export enum CUSTOMER_NEEDS {
  'Food' = 'Produse Alimentare',
  'Drugs' = 'Medicamente',
  'Transport' = 'Transport Persoana',
  'Payment' = 'Achitare Facturi'
}

@Component({
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup
  zones: Array<string> = Object.keys(ZONES).filter((key) => isNaN(+key))
  needs: Array<string> = Object.values(CUSTOMER_NEEDS).filter((key) => isNaN(+key))
  ilnessOptions: Array<string> = Object.values(ILNESS_OPTIONS).filter((key) => isNaN(+key))
  specialConditions = SPECIAL_CONDITIONS
  constructor(private requestsFacade: RequestsFacade) {}

  onSubmit(ev: Event) {
    this.form.get('need').setValue(this.getEnumKeyByEnumValue(CUSTOMER_NEEDS, this.form.get('need').value))
    this.form.get('ilness').setValue(this.getEnumKeyByEnumValue(ILNESS_OPTIONS, this.form.get('ilness').value))
    console.log(this.form.get('urgent').value)
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      age: new FormControl(null),
      zone: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      apartment: new FormControl(null),
      entrance: new FormControl(null),
      floor: new FormControl(null),
      phone: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      landline: new FormControl(
        null,
        // because we add prefix 22 at form submit.
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)]
      ),
      special_condition: new FormControl(null, [Validators.required]),
      ilness: new FormControl('', [Validators.required]),
      need: new FormControl('', [Validators.required]),
      comments: new FormControl(''),
      password: new FormControl(null, [Validators.required]),
      urgent: new FormControl(false, [Validators.required])
    })
  }
  ngOnDestroy() {}

  getEnumKeyByEnumValue(myEnum, enumValue) {
    let keys = Object.keys(myEnum).filter((x) => myEnum[x] == enumValue)
    return keys.length > 0 ? keys[0] : null
  }
}
