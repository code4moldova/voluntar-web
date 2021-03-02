import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { map, takeUntil, tap } from 'rxjs/operators';
import { UsersFacade } from '../users.facade';
import { ActionsSubject } from '@ngrx/store';
import { createUserSuccessAction } from '../users.actions';
import { ofType } from '@ngrx/effects';
import { UsersCreateComponent } from '@users/users-create/users-create.component';
import { forkJoin, Subscription } from 'rxjs';
import { User } from '@users/shared/user';
import { UsersService } from '@users/users.service';
import { UsersListResponse } from '@users/shared/users-list-response';
import {
  filterDeprecatedUserRoles,
  UserRole,
  userRoles,
} from '@users/shared/user-role';

@Component({
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  UserRole = UserRole;
  userRoles = filterDeprecatedUserRoles(userRoles);

  searchFilterQuery = '';
  searchFilterRole = '';

  displayedColumns = ['name', 'phone', 'email', 'role', 'details'];
  isLoading$ = this.usersFacade.isLoading$;
  dataSource = new MatTableDataSource<User>([]);
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  tabs: Tab[] = [
    {
      label: 'Activi',
      count: 0,
      is_active: true,
    },
    {
      label: 'Inactivi',
      count: 0,
      is_active: false,
    },
    {
      label: 'Toti',
      count: 0,
      is_active: undefined,
    },
  ];
  activeTab = this.tabs[0];
  perPageOptions = [10, 20, 50, 100];
  perPage = this.perPageOptions[0];
  page: PageEvent = {
    pageSize: this.perPage,
    pageIndex: 0,
    length: 0,
  };

  constructor(
    private usersFacade: UsersFacade,
    private usersService: UsersService,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.usersFacade.users$.subscribe((users) => {
        this.page.length = users.count;
        this.dataSource.data = users.list;
      }),
    );

    this.getUsers();
    this.getTabsCount();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  searchSubmit() {
    const query = this.searchFilterQuery || undefined;
    const role =
      this.searchFilterRole !== 'all' && this.searchFilterRole
        ? (this.searchFilterRole as UserRole)
        : undefined;

    this.paginator.firstPage();
    this.getUsers(query, role);
  }

  cast(user: unknown): User {
    return user as User;
  }

  onPageChange(page: PageEvent) {
    this.page = page;
    this.getUsers();
  }

  onTabChange(tab: Tab) {
    this.activeTab = tab;
    this.paginator.firstPage();
    this.getUsers();
  }

  getUsers(query?: string, role?: UserRole) {
    this.usersFacade.getUsers({
      is_active: this.activeTab.is_active,
      page: this.page.pageIndex,
      per_page: this.page.pageSize,
      query,
      roles: role,
    });
  }

  getTabsCount() {
    const service = this.usersService;
    const kindOfAllUsers = {
      page: 0,
      // TODO: maybe better we make a new endpoint that returns only the counts
      per_page: Number.MAX_SAFE_INTEGER,
    };

    this.subscriptions.add(
      forkJoin([
        service.getList({ ...kindOfAllUsers, is_active: true }),
        service.getList({ ...kindOfAllUsers, is_active: false }),
        service.getList({ ...kindOfAllUsers, is_active: undefined }),
      ])
        .pipe(map(extractUsersListsCounts))
        .subscribe(([activeUsers, nonActiveUsers, allUsers]) => {
          const activeTab = this.tabs.find((t) => t.is_active === true);
          const nonActiveTab = this.tabs.find((t) => t.is_active === false);
          const allTab = this.tabs.find((t) => t.is_active === undefined);
          // In reality tabs exist, we check to make TS happy
          if (activeTab) activeTab.count = activeUsers;
          if (nonActiveTab) nonActiveTab.count = nonActiveUsers;
          if (allTab) allTab.count = allUsers;
        }),
    );
  }

  openNewUserDialog() {
    const dialogRef = this.matDialog.open(UsersCreateComponent, {
      width: '550px',
    });

    this.actions$
      .pipe(
        ofType(createUserSuccessAction),
        tap(() => this.usersFacade.getUsers()),
        takeUntil(dialogRef.afterClosed()),
      )
      .subscribe(() => dialogRef.close());
  }
}

type Tab = {
  label: string;
  count: number;
  is_active: undefined | boolean;
};

function extractUsersListsCounts(results: UsersListResponse[]): number[] {
  return results.map((users) => users.list.length);
}
