import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';

import { VolunteerPageParams, VolunteersFacade } from '../volunteers.facade';
import { TagsFacade } from '@shared/tags/tags.facade';
import { GeolocationService } from '@shared/services/geolocation/geolocation.service';

import { IOfferTag, IVolunteer, ZoneI } from '@shared/models';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { VolunteersDetailsComponent } from '../volunteers-details/volunteers-details.component';
import { map, take, takeUntil } from 'rxjs/operators';
import { saveVolunteerSuccessAction } from '../volunteers.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { KIV_ZONES, VOLUNTEER_ROLES } from '@shared/constants';
import {
  FilterInputColumns,
  FilterObservableSelectColumns,
  FilterSelectColumns,
} from '@shared/filter/filter.types';
import { NewVolunteerRegisterFormComponent } from '../shared/newvolunteer-register-form/newvolunteer-register-form.component';

@Component({
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss'],
})
export class VolunteersListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'icons',
    'name',
    'phone',
    'status',
    'availableHours',
    'cases_solved',
  ];
  dataSource$: Observable<IVolunteer[]>;
  count$ = this.volunteersFacade.count$;
  isLoading$ = this.volunteersFacade.isLoading$;
  public inputColumns: FilterInputColumns[];
  public observableSelectColumns: FilterObservableSelectColumns[];
  public selectColumns: FilterSelectColumns<{
    label: string;
    _id: boolean | string;
  }>[];
  private isActive = [
    {
      label: 'Yes',
      _id: true,
    },
    {
      label: 'No',
      _id: false,
    },
  ];

  statuses = [
    { label: 'Activi', _id: 'active' },
    { label: 'Inactivi', _id: 'inactive' },
    { label: 'Blacklist', _id: 'blacklist' },
    { label: 'Toti', _id: null },
  ];
  allStatusesCounts$: BehaviorSubject<number[]> = new BehaviorSubject([]);
  selectedTab = null;
  selectedTabIndex$ = this.activeRoute.queryParams.pipe(
    map((params) => {
      const status = params.status;

      if (status) {
        this.selectedTab = status;

        return status;
      }
      return null;
    })
  );

  page: VolunteerPageParams = { pageSize: 20, pageIndex: 1 };
  lastFilter = {};
  currentTab = null;
  filterForm = this.fb.group({
    query: [null],
    zone: [null],
    role: [null],
  });
  zones = KIV_ZONES;
  roles = VOLUNTEER_ROLES;
  tagById$ = (id: any) => this.tagsFacadeService.availabilitiesById$(id);

  constructor(
    private fb: FormBuilder,
    private volunteersFacade: VolunteersFacade,
    private tagsFacadeService: TagsFacade,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
    private geolocationService: GeolocationService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activeRoute.queryParams.pipe(take(1)).subscribe((params) => {
      this.filterForm.patchValue(params);
    });
  }

  ngOnInit() {
    this.getAllStatusesCount();
    this.volunteersFacade.getVolunteers(this.page);
    this.dataSource$ = this.volunteersFacade.volunteers$;

    this.inputColumns = [
      { name: 'First Name', value: 'first_name' },
      { name: 'Last Name', value: 'last_name' },
      { name: 'Phone', value: 'phone', icon: 'phone' },
      { name: 'Suburbie', value: 'suburbie', icon: 'home' },
    ];

    this.observableSelectColumns = [
      {
        name: 'Offer',
        value: 'offer',
        array: this.tagsFacadeService.offersTags$,
      },
      {
        name: 'Sector',
        value: 'zone_address',
        array: of(KIV_ZONES),
      },
    ];

    this.selectColumns = [
      { name: 'Is Active', value: 'is_active', array: this.isActive },
    ];
  }

  onVolunteersImport(): void {}

  onVolunteersExport(): void {}

  getAllStatusesCount() {
    const requests = this.statuses.map((status) =>
      this.helperGetCountByStatus(status._id)
    );
    forkJoin(requests)
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
    const dialogRef = this.matDialog.open(
      // VolunteersDetailsComponent,
      NewVolunteerRegisterFormComponent,
      {
        data: {},
        maxWidth: '100%',
        maxHeight: '90vh',
      }
    );

    this.actions$
      .pipe(
        ofType(saveVolunteerSuccessAction),
        takeUntil(dialogRef.afterClosed())
      )
      .subscribe(() => {
        this.volunteersFacade.getVolunteers(this.page, this.lastFilter);
        dialogRef.close();
      });
  }

  onTabChange(tabId: string) {
    this.currentTab = tabId;
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        status: tabId,
      },
      queryParamsHandling: 'merge',
    });
  }

  onSearchSubmit() {
    const query: any = {};
    const filters = this.filterForm.value;
    Object.keys(filters).forEach((key) => {
      if (filters[key] && filters[key].length > 0) {
        query[key] = filters[key];
      }
    });
    if (this.currentTab) {
      query.status = this.currentTab;
    }
    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        ...query,
      },
    });
  }
}
