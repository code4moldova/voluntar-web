import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, pluck, take, takeUntil } from 'rxjs/operators';

import { DemandsFacade, RequestPageParams } from '../demands.facade';
import { UsersFacade } from '@users/users.facade';
import { GeolocationService } from '@shared/services/geolocation/geolocation.service';

import { IRequest } from '@shared/models';
import { TagsFacade } from '@shared/tags/tags.facade';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { saveRequestSuccessAction } from '../demands.actions';
import { DemandDetailsComponent } from '../demand-details/demand-details.component';
import {
  FilterInputColumns,
  FilterObservableSelectColumns,
  FilterSelectColumns,
} from '@shared/filter/filter.types';
import { KIV_ZONES } from '@shared/constants';
import { Demand } from '@app/shared/models/demand';

@Component({
  templateUrl: './demands-list.component.html',
  styleUrls: ['./demands-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'icons',
    'name',
    'phone',
    'sector',
    'createdDate',
    'status',
    'edit',
  ];
  dataSource$: Observable<Demand[] | IRequest[]>;
  isLoading$ = this.demandsFacade.isLoading$;
  count$ = this.demandsFacade.requestsCount$;

  public inputColumns: FilterInputColumns[];
  public selectColumns: FilterSelectColumns<{
    label: string;
    _id: string | boolean;
  }>[];
  public observableSelectColumns: FilterObservableSelectColumns[];

  lastFilter = {};
  page: RequestPageParams = { pageSize: 20, pageIndex: 1 };

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

  @ViewChild('empty', { static: true }) empty: ElementRef;
  selectedTab = 'all';
  selectedTabIndex$ = this.activeRoute.queryParams.pipe(
    map((params) => {
      const status = params.status;

      if (status) {
        this.selectedTab = status;

        return (
          this.tagsFacade.getStatusOptions().findIndex((stats) => {
            return stats._id === status;
          }) + 1
        );
      }
      return 0;
    })
  );

  allStatuses = this.tagsFacade.getStatusOptions();

  allStatusesCounts$ = new BehaviorSubject<number[]>([]);

  constructor(
    private demandsFacade: DemandsFacade,
    private usersFacade: UsersFacade,
    private geolocationService: GeolocationService,
    private tagsFacade: TagsFacade,
    private renderer: Renderer2,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private actions$: ActionsSubject
  ) {
    this.getAllStatusesCount();
  }

  getAllStatusesCount() {
    const requests = [{}, ...this.allStatuses].map((status: any) =>
      this.helperGetCountByStatus(status._id)
    );
    forkJoin(requests)
      .pipe(take(1))
      .subscribe((res) => {
        this.allStatusesCounts$.next(res);
      });
  }

  helperGetCountByStatus(status: string) {
    return this.demandsFacade
      .getRequestByStatus(status)
      .pipe(map((res) => res.count));
  }

  ngOnInit() {
    this.fetchRequests();
    this.usersFacade.getUsers();
    this.dataSource$ = this.demandsFacade.requests$;

    this.inputColumns = [
      { name: 'First Name', value: 'first_name' },
      { name: 'Last Name', value: 'last_name' },
      { name: 'Phone', value: 'phone', icon: 'phone' },
    ];

    this.observableSelectColumns = [
      {
        name: 'Fixer',
        value: 'fixer',
        array: this.usersFacade.users$.pipe(pluck('list')),
      },
      {
        name: 'Zone address',
        value: 'zone_address',
        array: of(KIV_ZONES),
      },
    ];

    this.selectColumns = [
      { name: 'Is Active', value: 'is_active', array: this.isActive },
    ];
  }

  onTabChanged(event: MatTabChangeEvent) {
    let status = null;

    if (typeof event.tab.textLabel !== 'string') {
      // @ts-ignore TODO
      status = event.tab.textLabel._id;
      this.selectedTab = status;
    }

    this.helperGetCountByStatus(status).subscribe((count) => {
      const counts = this.allStatusesCounts$.getValue();
      counts[event.index] = count;
      this.allStatusesCounts$.next(counts);
    });

    void this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: {
        status,
      },
      queryParamsHandling: 'merge',
    });
  }

  fetchRequests() {
    this.demandsFacade.getRequests(this.page);
    this.demandsFacade.resetNewRequests();
  }

  queryResult(criteria: { [keys: string]: string }) {
    this.lastFilter = criteria;
    this.page = { pageSize: 20, pageIndex: 1 };
    this.demandsFacade.getRequests(this.page, criteria);
  }

  onPageChange(event: PageEvent) {
    this.page = { pageSize: event.pageSize, pageIndex: event.pageIndex + 1 };
    this.demandsFacade.getRequests(this.page, this.lastFilter);
  }

  onExport() {
    this.demandsFacade.getExportRequests().subscribe((res) => {
      this.downloadCsv(res);
    });
  }

  downloadCsv(blob: Blob) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, 'demands.csv');
    } else {
      const a = this.renderer.createElement('a');
      this.renderer.setAttribute(a, 'href', window.URL.createObjectURL(blob));
      this.renderer.setAttribute(a, 'download', 'demands.csv');

      a.click();
    }
  }

  openNewRequestDialog(element: Demand = {} as Demand) {
    const dialogRef = this.matDialog.open(DemandDetailsComponent, {
      data: { element },
      maxWidth: '100%',
      maxHeight: '90vh',
      panelClass: 'newrequest-custom-modalbox',
    });

    this.actions$
      .pipe(
        ofType(saveRequestSuccessAction),
        takeUntil(dialogRef.afterClosed())
      )
      .subscribe(() => {
        this.demandsFacade.getRequests(this.page, this.lastFilter);
        this.getAllStatusesCount();
        dialogRef.close();
      });
  }
}
