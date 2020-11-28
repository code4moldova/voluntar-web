import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  IActivityTypeTag,
  IAgeTag,
  IAvailabilityTag,
  ITeamTag,
  IOfferTag,
} from '@shared/models';
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

  getAges(): Observable<{ list: IAgeTag[] }> {
    return this.http.get<{ list: IAgeTag[] }>(`${environment.url}/tag/age`);
  }

  getAvailabilities(): Observable<{ list: IAvailabilityTag[] }> {
    return this.http.get<{ list: IAvailabilityTag[] }>(
      `${environment.url}/tag/availability`
    );
  }

  getTeams(): Observable<{ list: ITeamTag[] }> {
    return this.http.get<{ list: ITeamTag[] }>(`${environment.url}/tag/team`);
  }

  getOffers(): Observable<{ list: IOfferTag[] }> {
    return this.http.get<{ list: IOfferTag[] }>(`${environment.url}/tag/offer`);
  }
}
