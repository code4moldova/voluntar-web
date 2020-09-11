import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AuthStoreModule } from './auth-store/auth-store.module';
import { VolunteersStoreModule } from './volunteers-store/volunteers-store.module';
import { RequestsStoreModule } from './requests-store/requests-store.module';
import { UsersStoreModule } from './users-store/users-store.module';
import { TagsStoreModule } from './tags-store/tags-store.module';

@NgModule({
  imports: [
    CommonModule,
    AuthStoreModule,
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
  ],
})
export class RootStoreModule {}
