import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { Subscription, EMPTY } from 'rxjs';
import { debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import {
  FilterInputColumns,
  FilterSelectColumns,
  FilterObservableSelectColumns,
} from '@models/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() public inputColumns: FilterInputColumns[];
  @Input() public selectColumns: FilterSelectColumns<any>[];
  @Input() public observableSelectColumns: FilterObservableSelectColumns<any>[];
  @Output() public queryResult = new EventEmitter<{ [keys: string]: string }>();

  public form = this.fb.group({});
  private subscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inputColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(null));
    });

    this.selectColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(null));
    });

    this.observableSelectColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(null));
    });

    const search$ = this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      catchError((err) => EMPTY)
    );

    this.subscription = search$.subscribe((criterion) => {
      this.search(this.form.value);
    });
  }

  onFiltersSubmit() {
    this.search(this.form.value);
  }

  public search(filters: { [keys: string]: string | null }): void {
    Object.keys(filters).forEach((key) =>
      filters[key] === '' || filters[key] === null ? delete filters[key] : ''
    );
    this.queryResult.emit(filters);
  }

  public reset(): void {
    this.form.reset();
    this.form.markAsUntouched();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
