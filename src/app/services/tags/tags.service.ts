import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IActivityTypeTag } from '@models/tags';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getActivityType(): Observable<{ list: IActivityTypeTag[] }> {
    return this.http.get<{ list: IActivityTypeTag[] }>(`${environment.url}/api/tag/activity_types`);
  }
}
