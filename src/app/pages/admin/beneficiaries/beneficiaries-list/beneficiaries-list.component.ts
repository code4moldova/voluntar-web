import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionsSubject } from '@ngrx/store';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource$: Observable<Beneficiary[]>;
  count$ = this.serviceFacade.count$;
  isLoading$ = this.serviceFacade.isLoading$;
  pageSize = 20;
  pageIndex = 1;

  lastFilter = {};

  constructor(
    private serviceFacade: BeneficiariesFacadeService,
    private matDialog: MatDialog,
    private actions$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.reloadBeneficiaries();
    this.dataSource$ = this.serviceFacade.beneficiaries$;
  }

  reloadBeneficiaries() {
    const { pageSize, pageIndex } = this;
    this.serviceFacade.getBeneficiaries(
      { pageSize, pageIndex },
      this.lastFilter
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex + 1;
    this.reloadBeneficiaries();
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
        this.reloadBeneficiaries();
        dialogRef.close();
      });
  }
}
