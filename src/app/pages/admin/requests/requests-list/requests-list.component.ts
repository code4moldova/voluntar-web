import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { UsersFacadeService } from '@services/users/users-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';

import { FilterInputColumns, FilterSelectColumns, FilterObservableSelectColumns } from '@models/filter';
import { IRequest } from '@models/requests';
import { IUser } from '@models/user';
import { ZoneI } from '@models/geolocation';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
})
export class RequestsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'phone', 'hasMoney', 'city', 'status'];
  dataSource$: Observable<MatTableDataSource<IRequest>>;
  isLoading$ = this.requestsFacade.isLoading$;
  newRequest$ = this.requestsFacade.newRequests;

  public inputColumns: FilterInputColumns[];
  public selectColumns: FilterSelectColumns<{ label: string; _id: string | boolean }>[];
  public observableSelectColumns: FilterObservableSelectColumns<IUser | ZoneI>[];
  private statusOptions = [
    {
      label: 'Waiting',
      _id: 'waiting',
    }, 
     {
      label: 'On Progress',
      _id: 'onprogress',
    },
    {
      label: 'Done',
      _id: 'done',
    },
  ];
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
  ) { }

  ngOnInit() {
    this.fetchRequests();
    this.usersFacadeService.getUsers();
    this.dataSource$ = this.requestsFacade.requests$.pipe(
      map((data) => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );

    this.inputColumns = [
      { name: 'First Name', value: 'first_name' },
      { name: 'Last Name', value: 'last_name' },
      { name: 'Phone', value: 'phone', icon: 'phone' },
    ];

    this.observableSelectColumns = [
      { name: 'Fixer', value: 'fixer', array: this.usersFacadeService.users$ },
      { name: 'Zone address', value: 'zone_address', array: this.geolocationService.getZonesFromFilter() },
    ];

    this.selectColumns = [
      { name: 'Status', value: 'status', array: this.statusOptions },
      { name: 'Is Active', value: 'is_active', array: this.isActive },
    ];

  }

  fetchRequests() {
    this.requestsFacade.getRequests();
    this.requestsFacade.resetNewRequests();
  }


  queryResult(criteria: { [keys: string]: string }) {
    this.requestsFacade.getBeneficiaresByFilter(criteria);
  }

}
