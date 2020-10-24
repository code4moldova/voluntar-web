import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Beneficiary } from '@models/beneficiary';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-beneficiary-list',
  templateUrl: './beneficiary-list.component.html',
  styleUrls: ['./beneficiary-list.component.scss'],
})
export class BeneficiaryListComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {}

  onPageChange(event: PageEvent) {
    this.pageChangeEvent.emit(event);
  }
}
