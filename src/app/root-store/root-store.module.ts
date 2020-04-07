import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  EntityDataModule,
  DefaultDataServiceConfig,
  EntityDataService,
} from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AuthStoreModule } from './auth-store/auth-store.module';
import { VolunteersStoreModule } from './volunteers-store/volunteers-store.module';
import { RequestsStoreModule } from './requests-store/requests-store.module';
import { UsersStoreModule } from './users-store/users-store.module';
import { TagsStoreModule } from './tags-store/tags-store.module';
import { entityConfig } from './entity-metadata';
import { VolunteersDataService } from '@services/volunteers/volunteers-data.service';
import { VolunteersDefaultDataService } from '@services/volunteers/default-data.service';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: `${environment.url}/api`,
  timeout: 3000, // request timeout,
  entityHttpResourceUrls: {
    // Case matters. Match the case of the entity name.
    volunteer: {
      // You must specify the root as part of the resource URL.
      entityResourceUrl: `${environment.url}/api/volunteer`,
      collectionResourceUrl: `${environment.url}/api/volunteer`,
    },
  },
};

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
    EntityDataModule.forRoot(entityConfig),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          maxAge: 25, // Retains last 25 states
          logOnly: environment.production,
        }),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
})
export class RootStoreModule {
  constructor(
    entityDataService: EntityDataService,
    dataService: VolunteersDefaultDataService
  ) {
    entityDataService.registerService('volunteer', dataService); // <-- register it
  }
}
