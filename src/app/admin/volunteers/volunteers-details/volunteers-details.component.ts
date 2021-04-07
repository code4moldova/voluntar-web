import { Component, OnDestroy, OnInit } from '@angular/core';
import { VolunteersFacade } from '../volunteers.facade';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Volunteer } from '../shared/volunteer';
import { TranslateService } from '@ngx-translate/core';
import { volunteerRoles } from '../shared/volunteer-role';
import { PageEvent } from '@angular/material/paginator';
import { isRecord } from '@shared/is-record';

@Component({
  styleUrls: ['./volunteers-details.component.scss'],
  templateUrl: './volunteers-details.component.html',
})
export class VolunteersDetailsComponent implements OnInit, OnDestroy {
  volunteerRoles = volunteerRoles;
  volunteer$ = this.route.data.pipe<Volunteer>(map((data) => data.volunteer));
  demandsData$ = this.volunteerFacade.demandsData$;
  demandsCount$ = this.volunteerFacade.demandsCount$;
  pageIndex = 1;
  pageSize = 20;
  recordId: string;

  _destroy = new Subject();
  isLoading$ = this.volunteerFacade.isLoading$;

  constructor(
    private route: ActivatedRoute,
    private volunteerFacade: VolunteersFacade,
    private translateService: TranslateService,
  ) {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id') as string),
        tap((id) => (this.recordId = id)),
        takeUntil(this._destroy),
      )
      .subscribe((id) => {
        this.recordId = id;
        if (id) {
          this.volunteerFacade.getVolunteerById(id);
          this.loadDemands(id);
        }
      });
  }

  ngOnInit() {
    this.volunteer$
      .pipe(
        filter(isRecord),
        map((record) => (this.recordId ? record : ({} as Volunteer))),
        takeUntil(this._destroy),
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

  getAvailabilityDays(volunteer: Volunteer): string {
    return volunteer.availability_days.length === 0
      ? this.translateService.instant('not_set')
      : volunteer.availability_days
          .map((day) => this.translateService.instant(day))
          .join(', ');
  }

  private loadDemands(id: string) {
    console.log(id);
    this.volunteerFacade.getVolunteerDemands(
      { pageIndex: this.pageIndex, pageSize: this.pageSize },
      id,
    );
  }

  onPageChange($event: PageEvent) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.loadDemands(this.recordId);
  }
}
