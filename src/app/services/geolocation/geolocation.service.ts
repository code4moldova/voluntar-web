import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddresses } from '@models/geolocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  url =
    'https://info.iharta.md:6443/arcgis/rest/services/locator/CompositeLoc/GeocodeServer/findAddressCandidates?';

  constructor(private http: HttpClient) {}

  getLocation(city: string, address: string): Observable<IAddresses> {
    const url =
      this.url +
      'City=' +
      encodeURI(city) +
      '&SingleLine=' +
      encodeURI(address) +
      '&maxLocations=10&f=pjson';

    return this.http.get<IAddresses>(url);
  }

  getZones(): Observable<any> {
    return this.http.get<any>(`${environment.url}/api/tag/sector`);
  }
}
