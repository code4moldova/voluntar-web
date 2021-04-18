import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';

import { Beneficiary } from '../shared/beneficiary';
import { BeneficiariesFacade } from '../beneficiaries.facade';
import { BeneficiaryNewComponent } from '../beneficiary-new/beneficiary-new.component';
import { saveBeneficiarySuccessAction } from '../beneficiaries.actions';
import { Zone, zones } from '@shared/zone';
import { BeneficiariesService } from '@beneficiaries/beneficiaries.service';
import { environment } from '../../../../environments/environment';
import { CsvService } from '@app/admin/shared/csv.service';
import { PageParams, Tab } from '@app/admin/shared/interfaces';

@Component({
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.scss'],
})
export class BeneficiariesListComponent implements OnInit {
  tabs: Tab[] = [
    {
      label: 'all.masculine',
      status: undefined,
      count$: this.beneficiariesFacade.count$,
    },
    {
      label: 'black_list',
      status: 'blacklist',
      count$: this.beneficiariesFacade.blockListCount$,
    },
  ];
  activeTab = this.tabs[0];

  dataSource$: Observable<Beneficiary[]>;
  isLoading$ = this.beneficiariesFacade.isLoading$;
  page: PageParams = { pageSize: 20, pageIndex: 1 };
  filters = {};

  // Search bar
  zones = zones;
  searchFilterQuery = '';
  searchFilterZone = '';

  constructor(
    private beneficiariesFacade: BeneficiariesFacade,
    private beneficiariesService: BeneficiariesService,
    private matDialog: MatDialog,
    private actions$: ActionsSubject,
    private csvService: CsvService,
  ) {}

  ngOnInit(): void {
    this._reloadDataSource();
    this._reloadBlockList();
  }

  private _reloadDataSource(): void {
    if (this.activeTab.status === undefined) {
      this.dataSource$ = this._reloadBeneficiaries();
    } else {
      this.dataSource$ = this._reloadBlockList();
    }
  }

  private _reloadBeneficiaries(): Observable<Beneficiary[]> {
    this.beneficiariesFacade.getBeneficiaries(this.page, this.filters);
    return this.beneficiariesFacade.beneficiaries$;
  }

  private _reloadBlockList(): Observable<Beneficiary[]> {
    this.beneficiariesFacade.getBeneficiaryBlockList(this.page, this.filters);
    return this.beneficiariesFacade.blockListData$;
  }

  onPageChange(event: PageEvent) {
    this.page = { pageSize: event.pageSize, pageIndex: event.pageIndex + 1 };
    this._reloadDataSource();
  }

  openNewBeneficiaryDialog() {
    const dialogRef = this.matDialog.open(BeneficiaryNewComponent, {
      width: '550px',
    });

    this.actions$
      .pipe(
        ofType(saveBeneficiarySuccessAction),
        takeUntil(dialogRef.afterClosed()),
      )
      .subscribe(() => {
        dialogRef.close();
        this._reloadBeneficiaries();
        this._reloadBlockList();
      });
  }

  onExport() {
    this.csvService
      .download(
        `${environment.url}/export/csv/beneficiaries`,
        'beneficiaries.csv',
      )
      .subscribe();
  }

  onTabChange(tab: Tab) {
    this.activeTab = tab;
    this.page = { pageSize: 20, pageIndex: 1 };
    this._reloadDataSource();
  }

  searchSubmit() {
    this.filters = {
      query: this.searchFilterQuery || undefined,
      zone:
        this.searchFilterZone !== 'all' && this.searchFilterZone
          ? (this.searchFilterZone as Zone)
          : undefined,
    };

    if (this.activeTab.status === undefined) {
      this._reloadBeneficiaries();
    } else {
      this._reloadBlockList();
    }
  }
}
