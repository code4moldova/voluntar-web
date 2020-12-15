import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { SPECIAL_CONDITIONS, ZONES } from '@app/shared/constants'
import { RequestsFacade } from '../requests.facade'

@Component({
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup
  zones: Array<string> = Object.keys(ZONES).filter((key) => isNaN(+key))
  ilnessOptions: any = [
    {
      label: 'None',
      value: 'Nu are'
    },
    {
      label: 'Has symptoms',
      value: 'Are simptome'
    }
  ]
  needs: any = [
    {
      label: 'Food',
      value: 'Produse Alimentare'
    },
    {
      label: 'Drugs',
      value: 'Medicamente'
    },
    {
      label: 'Transport',
      value: 'Transport Persoana'
    },
    {
      label: 'Payment',
      value: 'Achitare Facturi'
    }
  ]
  specialConditions = SPECIAL_CONDITIONS
  constructor(private requestsFacade: RequestsFacade) {}

  onSubmit(ev: Event) {}

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
      password: new FormControl(null, [Validators.required])
    })
  }
  ngOnDestroy() {}
}
