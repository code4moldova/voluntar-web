import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { Beneficiary } from '@models/beneficiary';
import { BeneficiariesFacadeService } from '@services/beneficiaries/beneficiaries-facade.service';

@Component({
  selector: 'app-beneficiaries-list',
  templateUrl: './beneficiaries-list.component.html',
  styleUrls: ['./beneficiaries-list.component.scss']
})
export class BeneficiariesListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource$: Observable<Beneficiary[]>;

  constructor(
    private serviceFacade: BeneficiariesFacadeService,
  ) { }

  ngOnInit(): void {
    this.serviceFacade.getBeneficiaries({ pageSize: 20, pageIndex: 1 });
    this.dataSource$ = this.serviceFacade.beneficiaries$;
  }

}
