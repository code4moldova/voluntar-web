import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { IVolunteer } from '@app/shared/models/volunteers';
import { Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { VolunteersService } from '@app/admin/volunteers/volunteers.service';
import { WeekDay, weekDays } from '@app/shared/week-day';

@Component({
  selector: 'app-volunteer-selection',
  templateUrl: './volunteer-selection.component.html',
  styleUrls: ['./volunteer-selection.component.scss'],
})
export class VolunteerSelectionOnMapComponent implements OnInit, OnDestroy {
  @Output() selectedVolunteer = new EventEmitter<IVolunteer>();
  dateDemandRequested: Date = null;
  public volunteers: IVolunteer[] = [];
  volunteers$: Subscription;
  public filterVolunteerByNameOrFamily = '';
  public selectedVol: IVolunteer = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private volunteerService: VolunteersService
  ) {}

  volunteerClicked(id: string) {
    this.selectedVol = this.volunteers.find((v) => v._id === id);
    this.selectedVolunteer.emit(this.selectedVol);
  }

  public ngOnInit(): void {
    this.volunteers$ = this.volunteerService
      .getVolunteers({ pageIndex: 1, pageSize: Number.MAX_SAFE_INTEGER })
      .subscribe((vol) => {
        this.volunteers = [...vol.list];
        // due to detect strategy where changed on parent level
        this.cdr.detectChanges();
      });
  }

  checkIfVolunteerAvailable(days: WeekDay[]): boolean {
    // if no any date selected - we show all volunteers
    if (!this.dateDemandRequested) return true;

    const todayDay = this.dateDemandRequested.getDay();
    const selectedDayOfTheWeek = weekDays[todayDay];

    return days.includes(selectedDayOfTheWeek);
  }

  onDateChange(event: MatDatepickerInputEvent<unknown>) {
    this.dateDemandRequested = event.value as Date;
  }

  ngOnDestroy(): void {
    this.volunteers$.unsubscribe();
  }
}
