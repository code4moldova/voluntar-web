import {
  ChangeDetectionStrategy,
  Component,
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
import { DemandStatus, l10nDemandStatus } from '@demands/shared/demand-status';

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

  selectedTab?: DemandStatus;
  selectedTabIndex$ = 0;

  l10nDemandStatus = l10nDemandStatus;
  allStatuses = [
    undefined,
    DemandStatus.new,
    DemandStatus.in_process,
    DemandStatus.canceled,
    DemandStatus.solved,
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
    const demands = this.allStatuses.map((status) =>
      this.helperGetCountByStatus(status),
    );
    forkJoin(demands)
      .pipe(take(1))
      .subscribe((res) => {
        this.allStatusesCounts$.next(res);
      });
  }

  helperGetCountByStatus(status?: DemandStatus) {
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
      created_at: this.searchFilterDate?.toISOString(),
    });
  }

  onTabChanged(event: MatTabChangeEvent) {
    this.selectedTab = this.allStatuses[event.index];
    this.paginator.firstPage();
    this.demandsFacade.getDemands(this.page, {
      status: this.selectedTab,
    });
  }

  fetchDemands() {
    this.demandsFacade.getDemands(this.page);
    this.demandsFacade.resetNewDemands();
  }

  queryResult(criteria: { [keys: string]: string | undefined }) {
    this.lastFilter = criteria;
    this.page = { pageSize: 20, pageIndex: 1 };
    this.demandsFacade.getDemands(this.page, {
      ...criteria,
      status: this.selectedTab,
    });
  }

  onPageChange(event: PageEvent) {
    this.page = { pageSize: event.pageSize, pageIndex: event.pageIndex + 1 };
    this.demandsFacade.getDemands(this.page, {
      ...this.lastFilter,
      status: this.selectedTab,
    });
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

  openDemandDialog(demand: Demand | null = null) {
    const dialogRef = this.matDialog.open(DemandDetailsComponent, {
      width: '550px',
      data: demand,
    });

    this.actions$
      .pipe(ofType(saveDemandSuccessAction), takeUntil(dialogRef.afterClosed()))
      .subscribe(() => {
        this.demandsFacade.getDemands(this.page, {
          ...this.lastFilter,
          status: this.selectedTab,
        });
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

  getBadgeClassFromStatus(element: Demand): string {
    return statusColors[element.status];
  }
}

const statusColors: Record<DemandStatus, string> = {
  [DemandStatus.archived]: '',
  [DemandStatus.canceled]: 'red',
  [DemandStatus.solved]: 'green',
  [DemandStatus.in_process]: 'blue',
  [DemandStatus.new]: 'light-blue',
  [DemandStatus.confirmed]: 'green',
};
