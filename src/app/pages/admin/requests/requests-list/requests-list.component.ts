import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { UsersFacadeService } from '@services/users/users-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';

import {
  FilterInputColumns,
  FilterSelectColumns,
  FilterObservableSelectColumns,
} from '@models/filter';
import { IRequest } from '@models/requests';
import { IUser } from '@models/user';
import { ZoneI } from '@models/geolocation';
import { TagsFacadeService } from '@services/tags/tags-facade.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
})
export class RequestsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'phone', 'hasMoney', 'city', 'status'];
  dataSource$: Observable<IRequest[]>;
  isLoading$ = this.requestsFacade.isLoading$;
  newRequest$ = this.requestsFacade.newRequests;
  count$ = this.requestsFacade.requestsCount$;

  public inputColumns: FilterInputColumns[];
  public selectColumns: FilterSelectColumns<{
    label: string;
    _id: string | boolean;
  }>[];
  public observableSelectColumns: FilterObservableSelectColumns<
    IUser | ZoneI
  >[];

  lastFilter = {};

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
  constructor(
    private requestsFacade: RequestsFacadeService,
    private usersFacadeService: UsersFacadeService,
    private geolocationService: GeolocationService,
    private tagsFacade: TagsFacadeService
  ) {}

  ngOnInit() {
    this.fetchRequests();
    this.usersFacadeService.getUsers();
    this.dataSource$ = this.requestsFacade.requests$;

    this.inputColumns = [
      { name: 'First Name', value: 'first_name' },
      { name: 'Last Name', value: 'last_name' },
      { name: 'Phone', value: 'phone', icon: 'phone' },
    ];

    this.observableSelectColumns = [
      { name: 'Fixer', value: 'fixer', array: this.usersFacadeService.users$ },
      {
        name: 'Zone address',
        value: 'zone_address',
        array: this.geolocationService.getZonesFromFilter(),
      },
    ];

    this.selectColumns = [
      {
        name: 'Status',
        value: 'status',
        array: this.tagsFacade.getStatusOptions(),
      },
      { name: 'Is Active', value: 'is_active', array: this.isActive },
    ];
  }

  fetchRequests() {
    this.requestsFacade.getRequests({ pageSize: 20, pageIndex: 1 });
    this.requestsFacade.resetNewRequests();
  }

  queryResult(criteria: { [keys: string]: string }) {
    this.lastFilter = criteria;
    this.requestsFacade.getRequests(
      {
        pageSize: 20,
        pageIndex: 1,
      },
      criteria
    );
  }

  onPageChange(event: PageEvent) {
    this.requestsFacade.getRequests(
      {
        pageSize: event.pageSize,
        pageIndex: event.pageIndex + 1,
      },
      this.lastFilter
    );
  }
}
