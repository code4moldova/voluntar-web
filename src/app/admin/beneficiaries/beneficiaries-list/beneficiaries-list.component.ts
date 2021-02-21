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
import { zones } from '@shared/zone';
import { downloadCsv } from '@shared/download-csv';
import { BeneficiariesService } from '@beneficiaries/beneficiaries.service';

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
  filterStr = '';
  filterSector = '';
  prevFilterStr = '';
  prevFilterSector = '';

  constructor(
    private beneficiariesFacade: BeneficiariesFacade,
    private beneficiariesService: BeneficiariesService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private actions$: ActionsSubject,
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
      this.blockListFilters,
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
    this.beneficiariesService
      .getCSVBlob()
      .subscribe((blob) => downloadCsv(blob, 'beneficiaries'));
  }

  onSearchSubmit() {
    if (this.filterStr === '' && this.filterSector === '') {
      // TODO allow user to reset filters and display full list again
      // if (this.tabIndex === 0) {
      // } else {
      // }
      this.snackBar.open(
        'Introduceți textul de căutare sau/și alegi un sector',
        '',
        {
          duration: 5000,
          panelClass: 'info',
          horizontalPosition: 'right',
          verticalPosition: 'top',
        },
      );
      return;
    }

    const filter = { query: this.filterStr, zone: this.filterSector };

    if (this.tabIndex === 0) {
      this.filters = filter;
      this.reloadBeneficiaries();
    } else {
      // block list
      this.blockListFilters = filter;
      this.reloadBlockList();
    }
  }

  onTabChange(index: number) {
    this.tabIndex = index;
    // Preserve filters between tabs
    const tmpFilterStr = this.filterStr;
    const tmpFilterSector = this.filterSector;
    this.filterStr = this.prevFilterStr;
    this.filterSector = this.prevFilterSector;
    this.prevFilterStr = tmpFilterStr;
    this.prevFilterSector = tmpFilterSector;
  }
}
