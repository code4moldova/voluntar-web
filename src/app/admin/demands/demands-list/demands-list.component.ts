import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, pluck, take, takeUntil } from 'rxjs/operators';

import { DemandsFacade, DemandsPageParams } from '../demands.facade';
import { UsersFacade } from '@users/users.facade';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { saveDemandSuccessAction } from '../demands.actions';
import { DemandDetailsComponent } from '../demand-details/demand-details.component';
import {
  FilterInputColumns,
  FilterObservableSelectColumns,
  FilterSelectColumns,
} from '@shared/filter/filter.types';
import { KIV_ZONES } from '@shared/constants';
import { Demand } from '@demands/shared/demand';
import { downloadCsv } from '@shared/download-csv';
import { DemandsService } from '@demands/demands.service';

@Component({
  templateUrl: './demands-list.component.html',
  styleUrls: ['./demands-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemandsListComponent implements OnInit {
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
  dataSource$: Observable<Demand[]>;
  isLoading$ = this.demandsFacade.isLoading$;
  count$ = this.demandsFacade.demandsCount$;

  public inputColumns: FilterInputColumns[];
  public selectColumns: FilterSelectColumns<{
    label: string;
    _id: string | boolean;
  }>[];
  public observableSelectColumns: FilterObservableSelectColumns[];

  lastFilter = {};
  page: DemandsPageParams = { pageSize: 20, pageIndex: 1 };

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
          this.allStatuses.findIndex((stats) => {
            return stats._id === status;
          }) + 1
        );
      }
      return 0;
    }),
  );

  allStatuses = [
    {
      label: 'New',
      _id: 'new',
    },
    {
      label: 'In progress',
      _id: 'onprogress',
    },
    {
      label: 'Cancelled',
      _id: 'cancelled',
    },
    {
      label: 'Done',
      _id: 'done',
    },
  ];

  allStatusesCounts$ = new BehaviorSubject<number[]>([]);

  constructor(
    private demandsFacade: DemandsFacade,
    private demandsService: DemandsService,
    private usersFacade: UsersFacade,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
  ) {
    this.getAllStatusesCount();
  }

  getAllStatusesCount() {
    const demands = [{}, ...this.allStatuses].map((status: any) =>
      this.helperGetCountByStatus(status._id),
    );
    forkJoin(demands)
      .pipe(take(1))
      .subscribe((res) => {
        this.allStatusesCounts$.next(res);
      });
  }

  helperGetCountByStatus(status: string) {
    return this.demandsFacade
      .getDemandsByStatus(status)
      .pipe(map((res) => res.count));
  }

  ngOnInit() {
    this.fetchDemands();
    this.usersFacade.getUsers();
    this.dataSource$ = this.demandsFacade.demands$;

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

  fetchDemands() {
    this.demandsFacade.getDemands(this.page);
    this.demandsFacade.resetNewDemands();
  }

  queryResult(criteria: { [keys: string]: string }) {
    this.lastFilter = criteria;
    this.page = { pageSize: 20, pageIndex: 1 };
    this.demandsFacade.getDemands(this.page, criteria);
  }

  onPageChange(event: PageEvent) {
    this.page = { pageSize: event.pageSize, pageIndex: event.pageIndex + 1 };
    this.demandsFacade.getDemands(this.page, this.lastFilter);
  }

  onExport() {
    this.demandsService
      .getCSVBlob()
      .subscribe((blob) => downloadCsv(blob, 'demands'));
  }

  openNewDemandDialog(element: Demand = {} as Demand) {
    const dialogRef = this.matDialog.open(DemandDetailsComponent, {
      data: { element },
      maxWidth: '100%',
      maxHeight: '90vh',
      panelClass: 'new-demand-custom-modal-box',
    });

    this.actions$
      .pipe(ofType(saveDemandSuccessAction), takeUntil(dialogRef.afterClosed()))
      .subscribe(() => {
        this.demandsFacade.getDemands(this.page, this.lastFilter);
        this.getAllStatusesCount();
        dialogRef.close();
      });
  }

  cast(element: unknown): Demand {
    return element as Demand;
  }

  getClusterUrl(demand: Demand): string {
    return `${window.location.origin}/cluster/${demand.volunteer.cluster_id}`;
  }
}
