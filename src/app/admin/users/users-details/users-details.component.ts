import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from '@users/shared/user';
import { UserRole } from '@users/shared/user-role';
import { TranslateService } from '@ngx-translate/core';
import { DemandsService } from '@demands/demands.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IRequestDetails as Demand } from '@shared/models';

@Component({
  templateUrl: './users-details.component.html',
})
export class UsersDetailsComponent implements OnDestroy, OnInit {
  private _destroy = new Subject<void>();

  UserRole = UserRole;
  user$ = this.route.data.pipe<User>(map((data) => data.user));

  dataSource = new MatTableDataSource<Demand>([]);
  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;
  perPageOptions = [5, 10, 20];
  perPage = this.perPageOptions[0];
  page: PageEvent = {
    pageSize: this.perPage,
    pageIndex: 0,
    length: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private demandsService: DemandsService
  ) {}

  ngOnInit() {
    this.user$
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this.getDemands());
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  getDemands = (
    page: PageEvent = {
      pageSize: this.perPage,
      pageIndex: 0,
      length: 0,
    }
  ) => {
    this.page = page;
    return this.demandsService
      .getRequests(
        {
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
        },
        { u_id: this.route.snapshot.data.user._id }
      )
      .pipe(takeUntil(this._destroy))
      .subscribe((demands) => {
        this.page.length = demands.count;
        this.dataSource.data = demands.list;
      });
  };

  getTimeRange(user: User): string {
    return user.availability_hours_start && user.availability_hours_end
      ? `${user.availability_hours_start}:00 - ${user.availability_hours_end}:00`
      : this.translateService.instant('not_set');
  }

  getAvailabilityDays(user: User): string {
    return user.availability_days.length === 0
      ? this.translateService.instant('not_set')
      : user.availability_days
          .map((d) => this.translateService.instant(d))
          .join(', ');
  }
}
