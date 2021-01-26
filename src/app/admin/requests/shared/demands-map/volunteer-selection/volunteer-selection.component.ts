import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { IVolunteer } from '@app/shared/models/volunteers';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
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
  @ViewChild('virtualScroll') virtualScroll: CdkVirtualScrollViewport;
  @Output() selectedVolunteer = new EventEmitter<IVolunteer>();
  dateDemandRequested: Date = null;
  public volunteers: IVolunteer[] = [];
  volunteers$: Subscription;
  public filterVolunteerByNameOrFamily = '';
  public selectedVol: IVolunteer = null;
  private days = weekDays;

  constructor(
    private cdr: ChangeDetectorRef,
    private volunteerService: VolunteersService
  ) {}

  volunteerClicked(id: string) {
    this.selectedVol = this.volunteers.find((v) => v._id === id);
    this.selectedVolunteer.emit(this.selectedVol);
    console.log('volunteer clicked', this.selectedVol);
    return;
  }

  public ngOnInit(): void {
    this.volunteers$ = this.volunteerService
      .getVolunteers({ pageIndex: 1, pageSize: 20000 })
      .subscribe((vol) => {
        this.volunteers = [...vol.list];
        this.cdr.detectChanges();
      });
  }

  getDayName(id: number) {
    return this.days[id];
  }
  checkIfVolunteerAvailable(day: WeekDay[]): boolean {
    //luni - 0 - duminica - 6
    let dt = '9';
    if (this.dateDemandRequested) {
      dt = this.getDayName(this.dateDemandRequested.getDay());
    } else {
      //if no date selected - we show all volunteers
      return true;
    }

    if (day !== []) {
      if (day.find((d) => d === dt)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  OnDateChange(event: MatDatepickerInputEvent<Date>) {
    this.dateDemandRequested = event.value;
  }

  OnFamilyOrNameFilter(ev) {}
  ngOnDestroy(): void {
    this.volunteers$.unsubscribe();
  }
}
