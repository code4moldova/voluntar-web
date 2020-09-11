import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // This has to be ignored
    // Headers injected in coresponding services
    if (
      request.url.endsWith('/token') ||
      request.url.startsWith('https://info.iharta.md')
    ) {
      return next.handle(request);
    } else {
      const token: string = localStorage.getItem('accessToken');
      if (!token && !(this.router.url == '/')) {
        console.log('accessToken doesnt exist');
        console.log('URL: ', request.url);
        console.log('Canceled by Interceptor.');
        this.snackBar.open('Token doesnt exist or expired, please Login', '', {
          duration: 3000,
          panelClass: 'danger',
        });
        this.router.navigate(['/login']);
        return EMPTY;
      }
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Basic ${btoa(token + ':.')}`
        ),
      });
    }

    return next.handle(request);
  }
}
