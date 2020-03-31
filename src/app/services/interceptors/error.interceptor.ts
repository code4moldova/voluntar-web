import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorage } from '@services/auth/token-storage.service';
import { logoutAction } from '@store/user-store/actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorage,
    private store: Store<any>
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = '';
        if (error.status === 500) {
          message = 'Server error';
        } else if (error.status === 401) {
          message = 'Unauthorized request';
          this.tokenStorage.clear();
          this.store.dispatch(logoutAction());
        } else {
          message = error.error.error || 'Undefined error';
        }

        this.snackBar.open(message, '', {
          duration: 3000,
          panelClass: 'danger'
        });
        return throwError(error);
      })
    );
  }
}
