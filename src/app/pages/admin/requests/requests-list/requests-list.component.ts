import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
import { map } from 'rxjs/operators';
import { IRequest } from '@models/requests';
import { RequestsFacadeService } from '@services/requests/requests-facade.service';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'phone', 'hasMoney', 'city', 'status'];
  dataSource$: Observable<MatTableDataSource<IRequest>>;
  isLoading$ = this.requestsFacade.isLoading$;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private requestsFacade: RequestsFacadeService) {}

  ngOnInit() {
    this.requestsFacade.getRequests();
    this.dataSource$ = this.requestsFacade.requests$.pipe(
      map(data => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );
  }
}
