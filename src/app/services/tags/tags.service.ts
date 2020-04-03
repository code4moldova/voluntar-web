import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IActivityTypeTag, IAgeTag, IAvailabilityTag, ITeamTag, IOfferTag } from '@models/tags';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getActivityTypes(): Observable<{ list: IActivityTypeTag[] }> {
    return this.http.get<{ list: IActivityTypeTag[] }>(`${environment.url}/api/tag/activity_types`);
  }

  getAges(): Observable<{ list: IAgeTag[] }> {
    return this.http.get<{ list: IAgeTag[] }>(`${environment.url}/api/tag/age`);
  }

  getAvailabilities(): Observable<{ list: IAvailabilityTag[] }> {
    return this.http.get<{ list: IAvailabilityTag[] }>(`${environment.url}/api/tag/availability`);
  }

  getTeams(): Observable<{ list: ITeamTag[] }> {
    return this.http.get<{ list: ITeamTag[] }>(`${environment.url}/api/tag/team`);
  }

  getOffers(): Observable<{ list: IOfferTag[] }> {
    return this.http.get<{ list: IOfferTag[] }>(`${environment.url}/api/tag/offer`);
  }
}
