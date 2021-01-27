import { Component, OnDestroy, OnInit } from '@angular/core';
import { VolunteersFacade } from '../volunteers.facade';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { IVolunteer } from '@shared/models';
import { volunteerRoles } from '@shared/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './volunteers-details.component.html',
})
export class VolunteersDetailsComponent implements OnInit, OnDestroy {
  volunteerRoles = volunteerRoles;
  volunteer$ = this.route.data.pipe<IVolunteer>(map((data) => data.volunteer));

  _destroy = new Subject();
  isLoading$ = this.volunteerFacade.isLoading$;

  constructor(
    private route: ActivatedRoute,
    private volunteerFacade: VolunteersFacade,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.volunteer$
      .pipe(
        filter((volunteer) => !!volunteer),
        takeUntil(this._destroy)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  getTimeRange(volunteer): string {
    return volunteer.availability_hours_start &&
      volunteer.availability_hours_end
      ? `${volunteer.availability_hours_start}:00 - ${volunteer.availability_hours_end}:00`
      : this.translateService.instant('not_set');
  }

  getAvailabilityDays(volunteer: IVolunteer): string {
    return volunteer.availability_days.length === 0
      ? this.translateService.instant('not_set')
      : volunteer.availability_days
          .map((day) => this.translateService.instant(day))
          .join(', ');
  }
}
