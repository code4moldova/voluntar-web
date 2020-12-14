import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { RequestsFacade } from '../requests.facade'

@Component({
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestDetailsComponent implements OnInit, OnDestroy {
  form: FormGroup
  constructor(private requestsFacade: RequestsFacade) {}

  onSubmit(ev: Event) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required])
    })
  }
  ngOnDestroy() {}
}
