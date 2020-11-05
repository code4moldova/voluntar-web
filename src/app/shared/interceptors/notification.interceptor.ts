import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
  HttpEventType,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'PUT') {
      this.snackBar.open('Updating', '', {
        duration: 3000,
      });
    }
    if (request.method === 'POST') {
      this.snackBar.open('Creating', '', {
        duration: 3000,
      });
    }
    return next.handle(request).pipe(
      tap((res: HttpResponse<any>) => {
        if (
          res.type === HttpEventType.Response &&
          res.status &&
          res.status === 200
        ) {
          if (request.method === 'PUT') {
            this.snackBar.open('Updated successfully', '', {
              duration: 3000,
              panelClass: 'success',
            });
          }
          if (request.method === 'POST') {
            this.snackBar.open('Created successfully', '', {
              duration: 3000,
              panelClass: 'success',
            });
          }
        }
      })
    );
  }
}
