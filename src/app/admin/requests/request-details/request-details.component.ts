import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ZONES } from '@app/shared/constants'
import { RequestsFacade } from '../requests.facade'

@Component({
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup
  zones: Array<string> = Object.keys(ZONES).filter((key) => isNaN(+key))
  ilnessOptions: ['None', 'Simptoms']
  specialConditions: ['None', 'Disability', 'Blind', 'Deaf']
  needs: ['Food', 'Drugs', 'Transport', 'Payment']
  constructor(private requestsFacade: RequestsFacade) {}

  onSubmit(ev: Event) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      ilness: new FormControl('', [Validators.required]),
      zone: new FormControl('', [Validators.required]),
      special_conditions: new FormControl('', [Validators.required]),
      need: new FormControl('', [Validators.required])
    })
  }
  ngOnDestroy() {}
}
