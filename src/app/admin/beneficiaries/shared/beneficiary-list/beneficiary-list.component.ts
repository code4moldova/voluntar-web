import {
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '../beneficiary';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.scss'],
})
export class BeneficiaryListComponent {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Input()
  dataSource: Observable<Beneficiary[]>;
  @Input()
  count: Observable<number>;
  @Input()
  isLoading: Observable<boolean>;

  @Output()
  pageChangeEvent = new EventEmitter<PageEvent>();

  displayedColumns: string[] = [
    'disability',
    'name',
    'phone',
    'sector',
    'date',
    'links',
  ];

  cast(beneficiary: unknown): Beneficiary {
    return beneficiary as Beneficiary;
  }

  onPageChange(event: PageEvent) {
    this.pageChangeEvent.emit(event);
  }
}
