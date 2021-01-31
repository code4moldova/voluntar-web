import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { VolunteersService } from '@app/admin/volunteers/volunteers.service';
import { WeekDay, weekDays } from '@app/shared/week-day';
import { Volunteer } from '@volunteers/shared/volunteer';

@Component({
  selector: 'app-volunteer-selection',
  templateUrl: './volunteer-selection.component.html',
  styleUrls: ['./volunteer-selection.component.scss'],
})
export class VolunteerSelectionOnMapComponent implements OnInit, OnDestroy {
  @Output() selectedVolunteer = new EventEmitter<Volunteer>();
  selectedDemandDate: Date = null;
  public volunteers: Volunteer[] = [];
  volunteers$: Subscription;
  public filterVolunteerByNameOrFamily = '';
  public selectedVol: Volunteer = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private volunteerService: VolunteersService,
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
    if (!this.selectedDemandDate) return true;

    const todayDay = this.selectedDemandDate.getDay();
    const selectedDayOfTheWeek = weekDays[todayDay];

    return days.includes(selectedDayOfTheWeek);
  }

  onDateChange(event: MatDatepickerInputEvent<unknown>) {
    this.selectedDemandDate = event.value as Date;
  }

  ngOnDestroy(): void {
    this.volunteers$.unsubscribe();
  }
}
