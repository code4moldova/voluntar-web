import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UsersFacade } from '../users.facade';
import { ActionsSubject } from '@ngrx/store';
import { createUserSuccessAction } from '../users.actions';
import { ofType } from '@ngrx/effects';
import { UsersCreateComponent } from '@users/users-create/users-create.component';

@Component({
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'status'];
  dataSource$ = this.usersFacade.users$.pipe(
    map((data) => new MatTableDataSource(data)),
    tap((dataSource) => (dataSource.paginator = this.paginator))
  );
  isLoading$ = this.usersFacade.isLoading$;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private usersFacade: UsersFacade,
    private matDialog: MatDialog,
    private actions$: ActionsSubject
  ) {}

  ngOnInit() {
    this.usersFacade.getUsers();
  }

  openNewUserDialog() {
    const dialogRef = this.matDialog.open(UsersCreateComponent, {
      width: '550px',
    });

    this.actions$
      .pipe(
        ofType(createUserSuccessAction),
        tap(() => this.usersFacade.getUsers()),
        takeUntil(dialogRef.afterClosed())
      )
      .subscribe(() => dialogRef.close());
  }
}
