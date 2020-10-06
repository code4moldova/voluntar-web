import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import {
  VolunteerPageParams,
  VolunteersFacadeService,
} from '@services/volunteers/volunteers-facade.service';
import { TagsFacadeService } from '@services/tags/tags-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';

import { IVolunteer } from '@models/volunteers';
import { IOfferTag } from '@models/tags';
import {
  FilterInputColumns,
  FilterSelectColumns,
  FilterObservableSelectColumns,
} from '@models/filter';
import { ZoneI } from '@models/geolocation';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { VolunteersDetailsComponent } from '../volunteers-details/volunteers-details.component';
import { takeUntil } from 'rxjs/operators';
import { saveVolunteerSuccessAction } from '@store/volunteers-store/actions';

@Component({
  selector: 'app-volunteers-list',
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
  public observableSelectColumns: FilterObservableSelectColumns<
    IOfferTag | ZoneI
  >[];
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

  page: VolunteerPageParams = { pageSize: 20, pageIndex: 1 };
  lastFilter = {};
  tagById$ = (id: any) => this.tagsFacadeService.availabilitiesById$(id);
  constructor(
    private volunteersFacade: VolunteersFacadeService,
    private tagsFacadeService: TagsFacadeService,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
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
        array: this.geolocationService.getZonesFromFilter(),
      },
    ];

    this.selectColumns = [
      { name: 'Is Active', value: 'is_active', array: this.isActive },
    ];
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
    let dialogRef = this.matDialog.open(VolunteersDetailsComponent, {
      data: {},
      maxWidth: '100%',
      maxHeight: '90vh',
    });

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
}
