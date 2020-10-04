import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFacadeService } from '@services/auth/user-facade.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { IVolunteer } from '@models/volunteers';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { map, takeUntil } from 'rxjs/operators';
import { IUser } from '@models/user';
import { UsersFacadeService } from '@services/users/users-facade.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ActionsSubject } from '@ngrx/store';
import { createUserSuccessAction } from '@store/users-store/actions';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'status'];
  dataSource$: Observable<MatTableDataSource<IUser>>;
  isLoading$ = this.usersFacade.isLoading$;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private usersFacade: UsersFacadeService,
    private matDialog: MatDialog,
    private actions$: ActionsSubject
  ) {}

  ngOnInit() {
    this.usersFacade.getUsers();
    this.dataSource$ = this.usersFacade.users$.pipe(
      map((data) => {
        const dataSource = new MatTableDataSource(data);
        dataSource.paginator = this.paginator;
        return dataSource;
      })
    );
  }

  openNewUserDialog() {
    let dialogRef = this.matDialog.open(UserDetailsComponent, {
      data: {},
      maxWidth: '100%',
    });

    this.actions$
      .pipe(ofType(createUserSuccessAction), takeUntil(dialogRef.afterClosed()))
      .subscribe(() => {
        this.usersFacade.getUsers();
        dialogRef.close();
      });
  }
}
