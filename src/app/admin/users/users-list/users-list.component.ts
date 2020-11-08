import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { map, takeUntil } from 'rxjs/operators';
import { IUser } from '@shared/models';
import { UsersFacade } from '../users.facade';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ActionsSubject } from '@ngrx/store';
import { createUserSuccessAction } from '../users.actions';
import { ofType } from '@ngrx/effects';

@Component({
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'status'];
  dataSource$: Observable<MatTableDataSource<IUser>>;
  isLoading$ = this.usersFacade.isLoading$;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private usersFacade: UsersFacade,
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
    const dialogRef = this.matDialog.open(UserDetailsComponent, {
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
