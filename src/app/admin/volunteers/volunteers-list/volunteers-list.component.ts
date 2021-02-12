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
import { volunteerRoles } from '../shared/volunteer-role';
import { zones } from '@shared/zone';
import { downloadCsv } from '@shared/download-csv';
import { VolunteersService } from '@volunteers/volunteers.service';

@Component({
  templateUrl: './volunteers-list.component.html',
})
export class VolunteersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns = ['name', 'phone', 'zone', 'icons', 'details'];
  dataSource$: Observable<Volunteer[]>;
  isLoading$ = this.volunteersFacade.isLoading$;
  count$ = this.volunteersFacade.count$;
  allStatusesCounts$: BehaviorSubject<number[]> = new BehaviorSubject([]);
  tabs: Tab[] = [
    { label: 'Activi', status: 'active' },
    { label: 'Inactivi', status: 'inactive' },
    { label: 'Blacklist', status: 'blacklist' },
    { label: 'Toti', status: null },
  ];
  activeTab = this.tabs[0];
  page: VolunteerPageParams = { pageSize: 20, pageIndex: 1 };
  lastFilter = {};
  filterForm = this.fb.group({
    query: [null],
    zone: [null],
    role: [null],
  });
  zones = zones;
  roles = volunteerRoles;

  constructor(
    private fb: FormBuilder,
    private volunteersFacade: VolunteersFacade,
    private volunteerService: VolunteersService,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.activeRoute.queryParams.pipe(take(1)).subscribe((params) => {
      this.filterForm.patchValue(params);
    });
  }

  ngOnInit() {
    this.getAllStatusesCount();
    this.dataSource$ = this.volunteersFacade.volunteers$;
    this.onTabChange(this.activeTab);
  }

  // TODO
  onVolunteersImport(): void {}

  onVolunteersExport(): void {
    this.volunteerService
      .getCSVBlob()
      .subscribe((blob) => downloadCsv(blob, 'demands'));
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

  helperGetCountByStatus(status: string) {
    return this.volunteersFacade
      .getByStatus(status)
      .pipe(map((res) => res.count));
  }

  queryResult(criteria: { [keys: string]: string }) {
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

  onSearchSubmit() {
    const query: any = {};
    const filters = this.filterForm.value;
    Object.keys(filters).forEach((key) => {
      if (filters[key] && filters[key].length > 0) {
        query[key] = filters[key];
      }
    });
    if (this.activeTab) {
      query.status = this.activeTab;
    }
    this.router
      .navigate([], {
        relativeTo: this.activeRoute,
        queryParams: {
          ...query,
        },
      })
      .then();
  }

  cast(volunteer: unknown): Volunteer {
    return volunteer as Volunteer;
  }
}

type Tab = {
  label: string;
  status: string;
};
