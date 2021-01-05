import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { AuthInterceptor } from '@shared/interceptors/auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { NotificationInterceptor } from '@shared/interceptors/notification.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { AuthStoreModule } from '@auth/auth-store.module';
import { BeneficiariesStoreModule } from '@beneficiaries/beneficiaries-store.module';
import { VolunteersStoreModule } from '@volunteers/volunteers-store.module';
import { RequestsStoreModule } from '@requests/requests-store.module';
import { UsersStoreModule } from '@users/users-store.module';
import { TagsStoreModule } from '@shared/tags/tags-store.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AuthStoreModule,
    BeneficiariesStoreModule,
    VolunteersStoreModule,
    RequestsStoreModule,
    UsersStoreModule,
    TagsStoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production,
        }),
    MatSnackBarModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    NgxMaskModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateHttpLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'ro',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
