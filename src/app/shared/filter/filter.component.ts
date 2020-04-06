import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

import { Subscription, fromEvent, merge, EMPTY } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators';
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
export class FilterComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public inputColumns: FilterInputColumns[];
  @Input() public selectColumns: FilterSelectColumns<any>[];
  @Input() public observableSelectColumns: FilterObservableSelectColumns<any>[];
  @Output() public queryResult = new EventEmitter<{ query: string }>();
  @Output() public resetForm = new EventEmitter<{ result: boolean }>();
  @ViewChildren('search') input: QueryList<ElementRef>;

  public form = this.fb.group({});
  private subscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inputColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(''));
    });
    this.selectColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(''));
    });
    this.observableSelectColumns.forEach((col) => {
      this.form.addControl(col.value, new FormControl(''));
    });
  }

  ngAfterViewInit(): void {
    const eventStreams$ = this.input.map((ev) =>
      fromEvent(ev.nativeElement, 'keyup')
    );
    const allEvents$ = merge(...eventStreams$);

    const search$ = allEvents$.pipe(
      map((event: Event) => (event.target as HTMLInputElement).value),
      debounceTime(1000),
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

  public openedChange(open: boolean): void {
    if (!open) {
      this.search(this.form.value);
    }
  }

  public search(filters: { [keys: string]: string | null }): void {
    const query = Object.keys(filters).reduce(
      (acc, cv) =>
        (acc =
          acc +
          (filters[cv] === '' || filters[cv] === null
            ? ''
            : `&${cv}=${filters[cv]}`)),
      ''
    );
    this.queryResult.emit({ query });
  }

  public reset(): void {
    this.form.reset();
    this.form.markAsUntouched();
    this.resetForm.emit({ result: true });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
