import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatFormFieldControl } from '@angular/material/form-field'

@Component({
  selector: 'app-form-hours-selector',
  templateUrl: './form-hours-selector.component.html',
  styleUrls: ['./form-hours-selector.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: FormHoursSelectorComponent }]
})
export class FormHoursSelectorComponent implements OnInit {
  // @Input('parentForm') parentForm: FormGroup
  @Output('onStartChange') onStartChange: EventEmitter<string> = new EventEmitter<string>()
  @Output('onEndChange') onEndChange: EventEmitter<string> = new EventEmitter<string>()
  // @Output() onEndChange:EventEmitter<string>=new EventEmitter<string>()
  start = ''
  end = ''
  selectHours = false
  form: FormGroup
  parentForm: FormGroup
  hours = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ]
  constructor(
    private activeModal: MatDialogRef<FormHoursSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public parentData: FormGroup
  ) {}

  onSubmit(event: Event) {
    console.log(
      '🚀 ~ file: form-hours-selector.component.ts ~ line 43 ~ FormHoursSelectorComponent ~ onSubmit ~ onSubmit',
      event
    )
    this.activeModal.close()
  }

  ngOnInit(): void {
    this.form = this.parentData
  }

  openSelectHours() {
    this.selectHours = !this.selectHours
  }

  onChangeStartHour(hour: string) {
    this.start = hour
    this.parentForm.value.availability_hours_start = this.start
    if (this.end != '' && this.hours.indexOf(hour) > this.hours.indexOf(this.end)) {
      this.end = ''
      this.onStartChange.emit('StartHoursSelectionError')
    }
  }

  onChangeEndHour(hour: string) {
    this.end = hour
    this.parentForm.value.availability_hours_end = this.end
    if (this.start != '' && this.hours.indexOf(hour) < this.hours.indexOf(this.start)) {
      this.start = ''
      this.onEndChange.emit('EndHoursSelectionError')
    }
  }

  get componentForm() {
    return this.form
  }
  onNoClick(): void {
    this.activeModal.close()
  }
}
