import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, fromEvent } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor(private http: HttpClient) {}

  upload(url: string) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.click();
    return fromEvent(input, 'change').pipe(
      switchMap(() => {
        const blob = input.files?.[0];
        if (blob) {
          const formData = new FormData();
          formData.set('file', blob);
          return this.http.post(url, formData);
        } else {
          return throwError('File not selected');
        }
      }),
    );
  }

  download(url: string, fileName: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      map((blob) => {
        const url = window.URL.createObjectURL(blob);
        setTimeout(() => window.URL.revokeObjectURL(url));
        const child = document.createElement('a');
        child.setAttribute('href', url);
        child.setAttribute('download', fileName);
        child.click();
      }),
    );
  }
}
