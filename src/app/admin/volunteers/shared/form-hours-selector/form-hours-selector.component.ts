import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldControl } from '@angular/material/form-field'

@Component({
  selector: 'app-form-hours-selector',
  templateUrl: './form-hours-selector.component.html',
  styleUrls: ['./form-hours-selector.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: FormHoursSelectorComponent }]
})
export class FormHoursSelectorComponent implements OnInit {
  @Input('fn') fn: any
  @Output('onStartChange') onStartChange: EventEmitter<string> = new EventEmitter<string>()
  // @Output() onEndChange:EventEmitter<string>=new EventEmitter<string>()
  start = '18-00'
  end = '20-00'
  selectHours = false
  form: FormGroup
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
  constructor(private activeModal: MatDialogRef<any>) {
    console.log()
  }

  ngOnInit(): void {
    console.log('modal init')
    this.form = new FormGroup({
      availability_hours_start: new FormControl(null),
      availability_hours_end: new FormControl(null)
    })

    // this.start= fn.get('availability_hours_start').value
    // this.start= fn.get('availability_hours_end').value
  }

  mouseWasCLK() {
    this.start = this.fn.get('availability_hours_start').value

    // this.fn.get('availability_hours_end').setValue('23:59')
    this.end = this.fn.get('availability_hours_end').value
    console.log('Emitted from modal')
    this.onStartChange.emit('++-++')
    // this.activeModal.close('Notify click');
  }

  openSelectHours() {
    this.selectHours = !this.selectHours
  }

  onChangeStartHour(hour) {
    this.start = hour
  }

  onChangeEndHour(hour) {
    this.end = hour
  }
}
