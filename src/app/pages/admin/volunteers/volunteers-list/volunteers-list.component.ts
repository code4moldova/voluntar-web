import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
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

  lastFilter = {};
  tagById$ = (id: any) => this.tagsFacadeService.availabilitiesById$(id);
  constructor(
    private volunteersFacade: VolunteersFacadeService,
    private tagsFacadeService: TagsFacadeService,
    private geolocationService: GeolocationService
  ) { }

  ngOnInit() {
    this.volunteersFacade.getVolunteers({ pageSize: 20, pageIndex: 1 });
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
    this.volunteersFacade.getVolunteers(
      {
        pageSize: 20,
        pageIndex: 1,
      },
      criteria
    );
  }

  onPageChange(event: PageEvent) {
    this.volunteersFacade.getVolunteers(
      {
        pageSize: event.pageSize,
        pageIndex: event.pageIndex + 1,
      },
      this.lastFilter
    );
  }
}
