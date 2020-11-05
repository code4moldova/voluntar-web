import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { AuthStoreModule } from '@auth/auth-store.module';
import { BeneficiariesStoreModule } from '@beneficiaries/beneficiaries-store.module';
import { VolunteersStoreModule } from './admin/volunteers/volunteers-store.module';
import { RequestsStoreModule } from '@requests/requests-store.module';
import { UsersStoreModule } from './admin/users/users-store.module';
import { TagsStoreModule } from '@shared/tags/tags-store.module';

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
export class AppStoreModule {}
