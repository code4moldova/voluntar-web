import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRequest } from '@models/requests';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';
import { UsersFacadeService } from '@services/users/users-facade.service';
import { GeolocationService } from '@services/geolocation/geolocation.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
})
export class RequestsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'hasMoney', 'city', 'status'];
  dataSource$: Observable<MatTableDataSource<IRequest>>;
  isLoading$ = this.requestsFacade.isLoading$;
  newRequest$ = this.requestsFacade.newRequests;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  public inputColumns: { name: string; value: string; icon?: string, placeholder?: string }[];
  public selectColumns: { name: string; value: string; array: Observable<any[]>, icon?: string, placeholder?: string, }[];

  constructor(
    private requestsFacade: RequestsFacadeService,
    private usersFacadeService: UsersFacadeService,
    private geolocationService: GeolocationService,
  ) { }

  ngOnInit() {
    this.fetchRequests();
    this.dataSource$ = this.requestsFacade.requests$.pipe(
      map((data) => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );

    this.usersFacadeService.getUsers();

    this.inputColumns = [
      { name: 'First Name', value: 'first_name' },
      { name: 'Last Name', value: 'last_name' },
      { name: 'Phone', value: 'phone', icon: 'phone' },
    ];
    this.selectColumns = [
      // { name: 'Status', value: 'status' },
      { name: 'Fixer', value: 'fixer', array: this.usersFacadeService.users$ },
      { name: 'Zone address', value: 'zone_address', array: this.geolocationService.getZonesFromFilter() },
    ];
  }

  fetchRequests() {
    this.requestsFacade.getRequests();
    this.requestsFacade.resetNewRequests();
  }

  queryResult(event: { query: string }) {
    this.requestsFacade.getBeneficiaresByFilter(event.query);
  }

  resetForm($event: { result: boolean }) {
    if ($event.result) {
      this.requestsFacade.getRequests();
    }
  }

}
