import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { AuthStoreModule } from '../pages/auth/auth-store.module';
import { BeneficiariesStoreModule } from '../pages/admin/beneficiaries/beneficiaries-store.module';
import { VolunteersStoreModule } from '../pages/admin/volunteers/volunteers-store.module';
import { RequestsStoreModule } from '../pages/admin/requests/requests-store.module';
import { UsersStoreModule } from '../pages/admin/users/users-store.module';
import { TagsStoreModule } from './tags-store/tags-store.module';

@NgModule({
  imports: [
    CommonModule,
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
  ],
})
export class RootStoreModule {}
