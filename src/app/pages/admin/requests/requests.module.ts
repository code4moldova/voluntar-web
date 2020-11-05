import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RequestsListComponent } from './requests-list/requests-list.component';
import { MaterialComponentsModule } from '@shared/material.module';
import { SharedModule } from '@shared/shared.module';
import { RequestModalInfoComponent } from './request-modal-info/request-modal-info.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { NgxMaskModule } from 'ngx-mask';
import { RequestsMapComponent } from './requests-map/requests-map.component';
import { RouterModule } from '@angular/router';
import { requestsRoutes } from './requests.routes';

@NgModule({
  declarations: [
    RequestsComponent,
    RequestDetailsComponent,
    RequestsListComponent,
    RequestModalInfoComponent,
    RequestFormComponent,
    RequestsMapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(requestsRoutes),
    MaterialComponentsModule,
    SharedModule,
    NgxMaskModule.forChild(),
  ],
  providers: [],
})
export class RequestsModule {}
