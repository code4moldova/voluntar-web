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
import {
  debounceTime,
  distinctUntilChanged,
  catchError,
  take,
} from 'rxjs/operators';

import {
  FilterInputColumns,
  FilterSelectColumns,
  FilterObservableSelectColumns,
} from '@models/filter';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.queryResult.emit(params);
    });

    this.inputColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(null));
    });

    this.selectColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(null));
    });

    this.observableSelectColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(null));
    });

    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      this.form.patchValue(params);
    });

    this.subscription = this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.search(value);
      });
  }

  onFiltersSubmit() {
    this.search(this.form.value);
  }

  public search(filters: { [keys: string]: string | null }): void {
    Object.keys(filters).forEach((key) =>
      filters[key] === '' || filters[key] === null ? delete filters[key] : ''
    );
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
    });
  }

  public reset(): void {
    this.form.reset();
    this.form.markAsUntouched();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
