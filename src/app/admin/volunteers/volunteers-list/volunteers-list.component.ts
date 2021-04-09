import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

import { VolunteerPageParams, VolunteersFacade } from '../volunteers.facade';
import { Volunteer } from '../shared/volunteer';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { map, take, takeUntil } from 'rxjs/operators';
import { saveVolunteerSuccessAction } from '../volunteers.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { VolunteersCreateComponent } from '../volunteers-create/volunteers-create.component';
import {
  VolunteerRole,
  volunteerRoles,
  VolunteerStatus,
} from '../shared/volunteer-enums';
import { Zone, zones } from '@shared/zone';
import { VolunteersService } from '@volunteers/volunteers.service';
import { CsvService } from '@app/admin/shared/csv.service';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss'],
})
export class VolunteersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = ['name', 'phone', 'zone', 'icons', 'details'];
  dataSource$: Observable<Volunteer[]>;
  isLoading$ = this.volunteersFacade.isLoading$;
  count$ = this.volunteersFacade.count$;
  allStatusesCounts$ = new BehaviorSubject<number[]>([]);
  tabs: Tab[] = [
    { label: 'active', status: VolunteerStatus.active },
    { label: 'inactive', status: VolunteerStatus.inactive },
    { label: 'black_list', status: VolunteerStatus.blacklist },
    { label: 'all.masculine', status: undefined },
  ];
  activeTab = this.tabs[0];
  page: VolunteerPageParams = { pageSize: 20, pageIndex: 1 };
  lastFilter = {};
  zones = zones;
  volunteerRoles = volunteerRoles;

  searchFilterQuery = '';
  searchFilterZone = '';
  searchFilterRole = '';

  constructor(
    private fb: FormBuilder,
    private volunteersFacade: VolunteersFacade,
    private volunteerService: VolunteersService,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private csvService: CsvService,
  ) {}

  ngOnInit() {
    this.getAllStatusesCount();
    this.dataSource$ = this.volunteersFacade.volunteers$;
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

  getAllStatusesCount() {
    const demands = this.tabs.map((tab) =>
      this.helperGetCountByStatus(tab.status),
    );
    forkJoin(demands)
      .pipe(take(1))
      .subscribe((res) => {
        this.allStatusesCounts$.next(res);
      });
  }

  helperGetCountByStatus(status?: string) {
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

type Tab = {
  label: string;
  status?: string;
};

function getValue<T extends string>(value: string): T | undefined {
  return value !== 'all' && value ? (value as T) : undefined;
}
