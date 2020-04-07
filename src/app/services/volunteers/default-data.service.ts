import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  DefaultDataService,
  EntityCollectionServiceElementsFactory,
  HttpUrlGenerator,
  Logger,
  QueryParams,
} from '@ngrx/data';
import { IVolunteer } from '@models/volunteers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VolunteersDefaultDataService extends DefaultDataService<
  IVolunteer
> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    logger: Logger
  ) {
    super('volunteer', http, httpUrlGenerator);
    logger.log('Created custom Volunteer EntityDataService');
  }

  getAll(): Observable<IVolunteer[]> {
    return super.getAll().pipe(
      map((res: any) => {
        return res.list;
      })
    );
  }

  getById(id: string | number): Observable<IVolunteer> {
    return super.getById(id);
  }

  getWithQuery(params: string | QueryParams): Observable<IVolunteer[]> {
    return super.getWithQuery(params);
  }
}
