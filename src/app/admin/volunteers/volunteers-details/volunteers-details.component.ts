import { Component, OnDestroy } from '@angular/core';
import { VolunteersFacade } from '../volunteers.facade';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Volunteer } from '../shared/volunteer';
import { TranslateService } from '@ngx-translate/core';
import { volunteerRoles } from '../shared/volunteer-role';
import { PageEvent } from '@angular/material/paginator';

@Component({
  templateUrl: './volunteers-details.component.html',
})
export class VolunteersDetailsComponent implements OnDestroy {
  volunteerRoles = volunteerRoles;
  volunteer: Volunteer;
  demandsData$ = this.volunteerFacade.demandsData$;

  _destroy = new Subject();
  isLoading$ = this.volunteerFacade.isLoading$;

  constructor(
    private route: ActivatedRoute,
    private volunteerFacade: VolunteersFacade,
    private translateService: TranslateService,
  ) {
    this.route.data.pipe(takeUntil(this._destroy)).subscribe((data) => {
      this.volunteer = data.volunteer;
      this.loadDemands({ pageIndex: 1, pageSize: 20, length: 20 });
    });
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

  getAvailabilityDays(volunteer: Volunteer): string {
    return volunteer.availability_days.length === 0
      ? this.translateService.instant('not_set')
      : volunteer.availability_days
          .map((day) => this.translateService.instant(day))
          .join(', ');
  }

  public loadDemands($event: PageEvent): void {
    this.volunteerFacade.getVolunteerDemands(
      { pageIndex: $event.pageIndex, pageSize: $event.pageSize },
      this.volunteer._id,
    );
  }
}
