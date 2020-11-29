import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IActivityTypeTag, IAvailabilityTag, IOfferTag } from '@shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getActivityTypes(): Observable<{ list: IActivityTypeTag[] }> {
    return this.http.get<{ list: IActivityTypeTag[] }>(
      `${environment.url}/tag/activity_types`
    );
  }

  getAvailabilities(): Observable<{ list: IAvailabilityTag[] }> {
    return this.http.get<{ list: IAvailabilityTag[] }>(
      `${environment.url}/tag/availability`
    );
  }

  getOffers(): Observable<{ list: IOfferTag[] }> {
    return this.http.get<{ list: IOfferTag[] }>(`${environment.url}/tag/offer`);
  }
}
