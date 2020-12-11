import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { MatFormFieldControl } from '@angular/material/form-field'

@Component({
  selector: 'form-hours-selector',
  template: './form-hours-selector.component.html',
  styles: ['./form-hours-selector.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: FormHoursSelectorComponent }]
})
export class FormHoursSelectorComponent implements OnInit {
  @Input('fn') fn: any
  @Output('onStartChange') onStartChange: EventEmitter<string> = new EventEmitter<string>()
  // @Output() onEndChange:EventEmitter<string>=new EventEmitter<string>()
  start = '00-00'
  end = '10-00'
  constructor(private activeModal: MatDialogRef<any>) {
    console.log()
  }

  ngOnInit(): void {
    console.log('modal init')

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
}
