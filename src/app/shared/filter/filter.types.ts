import { Observable } from 'rxjs';

export interface FilterInputColumns {
  name: string;
  value: string;
  icon?: string;
  placeholder?: string;
}

export interface FilterSelectColumns<T> {
  name: string;
  value: string;
  icon?: string;
  placeholder?: string;
  array: Array<T>;
}

export interface FilterObservableSelectColumns<T = any> {
  name: string;
  value: string;
  icon?: string;
  placeholder?: string;
  array: Observable<Array<T>>;
}
