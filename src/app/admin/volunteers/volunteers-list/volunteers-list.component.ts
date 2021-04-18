import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { VolunteersFacade } from '../volunteers.facade';
import { Volunteer } from '../shared/volunteer';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { map, takeUntil } from 'rxjs/operators';
import { saveVolunteerSuccessAction } from '../volunteers.actions';
import { VolunteersCreateComponent } from '../volunteers-create/volunteers-create.component';
import {
  VolunteerRole,
  volunteerRoles,
  VolunteerStatus,
} from '../shared/volunteer-enums';
import { Zone, zones } from '@shared/zone';
import { CsvService } from '@app/admin/shared/csv.service';
import { environment } from '../../../../environments/environment';
import { PageParams, Tab } from '@app/admin/shared/interfaces';

@Component({
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss'],
})
export class VolunteersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = ['name', 'phone', 'zone', 'icons', 'details'];
  dataSource$ = this.volunteersFacade.volunteers$;
  isLoading$ = this.volunteersFacade.isLoading$;
  count$ = this.volunteersFacade.count$;
  tabs: Tab[] = [
    {
      label: 'active',
      status: VolunteerStatus.active,
      count$: this.getCountByStatus(VolunteerStatus.active),
    },
    {
      label: 'inactive',
      status: VolunteerStatus.inactive,
      count$: this.getCountByStatus(VolunteerStatus.inactive),
    },
    {
      label: 'black_list',
      status: VolunteerStatus.blacklist,
      count$: this.getCountByStatus(VolunteerStatus.blacklist),
    },
    {
      label: 'all.masculine',
      status: undefined,
      count$: this.getCountByStatus(),
    },
  ];
  activeTab = this.tabs[0];
  page: PageParams = { pageSize: 20, pageIndex: 1 };
  lastFilter = {};
  zones = zones;
  volunteerRoles = volunteerRoles;

  searchFilterQuery = '';
  searchFilterZone = '';
  searchFilterRole = '';

  constructor(
    private volunteersFacade: VolunteersFacade,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
    private csvService: CsvService,
  ) {}

  ngOnInit() {
    this.onTabChange(this.activeTab);
  }

  searchSubmit() {
    this.paginator.firstPage();
    this.queryResult({
      status: this.activeTab.status,
      query: this.searchFilterQuery || undefined,
      zone: getValue<Zone>(this.searchFilterZone),
      role: getValue<VolunteerRole>(this.searchFilterRole),
    });
  }

  onImport(): void {
    this.csvService
      .upload(`${environment.url}/import/csv/volunteers`)
      .subscribe();
  }

  onExport(): void {
    this.csvService
      .download(`${environment.url}/export/csv/volunteers`, 'volunteers.csv')
      .subscribe();
  }

  getCountByStatus(status?: string) {
    return this.volunteersFacade
      .getByStatus(status)
      .pipe(map((res) => res.count));
  }

  queryResult(criteria: { [keys: string]: string | undefined }) {
    this.lastFilter = criteria;
    this.page = { pageSize: 20, pageIndex: 1 };
    this.volunteersFacade.getVolunteers(this.page, criteria);
  }

  onPageChange(event: PageEvent) {
    this.page = { pageSize: event.pageSize, pageIndex: event.pageIndex + 1 };
    this.volunteersFacade.getVolunteers(this.page, this.lastFilter);
  }

  openNewVolunteerDialog() {
    const dialogRef = this.matDialog.open(VolunteersCreateComponent, {
      width: '550px',
    });

    this.actions$
      .pipe(
        ofType(saveVolunteerSuccessAction),
        takeUntil(dialogRef.afterClosed()),
      )
      .subscribe(() => {
        this.volunteersFacade.getVolunteers(this.page, this.lastFilter);
        dialogRef.close();
      });
  }

  onTabChange(tab: Tab) {
    this.activeTab = tab;
    this.paginator.firstPage();
    return this.activeTab.status !== null
      ? this.queryResult({ status: this.activeTab.status })
      : this.queryResult({});
  }

  cast(volunteer: unknown): Volunteer {
    return volunteer as Volunteer;
  }
}

function getValue<T extends string>(value: string): T | undefined {
  return value !== 'all' && value ? (value as T) : undefined;
}
