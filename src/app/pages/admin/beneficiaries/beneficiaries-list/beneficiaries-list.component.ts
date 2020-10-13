import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';

import { Beneficiary } from '@models/beneficiary';
import { BeneficiariesFacadeService } from '@services/beneficiaries/beneficiaries-facade.service';
import { BeneficiaryNewComponent } from '../beneficiary-new/beneficiary-new.component';
import { saveBeneficiarySuccessAction } from '@store/beneficiaries-store/actions';

@Component({
  selector: 'app-beneficiaries-list',
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.scss'],
})
export class BeneficiariesListComponent implements OnInit {
  dataSource$: Observable<Beneficiary[]>;
  count$ = this.serviceFacade.count$;
  isLoading$ = this.serviceFacade.isLoading$;
  pageSize = 20;
  pageIndex = 1;

  blockListDataSource$: Observable<Beneficiary[]>;
  blockListCount$ = this.serviceFacade.blockListCount$;
  blockListIsLoading$ = this.serviceFacade.blockListIsLoading$;
  blockListPageSize = 20;
  blockListPageIndex = 1;

  lastFilter = {};

  constructor(
    private serviceFacade: BeneficiariesFacadeService,
    private matDialog: MatDialog,
    private actions$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.reloadBeneficiaries();
    this.reloadBlockList();
    this.dataSource$ = this.serviceFacade.beneficiaries$;
    this.blockListDataSource$ = this.serviceFacade.blockListData$;
  }

  reloadBeneficiaries() {
    const { pageSize, pageIndex } = this;
    this.serviceFacade.getBeneficiaries(
      { pageSize, pageIndex },
      this.lastFilter
    );
  }

  reloadBlockList() {
    const { blockListPageSize: pageSize, blockListPageIndex: pageIndex } = this;
    this.serviceFacade.getBeneficiaryBlockList({ pageSize, pageIndex });
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
        takeUntil(dialogRef.afterClosed())
      )
      .subscribe(() => {
        dialogRef.close();
        this.reloadBeneficiaries();
        this.reloadBlockList();
      });
  }

  onExport() {
    window.alert('TODO');
  }
}
