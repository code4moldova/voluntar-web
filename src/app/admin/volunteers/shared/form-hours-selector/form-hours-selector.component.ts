import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
@Component({
  selector: 'app-form-hours-selector',
  templateUrl: './form-hours-selector.component.html',
  styleUrls: ['./form-hours-selector.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: FormHoursSelectorComponent },
  ],
})
export class FormHoursSelectorComponent implements OnInit, OnDestroy {
  @Output() startChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() endChange: EventEmitter<string> = new EventEmitter<string>();
  start = '';
  end = '';
  selectHours = false;
  parentForm: FormGroup;
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
    '22:00',
  ];
  constructor(
    private activeModal: MatDialogRef<FormHoursSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public parentData: FormGroup
  ) {}
  ngOnDestroy(): void {
    this.activeModal.close();
  }
  onSubmit(event: Event) {
    this.activeModal.close();
  }

  ngOnInit(): void {
    this.parentForm = this.parentData;
    this.start = this.parentForm.get('availability_hours_start').value;
    this.end = this.parentForm.get('availability_hours_end').value;
  }

  openSelectHours() {
    this.selectHours = !this.selectHours;
  }

  onChangeStartHour(hour: string) {
    this.start = hour;
    this.parentForm.get('availability_hours_start').setValue(this.start);
    if (
      this.end !== '' &&
      this.hours.indexOf(hour) > this.hours.indexOf(this.end)
    ) {
      this.end = '';
      this.startChange.emit('StartHoursSelectionError');
    }
  }

  onChangeEndHour(hour: string) {
    this.end = hour;
    this.parentForm.get('availability_hours_end').setValue(this.end);
    if (
      this.start !== '' &&
      this.hours.indexOf(hour) < this.hours.indexOf(this.start)
    ) {
      this.start = '';
      this.endChange.emit('EndHoursSelectionError');
    }
  }

  get componentForm() {
    return this.parentForm;
  }

  onNoClick(): void {
    this.activeModal.close();
  }
}
