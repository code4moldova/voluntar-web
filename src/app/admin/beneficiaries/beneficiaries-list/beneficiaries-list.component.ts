import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Beneficiary } from '../shared/beneficiary';
import { BeneficiariesFacade } from '../beneficiaries.facade';
import { BeneficiaryNewComponent } from '../beneficiary-new/beneficiary-new.component';
import { saveBeneficiarySuccessAction } from '../beneficiaries.actions';
import { Zone, zones } from '@shared/zone';
import { BeneficiariesService } from '@beneficiaries/beneficiaries.service';
import { environment } from '../../../../environments/environment';
import { CsvService } from '@app/admin/shared/csv.service';

@Component({
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.scss'],
})
export class BeneficiariesListComponent implements OnInit {
  tabIndex = 0;
  dataSource$: Observable<Beneficiary[]>;
  count$ = this.beneficiariesFacade.count$;
  isLoading$ = this.beneficiariesFacade.isLoading$;
  pageSize = 20;
  pageIndex = 1;
  filters = {};

  blockListDataSource$: Observable<Beneficiary[]>;
  blockListCount$ = this.beneficiariesFacade.blockListCount$;
  blockListIsLoading$ = this.beneficiariesFacade.blockListIsLoading$;
  blockListPageSize = 20;
  blockListPageIndex = 1;
  blockListFilters = {};

  // Search bar
  zones = zones;
  searchFilterQuery = '';
  searchFilterZone = '';

  constructor(
    private beneficiariesFacade: BeneficiariesFacade,
    private beneficiariesService: BeneficiariesService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private actions$: ActionsSubject,
    private csvService: CsvService,
  ) {}

  ngOnInit(): void {
    this.reloadBeneficiaries();
    this.reloadBlockList();
    this.dataSource$ = this.beneficiariesFacade.beneficiaries$;
    this.blockListDataSource$ = this.beneficiariesFacade.blockListData$;
  }

  reloadBeneficiaries() {
    const { pageSize, pageIndex } = this;
    this.beneficiariesFacade.getBeneficiaries(
      { pageSize, pageIndex },
      this.filters,
    );
  }

  reloadBlockList() {
    const { blockListPageSize: pageSize, blockListPageIndex: pageIndex } = this;
    this.beneficiariesFacade.getBeneficiaryBlockList(
      { pageSize, pageIndex },
      this.filters,
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.reloadBeneficiaries();
  }

  onBlockListPageChange(event: PageEvent) {
    this.blockListPageSize = event.pageSize;
    this.blockListPageIndex = event.pageIndex + 1;
    this.reloadBlockList();
  }

  openNewBeneficiaryDialog() {
    const dialogRef = this.matDialog.open(BeneficiaryNewComponent, {
      data: {},
      maxWidth: '100%',
    });

    this.actions$
      .pipe(
        ofType(saveBeneficiarySuccessAction),
        takeUntil(dialogRef.afterClosed()),
      )
      .subscribe(() => {
        dialogRef.close();
        this.reloadBeneficiaries();
        this.reloadBlockList();
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

  onTabChange(index: number) {
    this.tabIndex = index;
  }

  searchSubmit() {
    this.filters = {
      query: this.searchFilterQuery || undefined,
      zone:
        this.searchFilterZone !== 'all' && this.searchFilterZone
          ? (this.searchFilterZone as Zone)
          : undefined,
    };

    if (this.tabIndex === 0) {
      this.reloadBeneficiaries();
    } else {
      // Block list
      this.reloadBlockList();
    }
  }
}
