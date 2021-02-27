import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Volunteer } from '@volunteers/shared/volunteer';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-demands-map-2-volunteer',
  templateUrl: './demands-map-2-volunteer.component.html',
  styleUrls: ['./demands-map-2-volunteer.component.scss'],
})
export class DemandsMap2VolunteerComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  @Output() nextClick = new EventEmitter<MouseEvent>();
  @Output() backClick = new EventEmitter<MouseEvent>();
  @Output() volunteerClick = new EventEmitter<Volunteer>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() dateChange = new EventEmitter<Date | null>();
  @Input() selectedVolunteer: Volunteer | null = null;
  @Input() volunteers: Volunteer[] = [];

  search = new FormControl();

  ngOnInit(): void {
    this.subscriptions.add(
      this.search.valueChanges
        .pipe(debounceTime(700), distinctUntilChanged())
        .subscribe(this.searchChange),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onDateChange($event: MatDatepickerInputEvent<unknown>) {
    this.dateChange.emit($event.value as Date);
  }
}
