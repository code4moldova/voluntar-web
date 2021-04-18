import { Observable } from 'rxjs';

export interface Tab {
  label: string;
  status?: string;
  count$?: Observable<number>;
}

export interface PageParams {
  pageSize: number;
  pageIndex: number;
}
