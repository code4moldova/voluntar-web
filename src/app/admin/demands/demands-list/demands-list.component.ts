import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

import { DemandsFacade, DemandsPageParams } from '../demands.facade';
import { UsersFacade } from '@users/users.facade';

import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { saveDemandSuccessAction } from '../demands.actions';
import { DemandDetailsComponent } from '../demand-details/demand-details.component';
import { Demand } from '@demands/shared/demand';
import { DemandsService } from '@demands/demands.service';
import { environment } from '../../../../environments/environment';
import { CsvService } from '@app/admin/shared/csv.service';
import { Zone, zones } from '@shared/zone';

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

  lastFilter = {};
  page: DemandsPageParams = { pageSize: 20, pageIndex: 1 };

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

  zones = zones;
  searchFilterQuery = '';
  searchFilterZone = '';
  searchFilterDate: Date | null = null;

  constructor(
    private demandsFacade: DemandsFacade,
    private demandsService: DemandsService,
    private usersFacade: UsersFacade,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
    private csvService: CsvService,
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
  }

  searchSubmit() {
    this.queryResult({
      query: this.searchFilterQuery || undefined,
      zone:
        this.searchFilterZone !== 'all' && this.searchFilterZone
          ? (this.searchFilterZone as Zone)
          : undefined,
      // TODO: toGMTString is deprecated, backend should send in a better format
      // @ts-ignore
      created_at: this.searchFilterDate?.toISOString(),
    });
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

  queryResult(criteria: { [keys: string]: string | undefined }) {
    this.lastFilter = criteria;
    this.page = { pageSize: 20, pageIndex: 1 };
    this.demandsFacade.getDemands(this.page, criteria);
  }

  onPageChange(event: PageEvent) {
    this.page = { pageSize: event.pageSize, pageIndex: event.pageIndex + 1 };
    this.demandsFacade.getDemands(this.page, this.lastFilter);
  }

  onImport() {
    this.csvService
      .upload(`${environment.url}/import/csv/requests`)
      .subscribe();
  }

  onExport() {
    this.csvService
      .download(`${environment.url}/export/csv/requests`, 'demands.csv')
      .subscribe();
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
