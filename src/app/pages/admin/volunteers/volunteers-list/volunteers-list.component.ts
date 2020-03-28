import { Component, OnInit, ViewChild } from '@angular/core';
import { VolunteersFacadeService } from '@services/volunteers/volunteers-facade.service';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { IVolunteer } from '@models/volunteers';

@Component({
  selector: 'app-volunteers-list',
  templateUrl: './volunteers-list.component.html',
  styleUrls: ['./volunteers-list.component.scss']
})
export class VolunteersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'status', 'availableHours'];
  dataSource$: Observable<MatTableDataSource<IVolunteer>>;
  isLoading$ = this.volunteersFacade.isLoading$;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private volunteersFacade: VolunteersFacadeService) {}

  ngOnInit() {
    this.volunteersFacade.getVolunteers();
    this.dataSource$ = this.volunteersFacade.volunteers$.pipe(
      map(data => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );
  }
}
